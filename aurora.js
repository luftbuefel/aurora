let canvas = document.querySelector("#aurora");
let context = canvas.getContext("2d");

let testCanvas = document.querySelector("#testCanvas");
let testContext = testCanvas.getContext("2d");
const FADE_AMOUNT = 3;

// var offscreen = new OffscreenCanvas(256, 256);
// var gl = offscreen.getContext('2d');

let nightSky = new Image();
nightSky.src = 'images/night.jpg';
nightSky.onload = bkgdLoadComplete;
let trees = new Image();
trees.src="images/trees.png"

let light = new Image();
light.src="images/light.png";
light.setAttribute("style","background-color:#00ff00ff;");


function bkgdLoadComplete(){
    context.drawImage(nightSky,0,0);
    update();
}

function update(){
    updateAuroraEffect();
    context.drawImage(nightSky,0,0);
    context.drawImage(testCanvas,0,0);
    context.drawImage(trees,0,0);
    window.requestAnimationFrame(update);
}

function moveLight(e){
    testContext.drawImage(light,e.clientX-(light.width/2),e.clientY-(light.height));
    
    
    
//     testContext.fillStyle = "#00ff0011";
//   testContext.fillRect(0, 0, testCanvas.width, testCanvas.height)
//   testContext.globalCompositeOperation = 'destination-atop'


//   ctx.globalAlpha = 1
//   testContext.drawImage(light, 0, 0)
    //change the light's color
    //light.setAttribute("style", "color: tint(#BADA55, 42%);");
    
   /*// Now we'll multiply a rectangle of your chosen color
    testContext.fillStyle = '#00ff00';
    testContext.globalCompositeOperation = 'source-out';
    testContext.fillRect(0, 0, testCanvas.width, testCanvas.height);*/
    
    //console.log(light);
}

function displayData(e){
    console.log(testContext.getImageData(0,0,canvas.width, canvas.height));
}

function updateAuroraEffect(){
    if(testCanvas.width>0){
        let tempImage = testContext.getImageData(0,0,testCanvas.width, testCanvas.height);
        let tempData = tempImage.data;
        //reduce the alpha values; i.e. every fourth value
        // for(let i = 3;i<tempData.length;i+=4){
        for(let i = 3;i<tempData.length;i+=4){
            tempData[i]=tempData[i]>FADE_AMOUNT?tempData[i]-FADE_AMOUNT:0;
            tempData[i-2]+=FADE_AMOUNT;
        }
        testContext.putImageData(tempImage,0,0);
    }
}

//listen for mouse movement
canvas.addEventListener("mousemove", moveLight);
//hide the cursor on the canvas
canvas.style.cursor = "none";