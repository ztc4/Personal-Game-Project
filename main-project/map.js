export default class Map{
    constructor(ctx){
        this.x = -200;
        this.y = -368;
        this.velocity = 0
        this.image;
        this.ctx = ctx
        this.size = {x:1000,y:1000}
    }
    mainMap(){
        this.x = -200;
        this.y = -368;

    }
    draw(){
        this.ctx.drawImage(this.image, this.x , this.y )
    }
    update(){
        this.draw()
    }

}
