
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

        id : null ,
        index : 0 , 
        title : "title",
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


        context_item  : () => { }, // need work later
        context_items : () => { }, // need work later

        // we need => "html , css" setters logic 
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
        id = null , title = "" , text = "" , x = 0 , y = 0 , width = 0 , height = 0 , 
        visible = true , draggable = false , resizable = false  
    ){

        // save values 

        this.#props.id    = (typeof(id)    == "string") ? id : undefined;
        this.#props.title = (typeof(title) == "string") ? title : undefined;
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
            "title","id","text","x","y","old_x","old_y",
            "width","old_width","height","old_height",
            "resizable","draggable","visible","index"
        ];

        for( const name of getters_functions ){

            this.get[name] = () => {
                return this.#props[name];
            }

        }


        // setup setter's functions 

        const setters_functions = [
           // function name , parameter type
            {name : "title" , type : "string"},
            {name : "text"  , type : "string"},
            {name : "x"     , type : "number"},
            {name : "y"     , type : "number"},
            {name : "width" , type : "number"},
            {name : "height", type : "number"},
            {name : "index" , type : "number"},
            {name : "visible", type : "boolean"},
            {name : "draggable", type : "boolean"},
            {name : "resizable", type : "boolean"},
        ];

        for( const fn of setters_functions ){

            this.set[fn.name] = ( new_value ) => {
                
                if( typeof(new_value) != fn.type ) console.warn( "set."+fn.name ,": parameter must to be =>" , fn.type ); // need warn from model
                else this.#props[fn.name] = new_value;

            } 

        }

        // just for test !!!
        this.#props.html.textContent = text;
        this.#props.html.id = id;
        document.body.append(this.#props.html);

    } // end of constructor


}