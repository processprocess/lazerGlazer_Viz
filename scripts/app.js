//GRAB SCENE
let scene = document.querySelector(`a-scene`);

//SET CONTAINER
let objectContainer = document.createElement(`a-entity`);
objectContainer.setAttribute(`position`, `0 1.6 -2`);
objectContainer.setAttribute(`scale`, `.4 .4 .4`);
scene.appendChild(objectContainer);

//RANDOM COLOR FUNCTION
function getRandomColor(){
  let randomColor = Math.floor(Math.random()*(16777215-600000+1)+600000).toString(16);
  // let randomColor = Math.floor(Math.random()*16777215).toString(16);
  return randomColor;
}

//RANDOM NUMBER FUNCTION
function getRandomnumber(){
  let randomNumber = Math.floor(Math.random()*(30-10+1)+10);
  return randomNumber;
}

//SET AMOUNT OF ELEMENTS
let totalSteps = getRandomnumber();
let totalRotations = getRandomnumber();

//SET LIGHTS
let sceneSky = document.createElement(`a-sky`);
sceneSky.setAttribute(`color`, `#${getRandomColor()}`);
sceneSky.setAttribute(`animation__color`, `property:color ; dir:alternate ; dur:2000 ; easing:easeInOutSine ; loop:true ; to:#${getRandomColor()}`);
scene.appendChild(sceneSky);

let ambientLight = document.createElement(`a-light`);
ambientLight.setAttribute(`id`, `theAmbientLight`);
ambientLight.setAttribute(`type`, `ambient`);
ambientLight.setAttribute(`intensity`, `.7`);
ambientLight.setAttribute(`color`, `#FFFFFF`);
scene.appendChild(ambientLight);

let light1 = document.createElement(`a-light`);
light1.setAttribute(`id`, `blueToRedLight`);
light1.setAttribute(`color`, `#0000FF`);
light1.setAttribute(`intensity`, `3`);
light1.setAttribute(`position`, `-5.72 6.65 0.80`);
light1.setAttribute(`animation__color`, `property:color ; dir:alternate ; dur:2000 ; easing:easeInOutSine ; loop:true ; to:#FF0000`);
light1.setAttribute(`alongpath`, `path:10,10,-10 -20,10,-10 10,0,-10; closed:true; dur:12000;`);
scene.appendChild(light1);

let light2 = document.createElement(`a-light`);
light2.setAttribute(`id`, `blueToRedLight`);
light2.setAttribute(`color`, `#FF0000`);
light2.setAttribute(`intensity`, `5`);
light2.setAttribute(`position`, `8.60 6.65 0.80`);
light2.setAttribute(`animation__color`, `property:color ; dir:alternate ; dur:2000 ; easing:easeInOutSine ; loop:true ; to:#0000FF`);
light2.setAttribute(`alongpath`, `path:-2,-2,5 2,-1,5 0,-1,5; closed:true; dur:3000;`);
scene.appendChild(light2);

//GENERATE ELEMENTS AND APPEND THEM ONTO ROTATION CONTAINERS
for (let i=1 ; i<=totalRotations ; i++){
  let currentRotation = 360 / totalRotations * i;
  let rotateContainer = document.createElement(`a-entity`);
  rotateContainer.setAttribute(`rotation`, `0 0 ${currentRotation}`);

  for (let i=1 ; i<=totalSteps ;i++) {
    let circleElementContainer = document.createElement(`a-entity`);
    circleElementContainer.setAttribute(`class`, `circleElementContainer${i}`);
    let evenDistance = i / totalSteps  ;
    // let evenDistance = i * 1.5 / totalSteps * i ; //save this for true evenness for elements
    circleElementContainer.setAttribute(`position`, `0 ${evenDistance} 0`);
    let randomColorForThis = getRandomColor();
    let circleElement = document.createElement(`a-entity`);
    circleElement.setAttribute(`class`, `circleElement${i}`);
    let currentSize = i / totalSteps;
    circleElement.setAttribute(`scale`, `${currentSize} ${currentSize} ${currentSize}`);
    circleElement.setAttribute(`material`, `color:#${randomColorForThis} ; metalness:0 ; roughness:0; `);
    circleElement.setAttribute(`geometry`, `primitive:sphere; radius:1.5;`);
    circleElement.setAttribute(`animation__yoyo`, `property: scale; dir: alternate; dur: ${currentSize*10000}; easing: easeInOutSine; loop: true; to: 0 0 0`);
    circleElementContainer.appendChild(circleElement);
    rotateContainer.appendChild(circleElementContainer);
  }
  objectContainer.appendChild(rotateContainer);
}
//GET VALUE FOR PATH RANDOMIZATION
function pathValue(){
  return Math.floor(Math.random()*(10*2+1)-10);
}
//GET DURATION RANDOMIZATION FOR PATH
function duration(){
  return Math.floor(Math.random()*(10-5+1)+5);
}

//GRAB EVERY OTHER SPHERE ELEMENT IN RING AND ALTER ITS PATH
for(let i=0 ; i<=totalSteps ; i++){
  let circleRing = document.getElementsByClassName(`circleElement${i}`);

      let valueOne = pathValue()
      let valueTwo = pathValue()
      let randomDuration = duration()

    for (let i=0 ; i<circleRing.length ; i++){
      if(i%2 == 0){
      circleRing[i].setAttribute(`alongpath`, `path: 0,0,0 ${valueOne},${valueTwo},${valueOne} ${valueTwo},${valueOne},${valueTwo} ; closed:true ; dur:${randomDuration}000 ; loop:true`);
    }else{
      circleRing[i].setAttribute(`alongpath`, `path: 0,0,0 ${valueTwo},${valueOne},${valueTwo} ${valueOne},${valueTwo},${valueOne} ; closed:true ; dur:${randomDuration}000 ; loop:true`);
    }
  }
}

// TODO: fix getRandomColor to generate only valid hex values
// TODO: DRY out randomization functions. Feeling like I have too many
// TODO: encapsulate logic to minimize global variables