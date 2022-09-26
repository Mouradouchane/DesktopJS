
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
            id: null ,

            x: null ,
            y: null ,
            old_x: null ,
            old_y: null ,

            height: null ,
            width: null ,
            old_width: null ,
            old_height: null ,

            visible: null ,
            hide: null ,
            maximize: null ,
            maxi_or_mini: null ,

            title: null ,
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

        },

        
        // function who gonna build window as html
        build_html : ( ) => {
            // debugger
            
            if( this.#private.vars.parent_html ){

                // setup window 
                this.#private.dom.window.classList.add("window");
                this.#private.dom.window.setAttribute("id" , this.#private.vars.id );
                
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
                this.#private.dom.title.textContent = this.#private.title;
                this.#private.dom.title.classList.add("title");
                // append title to title_bar
                this.#private.dom.top_bar.appendChild(
                    this.#private.dom.title
                ); 
                
                // setup buttons "close maximize close" 
                this.#private.dom.buttons.classList.add("buttons");

                // setup hide button
                if(this.#private.dom.hide_button){

                    this.#private.dom.hide_button.classList.add("tb_button");
                    this.#private.dom.hide_button.classList.add("hide");

                    // append hide button to top_bar
                    this.#private.dom.buttons.appendChild(
                        this.#private.dom.hide_button
                    );

                }

                if(this.#private.dom.maximize_button){

                    this.#private.dom.maximize_button.classList.add("tb_button");
                    this.#private.dom.maximize_button.classList.add("maximize");

                    this.#private.dom.buttons.appendChild(
                        this.#private.dom.maximize_button
                    );

                }
                
                if(this.#private.dom.close_button){

                    this.#private.dom.close_button.classList.add("tb_button");
                    this.#private.dom.close_button.classList.add("close");

                    this.#private.dom.buttons.appendChild(
                        this.#private.dom.close_button
                    );

                }
                
                
                // append buttons to top_bar 
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
        build_functionality : ( where_to_append , html_template ) => {

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
            if( !(this.dom.container) || !(this.dom.top_bar) ){
                
                console.error(`[DESKTOPjs] error in window ${this.#private.id} , because missing mandatory element "container" .`);
                console.info(`[DESKTOPjs] in window html template you need to make html element with class "container" .`);
                
                return;
            }

            if( !(this.dom.resize_t) || !(this.dom.resize_b) ){
                if( this.#private.resize_v ){
                    console.error(`[DESKTOPjs] error in window ${this.#private.id} , because "resize_v" option is activated , but there's no html elements for it .`);
                    console.info(`[DESKTOPjs] modifiy your window html template and put two html element with class "resize_vertical" .`)
                }
                if( this.#private.resize_h ){
                    console.error(`[DESKTOPjs] error in window ${this.#private.id} , because "resize_h" option is activated , but there's no html elements for it `);
                    console.info(`[DESKTOPjs] modifiy your window html template and put two html element with class "resize_horizontal" .`)
                } 
                return;
            }
    
            // end of "checks" =========================================================

                    
            // filter no needed elements ===============================================

            // if no needed to minimize button
            if( !(this.#private.hide) ){
                this.dom.minimize.parentNode.removeChild(this.dom.minimize);
                this.dom.minimize = null;
            }
            // if no needed to maximize button
            if( !(this.#private.maximize) ){
                this.dom.maximize.parentNode.removeChild(this.dom.maximize);
                this.dom.maximize = null;
            }
            // if no needed to resize_h
            if( !(this.#private.resize_h) ){
                this.dom.resize_l.parentNode.removeChild(this.dom.resize_l);
                this.dom.resize_r.parentNode.removeChild(this.dom.resize_r);

                this.dom.resize_l = null;
                this.dom.resize_r = null;
            }
            // if no needed to resize_v
            if( !(this.#private.resize_v) ){
                this.dom.resize_t.parentNode.removeChild(this.dom.resize_t);
                this.dom.resize_b.parentNode.removeChild(this.dom.resize_b);
                
                this.dom.resize_t = null;
                this.dom.resize_b = null;
            }
            // if no needed to resize in corners
            if( !this.#private.resize_h || !this.#private.resize_v ){
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
            this.dom.window.setAttribute("id" , this.#private.id);
            this.dom.window.style.cssText +=  `left : ${this.#private.x}px`;
            this.dom.window.style.cssText +=  `top  : ${this.#private.y}px`;
            this.dom.window.style.cssText +=  `width  : ${this.#private.width}px`;
            this.dom.window.style.cssText +=  `height  : ${this.#private.height}px`;
            this.dom.window.style.cssText +=  `visibility  : ${ (this.#private.visible) ? "visible" : "hidden" }`;
            this.dom.window.style.zIndex = this.#private.index;
            window_logic.#max_index += 1;
            
            // window title
            this.dom.title.textContent = this.#private.title;

            // setup window functionalities & events =====================================

            // setup drag/drag_start/drag_end events

            this.dom.top_bar.addEventListener("mousedown" , (e) => {
                e.preventDefault();
                
                // debugger

                // activate drag boolean & miniminze
                this.env.drag.is_window_in_drag = true;

                // this window in drag event need to be in the top of all other windows 
                // set index to the max_index + 1 
                        
                // run only if call_back_function valid function and window not in foucs
                if( typeof(this.env.foucs.call_back_function) == "function" && this.is.foucs() == false ){
                    // call event function
                    this.env.foucs.call_back_function( this , e , ...(this.env.foucs.call_back_args) );
                }

                // check index & update it to max_index if needed
                if(this.#private.index < window_logic.#max_index){
                    window_logic.#max_index += 1;
                    this.dom.window.style.zIndex = window_logic.#max_index;
                }

                // get mouse x & y
                let mouse_x = e.clientX;
                let mouse_y = e.clientY;

    
                // set mousemove event to the document for keep tracking dragged window
                // if drag boolean is activated
                document.onmousemove =  ( e ) => { // in middle of "drag" 
                    e.preventDefault();

                    if( this.env.drag.is_window_in_drag ){ // if window in is really in drag
                    
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
                        if(this.env.drag.in.call_back_function){
                            // run it and pass (window , event , and some optional args)
                            this.env.drag.in.call_back_function( this , e , ...(this.env.drag.in.call_back_args) )
                        } 
                    }
                };
        
                // if there's call_back_function for "drag_start" 
                if(this.env.drag.start.call_back_function){
                    // run it and pass (window , event , and some optional args , if available)
                    this.env.drag.start.call_back_function(this , e , ...(this.env.drag.start.call_back_args) )
                } 

            });

            // when "drag end"
            this.dom.top_bar.addEventListener("mouseup", (e) => {
                // debugger
                // switch to drag off
                this.env.drag.is_window_in_drag  = false;
                
                // drop window
                document.onmousemove = null;

                // if there's call_back_function for "drag_end" 
                if( this.env.drag.end.call_back_function ){
                    // run it and pass (window , event , and some optional args , if available)
                    this.env.drag.end.call_back_function(this , e , ...(this.env.drag.end.call_back_args) )
                } 

            });

            
            // setup foucs event
            this.dom.window.addEventListener("click" , (e) => {
                //debugger
                
                // run only if call_back_function valid & window not in foucs
                if( this.env.foucs.call_back_function && this.is.blur() ){
                    // call event function
                    this.env.foucs.call_back_function( this , e , ...(this.env.foucs.call_back_args) );
                }

                // this window in drag event need to be in the top of all other windows 
                // set index to the max_index + 1 
                if(this.#private.index < window_logic.#max_index){
                    window_logic.#max_index += 1;
                    this.dom.window.style.zIndex = window_logic.#max_index;
                } 
    
                // this.#private.focus = true;
            })


            let maxi_or_mini = () => {
                
                if( this.#private.maxi_or_mini ){
                    this.set.minimize();
                }
                else{
                    this.set.maximize();
                }

            }

            // "maximize minimize" click event on maximize button
            if(this.#private.maximize && this.dom.maximize){
                this.dom.maximize.addEventListener("click" , maxi_or_mini);
            }

            // "maximize minimize" double-click event on top_bar 
            this.dom.top_bar.addEventListener("dblclick" , maxi_or_mini);


            // end of "setup functionalities & events" ========================================



            // append this new window to the current desktop
            if(where_to_append){
            
                if(this.#private.maxi_or_mini) this.set.maximize();
                where_to_append.append(this.dom.window);

            } 
        }


    }
    /*  ********* end of private object ************** */




    constructor(  // needed parameter's to construct a window object
        id = "def" , title = "window" , x = 10, y = 10 , height = 512, width = 512 , 
        hide_button = true , maximize_button = true , close_button = true , icon = true , icon_src ,
        visible = true , resize_in_horizontal = true , resize_in_vertical = true , maximized = false, 
        where_to_append = null 
    ){


        // check & set new values
        this.#private.vars.id        = (typeof(id)    == "string") ? id : "";
        this.#private.vars.title     = (typeof(title) == "string") ? title : "";

        this.#private.vars.x         = (typeof(x) == "number") ? x : 0; 
        this.#private.vars.y         = (typeof(y) == "number") ? y : 0;

        this.#private.vars.height    = (typeof(height) == "number") ? height : 0;
        this.#private.vars.width     = (typeof(width) == "number") ? width : 0;

        this.#private.vars.visible   = visible ? true : false;
        this.#private.vars.icon      = icon ? true : false;
        this.#private.vars.icon_src  = (typeof(icon_src) == "string") ? icon_src : "";

        this.#private.vars.hide_button      = hide_button ? true : false;
        this.#private.vars.maximize_button  = maximize_button ? true : false;
        this.#private.vars.close_button     = close_button ? true : false;

        this.#private.vars.resize_h  = resize_in_horizontal ? true : false;
        this.#private.vars.resize_v  = resize_in_vertical ? true : false;
        this.#private.vars.maxi_or_mini = (maximized) ? true : false;

        this.#private.vars.parent_html = (where_to_append) ? where_to_append : document.body;

        
        // filter no needed elements from this window

        // window 3 buttons close/hide/maximize
        if( !(this.#private.vars.maximize_button) ) this.#private.dom.maximize_button = undefined;
        if( !(this.#private.vars.close_button) ) this.#private.dom.close_button = undefined;
        if( !(this.#private.vars.hide_button) ) this.#private.dom.hide_button = undefined;
        

        // this function will start building window as html at this point
        this.#private.build_html( this.#private.vars.parent_html );
        

        
    /*
        some public stuff must to be outside the public scope/object
        to provide a friendlly experince :)
    */

        // object provide booleans represents the case of object
        this.is  = { 
            
            // for check if this window in drag right now or not  
            in_drag : () => {
                return this.env.drag.is_window_in_drag;
            },

            open : () => {
                return this.#private.visible ;
            },

            close : () => {
                return this.#private.visible ? false : true;
            },

            foucs : () => {
                //debugger

                this.#private.focus = ( this.get.z_index() >= window_logic.#max_index );
                return this.#private.focus;       
            },
            
            blur : () => {     
                return !( this.is.foucs() );         
            },

            maximize : () => {
                return this.#private.maxi_or_mini;
            },

            minimize : () => {
                return !( this.#private.maxi_or_mini );
            }

        }

        // object provide events 
        this.on  = {

            // when drag start
            drag_start : ( call_back_function = null , ...args ) => {
                
                // check if call_back_function parameter is function
                if(typeof(call_back_function) == "function"){
                                    
                    // save call_back_function and it's arguments
                    this.env.drag.start.call_back_function = call_back_function;
                    this.env.drag.start.call_back_args = args;

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
                    this.env.drag.in.call_back_function = call_back_function;
                    this.env.drag.in.call_back_args = args;

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
                    this.env.drag.end.call_back_function = call_back_function;
                    this.env.drag.end.call_back_args = args;

                }
                else{ // mean call_back_function is not function 
                    console.error("[DESKTOPjs] parameter 'call_back_function' must be function");
                }
            },


            foucs : ( call_back_function = null , ...args ) => {

                // call_back_function must be function
                if(typeof(call_back_function) == "function"){
                                    
                    // save call_back_function and it's arguments
                    this.env.foucs.call_back_function = call_back_function;
                    this.env.foucs.call_back_args = args;

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
                    this.env.maximize.call_back_function = call_back_function;
                    this.env.maximize.call_back_args = args;

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
                    this.env.minimize.call_back_function = call_back_function;
                    this.env.minimize.call_back_args = args;

                }
                else{ // mean call_back_function is not function 
                    console.error("[DESKTOPjs] parameter 'call_back_function' must be function");
                }
            }
        }


        // object contain all abilities for modify existing values
        this.set = {

            // set new x value only if "new_x" valid number
            x : ( new_x = 0) => {
                // check
                if( typeof(new_x) == "number"){
                    this.#private.x = new_x; // set new value if it valid
                    this.dom.window.style.left = this.#private.x + "px";
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
                    this.#private.y = new_y;
                    this.dom.window.style.top = this.#private.y + "px";
                    return true;
                }
                else {
                    console.warn("[DESKTOPjs] new_y parameter must be number ");
                    return false;
                }
            },

            // set new width 
            width : ( new_width = 0) => {
                // check value
                if( typeof(new_width) === "number"){

                    this.#private.old_width = this.#private.width;
                    this.#private.width = new_width; // set new value if it valid
                    this.dom.window.style.width = this.#private.width + "px";
                    
                    return true; // confirmation 
                }
                else { // mean invalid value
                    console.warn("[DESKTOPjs] new_x parameter must be number ")
                    return false; // confirmation 
                }
            },
            // set new width 
            height : ( new_height = 0) => {
                // check value
                if( typeof(new_height) === "number"){

                    this.#private.old_height = this.#private.height;
                    this.#private.height = new_height; // set new value if it valid
                    this.dom.window.style.height = this.#private.height + "px";
                    
                    return true; // confirmation 
                }
                else { // mean invalid value
                    console.warn("[DESKTOPjs] new_x parameter must be number ")
                    return false; // confirmation 
                }
            },

            // set new window title 
            title : ( new_title = "" ) => {

                if(typeof(new_title) != "string"){
                    console.error("[DESKTOPjs] new_title parameter must be string ");
                    return false;
                }
                else {
                    this.#private.title = new_title;
                    this.dom.title.textContent = this.#private.title;

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
                
                this.#private.visible = ( is_visible ? true : false );
                this.dom.window.style.cssText +=  `visibility  : ${ (this.#private.visible) ? "visible" : "hidden"}`;

            },

            // set this window top index
            top_index : () => {

                window_logic.#max_index += 1;
                this.dom.window.style.zIndex = window_logic.#max_index;

            },

            // 
            maximize : ( e = null ) => {
                // debugger

                // get task_bar if there's task_bar in desktop
                let task_bar = this.#private.parent_html.querySelector("#private.taskbar");
                
                // save old "x y" and" width height" for minimize later 
                this.#private.old_x = this.#private.x;
                this.#private.old_y = this.#private.y;

                this.#private.old_width  = this.#private.width;
                this.#private.old_height = this.#private.height;
                
                this.dom.window.style.cssText = `
                    top    : 0px;
                    left   : 0px;
                    width  : 100%;
                    height : calc( 100% - ${ Number.parseFloat( (task_bar) ? task_bar.clientHeight : 0 ) }px );
                `;

                // toggle to maximized
                this.#private.maxi_or_mini = true;
                // set top z-index to this window
                this.set.top_index();

                // if there's call_back_function for maximize event , run it
                if( typeof(this.env.maximize.call_back_function) === "function" ){

                    this.env.maximize.call_back_function( this , e , ...this.env.maximize.call_back_args );

                } 
            },

            minimize : ( e = null ) => {
                debugger

                this.#private.width  = this.#private.old_width;
                this.#private.height = this.#private.old_height;
                
                this.dom.window.style.cssText = `
                    top    : ${this.#private.y}px;
                    left   : ${this.#private.x}px;
                    width  : ${this.#private.width}px;
                    height : ${this.#private.height}px;
                `;
 
                // set top z-index to this window
                this.set.top_index();

                // toggle to minimize 
                this.#private.maxi_or_mini = false;
                
                // if there's call_back_function for maximize event , run it
                if( typeof(this.env.minimize.call_back_function) === "function" ){

                    this.env.minimize.call_back_function( this , e , ...this.env.minimize.call_back_args );

                } 

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
                return this.#private.x;
            },

            y : () => {
                return this.#private.y;
            },

            id : () => {
                return this.#private.id;
            },

            width : () => {
                return this.#private.width;
            },

            height : () => {
                return this.#private.height;
            },

            visibility : () => {
                return this.#private.visible;
            },
        
            title : () => {
                return this.#private.title;
            },

            index : () => {
                return this.#private.index;
            },

            z_index : () => {
                return Number.parseInt(this.dom.window.style.zIndex);
            },

            // function return object contain all private "values" 
            private_values : () => {
                // make copy using json  
                return JSON.parse(JSON.stringify(this.#private));
            },
            
            resize_h : () => {
                return this.#private.resize_h;
            },

            resize_v : () => {
                return this.#private.resize_v;
            },
        }



        // when user want to open window
        this.open  = ( call_back_function = null , ...call_back_args ) =>{ 

            // make window visible 'open'
            if(!this.#private.visible) this.set.visibility(true);

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
            if(this.#private.visible) this.set.visibility(false);

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
        this.#private.build_functionality(where_to_append , html_template);

    }

}