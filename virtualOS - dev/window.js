
export class window{
    // === private properties ===
    #x;
    #y;
    #height;
    #width;
    #maximise;
    #minimise;
    #visible;
    #focus;

    #setup_template = (html_template) => {
        console.log("working");
    }

    constructor(
        title = "window" , x = 10, y = 10 , height = 512, width = 512 , 
        focus = true , maximise_button = true , minimise_button = true , 
        visible = true
    ){
        // === public properties ===
        this.title = title ;

        // check & set new values to the private properties
        this.#x = (typeof(x) == "number") ? x : 0; 
        this.#y = (typeof(y) == "number") ? y : 0;
        this.#height = (typeof(height) == "number") ? height : 0;
        this.#width  = (typeof(width) == "number") ? width : 0;
        this.#focus  = (typeof(focus) == "boolean") ? focus : true; 
        this.#maximise = (typeof(maximise_button) == "boolean") ? maximise_button : true;
        this.#minimise = (typeof(minimise_button) == "boolean") ? minimise_button : true;
        this.#visible  = (typeof(visible) == "boolean") ? visible : true;

        // object contain all abilities for setting new values
        this.set = {

            // set new x value only if "new_x" valid number
            x : ( new_x = 0) => {
                // check
                if( typeof(new_x) == "number"){
                    this.#x =  new_x; // set new value if it valid
                    return true; // return confirmation :)
                }
                else { // mean invalid value
                    console.warn("[VOS] new_x must be number")
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
                    console.warn("[VOS] new_y must be number")
                    return false;
                }
            },

            // set multiple values at sametime 
            /* 
            example : 
                {
                    x : 10 ,
                    y : 20 ,
                    blur : true
                }
            */ 
            values : ( new_values = {} ) => {
                /* function need work :) */
            }
        }

        // object full of functions who provides all possible needed values
        this.get = {
            x : () => {
                return this.#x;
            },

            y : () => {
                return this.#y;
            }
        }

    }


}