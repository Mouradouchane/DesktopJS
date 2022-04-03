
export class window{
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
    #focus;
    
    // function take html template and processes it 
    #build = ( where_to_append , html_template ) => {
        // make window using html_template
        this.dom.window = html_template.cloneNode(true);
        
        // store window elements in dom object ===============================
        this.dom.container = this.dom.window.querySelectorAll(".container")[0];
        this.dom.top_bar = this.dom.window.querySelectorAll(".top_bar")[0];
        this.dom.title = this.dom.top_bar.querySelectorAll(".title")[0];
        this.dom.icon = this.dom.top_bar.querySelectorAll(".icon")[0];
        this.dom.minimize = this.dom.top_bar.querySelectorAll(".minimize")[0];
        this.dom.maximize = this.dom.top_bar.querySelectorAll(".maximize")[0];
        this.dom.close = this.dom.top_bar.querySelectorAll(".close")[0];

        this.dom.resize_t = this.dom.window.querySelectorAll(".resize_horizontal")[0];
        this.dom.resize_b = this.dom.window.querySelectorAll(".resize_horizontal")[1];
        
        this.dom.resize_l = this.dom.window.querySelectorAll(".resize_vertical")[0];
        this.dom.resize_r = this.dom.window.querySelectorAll(".resize_vertical")[1];

        this.dom.resize_tl = this.dom.window.querySelectorAll(".resize_corner")[0];
        this.dom.resize_tr = this.dom.window.querySelectorAll(".resize_corner")[1];
        this.dom.resize_dl = this.dom.window.querySelectorAll(".resize_corner")[2];
        this.dom.resize_dr = this.dom.window.querySelectorAll(".resize_corner")[3];
        // ====================================================================

        // set window attributes and properties 
        this.dom.window.setAttribute("id" , this.#id);
        this.dom.window.style.cssText +=  `left : ${this.#x}px`;
        this.dom.window.style.cssText +=  `top  : ${this.#y}px`;
        this.dom.window.style.cssText +=  `width  : ${this.#width}px`;
        this.dom.window.style.cssText +=  `height  : ${this.#height}px`;
        this.dom.window.style.cssText +=  `visibility  : ${ (this.#visible) ? "visible" : "hidden"}`;
        
        // set window title
        this.dom.title.textContent = this.#title;
        
        // filter no needed elements 
        if(!(this.#minimize)){
            this.dom.minimize.parentNode.removeChild(this.dom.minimize);
        }
        if(!(this.#maximize)){
            this.dom.maximize.parentNode.removeChild(this.dom.maximize);
        }

        // append this new window to the desktop
        where_to_append.append(this.dom.window);
    }

    constructor(
        id = null , title = "window" , x = 10, y = 10 , height = 512, width = 512 , 
        focus = true , maximize_button = true , minimize_button = true , 
        visible = true , where_to_append = null , html_template = null 
    ){

        // check & set new values
        this.#x         = (typeof(x) == "number") ? x : 0; 
        this.#y         = (typeof(y) == "number") ? y : 0;
        this.#height    = (typeof(height) == "number") ? height : 0;
        this.#width     = (typeof(width) == "number") ? width : 0;
        this.#id        = (typeof(id) == "string") ? id : null;
        this.#visible   = (typeof(visible) == "boolean") ? visible : true;
        this.#title    = (typeof(title) == "string") ? title : null;
        this.#focus    = (typeof(focus) == "boolean") ? focus : true; 
        this.#maximize = (typeof(maximize_button) == "boolean") ? maximize_button : true;
        this.#minimize = (typeof(minimize_button) == "boolean") ? minimize_button : true;

        
        // provide html elements of that element
        this.dom = { }

        // object provide booleans represents the case of object
        this.is  = { }

        // object provide events 
        this.on  = { }

        this.#build(where_to_append , html_template);

        // object contain all abilities for modify existing values
        this.set = {

            // set new x value only if "new_x" valid number
            x : ( new_x = 0) => {
                // check
                if( typeof(new_x) == "number"){
                    this.#x =  new_x; // set new value if it valid
                    return true; // return confirmation :)
                }
                else { // mean invalid value
                    console.warn("[DESKTOPjs] new_x parameter must be number")
                    return false; // return confirmation :(
                }
            },
            // like x() function
            y : ( new_y = 0 ) => {
                if( typeof(new_y) == "number"){
                    this.#y = new_y;
                    return true;
                }
                else {
                    console.warn("[DESKTOPjs] new_y parameter must be number");
                    return false;
                }
            },

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

            values : ( new_values = {} ) => {
                /* function need work :) */
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

            visible : () => {
                return this.#visible;
            },
        
            title : () => {
                return this.#title;
            },


        /*-----------------values function---------*/
            values : () => {
                return {
                    id : this.#id,
                    x : this.#x,
                    y : this.#y,
                    height : this.#height,
                    width : this.#width,
                    visible : this.#visible,
                    minimize : this.#minimize,
                    maximize : this.#maximize,
                    title : this.#title,
                    focus : this.#focus,
                }
            }
        }


    }


}