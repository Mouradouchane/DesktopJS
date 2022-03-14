import {window} from "./window.js";

export class virtualOS{

    constructor(){

        // ENV object like sitting in apps games os 
        // ENV where we controll variables like icons size & ...
        this.env = {

            // object for library log messagaes errors ...
            logs : {
                // title should be in any log comming from library
                title : "[VOS] ",

                // all messages about errors
                errors : {

                },

                // all messages about helps
                helps : {

                }
            },

            // where all desktop variables get stored for usage
            desktop : { },

            // where all templates get stored for usage
            templates : {

                window : {
                    html : null ,
                    css  : null ,
                }

            }

        }

        // object contain all running/working elements window,folder,...
        this.running = {

            // this should contain all running windows 
            windows : {
                
            }
        }
        
        // object responsible for adding new object the OS stuff like => window,notification,files,...
        this.add = {

            // add new window
            window : ( // needed args
                id = "def" , title = "window" , x = 10, y = 10 , height = 512, width = 512 , 
                focus = true , maximise_button = true , minimise_button = true , visible = true
            ) => {
                // if this id is not defined yet 
                if(this.running.windows[id] == undefined || this.running.windows[id] == null){
                    // define this new window to running object
                    this.running.windows[id] = new window(title,x,y,height,width,focus,maximise_button,minimise_button,visible);
                    // then return it reference
                    return this.running.windows[id];
                }
                else{ // mean this id is exsit soo no duplicate of id's
                    console.error(this.logs.title + `this ${id} is already reserved by another window`);
                    return null;
                }
            },

        },

        // object responsible for any changes in any html & css template
        this.set = {
            // function convert STRING TEMPLATE to HTML 
            template_to_HTML : (str) => {
                
                try{ // convert
                    let parser = new DOMParser();
                    let html = parser.parseFromString(str, 'text/html');
                    // first Elements it's main element it's self
                    return html.body.firstElementChild;
                }
                catch(err) { // in case any error happen 
                    console.error(this.env.logs.title + "parsing html : " , err);
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
                            console.warn(this.env.logs.title + "generating new style for window ...");
                        }

                        // set new style to the DOM & ENV
                        styleElement.textContent = css_style_as_string;
                        document.body.append(styleElement);
                        this.env.templates.window.css = styleElement;

                        return true;
                    }
                    catch(err){
                        console.error(this.env.logs.title + "set style for window tempaltes error : " , err);
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
                        console.warn,(this.env.logs.title + "possible something went wrong while parsing")
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