import Sprite,{npc} from "./sprite.js";
import Map from "./map.js"
import dialog from "./npc.js";

let canvas = document.getElementById("canvas1");
let ctx = canvas.getContext("2d");
// dialog second

const dialogHtml =  document.getElementById("dialog");
const dialogText = document.getElementById("dialogText");
// dialogHtml.classList.toggle("dialog")


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
        case "e": if(aroundDialog(true)){console.log("this is the current dialog your on s" +player.currentDialog)};break;
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

const dialogArray1 = ["Hey there, finally up I see?", "As you can probably tell, right now Im desperate", 
"A Great friend of mine has betrayed my trust", "I really need your help",
"Oops! Excuse my manners, I even forgot tell you what went wrong", "My friend Javacript has recently changed, his lust for power has caused me great harm", 
"It all started when JavaScript was born, unlike other languages his creators made him specifically for one thing only...", "Browser Scripting! and he was the best at it",
"But i guess secretly Javascript grew hatred for the limits of his abilities", " and was meeting a programmer that bewitched him with promises of power that could make him reach his true potential",
"The new powers bestowed on to JavaScript were too plentiful",
 "Programmers follow the others lead and made more packages and libraries for JavaScript","As a friend I couldn't let the power corrupt him further","I tried interfering, and slowing down Javascript, but he must of heard of my meddling", "When talking he caught me by surprise, he must of hit me with a new virus",
"I currently can no longer move","I need you to travel north, there you'll meet King NPM",
"Send him my regards, and ask him to disconnect JavaScript immediately from getting anymore packages",
"Report back to me once done!"
]


// Dialogs
const firstDialog = new dialog(ctx,player,dialogHtml,dialogText)
firstDialog.addText(dialogArray1)
    
const secondDialog = new dialog(ctx,player,dialogHtml,dialogText)
const thirdDialog = new dialog(ctx,player,dialogHtml,dialogText)
const fourthDialog = new dialog(ctx,player,dialogHtml,dialogText)
const fifthDialog = new dialog(ctx,player,dialogHtml,dialogText)

// firstDialog.addImages(1,20,"VScodeChat")


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
            
            wantToOpenDialog && firstDialog.makeActive();
            moveForward && firstDialog.nextText();

        
        return true
    }
    //CHEST
    else if (player.location.x >= -228 
        && player.location.x <= -140 &&
         player.location.y >= -500 && 
         player.location.y <= -396 && player.currentDialog == 5){

            wantToOpenDialog && fifthDialog.makeActive();
            moveForward && fifthDialog.nextText();
        
        return true
    }
    //Old Programmer
    else if(player.location.x >= -540 
        && player.location.x <= -383 &&
         player.location.y >= -300 && 
         player.location.y <= -236 && player.currentDialog == 2){

            wantToOpenDialog && secondDialog.makeActive();
            moveForward && secondDialog.nextText();
            console.log("on next dialog")
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
    switch(player.currentDialog){
        case 1:firstDialog.draw() ;break;
        case 2:secondDialog.draw() ;break;
        case 3:thirdDialog.draw() ;break;
        case 4: fourthDialog.draw() ;break;
        case 5:fifthDialog.draw() ;break;
    
    }
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

//which dialog to look out for

switch(player.currentDialog){
    case 1:firstDialog.draw() ;break;
    case 2:secondDialog.draw() ;break;
    case 3:thirdDialog.draw() ;break;
    case 4: fourthDialog.draw() ;break;
    case 5:fifthDialog.draw() ;break;

}


// setInterval(()=> console.table(player.location), 2000);
// setInterval(()=> console.table(map.x ,map.y), 2000)

