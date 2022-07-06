
export class window_maker{

    // private scope as "object" 
    #private = {

        // window html elements object
        dom : {
            window : null,
            title : null,
            icon : null,
            title_bar : null,
            hide_button : null,
            maximize_button : null,
            close_button : null,
            resize_h : null,
            resize_w : null,
            full_body : null,
        },

        // window css elements object
        css : {
            window : null,
            title : null,
            icon : null,
            title_bar : null,
            hide_button : null,
            maximize_button : null,
            close_button : null,
            resize_h : null,
            resize_w : null,
            full_body : null,
        }
    }

    static #html_string =  `
        <div class=window>
            <div class="top_bar">
                <img class="icon" src="./graphics/folder_open.png">
                <p class="title"> test window </p>

                <div class="buttons"> 
                    <div class="tb_button minimize" id="minimize"></div>
                    <div class="tb_button maximize" id="maximize"></div>
                    <div class="tb_button close"    id="close"></div>
                </div>
            </div>
        
            <div class="container"> </div>

            <div class="resize resize_horizontal" id="resize_top"> </div>
            <div class="resize resize_horizontal" id="resize_down"> </div>

            <div class="resize resize_vertical" id="resize_left"> </div>
            <div class="resize resize_vertical" id="resize_right"> </div>

            <div class="resize resize_corner" id="resize_tl"> </div>
            <div class="resize resize_corner" id="resize_tr"> </div>
            <div class="resize resize_corner" id="resize_dl"> </div>
            <div class="resize resize_corner" id="resize_dr"> </div>

        </div>
    `;

    // function convert STRING TEMPLATE to HTML OBJECT
    static #template_to_HTML () {
        
        try{ // convert
            let parser = new DOMParser();
            let dom    = parser.parseFromString(window_maker.#html_string , 'text/html');
            // first Elements it's main element it's self
            return dom.body.firstElementChild;
        }
        catch(err) { // in case any error happen 
            console.error(`[DESKTOPjs] parsing html error : ${err} .`);
            throw `[DESKTOPjs] parsing html error : ${err} .`;
        }

    }

    static #build() {

        // generate window html 
        let dom = window_maker.#template_to_HTML();
        
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
        

    }

    constructor(
        title = "window" , x = 10, y = 10 , height = 512, width = 512 , 
        hide_button = true , maximize_button = true , close_button , 
        visible = true , resize_in_horizontal = true , resize_in_vertical = true , maximized = false, 
        where_to_append = null 
    ){

        // check & set new values
        this.#private.title     = (typeof(title) == "string") ? title : "";

        this.#private.x         = (typeof(x) == "number") ? x : 0; 
        this.#private.y         = (typeof(y) == "number") ? y : 0;

        this.#private.height    = (typeof(height) == "number") ? height : 0;
        this.#private.width     = (typeof(width) == "number") ? width : 0;

        this.#private.visible   = visible ? true : false;
        
        this.#private.hide_button      = hide_button ? true : false;
        this.#private.maximize_button  = maximize_button ? true : false;
        this.#private.close_button     = close_button ? true : false;

        this.#private.resize_h  = resize_in_horizontal ? true : false;
        this.#private.resize_v  = resize_in_vertical ? true : false;
        this.#private.maxi_or_mini = (maximized) ? true : false;

        this.#private.parent_html = where_to_append;

    }

    get = {

    }

    set = {

    }
}