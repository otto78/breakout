let playGround = document.querySelector('#playGround')
let command = document.querySelector('#command')

let xStart = playGround.getBoundingClientRect().x
let xEnd = playGround.getBoundingClientRect().right
let yStart = playGround.getBoundingClientRect().y
let yEnd = playGround.getBoundingClientRect().bottom
let width = playGround.getBoundingClientRect().width
let height = playGround.getBoundingClientRect().height


let timderId
//console.log('Width: ' + width)
//console.log('xStart: '+xStart)


//Creazione pad

let pad = document.createElement('div')
pad.classList.add('pad', 'd-flex', 'justify-content-between')
pad.innerHTML =`
<div class="corner"></div>
<div class="corner"></div>
`

playGround.append(pad)

padWidth = pad.getBoundingClientRect().width
//docWidth = playGround.innerWidth

//console.log('pad: '+padWidth)

padHeight = pad.getBoundingClientRect().height
pad.style.top = ((height-padHeight*3) +'px')
let padPosition = width/2
pad.style.left = padPosition +'px'


//create a brick
brickWidth = width*0.15
brickHeight = height*0.05
console.log('brickWidth:' + brickWidth)
console.log('brickHeight:' + brickHeight)


class Brick{
    constructor(x, y){
        this.bottomLeft =[x, y]
        this.bottomRight = [x + brickWidth, y]
        this.topLeft = [x, y + brickHeight]
        this.topRight = [x + brickWidth, y + brickHeight]
    }
}

let bricks =[
    new Brick(width*0.05, height*0.05),
    new Brick(width*0.22, height*0.05),
    new Brick(width*0.39, height*0.05),
    new Brick(width*0.56, height*0.05),
    new Brick(width*0.73, height*0.05),
    
    
]


function addBricks(){
    for(let i=0; i<bricks.length; i++){
        let brick = document.createElement('div')
        brick.classList.add('brick')
       
        brick.style.left = bricks[i].bottomLeft[0] + 'px'
        brick.style.top = bricks[i].bottomLeft[1] + 'px'
        
        playGround.append(brick)
        // console.log('brick: '+ i)
        // console.log(bricks[i].bottomLeft[0])
        // console.log(bricks[i].bottomLeft[1])

    }
}


addBricks()











document.addEventListener('keydown', movePadKey)
playGround.addEventListener('mousemove', movePadMouse);
//command.addEventListener('pointerdown',  movePadCommand)


//Creazione ball
let ball = document.createElement('div')
ball.setAttribute('id', 'ball')

xDirection = 5
yDirection = 5


const ballStart = [(width/2-10), (height - padHeight*4 -5)]
let ballCurrentPosition = ballStart
drowBall()
let ballDiametro = ball.getBoundingClientRect().width


document.addEventListener('click', ballMove)








//--------------------------------------------------------------------
//Funzioni Pad

function drowPad(){
    
    playGround.append(pad)
    pad.style.left = padPosition +'px'
}

function movePadKey(event){
    if(event.key == 'ArrowLeft' && padPosition > 0){   
         
        padPosition = padPosition - 50
        if(padPosition < padWidth/2) {padPosition = padWidth/2}
        
        pad.remove()
        drowPad()
    }
    
    if(event.key == 'ArrowRight' && padPosition < width - padWidth/2){    
        
        padPosition = padPosition + 50      
        if(padPosition > width - padWidth/2) {padPosition = width - padWidth/2} 
        
        pad.remove()
        drowPad()
    }


}

function movePadMouse(event) {
    let pointer = event.clientX - xStart;
    
    if (pointer < padWidth/2){
        pad.style.left = (padWidth/2  + 'px');
    } else if(pointer > width-padWidth/2){
        pad.style.left = (width-padWidth/2  + 'px');
    }else{
        padPosition = pointer;
        pad.remove()
        drowPad()
        //console.log(Math.floor(padPosition - padWidth/2), Math.floor(padPosition + padWidth/2))
        
        
    }      
}

// Da sistemare
// function movePadCommand(){
       
//     let click = true;
//     command.style.borderColor= "Red"
      
//     document.addEventListener('pointerup', function() {
//         command.style.borderColor = "Green"
//         click = false;
//     });
    
//     document.addEventListener('pointermove', function(event) {
        
//         let finger = event.clientX;
//         let commandWidth = command.getBoundingClientRect().width
      
//         //if (click) {
        
//         if (finger < padWidth/2) {
//             command.style.left = (-width/2+commandWidth/2) + 'px';
//             pad.style.left = (padWidth/2  + 'px');
    
//         } else if(finger > width-padWidth/2) {
//             command.style.left = (width/2-commandWidth/2) + 'px';
//             pad.style.left = (width-padWidth/2  + 'px');
    
//         } else {
//             command.style.left = (finger-width/2) + 'px';
//             pad.style.left = (finger  + 'px');
//         }     
       
//         //}
//     })
// }

// command.addEventListener('pointermove', function(event) {
//     event.preventDefault()   
//     let finger = event.clientX;
    
//     console.log(Math.floor(finger))
    
    
    
// })

// Funzioni ball

function drowBall(){
    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.top = ballCurrentPosition[1] + 'px'
    playGround.append(ball)
}

function ballMove(){
    document.removeEventListener('click', ballMove)
    timerId = setInterval(move, 20)
}

function move(){
    checkCollision()
    ballCurrentPosition[0] += xDirection 
    ballCurrentPosition[1] -= yDirection    
    
    ball.remove()
    drowBall()  
}

function checkCollision(){
    let data = document.querySelector('#data')
    data.innerHTML = `x: ${xDirection}      y: ${yDirection}` 
    // console.log('x: '+xDirection)
    // console.log('y: '+ yDirection)
    
    if(ballCurrentPosition[0]>= width-ballDiametro || ballCurrentPosition[0] <= 0){
        changeXDirection()
    }

    if(ballCurrentPosition[1]<= 0){
        changeYDirection()
    }

    // Pad Bounce
    if((ballCurrentPosition[1] > (height-padHeight*4 - 3))
    && (ballCurrentPosition[0] >= (padPosition - padWidth/2 + 20))
    && (ballCurrentPosition[0] <= (padPosition + padWidth/2 - 20))){
        changeYDirection()
    }
    
    // Pad Left corner bounce
    if((ballCurrentPosition[1] > (height-padHeight*4 - 3))
    && (ballCurrentPosition[0] >= (padPosition - padWidth/2))
    && (ballCurrentPosition[0] < (padPosition - padWidth/2 + 20))){
        console.log('left corner')
        
        if(xDirection>=0){
            xDirection += 1
            yDirection += 1
           
        }else{
            xDirection += -1
            yDirection += 1 
        }
        
        changeYDirection()
    }

    // Pad Right corner bounce
    if((ballCurrentPosition[1] > (height-padHeight*4 - 3))
    && (ballCurrentPosition[0] > (padPosition + padWidth/2 -20))
    && (ballCurrentPosition[0] <= (padPosition + padWidth/2))){
        console.log('right corner')

        if(xDirection>=0){
            xDirection += 1
            yDirection += 1
            
        }else{
            xDirection += -1
            yDirection += 1 
        }

        changeYDirection()
    }


    // Lost
    if(ballCurrentPosition[1] >= height-30){
        clearInterval(timerId)
    }

}

function changeXDirection(){
    xDirection = - xDirection
}

function changeYDirection(){
    yDirection = - yDirection
}









