
import { window } from "./window/window.js";

export class desktop{

    
    // === private properties ===
    #private ={

        desktop_html : null,

        background : null,

        // ENV object like sitting , where variables like "icons size" and more ...
        env : {

            // where all desktop variables get stored for usage
            desktop : { 

            },

            // where all templates get stored for usage
            templates : {

                window : {
                    html : null ,
                }   

            },

        }
    }


    
    // desktop_html_id : html element id "where this desktop should be"
    constructor( desktop_html_id = null , desktop_background = null){
        // debugger

        // id must be string
        if( typeof(desktop_html_id) === "string" ){
            
            // try to select target html element
            this.#private.desktop_html = document.querySelector(`#${desktop_html_id}`);

            // setup desktop background
            if(desktop_background){
                this.#private.background = desktop_background;

                this.#private.desktop_html.style.cssText += `
                    background-image: url("${ this.#private.background}");
                    background-size : auto;
                    background-repeat: no-repeat;
                    background-position: center center; 
                `;
            }
            
            // check if selection is "null"
            if( !(this.#private.desktop_html) ){

                // if not
                // default selection will be the "html body"
                this.#private.desktop_html = document.body;

                // log warn and help
                console.warn(`[DESKTOPjs] 'desktop html element id' you pass in not found or invalid , because parameter desktop_html_id is ${desktop_html_id}`);
                console.info(`[DESKTOPjs] default selection will be the "html body"`);
            
            }

        }



        // object where we store all running desktop elements window,folder,...
        // storing by "element id"
        this.running = {
            windows : {

            },
        }
        
        // object responsible for adding new object the OS stuff like => window,notification,files,...
        this.new = {

            // make new window
            window : (
                id = "def" , title = "window" , 
                x = 10, y = 10 , 
                height = 512, width = 512 , 
                hide_button = true , maximize_button = true , close_button = true , 
                icon = true , icon_src ,
                resize_in_horizontal = true , resize_in_vertical = true , where_to_append = null 
    
            ) => {
                //debugger

                // make new window only if id "string" & id is "not reserved"
                //if(this.running[id] == undefined || this.running[id] == null){
                if( typeof(id) === "string" && !this.running.windows[id] ){

                    // define new window 
                    this.running.windows[id] = new window(
                        id , title , x , y , height , width ,
                        hide_button,
                        maximize_button ,
                        close_button ,
                        icon , icon_src,
                        resize_in_horizontal ,
                        resize_in_vertical ,
                        (where_to_append) ? where_to_append : this.#private.desktop_html ,
                    );
                    
                    // then the reference of the new created window
                    return this.running.windows[id];

                }
                else{ 

                    // else mean id is already reserved or invalid , soo no duplicate of id's
                    if(typeof(id) != "string"){
                        console.error(`[DESKTOPjs] window "id" must be string .`);
                    }
                    else {
                        console.error(`[DESKTOPjs] this ${id} is already reserved by another window .`);
                    }

                    return null;
                }

            },


        },

        
        // object responsible for any changes in any html & css template
        this.set = {

            // function convert STRING TEMPLATE to HTML OBJECT
            template_to_HTML : (str) => {
                
                try{ // convert
                    let parser = new DOMParser();
                    let html   = parser.parseFromString(str, 'text/html');
                    // first Elements it's main element it's self
                    return html.body.firstElementChild;
                }
                catch(err) { // in case any error happen 
                    console.error(`[DESKTOPjs] parsing html error : ${err} .`);
                    throw null;
                }

            },

            // window object for set HTML/CSS templates
            window : {

                // set html template for window
                // html_template_as_string : template string contain all 
                html : (html_template_as_string = "") => {

                    // parse string to html using "template_to_HTML" function
                    let parsed_html = this.set.template_to_HTML(html_template_as_string);

                    // if template_to_HTML function throw null that mean error happend in parsing
                    if(parsed_html == null){
                        console.warn,(`[DESKTOPjs] possible something went wrong while parsing .`)
                        return false;
                    }
                    // set new template to ENV
                    this.#private.env.templates.window.html = parsed_html;
                    return true;

                },

            }

        }

        // desktop.get : object provide all possible values 
        this.get = {

            // get window HTML template 
            window : {
                html : () => {
                    return this.#private.env.templates.window.html;
                }
            },

        }

    }

}
