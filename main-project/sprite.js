


export default class Sprite{
    constructor(position = {x:10,y:10},size = {width:10,height:10},ctx){
        this.position = position;
        this.size = size;
        this.alive = true;
        this.color = "blue";
        this.ctx = ctx;
        this.user;
        this.location;
        this.image;
        this.currentDialog = 1;

    }
    
    draw(){
        this.ctx.fillStyle = this.color;
        // this.ctx.fillRect(this.position.x,this.position.y, this.size.width , this.size.height)
        this.ctx.drawImage(this.image,this.position.x,this.position.y,this.size.width , this.size.height)
       
    
    }
    update(){
        this.draw()
    }
    setLocation(x,y){
        this.location = {x: x - this.position.x, y: y - this.position.y}
    }

    isSprite(){
        console.log("this is the player")
    }
   

}


//NPCS

export class npc extends Sprite{


    super(position= {x:10,y:10},size= {width:10,height:10}){
        this.position = position;
        this.size = size;
    
  

    }
    getInfo(){
        console.log(this.alive,this.position,this.size,this.color)
    }
    draw(){
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.position.x,this.position.y, this.size.width , this.size.height)
       
    
    }
    update(){
        this.draw()
    }
    setLocation(x,y){
        this.location = {x: x - this.position.x, y: y - this.position.y}
    }

    isSprite(){
        console.log("this is a sprite")
    }
 }


// export{Game,Sprite}