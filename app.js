// Variabili globali
// ----------------------------------------------------------
let playGround = document.querySelector('#playGround')
let command = document.querySelector('#command')

// PlayGround dimensions
let xStart = playGround.getBoundingClientRect().x
let xEnd = playGround.getBoundingClientRect().right
let yStart = playGround.getBoundingClientRect().y
let yEnd = playGround.getBoundingClientRect().bottom
let width = playGround.getBoundingClientRect().width
let height = playGround.getBoundingClientRect().height

let punti = document.querySelector('#punti')
let score = 0

let timderId
//console.log('Width: ' + width)
//console.log('xStart: '+xStart)





// Creazione pad
// ----------------------------------------------------------
let pad = document.createElement('div')
pad.classList.add('pad', 'd-flex', 'justify-content-between')
pad.innerHTML =`
<div class="corner"></div>
<div class="corner"></div>
`
padWidth = width*0.15
padHeight = height*0.03

playGround.append(pad)




//console.log('pad: '+padWidth)

pad.style.bottom = ((padHeight*2) +'px')
//pad.style.top = ((height-padHeight*3) +'px')
let padPosition = width/2
pad.style.left = padPosition +'px'

document.addEventListener('keydown', movePadKey)
playGround.addEventListener('mousemove', movePadMouse);
//command.addEventListener('pointerdown',  movePadCommand)





// Creazione Brick
// ----------------------------------------------------------
brickWidth = width*0.10
brickHeight = height*0.05



class Brick{
    constructor(x, y){

        x = width*(x/100)
        y = height*(y/100)

        this.bottomLeft =[x, y]
        this.bottomRight = [x + brickWidth, y]
        this.topLeft = [x, y + brickHeight]
        this.topRight = [x + brickWidth, y + brickHeight]
    }
}

// level 1
let bricks1 = []

for(let j=0; j<5; j++){
    for(let i=0; i<8; i++){
        x = 10 + i*10
        y = 65 + (j/2)*10
        bricks1.push(new Brick(x,y))
    }
}

//console.table(bricks1[39])

function addBricks1(){
    for(let i=0; i<bricks1.length; i++){
        let brick = document.createElement('div')
        brick.classList.add('brick')
       
        brick.style.left = bricks1[i].bottomLeft[0] + 'px'
        brick.style.bottom = bricks1[i].bottomLeft[1] + 'px'
        
        playGround.append(brick)
        
    }
}

addBricks1()




// Creazione ball
// ----------------------------------------------------------
let ball = document.createElement('div')
ball.setAttribute('id', 'ball')
let ballDiametro = 20
let ballStart = [(width/2-(ballDiametro/2)), (padHeight*3 + 30)]
let ballCurrentPosition = ballStart

let xDirection = 3
let yDirection = 3
let speed = 20

drowBall()

document.addEventListener('click', ballMove)





// Funzioni Pad
// ----------------------------------------------------------

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
// ----------------------------------------------------------
function drowBall(){
    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.bottom = (ballCurrentPosition[1] -yDirection*2) + 'px'
    
    playGround.append(ball)
}

function ballMove(){
    document.removeEventListener('click', ballMove)
    timerId = setInterval(move, speed)

    function move(){

        checkCollision()
        checkBrickCollision()

        ballCurrentPosition[0] += xDirection 
        ballCurrentPosition[1] += yDirection    
        
        ball.remove()
        drowBall()  
    }
}

let data = document.createElement('div')
data.classList.add('data')
playGround.append(data)


function checkCollision(){

     
    data.innerHTML = `
    <div>Px: ${ballCurrentPosition[0]}</div>
    <div>Py: ${Math.floor(ballCurrentPosition[1])}</div>
    <div>x: ${xDirection}</div>
    <div>y: ${yDirection}</div>
    ` 
    
    
    // Walls collision
    if(ballCurrentPosition[0]> width-ballDiametro || ballCurrentPosition[0] <= 0){
        changeXDirection()
        //changeDirection()
    }
    // Ceil collision
    if(ballCurrentPosition[1]>= height - ballDiametro){
        changeYDirection()
        //changeDirection()
    }

    // Pad Collision
    if((ballCurrentPosition[1] < (padHeight*3 + ballDiametro/4)) && (ballCurrentPosition[1] > (padHeight*2 + ballDiametro/4))){

        if(
            // Center bounce
            (ballCurrentPosition[0] >= (padPosition - padWidth/2)) && (ballCurrentPosition[0] <= (padPosition + padWidth/2))){
            
            
            changeYDirection()
            //changeDirection()
            
        } 
        
        // Pad Left corner bounce
        
        // if (
            
            //             ((ballCurrentPosition[0] > (padPosition - padWidth/2)
            //                 &&  (ballCurrentPosition[0] < (padPosition - padWidth/2 + 20))))
            
            //         &&  ((ballCurrentPosition[1] < (padHeight*3)) && ((ballCurrentPosition[1]+ballDiametro) > (padHeight*2)))
            
            // )
            //     {
                //     console.log('left corner')
                
                //     if(xDirection>=0){
                    //         xDirection += 1
                    //         yDirection += 1
                    
                    //     }else{
                        //         xDirection += -1
                        //         yDirection += 1 
                        //     }
                        
                        //     changeYDirection()
                        //     //changeDirection()
                        // } 
                        
                        // Right corner bounce
                        // if(
                        // (ballCurrentPosition[0] > (padPosition + padWidth/2 -20)) && (ballCurrentPosition[0] <= (padPosition + padWidth/2))){
                        //     console.log('right corner')
                            
                        //     if(xDirection>=0){
                        //         xDirection += 1
                        //         yDirection += 1
                                
                        //     }else{
                        //     xDirection += -1
                        //     yDirection += 1 
                        //     }
        
                        //     changeYDirection()
        
                            //clearInterval(timerId)
                            //changeDirection()
                        }
    
                        
                        // Lost
                        if(ballCurrentPosition[1] < -yDirection){
                            clearInterval(timerId)
                        }
}

//}
// function changeDirection(){
//     if(xDirection>0 && yDirection>0){
//         yDirection = - yDirection
//         return
//     }
//     if(xDirection>0 && yDirection<0){
//         xDirection = - xDirection
//         return
//     }

//     if(xDirection<0 && yDirection<0){
//         yDirection = - yDirection
//         return
//     }

//     if(xDirection<0 && yDirection>0){
//         xDirection = - xDirection
//         return
//     }
// }

function changeXDirection(){
    xDirection = - xDirection
}

function changeYDirection(){
    yDirection = - yDirection
}





// Brick collision
// ----------------------------------------------------------
function checkBrickCollision(){
    
    
    
    for(let i=0; i<bricks1.length; i++){
        
        let mattoni = Array.from(document.querySelectorAll('.brick'))
        
        if(((ballCurrentPosition[0]+ballDiametro) > bricks1[i].bottomLeft[0]
            && (ballCurrentPosition[0]+ballDiametro) < bricks1[i].bottomRight[0])
            
            && (((ballCurrentPosition[1]+ballDiametro) > (bricks1[i].bottomLeft[1]))
            && (ballCurrentPosition[1] < bricks1[i].topLeft[1])))
            {
                clearInterval(timerId)
                changeYDirection()
                mattoni[i].remove()
                bricks1.splice(i,1)
                score++
                punti.innerHTML = score
                
            }
            //console.log(bricks1)
            // if (bricks1.length ==0){
            //     clearInterval(timderId)
            // }
    }
}















