import {window} from "./window.js";


export class desktop{

    // === private properties ===
    #desktop_html = null;

    // "desktop_html_id" we need html element , that tell us where we should work  
    constructor( desktop_html_id = null){

        // try to select target desktop
        this.#desktop_html = document.querySelector(`#${desktop_html_id}`);

        // check if desktop_html is valid or not
        if( !(this.#desktop_html) ){

            // if not
            // default selection will be the "html body"
            this.#desktop_html = document.body;

            // log warn and help
            console.warn(`[DESKTOPjs] 'desktop html element id' you pass in not found or invalid , because parameter desktop_html_id is ${desktop_html_id}`);
            console.info(`[DESKTOPjs] default selection will be the "html body"`);
           
        }


        // ENV object like sitting , where variables like "icons size" and more ...
        this.env = {

            // where all desktop variables get stored for usage
            desktop : { 

            },

            // where all templates get stored for usage
            templates : {

                window : {
                    html : null ,
                    css  : null ,
                }   

            },

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
                id = "def" , title = "window" , x = 10, y = 10 , height = 512, width = 512 , 
                focus = true , maximise_button = true , minimise_button = true , visible = true , 
                resize_in_horizontal = true , resize_in_vertical = true , where_to_append = null
            ) => {

                // if window html template not defined yet
                if(!this.env.templates.window.html){
                    
                    console.error(`[DESKTOPjs] error while constructing window , because there's no html template for windows .`);
                    console.hint(`[DESKTOPjs] use '.set.window.html' function in desktop object to solve this problem .`);
                   
                    return null;
                }

                // make new window only if id "string" & id is "not reserved"
                //if(this.running[id] == undefined || this.running[id] == null){
                if( typeof(id) == "string" && !this.running.windows[id] ){

                    // define new window 
                    this.running.windows[id] = new window(
                        id , title , x , y , height , width , focus ,
                        maximise_button ,
                        minimise_button,visible , 
                        resize_in_horizontal ,
                        resize_in_vertical ,
                        this.#desktop_html ,
                        this.env.templates.window.html
                    );
                    
                    // then return it reference
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

                // set css template for window
                // css_style_as_string => css for the hole window and all of it's children 
                css : (css_style_as_string = "") =>{

                    try{
                        // if there's no style make a new one 
                        let styleElement = document.querySelector("#window_style") || document.createElement("style"); 
                        // set id if there's no id
                        if(styleElement.id != "window_style") {
                            styleElement.id = "window_style";
                            console.warn("[DESKTOPjs] generating new style for window ...");
                        }

                        // set new style to the DOM & ENV
                        styleElement.textContent = css_style_as_string;
                        document.body.append(styleElement);
                        this.env.templates.window.css = styleElement;

                        return true;
                    }
                    catch(err){
                        console.error(`[DESKTOPjs] set style for window tempaltes error : ${err} .`);
                        return false;
                    }

                },

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
                    this.env.templates.window.html = parsed_html;
                    return true;

                },

            }

        }

        // object provide all elements "html & css" parts  
        this.get = {

            // get window HTML template & css <style> 
            window : {
                html : () => {
                    return this.env.templates.window.html;
                },
                css : () => {
                    return this.env.templates.window.css; 
                }
            },

        }

    }

}
