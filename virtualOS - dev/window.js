
export class window{

    constructor(
        title = "window" , x = 10, y = 10 , height = 512, width = 512 , 
        focus = true , maximise_button = true , minimise_button = true , 
        visible = true
    ){
        this.title = title ;
        this.x = x; 
        this.y = y;
        this.height = height;
        this.width = width; 
        this.focus = focus; 
        this.max_button = maximise_button;
        this.mini_button = minimise_button;
        this.visible = visible;

        this.template = null;
    }

}