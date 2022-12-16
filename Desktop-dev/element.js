
export class element {
    
    // properties
    #props = {

        parents  : [],
        children : [],

        html : document.createElement("div"),
        allow_context_menu : true,
        css  : { }, // css as object

        x : 0, y : 0 , old_x : 0 , old_y : 0 ,
        
        width : 0 , height : 0 , old_width : 0 , old_height : 0 ,

        visible : true , 
        resizable : false,
        draggable : false,

        id : undefined ,
        z_index : 0 , 
        text  : "text",

    };

    /*
        when callbacks for event get stored
    */
    #callbacks = {

        set_callback : ( event_name , call_back_function , ...call_back_args ) => {

            if( typeof( call_back_function ) === "function" ){

                this.#callbacks[event_name].call_back_function = call_back_function;
                this.#callbacks[event_name].call_back_args = call_back_args;

                return true;
            }
            else return false;
            
        },

    };

    // on event
    on = {

        click : ( call_back_function , ...call_back_args ) => { 

           if( this.#callbacks.set_callback("click", call_back_function , ...call_back_args) ){

                this.#props.html.addEventListener("click" , (event) => {
                    this.#callbacks.click.call_back_function( this , event , ...( this.#callbacks.click.call_back_args));
                });

           }
           else // need error here
           console.error("on.click :", "parameter 'call_back_function' must to be function"); 
           
        },

        click_right : ( call_back_function , ...call_back_args ) => { 

            if( this.#callbacks.set_callback("click_right", call_back_function , ...call_back_args) ){

                this.#props.html.addEventListener("contextmenu" , (event) => {

                    if( !(this.#props.allow_context_menu) ) event.preventDefault();

                    this.#callbacks.click_right.call_back_function( this , event , ...( this.#callbacks.click_right.call_back_args));
                });

            }
            else // need error here
            console.error("on.click_right :", "parameter 'call_back_function' must to be function");
        
        },

        click_down : ( call_back_function , ...call_back_args ) => { 

            if( this.#callbacks.set_callback("click_down", call_back_function , ...call_back_args) ){

                this.#props.html.addEventListener("mousedown" , (event) => {
                    this.#callbacks.click_down.call_back_function( this , event , ...( this.#callbacks.click_down.call_back_args));
                });

            }
            else // need error here
            console.error("on.click_down :", "parameter 'call_back_function' must to be function");
        
        },

        dblclick : ( call_back_function , ...call_back_args ) => { 

            if( this.#callbacks.set_callback("dblclick", call_back_function , ...call_back_args) ){

                this.#props.html.addEventListener("dblclick" , (event) => {
                    this.#callbacks.dblclick.call_back_function( this , event , ...( this.#callbacks.dblclick.call_back_args));
                });

            }
            else // need error here
            console.error("on.dblclick :", "parameter 'call_back_function' must to be function");
        
        },

        hover : ( call_back_function , ...call_back_args ) => { 
  
            if( this.#callbacks.set_callback("hover", call_back_function , ...call_back_args) ){

                this.#props.html.addEventListener("mouseover" , (event) => {

                    this.#callbacks.hover.call_back_function( this , event , ...( this.#callbacks.hover.call_back_args));
                
                });

            }
            else // need error here
            console.error("on.hover :", "parameter 'call_back_function' must to be function");

        },

        resize : ( call_back_function , ...call_back_args ) => { },
        drag_start : ( call_back_function , ...call_back_args ) => { },
        drag_in : ( call_back_function , ...call_back_args ) => { },
        drag_end : ( call_back_function , ...call_back_args ) => { },
        
        visible : ( call_back_function , ...call_back_args ) => { },
        hidden  : ( call_back_function , ...call_back_args ) => { },
        delete  : ( call_back_function , ...call_back_args ) => { },

        css_change : ( call_back_function , ...call_back_args ) => { },
        html_change : ( call_back_function , ...call_back_args ) => { },


    };

    get = {

    };

    set = {

        // set element x position
        x : ( new_x = 0 , unit = "px") => {

            if( typeof(new_x) === "number" ){

                this.#props.old_x = this.#props.x;
                this.#props.x = new_x; 

                // set x position to html element
                this.#props.html.style.left = this.#props.x + unit;

                return true; 
            }
            else { 
                // need warn
                console.warn("set.x :" , "parameter new_x must to be number");
                return false; 
            }

        },

        // set element y position
        y : ( new_y = 0 , unit = "px") => {

            if( typeof(new_y) === "number" ){

                this.#props.old_y = this.#props.y;
                this.#props.y = new_y; 

                this.#props.html.style.top = this.#props.y + unit;

                return true;
            }
            else { 
                // need warn
                console.warn("set.y :" , "parameter new_y must to be number");
                return false; 
            }

        },

        // set element width 
        width : ( new_width = 0 , unit = "px" ) => {

            if( typeof(new_width) === "number" ){

                this.#props.old_width = this.#props.width;
                this.#props.width = new_width;
                this.#props.html.style.width = this.#props.width + unit;
                
                return true; 
            }
            else { 
                // need warn
                console.warn("set.width" , "parameter new_width must to be number");
                return false; 
            }

        },

        // set element height 
        height : ( new_height = 0 , unit = "px" ) => {

            if( typeof(new_height) === "number" ){

                this.#props.old_height = this.#props.height;
                this.#props.height = new_height;
                this.#props.html.style.height = this.#props.height + unit;
                
                return true;
            }
            else { 
                // need warn
                console.warn("[DESKTOPjs] new_x parameter must be number");
                return false; 
            }

        },

        // set element visiblity
        visibility : ( is_visible = true ) => {
            
            this.#props.visible = ( is_visible ? true : false );
            this.#props.html.style.visibility = (this.#props.visible) ? "visible" : "hidden";

        },

        // set element z-index 
        z_index : ( z_index_value = 1 ) => {

            if( typeof(z_index_value) === "number" ){

                this.#props.z_index = z_index_value;
                this.#props.html.style.zIndex = this.#props.z_index;
                
                return true;
            }
            else {
                // need warn
                console.warn("set.z_index :" , "parameter z_index_value must to be number");
                return false;
            }

        },

        // set elemnt text content 
        text : ( new_text = "") => {

            this.#props.text = new_text;
            this.#props.html.textContent = new_text;

        },
       
        

        context_item  : () => { }, // need work later
        context_items : () => { }, // need work later

        // need => "html & css" setters ! 
    };
    
    context_menu = ( allow_context_menu = true ) => {

        if( typeof(allow_context_menu) != "boolean" ) {
            // need warn
            console.warn("element.context_menu :" , "parameter allow_context_menu must to be 'boolean'" );
        }
        else this.#props.allow_context_menu = Boolean(allow_context_menu);

    }

    add = {

        parent : ( new_parent = new element() ) => {
        
            if( new_parent instanceof element ){

                this.#props.parents += new_parent;
                new_parent.add.child(this);

            }
                 // need error
            else console.error("add.parent :" , "parameter 'new_parent' must to be a instance of 'class element'"); 
        },

        child : ( new_child = new element() ) => {
            
            if( new_child instanceof element ){

                this.#props.children += new_child;
                this.#props.html.appendChild(new_child.#props.html);

            }
                 // need error
            else console.error("add.child :" , "parameter 'new_child' must to be a instance of 'class element'"); 
        
        }

    }

    constructor(
        id = undefined , text = "" , x = 0 , y = 0 , width = 0 , height = 0 , 
        visible = true , draggable = false , resizable = false  
    ){

        // save values 

        this.#props.id    = (typeof(id)    == "string") ? id : undefined;
        this.#props.text  = (typeof(text)  == "string") ? text : "";

        this.#props.x = (typeof(x) == "number") ? x : 0;
        this.#props.y = (typeof(y) == "number") ? y : 0;

        this.#props.width  = (typeof(width)  == "number") ? width : 0;
        this.#props.height = (typeof(height) == "number") ? height : 0;

        this.#props.visible   = (typeof(visible)   == "boolean") ? visible : false;
        this.#props.draggable = (typeof(draggable) == "boolean") ? draggable : false;
        this.#props.resizable = (typeof(resizable) == "boolean") ? resizable : false;
        

        // set callbacks to default  

        const events_names = [
            "click","click_right","dblclick","hover","resize","drag_start","drag_in",
            "drag_end","visible", "hidden", "delete", "css_change", "html_change","click_down"
        ];

        for( const name of events_names ){
            this.#callbacks[name] = {
                call_back_function : null,
                call_back_args : [],
            }
        }


        // setup getter's functions 

        const getters_functions = [
            "id","text","x","y","old_x","old_y",
            "width","old_width","height","old_height",
            "resizable","draggable","visible","z_index"
        ];

        for( const name of getters_functions ){

            this.get[name] = () => {
                return this.#props[name];
            }

        }


   
        // just for test !!!
        this.#props.html.textContent = text;
        this.#props.html.id = id;
        document.body.append(this.#props.html);


    } // end of constructor


} // end of class element