
export class os{

    constructor(window_html_obj = {} , window_css_obj = {}){

        this.current = {};

        this.add = {

            window : () => {
                console.warn("working...");
            },

        }

        this.env = {

            templates : {
                
                templateToHTML : (str) => {
                    try{
                        let parser = new DOMParser();
                        let html = parser.parseFromString(str, 'text/html');
                        
                        return html;
                    }
                    catch(err) {
                        console.error("Window Parse To HTML Error : " , err);
                        return null;
                    }
                },

                window : {
                    html : null,
                    css  : null,
                
                    updateHtml  : (new_html_template_as_string = "") => {

                    },

                    updateStyle : () => {
                        try{
                            let new_style = document.createElement("style");
                            new_style.textContent = this.css;
                            
                            document.body.append(new_style);
                        }
                        catch(err) {
                            console.error("Window Update Style Error : " , err);
                        }
                    },

                    setStyle : (css_style_as_string = "") =>{
                        try{
                            this.css = css_style_as_string
                            this.env.templates.window.updateStyle();
                        }
                        catch(err){
                            console.error("Window Set Style Error : " , err);
                        }
                    },

                    setHtml : (html_template_as_string = "") => {
                        this.env.templates.templateToHTML(html_template_as_string);

                    },
                },

                taskbar : {
                    html : null,
                    css  : null
                }
            }
        }
    }

}