//import { window_maker } from "./window_ui.js";

export class window_logic {




    constructor(
        id = null , title = "window" , x = 10, y = 10 , height = 512, width = 512 , 
        maximize_button = true , hide_button = true , 
        visible = true , resize_in_horizontal = true , resize_in_vertical = true , maximized = false, 
        where_to_append = null , html_template = null 
    ){

        // check & set new values
        this.#private.x         = (typeof(x) == "number") ? x : 0; 
        this.#private.y         = (typeof(y) == "number") ? y : 0;
        this.#private.height    = (typeof(height) == "number") ? height : 0;
        this.#private.width     = (typeof(width) == "number") ? width : 0;
        this.#private.id        = (typeof(id) == "string") ? id : null;
        this.#private.visible   =  visible ? true : false;
        this.#private.title     = (typeof(title) == "string") ? title : null;
        this.#private.maximize  = maximize_button ? true : false;
        this.#private.hide      = hide_button ? true : false;
        this.#private.resize_h  = resize_in_horizontal ? true : false;
        this.#private.resize_v  = resize_in_vertical ? true : false;
        this.#private.maxi_or_mini = (maximized) ? true : false;
        this.#private.parent_html = where_to_append;

    }


}
