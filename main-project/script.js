import Sprite,{npc} from "./sprite.js";
import Map from "./map.js"
import dialog from "./npc.js";

let canvas = document.getElementById("canvas1");
let ctx = canvas.getContext("2d");
const canvasHeight = ctx.height = 576;
const canvasWidth = ctx.width = 1024;
let x = -200;
let y = -368;
//Images
const playerImage = new Image;
playerImage.src = "Animation/stand-backward.png"
const mapImage = new Image;
mapImage.src = "map/map.png";
const makeDialog = new Image;
makeDialog.src =  "Animation/pressE.png"
const chatBox = new Image;
let integer = 1
chatBox.src = `VScodeChat/${integer}.png`


let playerLocation = {x: 10,y:10}



//Check if the current dialogue is this dialogue and if that dialogue is active then increment plus 1
function CheckAndIncrement(){

    if(firstDialog.active && player.dialog == 1){
        firstDialog.nextImage()
    }


}




//Player movement

function playerMovement(e){
    

    switch(e.key){
        case "d": if(player.location.x >= -1000){player.position.x += 1; player.location.x -= 1} ;break;
        case "a": if(player.location.x <= 0){player.position.x -= 1;player.location.x += 1};break;
        case "w": if(player.location.y <= -32){player.position.y -=1;player.location.y += 1};break;
        case "s": if(player.location.y >= -986){player.position.y += 1;player.location.y -= 1};break;
        
        
    }
}

    //add movement events
    function addMovement(){
        console.log("added movement")
        window.addEventListener("keydown", playerMovement)

    }
    //remove Events
    function removeMovement(){
        window.removeEventListener("keydown", playerMovement)
        }




//Camera Movement

function cameraMovement(e){

    switch(e.key){
        case "ArrowRight": if(map.x <= 0){map.x += 1;player.position.x += 1} ;break;
        case "ArrowLeft": if(map.x >= -1000){map.x -= 1;player.position.x -= 1};break;
        case "ArrowUp": if(map.y >= -1000){map.y -=1;player.position.y -=1};break;
        case "ArrowDown": if(map.y <= 0){map.y +=1;player.position.y +=1};break;
        case "e": if(aroundDialog(true)){console.log("red")};break;
        case "r": if(aroundDialog(false,true)){console.log("red")};break;
        
    }
}
    //add movement events
    function addCameraMovement(){
        console.log("added movement")
        window.addEventListener("keydown", cameraMovement)

    }
    //remove Events
    function removeCameraMovement(){
        window.removeEventListener("keydown", cameraMovement)
        }

//add player
//player

const player = new Sprite({x:20,y:10},{width:20,height:20}, ctx);
player.image = playerImage;
addMovement()


// add map


const map = new Map(ctx)
map.image = mapImage;
addCameraMovement()

// Dialogs
const firstDialog = new dialog(ctx,player)
firstDialog.addImages(1,20,"VScodeChat")
console.log(firstDialog.currentImage.src)



//Check if player is on the edge of map, if so it adds to map

function mapNeedtoMove(){
    if(player.position.x >= 300){
        map.x -= 300
        player.position.x = 1
    
    } else if(player.position.x <= 0){
        map.x += 300;
        player.position.x = 299
        
    }
    if(player.position.y >= 150){
        map.y -= 150
        player.position.y = 1
    
    } else if(player.position.y <= 0){
        map.y += 150;
        player.position.y = 140
        
    }

}
// isPlayerAroundDialagOption

// function allowDialog(e,dialog){
//     if(e.key == "e"){
//         console.log("e was pressed")
//         [dialog].makeActive()

//     }
// }


function aroundDialog(wantToOpenDialog,moveForward){
    //VSCODE
    if(player.location.x >= -228 
        && player.location.x <= -140 &&
         player.location.y >= -500 && 
         player.location.y <= -396  && (player.currentDialog == 1 || player.currentDialog == 3)){
            
            wantToOpenDialog && firstDialog.makeActive()
            moveForward && firstDialog.nextImage()

        
        return true
    }
    //CHEST
    if(player.location.x >= -228 
        && player.location.x <= -140 &&
         player.location.y >= -500 && 
         player.location.y <= -396 && player.currentDialog == 5){
        
        return true
    }
    //Old Programmer
    if(player.location.x >= -540 
        && player.location.x <= -383 &&
         player.location.y >= -300 && 
         player.location.y <= -236 && player.currentDialog == 4){
        
        return true
    }
    return false
}

//
function openDialog(e){
    console.log(e.key)
    console.log("hello")
if(e.key == "r"){
    console.log("r")


}
window.addEventListener("keydown", () =>openDialog())

}


//Animate

function animate(){
 
    ctx.clearRect(0,0, canvasWidth,canvasHeight);

    




mapNeedtoMove()



    //Update
   
    
    map.update()
    player.update()
    firstDialog.update()
    ctx.fillStyle = "white";
    if(player.location){
        if(aroundDialog()){
            
            ctx.drawImage(makeDialog,player.position.x ,player.position.y + 20,10,10)

        }
    }
    
    // npc1.update()

    requestAnimationFrame(animate)

}

animate()




player.setLocation(map.x,map.y)
player.draw()

map.draw()
firstDialog.draw()
// setInterval(()=> console.table(player.location), 2000);
// setInterval(()=> console.table(map.x ,map.y), 2000)

