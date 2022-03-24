import {board, domBoard} from './modules/board.js'
import {Pad} from './modules/pad.js'
import{Brick} from './modules/brick.js'
import{Ball} from './modules/ball.js'


// Variabili globali
// ----------------------------------------------------------

let punti = document.querySelector('#punti')
let score = 0
let timerId


// Board
// ----------------------------------------------------------

// console.log('Dimensioni del board:')
//console.table(board)


// Creazione pad
// ----------------------------------------------------------

let pad = new Pad()

let padPosition = board.width/2 - pad.width/2
//padPosition = 0
pad.display(padPosition)
//console.table(pad)

document.addEventListener('keydown', movePadKey)
domBoard.addEventListener('mousemove', movePadMouse);
//command.addEventListener('pointerdown',  movePadCommand)


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
    let pointer = event.clientX - board.x;
    
    data.innerHTML = `
    
    <div>Mouse x: ${pointer}</div>
    <div>pad left: ${pad.left}</div>
    <div>pad right: ${pad.right}</div>
    `
    
    if (pointer < pad.width/2){
        pad.left = 0
    } else if(pointer > board.width-pad.width/2){
        pad.left = (board.width-pad.width)
    }else{
        padPosition = pointer - pad.width/2;
        pad.move(padPosition)   
    }      
}


// Creazione Brick
// ----------------------------------------------------------

// level 1
let bricks1 = []

for(let j=0; j<5; j++){
    for(let i=0; i<8; i++){
        
        let x = 10 + i*10
        let y = 65 + j*5
        bricks1.push(new Brick(x,y))
    }
}

function addBricks1(){
    for(let i=0; i<bricks1.length; i++){
        let brick = document.createElement('div')
        brick.classList.add('brick', 'neon-border')
       
        brick.style.left = bricks1[i].left + 'px'
        brick.style.bottom = bricks1[i].bottom + 'px'
        
        domBoard.append(brick)
        
    }
}

addBricks1()
//console.table(bricks1[38])
//console.table(bricks1[39])


// Creazione ball
// ----------------------------------------------------------

let ball = new Ball(0,0)
let ballP = [((board.width/2)-(ball.diam/2)), pad.top]


ball.display(ballP[0], ballP[1])
//console.table(ball)
document.addEventListener('click', ballMove)




// Funzioni Pad da sistemare
// ----------------------------------------------------------
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
//     ball.style.left = ballP[0] + 'px'
//     ball.style.bottom = (ballP[1] -yDirection*2) + 'px'
    
//     board.append(ball)
// }

function ballMove(){
    document.removeEventListener('click', ballMove)
    timerId = setInterval(move, ball.speed)

    function move(){

        checkCollision()
        checkBrickCollision()

        ballP[0] += ball.direction[0]
        ballP[1] += ball.direction[1] 
        
        ball.move(ballP[0], ballP[1])
        
    }
}

// let data = document.createElement('div')
// data.classList.add('data')
// domBoard.append(data)


function checkCollision(){

     
    data.innerHTML = `
    
    <div>Px: ${ball.left}</div>
    <div>Py: ${Math.floor(ballP[1])}</div>
    <div>Pad Left: ${pad.left}</div>
    <div>Pad Right: ${pad.right}</div>
    <div>x: ${ball.direction[0]}</div>
    <div>y: ${ball.direction[1]}</div>
    ` 
    
    
    // Walls collision
    if(ball.right>= board.right || ball.left <= 0){
        
        changeXDirection()

        
        //changeDirection()
    }
    // Ceil collision
    if(ball.top >= board.top){
        changeYDirection()
        //changeDirection()
    }

    //Pad Collision
    if(ballP[1] < pad.top ){

        if(
            // Center bounce
            (ball.left >= (pad.left)) && (ball.right <= pad.right)){
            
            
            changeYDirection()
            //changeDirection()
            
        } 
    }
    //     // Pad Left corner bounce
        
    //     // if (
            
    //         //             ((ballP[0] > (padPosition - padWidth/2)
    //         //                 &&  (ballP[0] < (padPosition - padWidth/2 + 20))))
            
    //         //         &&  ((ballP[1] < (padHeight*3)) && ((ballP[1]+ballDiametro) > (padHeight*2)))
            
    //         // )
    //         //     {
    //             //     console.log('left corner')
                
    //             //     if(xDirection>=0){

    //                 //         xDirection += 1
    //                 //         yDirection += 1
                    
    //                 //     }else{
    //                     //         xDirection += -1
    //                     //         yDirection += 1 
    //                     //     }
                        
    //                     //     changeYDirection()
    //                     //     //changeDirection()
    //                     // } 
                        
    //                     // Right corner bounce
    //                     // if(
    //                     // (ballP[0] > (padPosition + padWidth/2 -20)) && (ballP[0] <= (padPosition + padWidth/2))){
    //                     //     console.log('right corner')
                            
    //                     //     if(xDirection>=0){
    //                     //         xDirection += 1
    //                     //         yDirection += 1
                                
    //                     //     }else{
    //                     //     xDirection += -1
    //                     //     yDirection += 1 
    //                     //     }
        
    //                     //     changeYDirection()
        
    //                         //clearInterval(timerId)
    //                         //changeDirection()
    // }
    
                        
    // Lost
    if(ballP[1] < 0){
        clearInterval(timerId)
        console.log('looser')
       
    }
}

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
    ball.direction[0] = - ball.direction[0]
}

