let canvas = document.querySelector("#aurora");
let context = canvas.getContext("2d");

let testCanvas = document.querySelector("#testCanvas");
let testContext = testCanvas.getContext("2d");
const FADE_AMOUNT = 1;

// var offscreen = new OffscreenCanvas(256, 256);
// var gl = offscreen.getContext('2d');

let nightSky = new Image();
nightSky.src = 'images/night.jpg';
nightSky.onload = bkgdLoadComplete;
let trees = new Image();
trees.src="images/trees.png"

let light = new Image();
light.src="images/light.png";
let lightHolder = document.querySelector("#lightHolder");
let lightContext = lightHolder.getContext("2d");

let RGB = [255,0,0];
let currentRGBIndex = 1;
let lastRGBIndex = 0;

function bkgdLoadComplete(){
    lightContext.drawImage(light,0,0);
    update();
}

function update(){
    fadeImage();
    context.drawImage(nightSky,0,0);
    context.drawImage(testCanvas,0,0);
    context.drawImage(trees,0,0);
    changeLightColor();
    window.requestAnimationFrame(update);
}

function moveLight(e){
    testContext.drawImage(lightHolder,e.clientX-(lightHolder.width/2),e.clientY-(lightHolder.height));
}

function changeLightColor(){
    //modify the imageData to change the color
    if(lightHolder.width>0){
        let lightImage = lightContext.getImageData(0,0,lightHolder.width, lightHolder.height);
        let lightData = lightImage.data;
        for(let i = 0;i<lightData.length;i+=4){
            lightData[i] = RGB[0];
            lightData[i+1] = RGB[1];
            lightData[i+2] = RGB[2];
        }
        lightContext.putImageData(lightImage,0,0);
    }
    //cycle through different colors
    if(RGB[currentRGBIndex]<255){
        RGB[currentRGBIndex]++;
        RGB[lastRGBIndex]--;
    }else{
        //move to the next color
        lastRGBIndex = currentRGBIndex;
        currentRGBIndex = currentRGBIndex+1<RGB.length?currentRGBIndex+1:0;
    }
}

function fadeImage(){
    if(testCanvas.width>0){
        let tempImage = testContext.getImageData(0,0,testCanvas.width, testCanvas.height);
        let tempData = tempImage.data;
        //reduce the alpha values; i.e. every fourth value
        for(let i = 3;i<tempData.length;i+=4){
            tempData[i]=tempData[i]>FADE_AMOUNT?tempData[i]-FADE_AMOUNT:0;
        }
        testContext.putImageData(tempImage,0,0);
    }
}

//listen for mouse movement
canvas.addEventListener("mousemove", moveLight);
//hide the cursor on the canvas
canvas.style.cursor = "none";