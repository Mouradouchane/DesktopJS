
export class element {
    
    // properties
    #props = {

        parents  : [],
        children : [],

        html : document.createElement("div"),
        css  : { }, // css as object

        x : 0, y : 0 , old_x : 0 , old_y : 0 ,
        
        width : 0 , height : 0 , old_width : 0 , old_height : 0 ,

        visible : true , 
        resizable : false,
        draggable : false,

        id : null ,
        index : 0 , 
        title : "title",
        text  : "text",

    };

    /*
        when callbacks for event get stored
    */
    #callbacks = {

    };

    // on event
    on = {

        click : ( call_back_function , ...call_back_args ) => { },
        click_right : ( call_back_function , ...call_back_args ) => { },

        dblclick : ( call_back_function , ...call_back_args ) => { },
        dblclick_right : ( call_back_function , ...call_back_args ) => { },
        
        hover : ( call_back_function , ...call_back_args ) => { },

        resize : ( call_back_function , ...call_back_args ) => { },
        drag_start : ( call_back_function , ...call_back_args ) => { },
        drag_in : ( call_back_function , ...call_back_args ) => { },
        drag_end : ( call_back_function , ...call_back_args ) => { },
        
        visible : ( call_back_function , ...call_back_args ) => { },
        hidden  : ( call_back_function , ...call_back_args ) => { },
        delete  : ( call_back_function , ...call_back_args ) => { },

        css_change : ( call_back_function , ...call_back_args ) => { },
        html_change : ( call_back_function , ...call_back_args ) => { },


    };

    get = {

    };

    set = {

    };


    constructor(
        id = null , title = "" , text = "" , x = 0 , y = 0 , width = 0 , height = 0 , 
        visible = true , draggable = false , resizable = false  
    ){


        // set callbacks list to default  

        const events_names = [
            "click","click_right","dblclick","dblclick_right", 
            "hover","resize","drag_start","drag_in","drag_end",
            "visible", "hidden", "delete", "css_change", "html_change" 
        ];

        for( const name of events_names ){
            this.#callbacks[name] = {
                call_back_function : null,
                call_back_args : [],
            }
        }


        // set getter's list 

        const getters_functions_names = [
            "title","id","text","x","y","old_x","old_y",
            "width","old_width","height","old_height",
            "css","resizable","draggable","visible","html",
            "index"
        ];

        for( const name of getters_functions_names ){
            return this.#props[name];
        }



    } // end of constructor

}