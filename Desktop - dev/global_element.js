
// main element all other elements should inherit from it
export class global_element{
    // === private properties ===
    #id;
    #x;
    #y;
    #height;
    #width;
    #visible;
    
    // === public properties ===
    title;

    constructor( // common args
        x = 10, y = 10 , height = 512 , width = 512 , title = null , 
        id = null , visible = false
    ){        

        // check & set new values
        this.#x         = (typeof(x) == "number") ? x : 0; 
        this.#y         = (typeof(y) == "number") ? y : 0;
        this.#height    = (typeof(height) == "number") ? height : 0;
        this.#width     = (typeof(width) == "number") ? width : 0;
        this.#id        = (typeof(id) == "string") ? id : null;
        this.#visible   = (typeof(visible) == "boolean") ? visible : true;
        this.title      = (typeof(title) == "string") ? title : null;

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
                    console.warn("[DESKTOPjs] new_x must be number")
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
                    console.warn("[DESKTOPjs] new_y must be number");
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


        // object provides all possible needed values public or private 
        this.get = {
            x : () => {
                return this.#x;
            },

            y : () => {
                return this.#y;
            }
        }

        // object provides and contain HTML elements of this object
        this.dom = {

        }

        // object provides booleans represents the case of object
        this.is  = {

        }

        // object provides events 
        this.on  = {

        }
        
    }
}