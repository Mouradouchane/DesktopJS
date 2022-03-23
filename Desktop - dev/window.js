// for inherit global properties
import { global_element } from "./global_element.js";

export class window extends global_element{
    // === private properties ===
    #maximise;
    #minimise;
    #focus;
    
    // function take html template and processes it 
    #setup_window = (html_template) => {
        
        // *** need construction ***
        console.warn("need construction");
        
    }

    constructor(
        id = null , title = "window" , x = 10, y = 10 , height = 512, width = 512 , 
        focus = true , maximise_button = true , minimise_button = true , 
        visible = true , html_template = null 
    ){
        // set values to the inherited properties
        super(x,y,height,width,title,id,visible);

        this.#focus  = (typeof(focus) == "boolean") ? focus : true; 
        this.#maximise = (typeof(maximise_button) == "boolean") ? maximise_button : true;
        this.#minimise = (typeof(minimise_button) == "boolean") ? minimise_button : true;

        // GET function

        // SET function

        // DOM function

        // ON  function
        
        // IS  function

    }


}