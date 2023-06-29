class dialog{

    constructor(ctx,player,dialogBox,dialogText){


        this.dialogText = ["the first dialog","red", "header is here"];
        this.currentNumber = 0
        this.currentImage = new Image;
        this.ctx = ctx;
        this.player = player;
        this.active = false;
        this.hasBeenPlayed = false;
        this.dialogHtml =  dialogBox
        this.dialogInnerText =  dialogText
       

    }
    
    draw(){
        if(this.active ){
            
            console.log(this.currentNumber)
            this.dialogInnerText.innerText = this.dialogText[this.currentNumber]
            console.log(this.dialogText[this.currentNumber])
        
    }
        else if( !this.active ){
            
            this.dialogInnerText.innerText = ""

        }
        
        
        
       
    
    }
    update(){
        this.draw()
    }

    addText(dialogs){
        this.dialogText.push(...dialogs)

    }
    nextText(){
        if(this.currentNumber  <= this.dialogText.length - 2){
            this.currentNumber++
            console.log(this.currentNumber)
            console.log("is changing the number")
            console.log(this.active)
    }
    else{
        this.active = false
        this.hasBeenPlayed = true
        this.player.currentDialog++
        console.log(this.player)
        this.dialogHtml.classList.toggle("dialog")
        this.dialogInnerText.innerText = ""
       
    }
    console.log(this.dialogHtml.classList)
    console.log("this is the dialog text length" + this.dialogText.length)
}



makeActive(){
    this.active = true;
    this.dialogHtml.classList.toggle("dialog")
}
toggleEvent(){

}

}




export default dialog;