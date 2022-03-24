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
    
    // data.innerHTML = `
    
    // <div>Mouse x: ${pointer}</div>
    // <div>pad left: ${pad.left}</div>
    // <div>pad right: ${pad.right}</div>
    // `
    
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



// Creazione ball
// ----------------------------------------------------------

let ball = new Ball(0,0)

ball.display((board.width/2-ball.diam/2), pad.top)
document.addEventListener('click', ballMove)

let pastArrX =[]
let pastArrY = []

function ballMove(){
    document.removeEventListener('click', ballMove)
    timerId = setInterval(move, ball.speed)


    function move(){

        checkCollision()
        checkBrickCollision()

        ball.left += ball.direction[0]
        ball.bottom += ball.direction[1] 
        
        ball.move(ball.left, ball.bottom)
        
        pastArrX.push(ball.left)
        pastArrY.push(ball.bottom)
    }
}


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




// Collisions
// ----------------------------------------------------------

function checkCollision(){

    // data.innerHTML = `  
    // <div>Px: ${ball.left}</div>
    // <div>Py: ${Math.floor(ball.bottom)}</div>
    // <div>Pad Left: ${pad.left}</div>
    // <div>Pad Right: ${pad.right}</div>
    // <div>x: ${ball.direction[0]}</div>
    // <div>y: ${ball.direction[1]}</div>
    // ` 
    
    // Walls collision
    if(ball.right>= board.right || ball.left <= 0){
        
        changeXDirection()
    }

    // Ceil collision
    if(ball.top >= board.top){
        changeYDirection()
        //changeDirection()
    }

    //Pad Collision
    if(ball.bottom < pad.top ){

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
    if(ball.bottom < 0){
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
        let lastX = pastArrX[pastArrX.length-2]
        let lastY = pastArrY[pastArrY.length-2]
        
    for(let i=0; i<bricks1.length; i++){       
        let mattoni = Array.from(document.querySelectorAll('.brick'))
        
        if((ball.right >= (bricks1[i].left)
            && ball.left <= (bricks1[i].right))
            
            && ((ball.bottom <= (bricks1[i].top))
            && (ball.top >= (bricks1[i].bottom))))
            {

                if(((lastY+ball.diam)< bricks1[i].bottom) || lastY > bricks1[i].top){
                    changeYDirection()
                }

                else if(((lastX+ball.diam) < bricks1[i].left) || lastX>bricks1[i].right){
                    changeXDirection()
                }
            
                pastArrX=[]
                pastArrY=[]
        
                mattoni[i].remove()
               
                console.log(bricks1.length)
                bricks1.splice(i,1)
                score++
                punti.innerHTML = score
                if(bricks1.length == 0){
                    clearInterval(timerId)
                    ball.remove()
                    console.log('hai vinto!')
                }
                
            }
            //console.log(bricks1)
            // if (bricks1.length ==0){
            //     clearInterval(timderId)
            // }
    }
}








    


        











