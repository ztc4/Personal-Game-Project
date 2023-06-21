const canvas = document.getElementById("canvas1");
//get context
const ctx = canvas.getContext("2d");
console.log(ctx)
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

//create image
const playerImage = new Image();
playerImage.src = 'shadow_dog.png'
//Average size and height of sprite
const spriteWidth = (6876 / 12) ;
const spriteHeight = (5230/10);
//animation names for changing using event listener
let animationNames = [];
let indexAnimation = 0
//represents which animation is being animated in function animate(line 110)
let playerState = animationNames[indexAnimation] || "roll";

//variable for speed of animation
let gameFrame = 0;
const staggerFrames = 7;



//Change animation on keydown
function changeAnimation(e){
 if(e.key === "w" || e.key === "W"){
    ++indexAnimation;
    playerState = animationNames[indexAnimation]

 }
 if(indexAnimation >= animationNames.length -1){
    indexAnimation = 0
 }
 
 
}

window.addEventListener("keydown", changeAnimation)

//Used to store cordinates 
const spriteAnimation = [];

//name of animation and how many frames it needs
const animationStates =[
    {
        name: "idle",
        frame: 7,
    },
    {
        name: "jump",
        frame: 7,
    },
    {
        name: "fall",
        frame: 7,
    },
    {
        name: "run",
        frame: 9,
    },
    {
        name: "dizzy",
        frame: 11,
    },
    {
        name: "sit",
        frame: 5,
    },
    {
        name: "roll",
        frame: 7,
    },
    {
        name: "bite",
        frame: 7,
    },
    {
        name: "ko",
        frame: 12,
    },
    {
        name: "getHit",
        frame: 4,
    }
]

//Take index(acts as row)
animationStates.forEach((state,index)=>{
    let frames = {
        loc:[]
    }

    //loops throught each column in row and gets position of sprite in documents
    for(let j = 0; j <state.frame; j++){
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        //x and y coordinates of sprite in picture
        frames.loc.push({x: positionX, y: positionY})
    }
    // addes coordinates to new array
    spriteAnimation[state.name] = frames;
    //add animation names into new array
    animationNames.push(state.name)
});



function animate(){
    //Clears the Canvas
    ctx.clearRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
    //First half Formula for animation speed && getting how many frames it has to flip through
    let position = Math.floor(gameFrame/staggerFrames) % spriteAnimation[playerState].loc.length;

    //multiply average spriteWidth * position(frame its on to get X coordinate)
    let frameX = spriteWidth * position;
    //get the Y from earlier
    let frameY =spriteAnimation[playerState].loc[position].y;
    //Cut sprite out of image or manipulate image to where sprite is
    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0,0, spriteWidth,spriteHeight)

    gameFrame++
   
    
   
    
    requestAnimationFrame(animate)
};
animate()


