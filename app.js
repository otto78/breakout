import {board, domBoard} from './modules/box.js'
import {Pad} from './modules/pad.js'


// Variabili globali
// ----------------------------------------------------------

let punti = document.querySelector('#punti')
let score = 0
let timerId


// Board
// ----------------------------------------------------------

console.log('Dimensioni del board:')
console.table(board)


// Creazione pad
// ----------------------------------------------------------

//domBoard.append(domPad)
let pad = new Pad()
let padPosition = board.width/2 - pad.width/2



pad.display(padPosition)
console.log('Dimensioni e posizione ATTUALE del pad')
console.table(pad)




document.addEventListener('keydown', movePadKey)
domBoard.addEventListener('mousemove', movePadMouse);
//command.addEventListener('pointerdown',  movePadCommand)



// Creazione Brick
// ----------------------------------------------------------
let brickWidth = board.width*0.10
let brickHeight = board.height*0.05



class Brick{
    constructor(x, y){

        x = board.width*(x/100)
        y = board.height*(y/100)

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
        let x = 10 + i*10
        let y = 65 + (j/2)*10
        bricks1.push(new Brick(x,y))
    }
}

//console.table(bricks1[39])

function addBricks1(){
    for(let i=0; i<bricks1.length; i++){
        let brick = document.createElement('div')
        brick.classList.add('brick', 'neon-border')
       
        brick.style.left = bricks1[i].bottomLeft[0] + 'px'
        brick.style.bottom = bricks1[i].bottomLeft[1] + 'px'
        
        domBoard.append(brick)
        
    }
}

addBricks1()




// Creazione ball
// ----------------------------------------------------------
//let ball = document.createElement('div')
//ball.setAttribute('id', 'ball')
//let ballDiametro = 20

//let ballStart = [(width/2-(ballDiametro/2)), (padHeight*3 + 30)]
//let ballCurrentPosition = ballStart
let ballDiametro = 1
let ballD = board.width*ballDiametro




let xDirection = 0.5
let yDirection = 0.5
let speed = 20


//document.addEventListener('click', ballMove)


class Ball{
    constructor(x, y){
        
        x = board.width*(x/100)
        y = board.height*(y/100)
        
        
        this.bottomLeft =[x, y]
        this.bottomRight = [x + ballD, y]
        this.topLeft = [x, y + ballD]
        this.topRight = [x + ballD, y + ballD]
    }
}
let ballCurrentPosition = [50-0.3, 10]

function drowBall(){
    let palla = new Ball(ballCurrentPosition[0], ballCurrentPosition[1])
    
    let ball = document.createElement('div')
    ball.setAttribute('id', 'ball')
    
    ball.style.left = palla.bottomLeft[0] + 'px'
    ball.style.bottom = palla.bottomLeft[1] + 'px'
    
    domBoard.append(ball)
}


//drowBall()




// Funzioni Pad
// ----------------------------------------------------------


function movePadKey(event){
  
    if(event.key == 'ArrowLeft' && padPosition > 0){         
        padPosition = padPosition - 50

        if(padPosition < pad.width/2) {padPosition = pad.width/2}
        
        pad.remove()
        pad.display(padPosition)
    }
    
    if(event.key == 'ArrowRight' && padPosition < board.width - pad.width/2){      
        padPosition = padPosition + 50    

        if(padPosition > board.width - pad.width/2) {padPosition = board.width - pad.width/2} 

        pad.move(padPosition)
               
    }
}

