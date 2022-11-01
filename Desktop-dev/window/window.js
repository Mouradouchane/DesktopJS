
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
        static memebers
        *********************************
    */

    // windows index's for dealing with window : drag drop foucs blur ... 
    static #index = 0;
    static #max_index = 0;
    static #min_size = 40;

    /*  ********* end of static area ************** */




    /*  
        *****************************
            some public memebers
        *****************************
    */

    // dom object : store window elements "dom objects"
    dom = {

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

    }

    // css object : store window elements "css objects" 
    css = {

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

    }

    /*  ********************** */





    /*  
        *************************
            private scope 
        *************************
    */
    #private = {

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

        borders_index : 2,
        container_index : 1,

        parent_html: null,


        /*

            events : object for storing all "callback's and arg's"

            when programmer use window event pass call_back function and arguments
            we saving it here in events object to using it later when event happend
        */
        events : {
            
            // drag event's 
            drag : {

                is_window_in_drag : false,

                // when drag start
                start : {
                    call_back_function : null,
                    call_back_args : [],
                },
                
                // when drag in 
                in : {
                    call_back_function : null,
                    call_back_args : [],
                },

                // when drag end 
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

            // all resize events callback's & arg's 
            resize : {

                // resize event in general
                all : {
                    call_back_function : null,
                    call_back_args : [],
                },

                // only when resize in left 
                left : {
                    call_back_function : null,
                    call_back_args : [],
                },

                // only when resize in right 
                right : {
                    call_back_function : null,
                    call_back_args : [],
                },

                // only when resize in top 
                top : {
                    call_back_function : null,
                    call_back_args : [],
                },

                // only when resize in bottom 
                bottom : {
                    call_back_function : null,
                    call_back_args : [],
                },

                // only when resize in top + left
                top_left : {
                    call_back_function : null,
                    call_back_args : [],
                },

                // only when resize in top + right 
                top_right : {
                    call_back_function : null,
                    call_back_args : [],
                },

                // only when resize in bottom + left
                bottom_left : {
                    call_back_function : null,
                    call_back_args : [],
                },

                // only when resize in bottom + right
                bottom_right : {
                    call_back_function : null,
                    call_back_args : [],
                },

            }


        }, 
        // end of events object

        
        // function who gonna build window as html
        build_html : ( ) => {
            // debugger
            
            if( this.#private.parent_html ){

            // setup window
                this.dom.window.classList.add("window");
                this.dom.window.setAttribute("id" , this.#private.id );
                
            // window attributes and properties 
                this.dom.window.setAttribute("id" , this.#private.id);
                this.dom.window.style.cssText +=  `left : ${this.#private.x}px`;
                this.dom.window.style.cssText +=  `top  : ${this.#private.y}px`;
                this.dom.window.style.cssText +=  `width  : ${this.#private.width}px`;
                this.dom.window.style.cssText +=  `height  : ${this.#private.height}px`;
                this.dom.window.style.cssText +=  `visibility  : ${ (this.#private.visible) ? "visible" : "hidden" }`;
                this.dom.window.style.zIndex = this.#private.index;
                window.#max_index += 1;


                // setup mandatory elements attrs
                this.dom.top_bar.classList.add("top_bar");
                // add drag cursor effect to top_bar
                this.dom.top_bar.style.cursor = "grab"; 

                this.dom.container.classList.add("container");

                // setup icon if needed
                if(this.#private.icon){

                    this.dom.icon.src = this.#private.icon_src;
                    this.dom.icon.classList.add("icon");

                    // append icon to top_bar
                    this.dom.top_bar.appendChild(
                        this.dom.icon
                    );

                }

            // setup title                            
                this.dom.title.textContent = this.#private.title;
                this.dom.title.classList.add("title");
            // append title to title_bar
                this.dom.top_bar.appendChild(
                    this.dom.title
                ); 
            
                
        
            /*
                filter/setup buttons "close maximize close" 
            */
            
                this.dom.buttons.classList.add("buttons");
            
            // setup close button
                if( !(this.#private.close_button) ) {
                this.dom.close_button = undefined;     
                this.#private.close_allowed = undefined;     
                }
                else {
                    // setup button
                    this.dom.close_button.classList.add("tb_button");
                    this.dom.close_button.classList.add("close");

                    // append close_button to top_bar
                    this.dom.buttons.appendChild(
                        this.dom.close_button
                    );
                }
            
            // setup maximize button
                if( !(this.#private.maximize_button) ){
                    this.dom.maximize_button = undefined;
                    this.#private.maximize_allowed = false;
                } 
                else{
                    // setup button
                    this.#private.maximize_allowed = true;
                    this.dom.maximize_button.classList.add("tb_button");
                    this.dom.maximize_button.classList.add("maximize");

                    // append maximize_button to top_bar
                    this.dom.buttons.appendChild(
                        this.dom.maximize_button
                    );
                }
                        
            // setup hide button
                if( !(this.#private.hide_button) ){
                    this.dom.hide_button = undefined;
                    this.#private.hide_allowed = false;
                } 
                else{
                    // setup button
                    this.#private.hide_allowed = true;
                    this.dom.hide_button.classList.add("tb_button");
                    this.dom.hide_button.classList.add("hide");

                    // append hide_button to top_bar
                    this.dom.buttons.appendChild(
                        this.dom.hide_button
                    );

                }

 
          
                
            // append buttons container to top_bar 
                this.dom.top_bar.appendChild(
                    this.dom.buttons
                );

            // append top_bar to window
                this.dom.window.appendChild(
                    this.dom.top_bar
                );
            
            // setup container
                this.dom.container.style.zIndex = this.#private.container_index;

            // append container to window
                this.dom.window.appendChild(
                    this.dom.container
                );

                // setup resize in height 
                this.dom.resize_t.classList.add("resize_vertical","resize_top","resize");
                this.dom.resize_t.style.zIndex = this.#private.borders_index;
                
                this.dom.resize_b.classList.add("resize_vertical","resize_down","resize");
                this.dom.resize_b.style.zIndex = this.#private.borders_index;

                this.dom.window.appendChild(
                    this.dom.resize_t
                );

                this.dom.window.appendChild(
                    this.dom.resize_b
                );

                
                // setup resize
                this.dom.resize_l.classList.add("resize","resize_horizontal","resize_left");
                this.dom.resize_l.style.zIndex = this.#private.borders_index;

                this.dom.resize_r.classList.add("resize","resize_horizontal","resize_right");
                this.dom.resize_r.style.zIndex = this.#private.borders_index;
                    
                this.dom.window.appendChild(
                    this.dom.resize_l
                );

                this.dom.window.appendChild(
                    this.dom.resize_r
                );
                

                if( this.#private.resize_v ){
                    this.dom.resize_t.style.cursor = "n-resize";
                    this.dom.resize_b.style.cursor = "n-resize";
                }

                if( this.#private.resize_h ){
                    this.dom.resize_l.style.cursor = "w-resize";
                    this.dom.resize_r.style.cursor = "w-resize";
                }

                // setup h & w resize elements
                
                this.dom.resize_tl.classList.add("resize","resize_corner","resize_tl");
                this.dom.resize_tr.classList.add("resize","resize_corner","resize_tr");
                this.dom.resize_bl.classList.add("resize","resize_corner","resize_bl");
                this.dom.resize_br.classList.add("resize","resize_corner","resize_br");

                this.dom.resize_tl.style.zIndex = this.#private.borders_index;
                this.dom.resize_tr.style.zIndex = this.#private.borders_index;
                this.dom.resize_bl.style.zIndex = this.#private.borders_index;
                this.dom.resize_br.style.zIndex = this.#private.borders_index;


                this.dom.window.appendChild(
                    this.dom.resize_tl
                );

                this.dom.window.appendChild(
                    this.dom.resize_bl
                );

                this.dom.window.appendChild(
                    this.dom.resize_tr
                );
                
                this.dom.window.appendChild(
                    this.dom.resize_br
                );

                if( this.#private.resize_h && this.#private.resize_v ){
                    this.dom.resize_tl.style.cursor = "se-resize";
                    this.dom.resize_tr.style.cursor = "ne-resize";
                    this.dom.resize_bl.style.cursor = "ne-resize";
                    this.dom.resize_br.style.cursor = "se-resize";
                }

                this.#private.parent_html.appendChild( this.dom.window );
        
                return true;
            }
            else return false;
        },

        // function who gonna setup logic/functionality at the window
        build_functionality : ( ) => {
     

            // setup window functionalities & events =====================================

            
            // when drag start
            this.dom.top_bar.addEventListener("mousedown" , (e) => {
                // debugger
                e.preventDefault();
                
                // activate drag boolean & miniminze
                this.#private.events.drag.is_window_in_drag = true;
                this.dom.top_bar.style.cursor = "grabbing"; 
                
                // this window in drag event need to be in the top of all other windows 
                // set index to the max_index + 1 
                        
                // run only if call_back_function valid function and window not in foucs
                if( typeof(this.#private.events.foucs.call_back_function) == "function" && this.is.foucs() == false ){
                    // call event function
                    this.#private.events.foucs.call_back_function( this , e , ...(this.#private.events.foucs.call_back_args) );
                }

                // check index & update it to max_index if needed
                if(this.#private.index < window.#max_index){
                    window.#max_index += 1;
                    this.dom.window.style.zIndex = window.#max_index;
                }

                // get mouse x & y
                let mouse_x = e.clientX;
                let mouse_y = e.clientY;

                let dist_x = mouse_x - this.#private.x;
                let dist_y = (this.dom.top_bar.clientHeight/2);

                // when window in drag 
                document.onmousemove =  ( e ) => { 
                    // debugger
                    e.preventDefault();
                    minimize_css();
                    
                    this.#private.maxi_or_mini = false;

                    if( this.#private.events.drag.is_window_in_drag ){ // if window in is really in drag
                    
                        // save current mouse x y 
                        mouse_x = e.clientX;
                        mouse_y = e.clientY;
                        
                        this.set.x( mouse_x - dist_x );
                        this.set.y( mouse_y - dist_y ); 

                        // if there's call_back_function for "drag" 
                        if(this.#private.events.drag.in.call_back_function){
                            // run it and pass (window , event , and some optional args)
                            this.#private.events.drag.in.call_back_function( this , e , ...(this.#private.events.drag.in.call_back_args) )
                        }

                    }

                };
        
                // if there's call_back_function for "drag_start" 
                if(this.#private.events.drag.start.call_back_function){
                    // run it and pass (window , event , and some optional args , if available)
                    this.#private.events.drag.start.call_back_function(this , e , ...(this.#private.events.drag.start.call_back_args) )
                } 

            });

            // when drag end
            this.dom.top_bar.addEventListener("mouseup", (e) => {
                // debugger
                
                this.dom.top_bar.style.cursor = "grab"; 
                
                // switch to drag off
                this.#private.events.drag.is_window_in_drag  = false;
                
                // drop window
                document.onmousemove = null;

                // if there's call_back_function for "drag_end" 
                if( this.#private.events.drag.end.call_back_function ){
                    // run it and pass (window , event , and some optional args , if available)
                    this.#private.events.drag.end.call_back_function(this , e , ...(this.#private.events.drag.end.call_back_args) )
                } 

            });

            
            // setup foucs event
            this.dom.window.addEventListener("click" , (e) => {
                //debugger
                
                // run only if call_back_function valid & window not in foucs
                if( this.#private.events.foucs.call_back_function && this.is.blur() ){
                    // call event function
                    this.#private.events.foucs.call_back_function( this , e , ...(this.#private.events.foucs.call_back_args) );
                }

                // this window in drag event need to be in the top of all other windows 
                // set index to the max_index + 1 
                if(this.#private.index < window.#max_index){
                    window.#max_index += 1;
                    this.dom.window.style.zIndex = window.#max_index;
                } 
    
                // this.#private.focus = true;
            })


            let names = [
                "resize_t","resize_b","resize_l","resize_r",
                "resize_tl","resize_tr","resize_bl","resize_br"
            ];
            const minimize_css = () => {


                for(let name of names){
                    this.dom[name].style.visibility = "visible";
                    this.dom[name].style.zIndex = "2";
                }

                if(this.#private.resize_v){
                    this.dom.resize_t.style.cursor = "n-resize";
                    this.dom.resize_b.style.cursor = "n-resize";

                }
                if(this.#private.resize_h){
                    this.dom.resize_l.style.cursor = "e-resize";
                    this.dom.resize_r.style.cursor = "e-resize";
                }

                if( this.#private.resize_h && this.#private.resize_v ){
                    this.dom.resize_tl.style.cursor = "se-resize";
                    this.dom.resize_tr.style.cursor = "ne-resize";
                    this.dom.resize_bl.style.cursor = "ne-resize";
                    this.dom.resize_br.style.cursor = "se-resize";
                }

                this.dom.top_bar.style.width  = `calc(100% - ${(this.dom.resize_l.clientWidth * 2)}px)`;
                this.dom.top_bar.style.left   = this.dom.resize_l.clientWidth + "px";

                this.dom.container.style.zIndex = "1";
                this.dom.container.style.left   = this.dom.resize_l.clientWidth +"px";
                this.dom.container.style.width  = `calc(100% - ${this.dom.resize_l.clientWidth * 2}px)`;
                this.dom.container.style.height = `calc(100% - ${this.dom.top_bar.clientHeight }px - ${this.dom.resize_b.clientHeight}px)`;


            };
            const maximize_css = () => {

                for(let name of names){
                    this.dom[name].style.visibility = "hidden";
                    this.dom[name].style.cursor = "default";
                    this.dom[name].style.zIndex = "1";
                }

                this.dom.top_bar.style.left   = "0px";
                this.dom.top_bar.style.width  = "100%";

                this.dom.container.style.zIndex = "2";
                this.dom.container.style.left   = "0px";
                this.dom.container.style.width  = "100%";
                this.dom.container.style.height = `calc(100% - ${this.dom.top_bar.clientHeight}px)`;
                
            }


            const maximize_or_minimize = ( ) => {
                // debugger

                if( this.#private.maxi_or_mini ){
                    // minimize window and reset all happend css changed 

                    this.set.minimize( );
                    minimize_css();
                }
                else{
                    // maximize window and stop resize abilities if it's allowed

                    this.set.maximize( );
                    maximize_css();
                    
                }

            }

            // "maximize minimize" event on maximize_button
            if(this.#private.maximize_allowed && this.dom.maximize_button){

                // maximize event when "maximize_button" get clicked 
                this.dom.maximize_button.addEventListener("click" , maximize_or_minimize );
                
                // maximize event when "top_bar" get double-click 
                this.dom.top_bar.addEventListener("dblclick" , maximize_or_minimize );

            }


            /*
                ============ setup window resize functions and events ================ 
            */

            // "resize top" 
            // when mouse move in resize process
            const resize_t_mouse_move = ( evnt ) => {

                evnt.stopPropagation();

                // update window height & y position
                if( this.#private.old_y - evnt.clientY + this.#private.height > window.#min_size ){
                    this.set.y( evnt.clientY );
                    this.set.height( this.#private.old_y - evnt.clientY + this.#private.height );
                }

                /* 
                    execute callback's if available
                */
                if( typeof(this.#private.events.resize.all.call_back_function) === "function" ){
                    this.#private.events.resize.all.call_back_function( this , evnt , ...(this.#private.events.resize.all.call_back_args) );
                }

                if( typeof(this.#private.events.resize.top.call_back_function) === "function" ){
                    this.#private.events.resize.top.call_back_function( this , evnt , ...(this.#private.events.resize.top.call_back_args) );
                }

            };

            // when resize process is end
            const resize_t_mouse_up = ( evnt ) => {

                // update window height & y position even resize in the end 
                if( this.#private.old_y - evnt.clientY + this.#private.height > window.#min_size ){
                    this.set.y( evnt.clientY );
                    this.set.height( this.#private.old_y - evnt.clientY + this.#private.height );
                }

                // remove move and up events 
                this.#private.parent_html.removeEventListener("mousemove" , resize_t_mouse_move);
                this.#private.parent_html.removeEventListener("mouseup" , resize_t_mouse_up);
                this.dom.resize_t.removeEventListener("mouseup" , resize_t_mouse_up);

            };

            // "resize bottom" 
            // when mouse move in resize process
            const resize_b_mouse_move = (evnt) => {

                evnt.stopPropagation();

                // update window height
                if( evnt.clientY - this.#private.y > window.#min_size ){
                    this.set.height( evnt.clientY - this.#private.y );
                }
                
                /* 
                    execute callback's if available
                */
                if( typeof(this.#private.events.resize.all.call_back_function) === "function" ){
                    this.#private.events.resize.all.call_back_function( this , evnt , ...(this.#private.events.resize.all.call_back_args) );
                }

                if( typeof(this.#private.events.resize.bottom.call_back_function) === "function" ){
                    this.#private.events.resize.bottom.call_back_function( this , evnt , ...(this.#private.events.resize.bottom.call_back_args) );
                }
            };   
            // when resize process is end
            const resize_b_mouse_up = (evnt) => {

                if( evnt.clientY - this.#private.y > window.#min_size ){
                    this.set.height( evnt.clientY - this.#private.y );
                }

                // remove move and up events 
                this.#private.parent_html.removeEventListener("mousemove" , resize_b_mouse_move);
                this.#private.parent_html.removeEventListener("mouseup" , resize_b_mouse_up);
                this.dom.resize_b.removeEventListener("mouseup" , resize_b_mouse_up);

            };

            // "resize left" 
            // when mouse move in resize process
            const resize_l_mouse_move = (evnt) => {
                debugger
                evnt.stopPropagation();
                
                let width = this.#private.width === "100%" ? this.#private.parent_html.clientWidth : this.#private.width;
                
                // update window width & x position
                if( this.#private.old_x - evnt.clientX + width > window.#min_size){
                    this.set.x( evnt.clientX );
                    this.set.width( this.#private.old_x - evnt.clientX + width );
                }

                /* 
                    execute callback's if available
                */
                if( typeof(this.#private.events.resize.all.call_back_function) === "function" ){
                    this.#private.events.resize.all.call_back_function( this , evnt , ...(this.#private.events.resize.all.call_back_args) );
                }

                if( typeof(this.#private.events.resize.left.call_back_function) === "function" ){
                    this.#private.events.resize.left.call_back_function( this , evnt , ...(this.#private.events.resize.left.call_back_args) );
                }
            };    
            // when resize process is end
            const resize_l_mouse_up = (evnt) => {

                // update window width & x position
                if( this.#private.old_x - evnt.clientX + this.#private.width > window.#min_size){
                    this.set.x( evnt.clientX );
                    this.set.width( this.#private.old_x - evnt.clientX + this.#private.width );
                }
                
                // remove move and up events 
                this.#private.parent_html.removeEventListener("mousemove" , resize_l_mouse_move);
                this.#private.parent_html.removeEventListener("mouseup" , resize_l_mouse_up);
                this.dom.resize_l.removeEventListener("mouseup" , resize_l_mouse_up);

            };

            // "resize right" 
            // when mouse move in resize process
            const resize_r_mouse_move = (evnt) => {

                evnt.stopPropagation();

                // update window width
                if( evnt.clientX - this.#private.x > window.#min_size ){
                    this.set.width( evnt.clientX - this.#private.x );
                }

                /* 
                    execute callback's if available
                */
                if( typeof(this.#private.events.resize.all.call_back_function) === "function" ){
                    this.#private.events.resize.all.call_back_function( this , evnt , ...(this.#private.events.resize.all.call_back_args) );
                }

                if( typeof(this.#private.events.resize.right.call_back_function) === "function" ){
                    this.#private.events.resize.right.call_back_function( this , evnt , ...(this.#private.events.resize.right.call_back_args) );
                }
            };  
            // when resize process is end
            const resize_r_mouse_up = (evnt) => {

                if( evnt.clientX - this.#private.x > window.#min_size ){
                    this.set.width( evnt.clientX - this.#private.x );
                }
                //else this.set.width(window.#min_size);

                // remove move and up events 
                this.#private.parent_html.removeEventListener("mousemove" , resize_r_mouse_move);
                this.#private.parent_html.removeEventListener("mouseup" , resize_r_mouse_up);
                this.dom.resize_r.removeEventListener("mouseup" , resize_r_mouse_up);

            };

            // "resize top+left" 
            // when mouse move in resize process
            const resize_tl_mouse_move = (evnt) => {

                evnt.stopPropagation();

                let width = this.#private.width === "100%" ? this.#private.parent_html.clientWidth : this.#private.width;
                
                // update window width & x position
                if( this.#private.old_x - evnt.clientX + width > window.#min_size){
                    this.set.x( evnt.clientX );
                    this.set.width( this.#private.old_x - evnt.clientX + this.#private.width );
                }

                // update window height & y position
                if( this.#private.old_y - evnt.clientY + this.#private.height > window.#min_size ){
                    this.set.y( evnt.clientY );
                    this.set.height( this.#private.old_y - evnt.clientY + this.#private.height );
                }

                /* 
                    execute event callback if it available
                */
                if( typeof(this.#private.events.resize.all.call_back_function) === "function" ){
                    this.#private.events.resize.all.call_back_function( this , evnt , ...(this.#private.events.resize.all.call_back_args) );
                }

                if( typeof(this.#private.events.resize.top_left.call_back_function) === "function" ){
                    this.#private.events.resize.top_left.call_back_function( this , evnt , ...(this.#private.events.resize.top_left.call_back_args) );
                }

            };
            // when resize process is end
            const resize_tl_mouse_up = (evnt) => {

                this.#private.parent_html.removeEventListener("mousemove",resize_tl_mouse_move);
                this.#private.parent_html.removeEventListener("mouseup",resize_tl_mouse_up);
                this.dom.resize_tl.removeEventListener("mouseup",resize_tl_mouse_up);

            };

            // "resize top+right" 
            // when mouse move in resize process
            const resize_tr_mouse_move = (evnt) => {

                evnt.stopPropagation();

                // update window height & y position
                if( this.#private.old_y - evnt.clientY + this.#private.height > window.#min_size ){
                    this.set.y( evnt.clientY );
                    this.set.height( this.#private.old_y - evnt.clientY + this.#private.height );
                }

                // update window width
                if( evnt.clientX - this.#private.x > window.#min_size ){
                    this.set.width( evnt.clientX - this.#private.x );
                }

                /* 
                    execute event callback if it available
                */
                if( typeof(this.#private.events.resize.all.call_back_function) === "function" ){
                    this.#private.events.resize.all.call_back_function( this , evnt , ...(this.#private.events.resize.all.call_back_args) );
                }

                if( typeof(this.#private.events.resize.top_right.call_back_function) === "function" ){
                    this.#private.events.resize.top_right.call_back_function( this , evnt , ...(this.#private.events.resize.top_right.call_back_args) );
                }
            };
            // when resize process is end
            const resize_tr_mouse_up = (evnt) => {
                this.#private.parent_html.removeEventListener("mousemove" , resize_tr_mouse_move );
                this.#private.parent_html.removeEventListener("mouseup" , resize_tr_mouse_up );
                this.dom.resize_tl.removeEventListener("mouseup" , resize_tr_mouse_up );
            };

            // "resize bottom+left" 
            // when mouse move in resize process
            const resize_bl_mouse_move = (evnt) => {

                evnt.stopPropagation();

                let width = this.#private.width  === "100%" ? this.#private.parent_html.clientWidth : this.#private.width;

                // update window width & x position
                if( this.#private.old_x - evnt.clientX + width > window.#min_size){
                    this.set.x( evnt.clientX );
                    this.set.width( this.#private.old_x - evnt.clientX + this.#private.width );
                }

                // update window height
                if( evnt.clientY - this.#private.y > window.#min_size ){
                    this.set.height( evnt.clientY - this.#private.y );
                }

                /* 
                    execute event callback if it available
                */
                if( typeof(this.#private.events.resize.all.call_back_function) === "function" ){
                    this.#private.events.resize.all.call_back_function( this , evnt , ...(this.#private.events.resize.all.call_back_args) );
                }

                if( typeof(this.#private.events.resize.bottom_left.call_back_function) === "function" ){
                    this.#private.events.resize.bottom_left.call_back_function( this , evnt , ...(this.#private.events.resize.bottom_left.call_back_args) );
                }
            };
            // when resize process is end
            const resize_bl_mouse_up = (evnt) => {
                this.#private.parent_html.removeEventListener("mousemove" , resize_bl_mouse_move );
                this.#private.parent_html.removeEventListener("mouseup" , resize_bl_mouse_move );
                this.dom.resize_bl.removeEventListener("mouseup" , resize_bl_mouse_up );
            };

            // "resize bottom+right" 
            // when mouse move in resize process
            const resize_br_mouse_move = (evnt) => {
                
                evnt.stopPropagation();

                // update window height
                if( evnt.clientY - this.#private.y > window.#min_size ){
                    this.set.height( evnt.clientY - this.#private.y );
                }

                // update window width
                if( evnt.clientX - this.#private.x > window.#min_size ){
                    this.set.width( evnt.clientX - this.#private.x );
                }

                /* 
                    execute event callback if it available
                */
                if( typeof(this.#private.events.resize.all.call_back_function) === "function" ){
                    this.#private.events.resize.all.call_back_function( this , evnt , ...(this.#private.events.resize.all.call_back_args) );
                }

                if( typeof(this.#private.events.resize.bottom_right.call_back_function) === "function" ){
                    this.#private.events.resize.bottom_right.call_back_function( this , evnt , ...(this.#private.events.resize.bottom_right.call_back_args) );
                }

            };
            // when resize process is end
            const resize_br_mouse_up = (evnt) => {
                this.#private.parent_html.removeEventListener("mousemove" , resize_br_mouse_move );
                this.#private.parent_html.removeEventListener("mouseup" , resize_br_mouse_move );
                this.dom.resize_br.removeEventListener("mouseup" , resize_br_mouse_up );
            };
            
        /*
            resize in vertical
            setup resize events on "resize_t , resize_b" elements , if it allowed  
        */
            if(this.#private.resize_v){

                // setup "resize top" element 
                
                // "mouse down" : mean resize process is start
                this.dom.resize_t.addEventListener("mousedown" , (e) => {

                    // setup needed events for resize in top
                    this.#private.parent_html.addEventListener("mousemove", resize_t_mouse_move , e);
                    this.#private.parent_html.addEventListener("mouseup", resize_t_mouse_up , e);
                    this.dom.resize_t.addEventListener("mouseup", resize_t_mouse_up , e);

                });


                // setup "resize top" element 

                // "mouse down" : mean resize process is start
                this.dom.resize_b.addEventListener("mousedown" , (e) => {

                    this.#private.parent_html.addEventListener("mousemove" , resize_b_mouse_move , e)
                    this.#private.parent_html.addEventListener("mouseup" , resize_b_mouse_up , e);
                    this.dom.resize_b.addEventListener("mouseup" , resize_b_mouse_up , e);

                });

            
            } // ========= end of setup vertical resize events =============



        /*
            resize in horizontal
            setup resize events on "resize_l , resize_r" elements , if it allowed  
        */
            if(this.#private.resize_h){

                // setup "resize left" 
                
                // "mouse down" : mean resize process is start
                this.dom.resize_l.addEventListener("mousedown" , (e) => {

                    this.#private.parent_html.addEventListener("mousemove" , resize_l_mouse_move , e)
                    this.#private.parent_html.addEventListener("mouseup" , resize_l_mouse_up , e);
                    this.dom.resize_l.addEventListener("mouseup" , resize_l_mouse_up , e);

                });


                // setup "resize right" 

                // "mouse down" : mean resize process is start
                this.dom.resize_r.addEventListener("mousedown" , (e) => {

                    this.#private.parent_html.addEventListener("mousemove" , resize_r_mouse_move , e)
                    this.#private.parent_html.addEventListener("mouseup" , resize_r_mouse_up , e);
                    this.dom.resize_r.addEventListener("mouseup" , resize_r_mouse_up , e);

                });


            } // ========= end of setup horizontal resize events =============


        /*
            resize in horizontal and vertical
            setup resize events on "resize_tl , resize_tr , resize_bl , resize_br" elements , if it allowed  
        */
            if( this.#private.resize_h &&  this.#private.resize_v){
                
                // setup "top+left"
                // when resize process is start
                this.dom.resize_tl.addEventListener("mousedown" , (e) => {
                    
                    this.#private.parent_html.addEventListener("mousemove" , resize_tl_mouse_move , e)
                    this.#private.parent_html.addEventListener("mouseup" , resize_tl_mouse_up , e);
                    this.dom.resize_tl.addEventListener("mouseup" , resize_tl_mouse_up , e);

                });
                
                // setup "top+right"
                // when resize process is start
                this.dom.resize_tr.addEventListener("mousedown" , (e) => {
                    
                    this.#private.parent_html.addEventListener("mousemove" , resize_tr_mouse_move , e)
                    this.#private.parent_html.addEventListener("mouseup" , resize_tr_mouse_up , e);
                    this.dom.resize_tl.addEventListener("mouseup" , resize_tr_mouse_up , e);

                });
                
                // setup "bottom+left"
                // when resize process is start
                this.dom.resize_bl.addEventListener("mousedown" , (e) => {
                    
                    this.#private.parent_html.addEventListener("mousemove" , resize_bl_mouse_move , e)
                    this.#private.parent_html.addEventListener("mouseup" , resize_bl_mouse_up , e);
                    this.dom.resize_bl.addEventListener("mouseup" , resize_bl_mouse_up , e);

                });

                // setup "bottom+right"
                // when resize process is start
                this.dom.resize_br.addEventListener("mousedown" , (e) => {
                                    
                    this.#private.parent_html.addEventListener("mousemove" , resize_br_mouse_move , e)
                    this.#private.parent_html.addEventListener("mouseup" , resize_br_mouse_up , e);
                    this.dom.resize_br.addEventListener("mouseup" , resize_br_mouse_up , e);

                });

            } // ========= end of setup vertical and horizontal resize events =============
         
            
        }
        /*
            =================== end of "setup functionalities & events" ====================
        */


    }
    /*  ************ end of private object ************** */



    constructor(  // needed parameter's to construct a new window
        id = "def" , title = "window" , 
        x = 10, y = 10 , 
        height = 512, width = 512 , 
        hide_button = true , maximize_button = true , close_button = true , 
        icon = true , icon_src = "",
        resize_in_horizontal = true , resize_in_vertical = true , where_to_append = null 
    ){
        //debugger

        // check values then store it
        this.#private.id        = (typeof(id)    == "string") ? id : "";
        this.#private.title     = (typeof(title) == "string") ? title : "";

        this.#private.x         = (typeof(x) == "number") ? x : 0; 
        this.#private.y         = (typeof(y) == "number") ? y : 0;

        this.#private.height    = (typeof(height) == "number") ? height : 0;
        this.#private.width     = (typeof(width) == "number") ? width : 0;
        this.#private.old_height = this.#private.height;
        this.#private.old_width  = this.#private.width;

        this.#private.visible   = false;
        this.#private.icon      = icon ? true : false;
        this.#private.icon_src  = (typeof(icon_src) == "string") ? icon_src : "";

        this.#private.hide_button      = hide_button ? true : false;
        this.#private.maximize_button  = maximize_button ? true : false;
        this.#private.close_button     = close_button ? true : false;

        this.#private.resize_h  = resize_in_horizontal ? true : false;
        this.#private.resize_v  = resize_in_vertical ? true : false;
        this.#private.maxi_or_mini = false;

        this.#private.parent_html = (where_to_append) ? where_to_append : document.body;


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
                return this.#private.events.drag.is_window_in_drag;
            },

            open : () => {
                return this.#private.visible ;
            },

            close : () => {
                return this.#private.visible ? false : true;
            },

            foucs : () => {
                //debugger

                this.#private.focus = ( this.get.z_index() >= window.#max_index );
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
                    this.#private.events.drag.start.call_back_function = call_back_function;
                    this.#private.events.drag.start.call_back_args = args;

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
                    this.#private.events.drag.in.call_back_function = call_back_function;
                    this.#private.events.drag.in.call_back_args = args;

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
                    this.#private.events.drag.end.call_back_function = call_back_function;
                    this.#private.events.drag.end.call_back_args = args;

                }
                else{ // mean call_back_function is not function 
                    console.error("[DESKTOPjs] parameter 'call_back_function' must be function");
                }
            },


            foucs : ( call_back_function = null , ...args ) => {

                // call_back_function must be function
                if(typeof(call_back_function) == "function"){
                                    
                    // save call_back_function and it's arguments
                    this.#private.events.foucs.call_back_function = call_back_function;
                    this.#private.events.foucs.call_back_args = args;

                }
                else{ // mean call_back_function is not function 
                    console.error("[DESKTOPjs] parameter 'call_back_function' must be function");
                }
            },

            
            close : ( call_back_function = null , ...args ) => {

                // call_back_function must be function
                if(typeof(call_back_function) == "function"){
                                                                    
                    // save call_back_function and it's arguments
                    this.#private.events.close.call_back_function = call_back_function;
                    this.#private.events.close.call_back_args = args;

                }
                else{ // mean call_back_function is not function 
                    console.error("[DESKTOPjs] parameter 'call_back_function' must be function");
                }

            },

            open : ( call_back_function = null , ...args ) => {

                // call_back_function must be function
                if(typeof(call_back_function) == "function"){
                                                                    
                    // save call_back_function and it's arguments
                    this.#private.events.open.call_back_function = call_back_function;
                    this.#private.events.open.call_back_args = args;

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
                    this.#private.events.maximize.call_back_function = call_back_function;
                    this.#private.events.maximize.call_back_args = args;

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
                    this.#private.events.minimize.call_back_function = call_back_function;
                    this.#private.events.minimize.call_back_args = args;

                }
                else{ // mean call_back_function is not function 
                    console.error("[DESKTOPjs] parameter 'call_back_function' must be function");
                }
            },


            // sub events in resize event
            resize : { 
                
                // general resize event
                all : ( call_back_function = null , ...args ) => {

                    // call_back_function must be function
                    if(typeof(call_back_function) == "function"){
                                                                        
                        // save call_back_function and it's arguments
                        this.#private.events.resize.all.call_back_function = call_back_function;
                        this.#private.events.resize.all.call_back_args = args;

                    }
                    else{ // mean call_back_function is not function 
                        console.error("[DESKTOPjs] parameter 'call_back_function' must be function");
                    }

                },

                left : ( call_back_function = null , ...args ) => {

                    if(typeof(call_back_function) == "function"){
                                                                        
                        this.#private.events.resize.left.call_back_function = call_back_function;
                        this.#private.events.resize.left.call_back_args = args;

                    }
                    else{ 
                        console.error("[DESKTOPjs] parameter 'call_back_function' must be function");
                    }

                },

                right : ( call_back_function = null , ...args ) => {

                    if(typeof(call_back_function) == "function"){
                                                                        
                        this.#private.events.resize.right.call_back_function = call_back_function;
                        this.#private.events.resize.right.call_back_args = args;

                    }
                    else{ 
                        console.error("[DESKTOPjs] parameter 'call_back_function' must be function");
                    }

                },

                top : ( call_back_function = null , ...args ) => {

                    if(typeof(call_back_function) == "function"){
                                                                        
                        this.#private.events.resize.top.call_back_function = call_back_function;
                        this.#private.events.resize.top.call_back_args = args;

                    }
                    else{ 
                        console.error("[DESKTOPjs] parameter 'call_back_function' must be function");
                    }

                },

                bottom : ( call_back_function = null , ...args ) => {

                    if(typeof(call_back_function) == "function"){
                                                                        
                        this.#private.events.resize.bottom.call_back_function = call_back_function;
                        this.#private.events.resize.bottom.call_back_args = args;

                    }
                    else{ 
                        console.error("[DESKTOPjs] parameter 'call_back_function' must be function");
                    }

                },
        
                top_left : ( call_back_function = null , ...args ) => {

                    if(typeof(call_back_function) == "function"){
                                                                        
                        this.#private.events.resize.top_left.call_back_function = call_back_function;
                        this.#private.events.resize.top_left.call_back_args = args;

                    }
                    else{ 
                        console.error("[DESKTOPjs] parameter 'call_back_function' must be function");
                    }

                },

                top_right : ( call_back_function = null , ...args ) => {

                    if(typeof(call_back_function) == "function"){
                                                                        
                        this.#private.events.resize.top_right.call_back_function = call_back_function;
                        this.#private.events.resize.top_right.call_back_args = args;

                    }
                    else{ 
                        console.error("[DESKTOPjs] parameter 'call_back_function' must be function");
                    }

                },

                bottom_left : ( call_back_function = null , ...args ) => {

                    if(typeof(call_back_function) == "function"){
                                                                        
                        this.#private.events.resize.bottom_left.call_back_function = call_back_function;
                        this.#private.events.resize.bottom_left.call_back_args = args;

                    }
                    else{ 
                        console.error("[DESKTOPjs] parameter 'call_back_function' must be function");
                    }

                },

                bottom_right : ( call_back_function = null , ...args ) => {

                    if(typeof(call_back_function) == "function"){
                                                                        
                        this.#private.events.resize.bottom_right.call_back_function = call_back_function;
                        this.#private.events.resize.bottom_right.call_back_args = args;

                    }
                    else{ 
                        console.error("[DESKTOPjs] parameter 'call_back_function' must be function");
                    }

                },

            }, // end of resize sub events object
            
            
            

        } // end of on object


        // object contain all abilities for modify existing values
        this.set = {

            // set new x value only if "new_x" valid number
            x : ( new_x = 0 ) => {

                // check
                if( typeof(new_x) == "number" ){
                    this.#private.old_x = this.#private.x;
                    this.#private.x = new_x; // set new value if it valid
                    this.dom.window.style.left = this.#private.x + "px";
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
                    this.#private.old_y = this.#private.y;
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
            width : ( new_width = 0 ) => {
                // debugger
                // check value
                if( typeof(new_width) === "number" ){

                    this.#private.old_width = this.#private.width;
                    this.#private.width = new_width;
                    this.dom.window.style.width = this.#private.width + "px";
                    
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

                    this.#private.old_height = this.#private.height;
                    this.#private.height = new_height;
                    this.dom.window.style.height = this.#private.height + "px";
                    
                    return true;
                }
                else { // mean invalid value "new_height" parameter
                    console.warn("[DESKTOPjs] new_x parameter must be number ");
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
                this.dom.window.style.visibility =  (this.#private.visible) ? "visible" : "hidden";

            },

            // set this window top index
            top_index : () => {

                window.#max_index += 1;
                this.dom.window.style.zIndex = window.#max_index;

            },

            // 
            maximize : ( e = null ) => {
                // debugger
                
                // get task_bar if there's task_bar in desktop
                let task_bar = this.#private.parent_html.querySelector("#desktop_taskbar");
                
                // save old "x y" and" width height" for minimize later 
                this.#private.old_x = this.#private.x;
                this.#private.old_y = this.#private.y;
                this.#private.x = 0;
                this.#private.y = 0;

                this.#private.old_width  = this.#private.width;
                this.#private.old_height = this.#private.height;
                this.#private.width  = "100%";
                this.#private.height = this.#private.parent_html.clientHeight - task_bar.clientHeight;

                this.dom.window.style.top    = "0px";
                this.dom.window.style.left   = "0px";
                this.dom.window.style.width  = this.#private.width;
                this.dom.window.style.height = `${ this.#private.height }px`;

                // toggle to maximized
                this.#private.maxi_or_mini = true;
                // set top z-index to this window
                this.set.top_index();

                // if there's call_back_function for maximize event , run it
                if( typeof(this.#private.events.maximize.call_back_function) === "function" ){

                    this.#private.events.maximize.call_back_function( this , e , ...this.#private.events.maximize.call_back_args );

                } 
            },

            minimize : ( pass_size = false ) => {
                // debugger

                // save old values
                this.#private.width  = this.#private.old_width;
                this.#private.height = this.#private.old_height;
                this.#private.x = this.#private.old_x;
                this.#private.y = this.#private.old_y;

                if(!pass_size){
                    this.dom.window.style.top    = `${this.#private.y}px`;
                    this.dom.window.style.left   = `${this.#private.x}px`;
                    this.dom.window.style.width  = `${this.#private.width}px`;
                    this.dom.window.style.height = `${this.#private.height}px`;
                }


                // set top z-index to this window
                this.set.top_index();

                // toggle to minimize 
                this.#private.maxi_or_mini = false;
                
                // if there's call_back_function for maximize event , run it
                if( typeof(this.#private.events.minimize.call_back_function) === "function" ){

                    this.#private.events.minimize.call_back_function( this , e , ...this.#private.events.minimize.call_back_args );

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
            // debugger
            
            // make window visible 'open'
            this.set.visibility(true);

            
            if( typeof(this.#private.events.open.call_back_function) === "function"){
                this.#private.events.open.call_back_function(
                    this , ...(this.#private.events.open.call_back_args)
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

            if( typeof(this.#private.events.close.call_back_function) === "function"){
                this.#private.events.close.call_back_function(
                    this , ...(this.#private.events.close.call_back_args)
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