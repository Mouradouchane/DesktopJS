
export class window_maker{

    // private scope as "object" 
    #private = {

        vars : {
            parent_html : undefined,

        },


        // window html elements object
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

        // window css elements object
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
        }
    }

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

    // private function who make/compose window elements
    #build( ) {
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
    }




    constructor(
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

        // window 3 buttons close hide maximize
        if( !(this.#private.vars.maximize_button) ) this.#private.dom.maximize_button = undefined;
        if( !(this.#private.vars.close_button) ) this.#private.dom.close_button = undefined;
        if( !(this.#private.vars.hide_button) ) this.#private.dom.hide_button = undefined;
        

        this.#build( this.#private.vars.parent_html );
    }

    get = {

    }

    set = {

    }
}