function movePadMouse(event) {
    let pointer = event.clientX - board.left;

    data.innerHTML = `
    <div>Mouse x: ${event.clientX - board.left}</div>
    <div>Mouse y: ${event.clientY - board.top}</div>
    <div>pad width: ${pad.width}</div>
    <div>pad left: ${pad.left}</div>
    <div>pad right: ${pad.right}</div>
    `
    
    if (pointer < pad.width/2){
        pad.left = 0
    } else if(pointer > board.width-pad.width/2){
        pad.left = (board.width-pad.width/2)
    }else{
        padPosition = pointer - pad.width/2;
        pad.move(padPosition)
        
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
// function drowBall(){
//     ball.style.left = ballCurrentPosition[0] + 'px'
//     ball.style.bottom = (ballCurrentPosition[1] -yDirection*2) + 'px'
    
//     board.append(ball)
// }

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
domBoard.append(data)


function checkCollision(){

     
    data.innerHTML = `
    <div>witdt: ${board.width}</div>
    <div>Px: ${ballCurrentPosition[0]}</div>
    <div>Py: ${Math.floor(ballCurrentPosition[1])}</div>
    <div>x: ${xDirection}</div>
    <div>y: ${yDirection}</div>
    ` 
    
    
    // Walls collision
    if(ballCurrentPosition[0]> 97 || ballCurrentPosition[0] <= 0){
        clearInterval(timerId)
        changeXDirection()
        //changeDirection()
    }
    // Ceil collision
    if(ballCurrentPosition[1]>= 97){
        changeYDirection()
        //changeDirection()
    }

    // Pad Collision
    if((ballCurrentPosition[1] < (padHeight*3 )) && (ballCurrentPosition[1] > (padHeight*2 + ballDiametro/4))){

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
                        if(ballCurrentPosition[1] < 0){
                            clearInterval(timerId)
                        }
}


function changeDirection(){
    if(xDirection>0 && yDirection>0){
        yDirection = - yDirection
        return
    }
    if(xDirection>0 && yDirection<0){
        xDirection = - xDirection
        return
    }

    if(xDirection<0 && yDirection<0){
        yDirection = - yDirection
        return
    }

    if(xDirection<0 && yDirection>0){
        xDirection = - xDirection
        return
    }
}

function changeXDirection(){
    xDirection = - xDirection
}

function changeYDirection(){
    yDirection = - yDirection
}





// Brick collision
// ----------------------------------------------------------
// function checkBrickCollision(){
    
    
    
//     for(let i=0; i<bricks1.length; i++){
        
//         let mattoni = Array.from(document.querySelectorAll('.brick'))
        
//         if(((ballCurrentPosition[0]+ballDiametro) > (bricks1[i].bottomLeft[0])
//             && (ballCurrentPosition[0]) < (bricks1[i].bottomRight[0]))
            
//             && (((ballCurrentPosition[1]+ballDiametro+6) > (bricks1[i].bottomLeft[1]))
//             && ((ballCurrentPosition[1]-6) < bricks1[i].topLeft[1])))
//             {
//                 //clearInterval(timerId)
//                 changeYDirection()
//                 mattoni[i].remove()
//                 bricks1.splice(i,1)
//                 score++
//                 punti.innerHTML = score
                
//             }
//             //console.log(bricks1)
//             // if (bricks1.length ==0){
//             //     clearInterval(timderId)
//             // }
//     }
// }
let bounce = 0
// Brick collision 2
// ----------------------------------------------------------
function checkBrickCollision(){
    
    
    
        for(let i=0; i<bricks1.length; i++){
            
            let mattoni = Array.from(document.querySelectorAll('.brick'))
            
            
            


            if (((ballCurrentPosition[0]+ballDiametro) > (bricks1[i].bottomLeft[0])
                && (ballCurrentPosition[0]) < (bricks1[i].bottomRight[0]))
                
                && (((ballCurrentPosition[1]+ballDiametro+6) > (bricks1[i].bottomLeft[1]))
                && ((ballCurrentPosition[1]-6) < bricks1[i].topLeft[1])))
                {
                    // clearInterval(timerId)
                    // console.log('ball Y position:')
                    // console.log(ballCurrentPosition[1]+ballDiametro+3)
                    // console.log('bottom brick: ')
                    // console.log(bricks1[i].bottomLeft[1])
                    // console.log('top brick: ')
                    // console.log(bricks1[i].topLeft[1])
                    // console.log('ball Y position:')
                    // console.log(ballCurrentPosition[1]-3)

                    // if((ballCurrentPosition[0]+ballDiametro) > bricks1[i].bottomLeft[0])
                    // {
                    //     console.log('hit left')
                    // }
                    // if((ballCurrentPosition[0]) < (bricks1[i].bottomRight[0]))
                    //     {
                    //     console.log('hit right')
                    // }
                    if(
                    (Math.floor(ballCurrentPosition[1]+ballDiametro+3)) == (Math.floor(bricks1[i].bottomLeft[1])))
                    {
                       // console.log('hit bottom')
                    }
                    if(Math.floor(bricks1[i].topLeft[1]) ==  Math.floor(ballCurrentPosition[1]-6))
                    {
                        console.log('hit top')
                        clearInterval(timerId)
                        // console.log('top brick: ')
                        // console.log(bricks1[i].topLeft[1])
                        // console.log(Math.floor(bricks1[i].topLeft[1]))
                        // console.log('ball Y position:')
                        // console.log(ballCurrentPosition[1]-6)
                        // console.log(Math.floor(ballCurrentPosition[1]-6))


                    }
                
                    
                    changeYDirection()
                    
                    bounce++
                    console.log('Bounce: ' + bounce)

                    
                    //console.log('Ball-X: '+ (ballCurrentPosition[0]) + ', ' + (ballCurrentPosition[0]+ballDiametro) + '\n\n')
                    let topBrick = mattoni[i].getBoundingClientRect().y + yStart
                    let bottomBrick = mattoni[i].getBoundingClientRect().bottom - yStart
                    console.log('TB: '+ topBrick)
                    console.log('BB: ' + bottomBrick)
                    //let yEnd = board.getBoundingClientRect().bottom

                    console.log('Top Ball: ' + (ballCurrentPosition[1]+ballDiametro))
                    //console.table(bricks1[i])
                    console.log('Bottom Brick: ' + (bricks1[i].bottomLeft[1])+ '\n\n')
                    
                    
                    


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


    


        











