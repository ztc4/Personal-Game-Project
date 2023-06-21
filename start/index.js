
//Grab Canvas and give size
let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 576;
//make canvas background black
ctx.fillRect(0,0,canvas.width,canvas.height)

let gravity = .1

class Sprite{
    //character location and movement speed
constructor({position, velocity},color = "red"){
    this.position = position;
    this.velocity = velocity;
    this.height = 150
    this.width = 50
    //health
    this.health = 100
    this.alive = true
    this.healthLoss;
    this.renderHealthLoss;
    //attack
    this.attack = false;
    this.attackDistance = 0;
    this.attackLocation = this.position.x;
    this.currentAttackY = 0
    this.lastKey
    this.color = color
    
    //collision

    this.attackBox ={
        position:this.position,
        height: 50,
        width: 100,
    }
}
//Create Sprite on canvas
draw(){
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x,this.position.y, 50, this.height)
   

}
longAttack(){
    if(!this.attack){
    this.attack = true;
    this.attackDistance = 100
    this.currentAttackY = this.position.y
    }
    

}
//update
update(){
    if(this.health <= 0){
        this.alive = 0
    }
    this.draw()
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    
  //Moving the character and gravirty
    if(this.height + this.position.y + this.velocity.y > canvas.height){
        this.velocity.y = 0
      
    }else{
        this.velocity.y += gravity
    }
    //attack
    if(this.attack && this.attackDistance > 0){
        console.log("red")
        ctx.fillRect(this.attackLocation,this.currentAttackY, 40,40)
        this.attackDistance -= .3
        this.attackLocation++
    }
    else{
        this.attack = false
        this.attackLocation = this.position.x
       
    }
    this.AttackBox()
}
jump(){
    if(this.velocity.y === 0){
    this.velocity.y = -10 }

}
AttackBox(){
    ctx.fillStyle = 'green'
    ctx.fillRect(
        this.attackBox.position.x ,
        this.attackBox.position.y,
        this.attackBox.width,
        this.attackBox.height
    )
}
SubtractHealth(num){
    this.health -= num;
    ctx.font = "15dpx serif"
    ctx.fillStyle = 'yellow'
    //Slow down number as they pop up
    if(Math.floor(Math.random()* 100) == 4){
    this.healthLoss = Math.floor(Math.random() * 50) + 30;}
    console.log(this.healthLoss)
   
    ctx.fillText(`-${num}`, this.position.x + this.healthLoss,this.position.y + this.healthLoss)

}




}



//Player
const player = new Sprite({
    position:{
    x:0,
    y:0,

},
    velocity:{
    x: 0,
    y: 0
}},"blue")


//enemy
const enemy = new Sprite({
    position:{
    x:400,
    y:100
},
    velocity:{
    x: 0,
    y: 0
}},"red")

//calling methods
player.draw()
enemy.draw()
//keys
const keys = {
    a:{
        pressed: false
    },
    d:{
        pressed: false
    },
    ArrowLeft:{
        pressed: false
    },
    ArrowRight:{
        pressed:false
    }
}

let lastkey


//keep changing the frame
function animate(){
    window.requestAnimationFrame(animate)
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width,canvas.height)
    if(player.alive){player.update()}
    if(enemy.alive){enemy.update()}
    if(enemy.health <= 0){
        enemy.width = 0
        enemy.height = 0
        
    }
    
    player.velocity.x = 0;
    //player movement
    if(keys.a.pressed && lastkey === "a"){
        player.velocity.x = -1;
       
    } else if(keys.d.pressed && lastkey === "d"){
        player.velocity.x = 1
       
    }
    //enemy movement
    enemy.velocity.x = 0
    if(keys.ArrowLeft.pressed && enemy.lastkey === "ArrowLeft"){
        enemy.velocity.x = -1;
       
    } else if(keys.ArrowRight.pressed && enemy.lastkey === "ArrowRight"){
        enemy.velocity.x = 1

       
    }
    //detect for collision
    if(player && enemy.alive && player.attackBox.position.x + player.attackBox.width>= enemy.position.x && player.attackBox.position.x <= enemy.position.x + enemy.width){
        console.log("enemy hit")
        enemy.SubtractHealth(.1)
        console.log(enemy.health)
    }
    
 
   
  
    
}
animate()

//Event listeners

window.addEventListener("keydown",(e)=>{
    console.log(Math.floor(enemy.position.x))
    console.log(Math.floor(player.position.x))
    switch(e.key){
        case "d": keys.d.pressed = true
        lastkey = "d"
        ; break;
        case "a": keys.a.pressed = true
        lastkey = "a"
        ; break;
        case "w": 
        player.jump()
        ; break; 
        case "ArrowRight":
             keys.ArrowRight.pressed = true
        enemy.lastkey = "ArrowRight"
        ; break;
        case "ArrowLeft": keys.ArrowLeft.pressed = true
        enemy.lastkey = "ArrowLeft"
        ; break;
        case "ArrowUp":
            enemy.jump()
       ; break;
    }
})
window.addEventListener("keyup",(e)=>{
    
    switch(e.key){
        case "d": keys.d.pressed = false; break;
        case "a": keys.a.pressed = false; break;
        case "w": player.velocity.y = 0; break;
        case "ArrowRight":keys.ArrowRight.pressed = false;break
        case "ArrowLeft":keys.ArrowLeft.pressed = false;break

    }
})

window.addEventListener("click", ()=>player.longAttack())