function changeYDirection(){
    ball.direction[1] = - ball.direction[1]
}





// Brick collision
// ----------------------------------------------------------
function checkBrickCollision(){
    
    
    
    for(let i=0; i<bricks1.length; i++){
        
        let mattoni = Array.from(document.querySelectorAll('.brick'))
        
        if((ball.right >= (bricks1[i].left)
            && ball.left <= (bricks1[i].right))
            
            && ((ball.bottom <= (bricks1[i].top))
            && (ball.top >= (bricks1[i].bottom -5))))
            {
                
                
                



                clearInterval(timerId)
                console.table(ball)
                console.table(bricks1[i])

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


//let bounce = 0



// Brick collision 2
// ----------------------------------------------------------
// function checkBrickCollision(){
    
    
    
//         for(let i=0; i<bricks1.length; i++){
            
//             let mattoni = Array.from(document.querySelectorAll('.brick'))
            
            
            


//             if (((ballP[0]+ballDiametro) > (bricks1[i].bottomLeft[0])
//                 && (ballP[0]) < (bricks1[i].bottomRight[0]))
                
//                 && (((ballP[1]+ballDiametro+6) > (bricks1[i].bottomLeft[1]))
//                 && ((ballP[1]-6) < bricks1[i].topLeft[1])))
//                 {
//                     // clearInterval(timerId)
//                     // console.log('ball Y position:')
//                     // console.log(ballP[1]+ballDiametro+3)
//                     // console.log('bottom brick: ')
//                     // console.log(bricks1[i].bottomLeft[1])
//                     // console.log('top brick: ')
//                     // console.log(bricks1[i].topLeft[1])
//                     // console.log('ball Y position:')
//                     // console.log(ballP[1]-3)

//                     // if((ballP[0]+ballDiametro) > bricks1[i].bottomLeft[0])
//                     // {
//                     //     console.log('hit left')
//                     // }
//                     // if((ballP[0]) < (bricks1[i].bottomRight[0]))
//                     //     {
//                     //     console.log('hit right')
//                     // }
//                     if(
//                     (Math.floor(ballP[1]+ballDiametro+3)) == (Math.floor(bricks1[i].bottomLeft[1])))
//                     {
//                        // console.log('hit bottom')
//                     }
//                     if(Math.floor(bricks1[i].topLeft[1]) ==  Math.floor(ballP[1]-6))
//                     {
//                         console.log('hit top')
//                         clearInterval(timerId)
//                         // console.log('top brick: ')
//                         // console.log(bricks1[i].topLeft[1])
//                         // console.log(Math.floor(bricks1[i].topLeft[1]))
//                         // console.log('ball Y position:')
//                         // console.log(ballP[1]-6)
//                         // console.log(Math.floor(ballP[1]-6))


//                     }
                
                    
//                     changeYDirection()
                    
//                     bounce++
//                     console.log('Bounce: ' + bounce)

                    
//                     //console.log('Ball-X: '+ (ballP[0]) + ', ' + (ballP[0]+ballDiametro) + '\n\n')
//                     let topBrick = mattoni[i].getBoundingClientRect().y + yStart
//                     let bottomBrick = mattoni[i].getBoundingClientRect().bottom - yStart
//                     console.log('TB: '+ topBrick)
//                     console.log('BB: ' + bottomBrick)
//                     //let yEnd = board.getBoundingClientRect().bottom

//                     console.log('Top Ball: ' + (ballP[1]+ballDiametro))
//                     //console.table(bricks1[i])
//                     console.log('Bottom Brick: ' + (bricks1[i].bottomLeft[1])+ '\n\n')
                    
                    
                    


//                     mattoni[i].remove()
//                     bricks1.splice(i,1)
//                     score++
//                     punti.innerHTML = score
//                 }
//                 //console.log(bricks1)
//                 // if (bricks1.length ==0){
//                 //     clearInterval(timderId)
//                 // }
//         }
//     }


    


        











