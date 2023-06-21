class dialog{

    constructor(ctx,player){


        this.dialogImages = [];
        this.currentNumber = 0
        this.currentImage = new Image;
        this.ctx = ctx;
        this.player = player;
        this.active= false;
        this.hasBeenPlayed = false;

    }
    
    draw(){
        this.ctx.fillStyle = this.color;
        this.currentImage.src = this.dialogImages[this.currentNumber]
        this.ctx.drawImage(this.currentImage,0,0)
       
    
    }
    update(){
        if(this.currentNumber < this.dialogImages.length && this.active ){
        this.draw()}
    }
    addImages(startNumber,endNumber , path){
        for(let i = startNumber; i < endNumber; i++){
            this.dialogImages.push(`${path}/${i}.png`)
        }
        this.currentImage.src = this.dialogImages[this.currentNumber];
        console.log(this.currentImage.src)
        console.log(this.dialogImages)


    }
    nextImage(){
        if(this.dialogImages.length > this.currentNumber){
            this.currentNumber++
    }
    else{
        this.active = false
        this.hasBeenPlayed = true
        this.player.currentDialog++
        console.log(this.player)
       
    }
    console.log(this.currentNumber)
    console.log(this.dialogImages)
}
makeActive(){
    this.active= true;
}
toggleEvent(){

}

}




export default dialog;