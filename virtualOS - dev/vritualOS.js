import {window} from "./window.js";

export class virtualOS{

    constructor(){

        this.env = {

            logs : {
                title : "[VOS] ",
            },

            desktop : { },

            templates : {

                window : {
                    html : null ,
                    css  : null ,
                }

            }

        }

        this.add = {

            window : () => {
                console.warn("working...");
            },

        },

        this.set = {
            
            templateToHTML : (str) => {
                try{
                    let parser = new DOMParser();
                    let html = parser.parseFromString(str, 'text/html');
                    
                    return html.body.firstElementChild;
                }
                catch(err) {
                    console.error(this.env.logs.title + "parsing html : " , err);
                    throw null;
                }
            },

            window : {

                css : (css_style_as_string = "") =>{
                    try{
                        let styleElement = document.querySelector("#window_style") || document.createElement("style"); 
                        
                        if(styleElement.id != "window_style") {
                            styleElement.id = "window_style";
                            console.warn(this.env.logs.title + "generating new style for window ...");
                        }
                        
                        styleElement.textContent = css_style_as_string;
                        document.body.append(styleElement);
                        
                        this.env.templates.window.css = styleElement;
                    }
                    catch(err){
                        console.error(this.env.logs.title + "set style to window error : " , err);
                    }
                },

                html : (html_template_as_string = "") => {
                    let parsed_html = this.set.templateToHTML(html_template_as_string);

                    if(parsed_html == null){
                        console.warn,(this.env.logs.title + "invalid template string")
                        return false;
                    }

                    this.env.templates.window.html = parsed_html;
                    document.body.append( this.env.templates.window.html )
                    return true;
                },

            }

        }
        
        this.get = {

            window : {
                html : () => {

                },
                css : () => {
                    
                }
            }

        }
    }

}