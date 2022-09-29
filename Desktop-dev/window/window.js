
// DesktopJS library :)

/*  
    ******************************
            window class  
    ******************************
    window class/moduel contain the hole source code of window :

    - window variables 
    - window HTML Build
    - window events
    - window elements events 
    - attributes get/set

    feel free to using it :)
*/


export class window{


    /*  
        *********************************
        static area , where some vars for 
        *********************************
    */

    // windows index's for dealing with window : drag drop foucs blur ... 
    static #index = 0;
    static #max_index = 0;

    // function convert STRING TEMPLATE to HTML OBJECT
    static #template_to_HTML( window_html_as_string = "" ) {
        
        try{ // convert

            let parser = new DOMParser();
            let dom    = parser.parseFromString( window_html_as_string , 'text/html');
            // first Elements it's main element it's self
            return dom.body.firstElementChild;

        }
        catch(err) { // in case any error happen 

            console.error(`[DESKTOPjs] parsing html error : ${err} .`);
            throw null;
            
        }

    }

    /*  ********* end of static area ************** */




    /*  
        *************************
        public scope as "object"
        *************************
        - where all public stuff should be
    */
    public = {

        
    }



    /*  ********* end of public object ************** */





    /*  
        *************************
        private scope as "object"
        *************************
        - where all private stuff should be

    */
    #private = {

        // store all private variables here
        vars : {
            parent_html : undefined,
            title: null ,
            id: null ,

            x: 0 ,
            y: 0 ,
            old_x: 0 ,
            old_y: 0 ,

            height: 0 ,
            width: 0 ,
            old_width: 0 ,
            old_height: 0 ,

            visible: null ,

            hide_allowed: null ,
            maximize_allowed: true ,
            close_allowed: true ,

            maximize_button: true,
            close_button:true,
            hide_button:true,

            maxi_or_mini: null ,

            resize_h: null ,
            resize_v: null ,

            focus: true,
            index: window.#index += 1,
            
            parent_html: null,
        },

        // window html elements should be here
        dom : {
            window : document.createElement("div"),
            icon : document.createElement("img"),
            title : document.createElement("p"),
            top_bar : document.createElement("div"),
            buttons : document.createElement("div"),
            hide_button : document.createElement("div"),
            maximize_button : document.createElement("div"),
            close_button : document.createElement("div"),
            container : document.createElement("div"),
            resize_t : document.createElement("div"),
            resize_b : document.createElement("div"),
            resize_l : document.createElement("div"),
            resize_r : document.createElement("div"),
            resize_tr : document.createElement("div"),
            resize_tl : document.createElement("div"),
            resize_br : document.createElement("div"),
            resize_bl : document.createElement("div"),
        },

        // css of the elements should be here
        css : {
            window : null,
            title : null,
            icon : null,
            top_bar : null,
            buttons : null,
            hide_button : null,
            maximize_button : null,
            close_button : null,
            resize_h : null,
            resize_v : null,
            full_body : null,
        },

        // sitting and callback's functions for the events should be here 
        env : {
            
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

            close : {
                call_back_function : null,
                call_back_args : [],
            },

            open : {
                call_back_function : null,
                call_back_args : [],
            },
        },

        
        // function who gonna build window as html
        build_html : ( ) => {
            // debugger
            
            if( this.#private.vars.parent_html ){

            // setup window
                this.#private.dom.window.classList.add("window");
                this.#private.dom.window.setAttribute("id" , this.#private.vars.id );
                
            // window attributes and properties 
                this.#private.dom.window.setAttribute("id" , this.#private.vars.id);
                this.#private.dom.window.style.cssText +=  `left : ${this.#private.vars.x}px`;
                this.#private.dom.window.style.cssText +=  `top  : ${this.#private.vars.y}px`;
                this.#private.dom.window.style.cssText +=  `width  : ${this.#private.vars.width}px`;
                this.#private.dom.window.style.cssText +=  `height  : ${this.#private.vars.height}px`;
                this.#private.dom.window.style.cssText +=  `visibility  : ${ (this.#private.vars.visible) ? "visible" : "hidden" }`;
                this.#private.dom.window.style.zIndex = this.#private.vars.index;
                window.#max_index += 1;


                // setup mandatory elements attrs
                this.#private.dom.top_bar.classList.add("top_bar");
                // add drag cursor effect to top_bar
                this.#private.dom.top_bar.style.cursor = "move"; 

                this.#private.dom.container.classList.add("container");

                // setup icon if needed
                if(this.#private.vars.icon){

                    this.#private.dom.icon.src = this.#private.vars.icon_src;
                    this.#private.dom.icon.classList.add("icon");

                    // append icon to top_bar
                    this.#private.dom.top_bar.appendChild(
                        this.#private.dom.icon
                    );

                }

            // setup title                            
                this.#private.dom.title.textContent = this.#private.vars.title;
                this.#private.dom.title.classList.add("title");
            // append title to title_bar
                this.#private.dom.top_bar.appendChild(
                    this.#private.dom.title
                ); 
            
                
        
            /*
                filter/setup buttons "close maximize close" 
            */
            
                this.#private.dom.buttons.classList.add("buttons");
            
            // setup close button
                if( !(this.#private.vars.close_button) ) {
                this.#private.dom.close_button = undefined;     
                this.#private.vars.close_allowed = undefined;     
                }
                else {
                    // setup button
                    this.#private.dom.close_button.classList.add("tb_button");
                    this.#private.dom.close_button.classList.add("close");

                    // append close_button to top_bar
                    this.#private.dom.buttons.appendChild(
                        this.#private.dom.close_button
                    );
                }
            
            // setup maximize button
                if( !(this.#private.vars.maximize_button) ){
                    this.#private.dom.maximize_button = undefined;
                    this.#private.vars.maximize_allowed = false;
                } 
                else{
                    // setup button
                    this.#private.vars.maximize_allowed = true;
                    this.#private.dom.maximize_button.classList.add("tb_button");
                    this.#private.dom.maximize_button.classList.add("maximize");

                    // append maximize_button to top_bar
                    this.#private.dom.buttons.appendChild(
                        this.#private.dom.maximize_button
                    );
                }
                        
            // setup hide button
                if( !(this.#private.vars.hide_button) ){
                    this.#private.dom.hide_button = undefined;
                    this.#private.vars.hide_allowed = false;
                } 
                else{
                    // setup button
                    this.#private.vars.hide_allowed = true;
                    this.#private.dom.hide_button.classList.add("tb_button");
                    this.#private.dom.hide_button.classList.add("hide");

                    // append hide_button to top_bar
                    this.#private.dom.buttons.appendChild(
                        this.#private.dom.hide_button
                    );

                }

 
          
                
            // append buttons container to top_bar 
                this.#private.dom.top_bar.appendChild(
                    this.#private.dom.buttons
                );

            // append top_bar to window
                this.#private.dom.window.appendChild(
                    this.#private.dom.top_bar
                );
                
            // append container to window
                this.#private.dom.window.appendChild(
                    this.#private.dom.container
                );

                // setup resize in height 
                this.#private.dom.resize_t.classList.add("resize_vertical","resize_top","resize");
                this.#private.dom.resize_b.classList.add("resize_vertical","resize_down","resize");

                this.#private.dom.window.appendChild(
                    this.#private.dom.resize_t
                );

                this.#private.dom.window.appendChild(
                    this.#private.dom.resize_b
                );

                
                // setup resize
                this.#private.dom.resize_l.classList.add("resize","resize_horizontal","resize_left");
                this.#private.dom.resize_r.classList.add("resize","resize_horizontal","resize_right");
                    
                this.#private.dom.window.appendChild(
                    this.#private.dom.resize_l
                );

                this.#private.dom.window.appendChild(
                    this.#private.dom.resize_r
                );
                
                if( !(this.#private.vars.resize_h) ){
                    this.#private.dom.resize_t.style.cursor = "default";
                    this.#private.dom.resize_b.style.cursor = "default";
                }

                if( !(this.#private.vars.resize_v) ){
                    this.#private.dom.resize_l.style.cursor = "default";
                    this.#private.dom.resize_r.style.cursor = "default";
                }

                // setup h & w resize elements
                
                this.#private.dom.resize_tl.classList.add("resize","resize_corner","resize_tl");
                this.#private.dom.resize_tr.classList.add("resize","resize_corner","resize_tr");
                this.#private.dom.resize_bl.classList.add("resize","resize_corner","resize_bl");
                this.#private.dom.resize_br.classList.add("resize","resize_corner","resize_br");

                this.#private.dom.window.appendChild(
                    this.#private.dom.resize_tl
                );

                this.#private.dom.window.appendChild(
                    this.#private.dom.resize_bl
                );

                this.#private.dom.window.appendChild(
                    this.#private.dom.resize_tr
                );
                
                this.#private.dom.window.appendChild(
                    this.#private.dom.resize_br
                );

                if( !(this.#private.vars.resize_h) || !(this.#private.vars.resize_v) ){
                    this.#private.dom.resize_tl.style.cursor = "default";
                    this.#private.dom.resize_tr.style.cursor = "default";
                    this.#private.dom.resize_bl.style.cursor = "default";
                    this.#private.dom.resize_br.style.cursor = "default";
                }

                this.#private.vars.parent_html.appendChild( this.#private.dom.window );
        
                return true;
            }
            else return false;
        },

        // function who gonna setup logic/functionality at the window
        build_functionality : ( ) => {
     

            // setup window functionalities & events =====================================

            
            // when drag start
            this.#private.dom.top_bar.addEventListener("mousedown" , (e) => {
                e.preventDefault();
                
                // debugger

                // activate drag boolean & miniminze
                this.#private.env.drag.is_window_in_drag = true;

                // this window in drag event need to be in the top of all other windows 
                // set index to the max_index + 1 
                        
                // run only if call_back_function valid function and window not in foucs
                if( typeof(this.#private.env.foucs.call_back_function) == "function" && this.is.foucs() == false ){
                    // call event function
                    this.#private.env.foucs.call_back_function( this , e , ...(this.#private.env.foucs.call_back_args) );
                }

                // check index & update it to max_index if needed
                if(this.#private.vars.index < window.#max_index){
                    window.#max_index += 1;
                    this.#private.dom.window.style.zIndex = window.#max_index;
                }

                // get mouse x & y
                let mouse_x = e.clientX;
                let mouse_y = e.clientY;

                
                // when window in drag 
                document.onmousemove =  ( e ) => { 
                    // debugger
                    e.preventDefault();
                    
                    if( this.#private.env.drag.is_window_in_drag ){ // if window in is really in drag
                    
                        // calculate the new mouse position
                        let new_mouse_x = mouse_x - e.clientX;
                        let new_mouse_y = mouse_y - e.clientY;
                        
                        // save current mouse x y 
                        mouse_x = e.clientX;
                        mouse_y = e.clientY;
                        
                        // set new x and y to the window using setter function x and y in window.set
                        this.set.width( this.#private.vars.old_width );
                        this.set.height( this.#private.vars.old_height );
                        this.set.x( mouse_x - (this.#private.vars.width/2));
                        this.set.y( this.#private.vars.y - new_mouse_y );

                        // if there's call_back_function for "drag" 
                        if(this.#private.env.drag.in.call_back_function){
                            // run it and pass (window , event , and some optional args)
                            this.#private.env.drag.in.call_back_function( this , e , ...(this.#private.env.drag.in.call_back_args) )
                        }

                    }

                };
        
                // if there's call_back_function for "drag_start" 
                if(this.#private.env.drag.start.call_back_function){
                    // run it and pass (window , event , and some optional args , if available)
                    this.#private.env.drag.start.call_back_function(this , e , ...(this.#private.env.drag.start.call_back_args) )
                } 

            });

            // when drag end
            this.#private.dom.top_bar.addEventListener("mouseup", (e) => {
                // debugger
                // switch to drag off
                this.#private.env.drag.is_window_in_drag  = false;
                
                // drop window
                document.onmousemove = null;

                // if there's call_back_function for "drag_end" 
                if( this.#private.env.drag.end.call_back_function ){
                    // run it and pass (window , event , and some optional args , if available)
                    this.#private.env.drag.end.call_back_function(this , e , ...(this.#private.env.drag.end.call_back_args) )
                } 

            });

            
            // setup foucs event
            this.#private.dom.window.addEventListener("click" , (e) => {
                //debugger
                
                // run only if call_back_function valid & window not in foucs
                if( this.#private.env.foucs.call_back_function && this.is.blur() ){
                    // call event function
                    this.#private.env.foucs.call_back_function( this , e , ...(this.#private.env.foucs.call_back_args) );
                }

                // this window in drag event need to be in the top of all other windows 
                // set index to the max_index + 1 
                if(this.#private.vars.index < window.#max_index){
                    window.#max_index += 1;
                    this.#private.dom.window.style.zIndex = window.#max_index;
                } 
    
                // this.#private.focus = true;
            })


            let maximize_or_minimize = () => {
                // debugger

                if( this.#private.vars.maxi_or_mini ){
                    this.set.minimize();
                }
                else{
                    this.set.maximize();
                }

            }

            // "maximize minimize" click event on maximize button
            if(this.#private.vars.maximize_allowed && this.#private.dom.maximize_button){

                // set function to maximize button 
                this.#private.dom.maximize_button.addEventListener("click" , maximize_or_minimize);
                
                // set function to top_bar
                this.#private.dom.top_bar.addEventListener("dblclick" , maximize_or_minimize);

            }


            // end of "setup functionalities & events" ========================================

        }


    }
    /*  ********* end of private object ************** */




    constructor(  // needed parameter's to construct a window object
        id = "def" , title = "window" , 
        x = 10, y = 10 , 
        height = 512, width = 512 , 
        hide_button = true , maximize_button = true , close_button = true , 
        icon = true , icon_src = "",
        resize_in_horizontal = true , resize_in_vertical = true , where_to_append = null 
    ){
        //debugger

        // check & set new values
        this.#private.vars.id        = (typeof(id)    == "string") ? id : "";
        this.#private.vars.title     = (typeof(title) == "string") ? title : "";

        this.#private.vars.x         = (typeof(x) == "number") ? x : 0; 
        this.#private.vars.y         = (typeof(y) == "number") ? y : 0;

        this.#private.vars.height    = (typeof(height) == "number") ? height : 0;
        this.#private.vars.width     = (typeof(width) == "number") ? width : 0;

        this.#private.vars.visible   = false;
        this.#private.vars.icon      = icon ? true : false;
        this.#private.vars.icon_src  = (typeof(icon_src) == "string") ? icon_src : "";

        this.#private.vars.hide_button      = hide_button ? true : false;
        this.#private.vars.maximize_button  = maximize_button ? true : false;
        this.#private.vars.close_button     = close_button ? true : false;

        this.#private.vars.resize_h  = resize_in_horizontal ? true : false;
        this.#private.vars.resize_v  = resize_in_vertical ? true : false;
        this.#private.vars.maxi_or_mini = false;

        this.#private.vars.parent_html = (where_to_append) ? where_to_append : document.body;


        // this function will start building window as html at this point
        this.#private.build_html( );
        

        
    /*
        some public stuff must to be outside the public scope/object
        to provide a friendlly experince :)
    */

        // object provide booleans represents the case of object
        this.is  = { 
            
            // for check if this window in drag right now or not  
            in_drag : () => {
                return this.#private.env.drag.is_window_in_drag;
            },

            open : () => {
                return this.#private.vars.visible ;
            },

            close : () => {
                return this.#private.vars.visible ? false : true;
            },

            foucs : () => {
                //debugger

                this.#private.vars.focus = ( this.get.z_index() >= window.#max_index );
                return this.#private.vars.focus;       
            },
            
            blur : () => {     
                return !( this.is.foucs() );         
            },

            maximize : () => {
                return this.#private.vars.maxi_or_mini;
            },

            minimize : () => {
                return !( this.#private.vars.maxi_or_mini );
            }

        }

        // object provide events 
        this.on  = {

            // when drag start
            drag_start : ( call_back_function = null , ...args ) => {
                
                // check if call_back_function parameter is function
                if(typeof(call_back_function) == "function"){
                                    
                    // save call_back_function and it's arguments
                    this.#private.env.drag.start.call_back_function = call_back_function;
                    this.#private.env.drag.start.call_back_args = args;

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
                    this.#private.env.drag.in.call_back_function = call_back_function;
                    this.#private.env.drag.in.call_back_args = args;

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
                    this.#private.env.drag.end.call_back_function = call_back_function;
                    this.#private.env.drag.end.call_back_args = args;

                }
                else{ // mean call_back_function is not function 
                    console.error("[DESKTOPjs] parameter 'call_back_function' must be function");
                }
            },


            foucs : ( call_back_function = null , ...args ) => {

                // call_back_function must be function
                if(typeof(call_back_function) == "function"){
                                    
                    // save call_back_function and it's arguments
                    this.#private.env.foucs.call_back_function = call_back_function;
                    this.#private.env.foucs.call_back_args = args;

                }
                else{ // mean call_back_function is not function 
                    console.error("[DESKTOPjs] parameter 'call_back_function' must be function");
                }
            },

            
            close : ( call_back_function = null , ...args ) => {

                // call_back_function must be function
                if(typeof(call_back_function) == "function"){
                                                                    
                    // save call_back_function and it's arguments
                    this.#private.env.close.call_back_function = call_back_function;
                    this.#private.env.close.call_back_args = args;

                }
                else{ // mean call_back_function is not function 
                    console.error("[DESKTOPjs] parameter 'call_back_function' must be function");
                }

            },

            open : ( call_back_function = null , ...args ) => {

                // call_back_function must be function
                if(typeof(call_back_function) == "function"){
                                                                    
                    // save call_back_function and it's arguments
                    this.#private.env.open.call_back_function = call_back_function;
                    this.#private.env.open.call_back_args = args;

                }
                else{ // mean call_back_function is not function 
                    console.error("[DESKTOPjs] parameter 'call_back_function' must be function");
                }

            },

            // ============ need work ============
            maximize : ( call_back_function = null , ...args ) => {

                // call_back_function must be function
                if(typeof(call_back_function) == "function"){
                                                    
                    // save call_back_function and it's arguments
                    this.#private.env.maximize.call_back_function = call_back_function;
                    this.#private.env.maximize.call_back_args = args;

                }
                else{ // mean call_back_function is not function 
                    console.error("[DESKTOPjs] parameter 'call_back_function' must be function");
                }

            },


            // ============ need work ============
            minimize : ( call_back_function = null , ...args ) => {

                // call_back_function must be function
                if(typeof(call_back_function) == "function"){
                                                                    
                    // save call_back_function and it's arguments
                    this.#private.env.minimize.call_back_function = call_back_function;
                    this.#private.env.minimize.call_back_args = args;

                }
                else{ // mean call_back_function is not function 
                    console.error("[DESKTOPjs] parameter 'call_back_function' must be function");
                }
            }

            
        }


        // object contain all abilities for modify existing values
        this.set = {

            // set new x value only if "new_x" valid number
            x : ( new_x = 0 ) => {

                // check
                if( typeof(new_x) == "number" ){
                    this.#private.vars.x = new_x; // set new value if it valid
                    this.#private.dom.window.style.left = this.#private.vars.x + "px";
                    return true; 
                }
                else { // mean invalid value
                    console.warn("[DESKTOPjs] new_x parameter must be number ")
                    return false; 
                }

            },

            // like x() function
            y : ( new_y = 0 ) => {

                if( typeof(new_y) == "number" ){
                    this.#private.vars.y = new_y;
                    this.#private.dom.window.style.top = this.#private.vars.y + "px";
                    return true;
                }
                else {
                    console.warn("[DESKTOPjs] new_y parameter must be number ");
                    return false;
                }

            },

            // set new width 
            width : ( new_width = 0 ) => {
                // debugger
                // check value
                if( typeof(new_width) === "number" ){

                    this.#private.vars.old_width = this.#private.vars.width;
                    this.#private.vars.width = new_width;
                    this.#private.dom.window.style.width = this.#private.vars.width + "px";
                    
                    return true; 
                }
                else { // mean invalid value
                    console.warn("[DESKTOPjs] new_x parameter must be number ")
                    return false; 
                }

            },

            // set new width 
            height : ( new_height = 0 ) => {

                // check value
                if( typeof(new_height) === "number" ){

                    this.#private.vars.old_height = this.#private.vars.height;
                    this.#private.vars.height = new_height;
                    this.#private.dom.window.style.height = this.#private.vars.height + "px";
                    
                    return true;
                }
                else { // mean invalid value
                    console.warn("[DESKTOPjs] new_x parameter must be number ")
                    return false; 
                }

            },

            // set new window title 
            title : ( new_title = "" ) => {

                if(typeof(new_title) !== "string"){
                    console.error("[DESKTOPjs] new_title parameter must be string ");
                    return false;
                }
                else {
                    this.#private.vars.title = new_title;
                    this.#private.dom.title.textContent = this.#private.vars.title;

                    return true;
                }

            },

            // add or replace class_name to all elements in window
            class  : ( class_name = "" , old_class_name = "", replace = false) => {
                // debugger

                if( typeof(class_name) !== "string" ){
                    console.error( "parameter 'class_name' in class function must be 'string' ." );
                }
                else {

                    for(let element in this.#private.dom){

                        if(replace){
                        
                            // remove old class
                            this.#private.dom[element].classList.remove(old_class_name);
                            this.#private.dom[element].classList.add(class_name);
                            
                        }
                        else{
                            this.#private.dom[element].classList.add(class_name);
                        }
                        
                    }

                }

            },

            // set visiblity function used with open & close functions
            visibility : ( is_visible = true ) => {
                
                this.#private.vars.visible = ( is_visible ? true : false );
                this.#private.dom.window.style.visibility =  (this.#private.vars.visible) ? "visible" : "hidden";

            },

            // set this window top index
            top_index : () => {

                window.#max_index += 1;
                this.#private.dom.window.style.zIndex = window.#max_index;

            },

            // 
            maximize : ( e = null ) => {
                // debugger
                
                // get task_bar if there's task_bar in desktop
                let task_bar = this.#private.vars.parent_html.querySelector("#desktop_taskbar");
                
                // save old "x y" and" width height" for minimize later 
                this.#private.vars.old_x = this.#private.vars.x;
                this.#private.vars.old_y = this.#private.vars.y;

                this.#private.vars.old_width  = this.#private.vars.width;
                this.#private.vars.old_height = this.#private.vars.height;
                
                this.#private.dom.window.style.top    = "0px";
                this.#private.dom.window.style.left   = "0px";
                this.#private.dom.window.style.width  = "100%";
                this.#private.dom.window.style.height = `calc(100% - ${ task_bar.clientHeight }px)`;

                // toggle to maximized
                this.#private.vars.maxi_or_mini = true;
                // set top z-index to this window
                this.set.top_index();

                // if there's call_back_function for maximize event , run it
                if( typeof(this.#private.env.maximize.call_back_function) === "function" ){

                    this.#private.env.maximize.call_back_function( this , e , ...this.#private.env.maximize.call_back_args );

                } 
            },

            minimize : ( e = null ) => {
                // debugger

                this.#private.vars.width  = this.#private.vars.old_width;
                this.#private.vars.height = this.#private.vars.old_height;
                
                this.#private.dom.window.style.top    = `${this.#private.vars.y}px`;
                this.#private.dom.window.style.left   = `${this.#private.vars.x}px`;
                this.#private.dom.window.style.width  = `${this.#private.vars.width}px`;
                this.#private.dom.window.style.height = `${this.#private.vars.height}px`;


                // set top z-index to this window
                this.set.top_index();

                // toggle to minimize 
                this.#private.vars.maxi_or_mini = false;
                
                // if there's call_back_function for maximize event , run it
                if( typeof(this.#private.env.minimize.call_back_function) === "function" ){

                    this.#private.env.minimize.call_back_function( this , e , ...this.#private.env.minimize.call_back_args );

                } 

            },

            // set public properties at once  
            properties : ( new_public_values = {} ) => {
                
                // loop over all and set as public properties
                for(let name in new_public_values){
                    this.public[name] = new_public_values[name];
                }

            },
        }


        // object provides all possible needed values public or private 
        this.get = { 
            x : () => {
                return this.#private.vars.x;
            },

            y : () => {
                return this.#private.vars.y;
            },

            id : () => {
                return this.#private.vars.id;
            },

            width : () => {
                return this.#private.vars.width;
            },

            height : () => {
                return this.#private.vars.height;
            },

            visibility : () => {
                return this.#private.vars.visible;
            },
        
            title : () => {
                return this.#private.vars.title;
            },

            index : () => {
                return this.#private.vars.index;
            },

            z_index : () => {
                return Number.parseInt(this.#private.dom.window.style.zIndex);
            },

            // function return object contain all private "values" 
            private_values : () => {
                // make copy using json  
                return JSON.parse(JSON.stringify(this.#private));
            },
            
            resize_h : () => {
                return this.#private.vars.resize_h;
            },

            resize_v : () => {
                return this.#private.vars.resize_v;
            },
        }


        // when user want to open window
        this.open  = ( call_back_function = null , ...call_back_args ) =>{ 
            // debugger
            
            // make window visible 'open'
            this.set.visibility(true);

            
            if( typeof(this.#private.env.open.call_back_function) === "function"){
                this.#private.env.open.call_back_function(
                    this , ...(this.#private.env.open.call_back_args)
                )
            }
            
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
            this.set.visibility(false);

            if( typeof(this.#private.env.close.call_back_function) === "function"){
                this.#private.env.close.call_back_function(
                    this , ...(this.#private.env.close.call_back_args)
                )
            }

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
        this.#private.build_functionality(  );

    }

}