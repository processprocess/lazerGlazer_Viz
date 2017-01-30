const scene = document.querySelector('a-scene')
const sky = document.querySelector('a-sky')
const objectContainer = document.querySelector('#object-container')

function getRandomNumber(x, y) {
  return Math.floor(Math.random() * x + y)
}

const totalSteps = getRandomNumber(17, 10)
const totalRotations = getRandomNumber(17, 10)

function getRandomColor() {
  const letters = '0123456789abcdef'
  let randomColor = ''
  for (let i = 0; i < 6; i++) {
    randomColor += letters[Math.floor(Math.random() * 16)]
  }
  return randomColor
}

sky.setAttribute('color', `#${getRandomColor()}`)
sky.setAttribute('animation__color', `property: color; dir: alternate; dur: 2000; easing: easeInOutSine; loop: true; to: #${getRandomColor()}`)

function getRandomShape() {
  const shapes = ['sphere', 'octahedron', 'icosahedron', 'torus', 'tetrahedron']
  return shapes[Math.floor(Math.random() * shapes.length)]
}

function generateElements() {
  for (let i = 1; i <= totalRotations; i++) {
    const currentRotation = 360 / totalRotations * i
    const rotateContainer = document.createElement('a-entity')
    rotateContainer.setAttribute('rotation', `0 0 ${currentRotation}`)
    for (let j = 1; j <= totalSteps; j++) {
      const evenDistance = j / totalSteps
      const currentSize = j / totalSteps
      const circleElementContainer = document.createElement('a-entity')
      circleElementContainer.setAttribute('class', `circleElementContainer${j}`)
      circleElementContainer.setAttribute('position', `0 ${evenDistance} 0`)
      const circleElement = document.createElement('a-entity')
      circleElement.setAttribute('class', `circleElement${j}`)
      circleElement.setAttribute('scale', `${currentSize} ${currentSize} ${currentSize}`)
      circleElement.setAttribute('material', `color:#${getRandomColor()}; metalness: 0; roughness: 0`)
      circleElement.setAttribute('geometry', `primitive: ${getRandomShape()}; radius: 1.5`)
      circleElement.setAttribute('animation__yoyo', `property: scale; dir: alternate; dur: ${currentSize * 10000}; easing: easeInOutSine; loop: true; to: 0 0 0`)
      circleElementContainer.appendChild(circleElement)
      rotateContainer.appendChild(circleElementContainer)
    }
    objectContainer.appendChild(rotateContainer)
  }
}

function alterEveryOtherPath() {
  for (let i = 0; i <= totalSteps; i++) {
    let circleRing = document.getElementsByClassName(`circleElement${i}`)
    let valueOne = getRandomNumber(21, -10)
    let valueTwo = getRandomNumber(21, -10)
    let randomDuration = getRandomNumber(6, 5)
    for (let j = 0; j < circleRing.length; j++) {
      if (j % 2 == 0) {
        circleRing[j].setAttribute('alongpath', `path: 0,0,0 ${valueOne},${valueTwo},${valueOne} ${valueTwo},${valueOne},${valueTwo}; closed: true; dur: ${randomDuration}000; loop: true`)
      } else {
        circleRing[j].setAttribute('alongpath', `path: 0,0,0 ${valueTwo},${valueOne},${valueTwo} ${valueOne},${valueTwo},${valueOne}; closed: true; dur: ${randomDuration}000; loop: true`)
      }
    }
  }
}

generateElements()
alterEveryOtherPath()
