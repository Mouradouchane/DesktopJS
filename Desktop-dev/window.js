
export class window{
    
    // === static properties for class it's self ===
    // windows index's for dealing with window : drag drop foucs blur ... 
    static index = 0;
    static max_index = 0;

    // === private properties ===
    #id;
    #x;
    #y;
    #height;
    #width;
    #visible;
    #minimize;
    #maximize;
    #title;
    #resize_h;
    #resize_v;
    #index = window.index += 1;
    #focus;

    // env object for window sitting's "private"
    #env = {
        
        // drag events : call_back's and arg's and ...
        drag : {

            is_window_in_drag : false,

            // for drag start
            start : {
                call_back_function : null,
                call_back_args : [],
            },
            
            // for drag in 
            in : {
                call_back_function : null,
                call_back_args : [],
            },

            // for drag end 
            end : {
                call_back_function : null,
                call_back_args : [],
            },
        },

        // maximize event callback & args
        maximize : {
            call_back_function : null,
            call_back_args : [],
        },

        // minimize event callback & args
        minimize : {
            call_back_function : null,
            call_back_args : [],
        },

        // foucs event callback & args
        foucs : {
            call_back_function : null,
            call_back_args : [],
        },

        // blur event callback & args
        blur : {
            call_back_function : null,
            call_back_args : [],
        },
        
    }


    // function take html template and processes it 
    #build = ( where_to_append , html_template ) => {

        // clone new window using as html element
        this.dom.window = html_template.cloneNode(true); // mandatory
        
        // trying locate all window HTML Elements ===============================
        this.dom.container = this.dom.window.querySelectorAll(".container")[0]; // mandatory 
        this.dom.top_bar = this.dom.window.querySelectorAll(".top_bar")[0];  // mandatory 
        // top_bar elements
        if( this.dom.top_bar ){
            this.dom.title = this.dom.top_bar.querySelectorAll(".title")[0];
            this.dom.icon = this.dom.top_bar.querySelectorAll(".icon")[0];
            this.dom.minimize = this.dom.top_bar.querySelectorAll(".minimize")[0];
            this.dom.maximize = this.dom.top_bar.querySelectorAll(".maximize")[0];
            this.dom.close = this.dom.top_bar.querySelectorAll(".close")[0];
        }

        // required if resize_h is activated
        this.dom.resize_t = this.dom.window.querySelectorAll(".resize_vertical")[0];  
        this.dom.resize_b = this.dom.window.querySelectorAll(".resize_vertical")[1];  
        
        // required if resize_h is activated
        this.dom.resize_l = this.dom.window.querySelectorAll(".resize_horizontal")[0];
        this.dom.resize_r = this.dom.window.querySelectorAll(".resize_horizontal")[1];

        // required if both resize_h and resize_h is activated
        this.dom.resize_tl = this.dom.window.querySelectorAll(".resize_corner")[0];
        this.dom.resize_tr = this.dom.window.querySelectorAll(".resize_corner")[1];
        this.dom.resize_dl = this.dom.window.querySelectorAll(".resize_corner")[2];
        this.dom.resize_dr = this.dom.window.querySelectorAll(".resize_corner")[3];
        // end of "locate" =========================================================
        

        // check if some mandatory or required element missing =====================
        if(!this.dom.container){
            console.error(`[DESKTOPjs] error in window ${this.#id} , because missing mandatory element "container" .`);
            console.info(`[DESKTOPjs] in window html template you need to make html element with class "container" .`);
            
            return;
        }
        if(!this.dom.top_bar){
            console.error(`[DESKTOPjs] error in window ${this.#id} , because missing mandatory element "top_bar" .`);
            console.info(`[DESKTOPjs] in window html template you need to make html element with class "top_bar" .`);
            
            return;
        }
        if( this.#resize_v  && !this.dom.resize_t || !this.dom.resize_b ){
            console.error(`[DESKTOPjs] error in window ${this.#id} , because "resize_v" option is activated , but there's no html elements for it .`);
            console.info(`[DESKTOPjs] modifiy your window html template and put two html element with class "resize_vertical" .`)
            
            return;
        }
        if( this.#resize_h  && !this.dom.resize_l || !this.dom.resize_r ){
            console.error(`[DESKTOPjs] error in window ${this.#id} , because "resize_h" option is activated , but there's no html elements for it `);
            console.info(`[DESKTOPjs] modifiy your window html template and put two html element with class "resize_horizontal" .`)
            
            return;
        }
        // end of "checks" =========================================================

                
        // filter no needed elements ===============================================

        // if no needed to minimize button
        if(!(this.#minimize)){
            this.dom.minimize.parentNode.removeChild(this.dom.minimize);
            this.dom.minimize = null;
        }
        // if no needed to maximize button
        if(!(this.#maximize)){
            this.dom.maximize.parentNode.removeChild(this.dom.maximize);
            this.dom.maximize = null;
        }
        // if no needed to resize_h
        if( !this.#resize_h ){
            this.dom.resize_l.parentNode.removeChild(this.dom.resize_l);
            this.dom.resize_r.parentNode.removeChild(this.dom.resize_r);

            this.dom.resize_l = null;
            this.dom.resize_r = null;
        }
        // if no needed to resize_v
        if( !this.#resize_v ){
            this.dom.resize_t.parentNode.removeChild(this.dom.resize_t);
            this.dom.resize_b.parentNode.removeChild(this.dom.resize_b);
            
            this.dom.resize_t = null;
            this.dom.resize_b = null;
        }
        // if no needed to resize in corners
        if( !this.#resize_h || !this.#resize_v ){
            this.dom.resize_tl.parentNode.removeChild(this.dom.resize_tl);
            this.dom.resize_tr.parentNode.removeChild(this.dom.resize_tr);
            this.dom.resize_dl.parentNode.removeChild(this.dom.resize_dl);
            this.dom.resize_dr.parentNode.removeChild(this.dom.resize_dr);

            this.dom.resize_tl = null;
            this.dom.resize_tr = null;
            this.dom.resize_dl = null;
            this.dom.resize_dr = null;
        }
        // end of "filter elements "================================================
        

        // setup window elements ===================================================
        
        // window attributes and properties 
        this.dom.window.setAttribute("id" , this.#id);
        this.dom.window.style.cssText +=  `left : ${this.#x}px`;
        this.dom.window.style.cssText +=  `top  : ${this.#y}px`;
        this.dom.window.style.cssText +=  `width  : ${this.#width}px`;
        this.dom.window.style.cssText +=  `height  : ${this.#height}px`;
        this.dom.window.style.cssText +=  `visibility  : ${ (this.#visible) ? "visible" : "hidden"}`;
        this.dom.window.style.zIndex = this.#index;
        window.max_index += 1;
        
        // window title
        this.dom.title.textContent = this.#title;

        // setup drag functionalities for window =====================================
        this.dom.top_bar.addEventListener("mousedown" , (e) => { // when "drag start"
            e.preventDefault();
            //debugger
            
            // activate drag boolean
            this.#env.drag.is_window_in_drag = true;

            // this window in drag event need to be in the top of all other windows 
            // set index to the max_index + 1 
            if(this.#index < window.max_index){
                window.max_index += 1;
                this.dom.window.style.zIndex = window.max_index;
            } 
            this.#focus = true;

            
            // get mouse x & y
            let mouse_x = e.clientX;
            let mouse_y = e.clientY;


            // set mousemove event to the document for keep tracking dragged window
            // if drag boolean is activated
            document.onmousemove =  ( e ) => { // in middle of "drag" 
                e.preventDefault();

                if( this.#env.drag.is_window_in_drag ){ // if window in is really in drag
                
                    // calculate the new mouse position
                    let new_mouse_x = mouse_x - e.clientX;
                    let new_mouse_y = mouse_y - e.clientY;
                    // save current mouse x y 
                    mouse_x = e.clientX;
                    mouse_y = e.clientY;
                    
                    // set new x and y to the window using setter function x and y in window.set
                    this.set.x(this.dom.window.offsetLeft - new_mouse_x);
                    this.set.y(this.dom.window.offsetTop  - new_mouse_y);

                    // if there's call_back_function for "drag" 
                    if(this.#env.drag.in.call_back_function){
                        // run it and pass (window , event , and some optional args)
                        this.#env.drag.in.call_back_function(this , e , ...(this.#env.drag.in.call_back_args) )
                    } 
                }
        };
     
        // if there's call_back_function for "drag_start" 
        if(this.#env.drag.start.call_back_function){
            // run it and pass (window , event , and some optional args , if available)
            this.#env.drag.start.call_back_function(this , e , ...(this.#env.drag.start.call_back_args) )
        } 

        });
        
        // when "drag end"
        this.dom.top_bar.addEventListener("mouseup", (e) => {
            
            // switch to drag off
            this.#env.drag.is_window_in_drag  = false;
            this.#focus = false;
            
            // drop window
            document.onmousemove = null;

            // if there's call_back_function for "drag_end" 
            if( this.#env.drag.end.call_back_function ){
                // run it and pass (window , event , and some optional args , if available)
                this.#env.drag.end.call_back_function(this , e , ...(this.#env.drag.end.call_back_args) )
            } 

        });

        // end of "setup Drag functionalities" ========================================


        // append this new window to the current desktop
        if(where_to_append) where_to_append.append(this.dom.window);
    }

    constructor(
        id = null , title = "window" , x = 10, y = 10 , height = 512, width = 512 , 
        maximize_button = true , minimize_button = true , 
        visible = true , resize_in_horizontal = true , resize_in_vertical = true , 
        where_to_append = null , html_template = null 
    ){

        // check & set new values
        this.#x         = (typeof(x) == "number") ? x : 0; 
        this.#y         = (typeof(y) == "number") ? y : 0;
        this.#height    = (typeof(height) == "number") ? height : 0;
        this.#width     = (typeof(width) == "number") ? width : 0;
        this.#id        = (typeof(id) == "string") ? id : null;
        this.#visible   = (typeof(visible) == "boolean") ? visible : true;
        this.#title     = (typeof(title) == "string") ? title : null;
        this.#focus     = (typeof(focus) == "boolean") ? focus : true; 
        this.#maximize  = (typeof(maximize_button) == "boolean") ? maximize_button : true;
        this.#minimize  = (typeof(minimize_button) == "boolean") ? minimize_button : true;
        this.#resize_h  = (typeof(resize_in_horizontal) == "boolean") ? resize_in_horizontal : true;
        this.#resize_v  = (typeof(resize_in_vertical) == "boolean") ? resize_in_vertical : true;
        

        // provide html elements of that element
        this.dom = { }

        // object provide booleans represents the case of object
        this.is  = { 
            
            // for check if this window in drag right now or not  
            in_drag : () => {
                return this.#env.drag.is_window_in_drag;
            },

            open : () => {
                return this.#visible ;
            },

            close : () => {
                return this.#visible ? false : true;
            },

            foucs : () => {
                //debugger;

                this.#focus = (this.get.z_index() >= window.max_index);
                return this.#focus;
                
            },
            
            // ============ need work ============
            blur : () => {
                //debugger;
    
                this.#focus = (this.get.z_index() >= window.max_index);
                return !this.#focus;
                
            },

            // ============ need work ============
            maximize : () => {

            },

            // ============ need work ============
            minimize : () => {

            }

        }

        // object provide events 
        this.on  = {

            // when drag start
            drag_start : ( call_back_function = null , ...args ) => {
                
                // check if call_back_function parameter is function
                if(typeof(call_back_function) == "function"){
                                    
                    // save call_back_function and it's arguments
                    this.#env.drag.start.call_back_function = call_back_function;
                    this.#env.drag.start.call_back_args = args;

                }
                else{ // mean call_back_function is not function 
                    console.error("[DESKTOPjs] parameter 'call_back_function' must be function");
                }

            },

            // when drag in "active"
            drag : ( call_back_function = null , ...args ) => {

                // call_back_function must be function
                if(typeof(call_back_function) == "function"){
                    
                    // save call_back_function and it's arguments
                    this.#env.drag.in.call_back_function = call_back_function;
                    this.#env.drag.in.call_back_args = args;

                }
                else{ // mean call_back_function is not function 
                    console.error("[DESKTOPjs] parameter 'call_back_function' must be function");
                }
            },

            // when drag end
            drag_end : ( call_back_function = null , ...args ) => {

                // call_back_function must be function
                if(typeof(call_back_function) == "function"){
                    
                    // save call_back_function and it's arguments
                    this.#env.drag.end.call_back_function = call_back_function;
                    this.#env.drag.end.call_back_args = args;

                }
                else{ // mean call_back_function is not function 
                    console.error("[DESKTOPjs] parameter 'call_back_function' must be function");
                }
            },


            // ============ need work ============
            foucs : () => {

            },

            // ============ need work ============
            blur : () => {

            },

            // ============ need work ============
            maximize : () => {

            },

            // ============ need work ============
            minimize : () => {

            }
        }


        // object contain all abilities for modify existing values
        this.set = {

            // set new x value only if "new_x" valid number
            x : ( new_x = 0) => {
                // check
                if( typeof(new_x) == "number"){
                    this.#x = new_x; // set new value if it valid
                    this.dom.window.style.left = this.#x + "px";
                    return true; // return confirmation :)
                }
                else { // mean invalid value
                    console.warn("[DESKTOPjs] new_x parameter must be number ")
                    return false; // return confirmation :(
                }
            },

            // like x() function
            y : ( new_y = 0 ) => {
                if( typeof(new_y) == "number"){
                    this.#y = new_y;
                    this.dom.window.style.top = this.#y + "px";
                    return true;
                }
                else {
                    console.warn("[DESKTOPjs] new_y parameter must be number ");
                    return false;
                }
            },

            // set new window title 
            title : ( new_title = "" ) => {

                if(typeof(new_title) != "string"){
                    console.error("[DESKTOPjs] new_title parameter must be string ");
                    return false;
                }
                else {
                    this.#title = new_title;
                    this.dom.title.textContent = this.#title;

                    return true;
                }

            },

            // add or replace class_name to all elements in window
            class  : ( class_name = "" , old_class_name = "", replace = false) => {
                debugger

                if( typeof(class_name) !== "string" ){
                    console.error( "parameter 'class_name' in class function must be 'string' ." );
                }
                else {

                    for(let element in this.dom){

                        if(replace){
                        
                            // remove old class
                            this.dom[element].classList.remove(old_class_name);
                            this.dom[element].classList.add(class_name);
                            
                        }
                        else{
                            this.dom[element].classList.add(class_name);
                        }
                        
                    }

                }

            },

            // set visiblity function used with open & close functions
            visibility : ( is_visible = true ) => {
                
                this.#visible = ( is_visible ? true : false );
                this.dom.window.style.cssText +=  `visibility  : ${ (this.#visible) ? "visible" : "hidden"}`;

            },

            // set public properties at once  
            properties : ( new_public_values = {} ) => {
                
                // loop over all and set as public properties
                for(let name in new_public_values){
                    this[name] = new_public_values[name];
                }

            },
        }

        // object provides all possible needed values public or private 
        this.get = { 
            x : () => {
                return this.#x;
            },

            y : () => {
                return this.#y;
            },

            id : () => {
                return this.#id;
            },

            width : () => {
                return this.#width;
            },

            height : () => {
                return this.#height;
            },

            visibility : () => {
                return this.#visible;
            },
        
            title : () => {
                return this.#title;
            },

            index : () => {
                return this.#index;
            },

            z_index : () => {
                return this.dom.window.style.zIndex;
            },

            // function return object contain a few available "values" 
            values : () => {
                
                // object who gonna take all possible properties  
                let values = {};

                // get all possible properties using all functions in get object
                for( let property in this.get){

                    // if property name is 'all' then "skip it avoiding recursive call"
                    if(property != "all") values[property] = this.get[property]();

                }

                return values;
            },
            
            resize_h : () => {
                return this.#resize_h;
            },

            resize_v : () => {
                return this.#resize_v;
            },
        }

        
        // some important and direct functions

        // when user want to open window
        this.open  = ( call_back_function = null , ...call_back_args ) =>{ 

            // make window visible 'open'
            if(!this.#visible) this.set.visibility(true);

            // call_back_function must be function
            if( typeof(call_back_function) === "function" ) {

                call_back_function(this , ...call_back_args);
            }
            else {
                if( call_back_function != null ) {
                    console.warn("parameter call_back_function must be 'function'");
                }
            }
            
            return this;
        }

        // when user want to close window
        this.close = ( call_back_function = null , ...call_back_args ) =>{

            // make window visible 'open'
            if(this.#visible) this.set.visibility(false);

            if( typeof(call_back_function) === "function" ) {
                call_back_function(this , ...call_back_args);
            }  
            else {
                if( call_back_function != null ) {
                    console.warn("parameter call_back_function must be 'function'");
                }
            }
            
        }



        // *** important process before the end ***
        
        // call build function for building this window
        this.#build(where_to_append , html_template);

    }


}
