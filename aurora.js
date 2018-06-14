let canvas = document.querySelector("#aurora");
let context = canvas.getContext("2d");

let testCanvas = document.querySelector("#testCanvas");
let testContext = testCanvas.getContext("2d");
const FADE_AMOUNT = 3;

// let offScreen = new OffscreenCanvas(canvas.width, canvas.height);
// let offContext = offScreen.getContext("2d");

let nightSky = new Image();
nightSky.src = 'images/night.jpg';
nightSky.onload = bkgdLoadComplete;
let trees = new Image();
trees.src="images/trees.png"

let light = new Image();
light.src="images/light.png";

let lastScreen = new Image();

function bkgdLoadComplete(){
    context.drawImage(nightSky,0,0);
    update();
}

function update(){
    fadeOut();//testContext.getImageData(0,0,testContext.width, testContext.height));
    window.requestAnimationFrame(update);
}

function moveLight(e){
    context.drawImage(nightSky,0,0);
   // context.drawImage(light,e.clientX-(light.width/2),e.clientY-(light.height));
    testContext.drawImage(light,e.clientX-(light.width/2),e.clientY-(light.height));
    //et fadeImage = testContext.getImageData(0,0,testCanvas.width, testCanvas.height);
    context.drawImage(testCanvas,0,0);
    //testContext.drawImage(trees,0,0);
    context.drawImage(trees,0,0);
}

function displayData(e){
    console.log(testContext.getImageData(0,0,canvas.width, canvas.height));
}

function fadeOut(){
    if(testCanvas.width>0){
        let tempImage = testContext.getImageData(0,0,testCanvas.width, testCanvas.height);
        let tempData = tempImage.data;
        //reduce the alpha values; i.e. every fourth value
        for(let i = 3;i<tempData.length;i+=4){
            tempData[i]=tempData[i]>FADE_AMOUNT?tempData[i]-FADE_AMOUNT:0;
        }
        //console.log("fadeout");
        testContext.putImageData(tempImage,0,0);
    }/*else{
        console.log("no image", Math.random());
    }*/
    
    
    // ctx.putImageData(imgData, 90, 10);
}

//listen for mouse movement
canvas.addEventListener("mousemove", moveLight);
//hide the cursor on the canvas
// canvas.style.cursor = "none";
canvas.onclick = fadeOut;
