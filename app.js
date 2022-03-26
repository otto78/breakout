import {board, domBoard} from './modules/board.js'
import {Pad} from './modules/pad.js'
import{Brick} from './modules/brick.js'
import{Ball} from './modules/ball.js'


// Variabili globali
// ----------------------------------------------------------
//let command = document.querySelector('#command')

let punti = document.querySelector('#punti')
let vite = document.querySelector('#vite')
let tempo = document.querySelector('#tempo')
let livello = document.querySelector('#livello')


let lives = 3
let score = 0
let level = 1

// game time
// Variabili Gestione timer

let sec = 0
let min = 0
let t

//Funzioni timer
function tick(){
    sec++
    if(sec>=60){
        sec=0;
        min++;      
    }
}

function add(){
    tick()
    tempo.textContent = (min>9 ? min : '0'+ min) + ':' + (sec>9 ? sec : '0'+ sec)
    timer()      
}

function timer(){
    t = setTimeout(add, 1000)
}


// Creazione pad
// ----------------------------------------------------------

let pad = new Pad()
let padPosition = board.width/2 - pad.width/2
pad.display(padPosition)

// Pad Movement
document.addEventListener('keydown', movePadKey);
domBoard.addEventListener('mousemove', movePadMouse);

let command = document.querySelector('#command')
document.addEventListener('touchstart', handleTouchEvent, true);
document.addEventListener('touchmove', handleTouchEvent, true);
document.addEventListener('touchend', handleTouchEvent, true);
document.addEventListener('touchcancel', handleTouchEvent, true);

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

function handleTouchEvent(e) {
    let commandWidth = command.getBoundingClientRect().width

    if (e.touches.length === 0 ) return;
    //e.preventDefault();
    e.stopPropagation();
    var touch = e.touches[0];
    command.style.left = (touch.pageX - commandWidth / 2) + 'px';
    pad.move(touch.pageX - (3/4)*pad.width)
}

// Creazione Brick
// ----------------------------------------------------------

// level 1
let bricks1 = []

// for(let j=0; j<5; j++){
//     for(let i=0; i<8; i++){
        
//         let x = 10 + i*10
//         let y = 65 + j*5
//         bricks1.push(new Brick(x,y))
//     }
// }

function addBricks1(){

    for(let j=0; j<5; j++){
        for(let i=0; i<8; i++){
            
            let x = 10 + i*10
            let y = 65 + j*5
            bricks1.push(new Brick(x,y))
        }
    }



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
domBoard.addEventListener('click', ballMove)

let timerId
let pastArrX =[]
let pastArrY = []


function ballMove(){
    document.removeEventListener('click', ballMove)
    timerId = setInterval(move, ball.speed)
    timer()
    

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

// Modal functions and conditions
// ----------------------------------------------------------

let modal = document.querySelector('#modal')
let modalTitle = document.querySelector('#modalTitle')
let modalBody = document.querySelector('#modalBody')
let modalBtn = document.querySelector('#modalBtn')


function rePlay(){
    closeModal()
    
    level = 1
    score = 0
    lives = 3
    min = 0
    sec = 0
    
    vite.innerHTML = `${lives}`
    punti.innerHTML =`${score}`
    livello.innerHTML = `${level}`
    tempo.innerHTML="00:00"

    bricks1 = []
    let mattoni = Array.from(document.querySelectorAll('.brick'))
    
    for(let i=0; i<mattoni.length; i++){
        mattoni[i].remove()
    }
    mattoni = []
    
    addBricks1()
  
    domBoard.addEventListener('click', ballMove)
}

function openModal() {
    const backdrop = document.createElement('div');
    backdrop.classList.add('modal-backdrop', 'fade');
    document.body.classList.add('modal-open');
    document.body.appendChild(backdrop);
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false', 'show');
    
    setTimeout(() => {
        modal.classList.add('show');
        backdrop.classList.add('show');
    });
}

function closeModal() {
    const backdrop = document.querySelector('.modal-backdrop.fade.show');
    document.body.classList.remove('modal-open');
    modal.setAttribute('aria-hidden', 'true');
    //backdrop.classList.remove('show');
    
    setTimeout(() => {
      modal.classList.remove('show');
    });
    
    setTimeout(() => {
      modal.style.display = 'none';
        backdrop.remove();
    }, 500);
}

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

    let lastX = pastArrX[pastArrX.length-2]
    let lastY = pastArrY[pastArrY.length-2]
    
       
        if((ball.right >= (pad.left)
            && ball.left <= (pad.right))
            
            && ((ball.bottom <= (pad.top))
            && (ball.top >= (pad.bottom))))
            {

                if(((lastY+ball.diam)< pad.bottom) || lastY > pad.top){
                    changeYDirection()
                }

                else if(((lastX+ball.diam) < pad.left) || lastX>pad.right){
                    changeXDirection()
                }

            }
    
    // Pad Left corner bounce
        
        // if (
            
            //             ((ballP[0] > (padPosition - padWidth/2)
            //                 &&  (ballP[0] < (padPosition - padWidth/2 + 20))))
            
            //         &&  ((ballP[1] < (padHeight*3)) && ((ballP[1]+ballDiametro) > (padHeight*2)))
            
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
                        // (ballP[0] > (padPosition + padWidth/2 -20)) && (ballP[0] <= (padPosition + padWidth/2))){
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
                        // }
    //
                        
    // Lost
    if(ball.bottom < 0){
        lives--
        clearInterval(timerId)
        clearInterval(t)
        
        vite.innerHTML = `${lives}`


        

            if(lives ==2){
                openModal()
                modalTitle.innerHTML = "Ahi ahi ahi!!"
                modalBody.innerHTML = "Ti restano ancora due vite!!"
                modalBtn.innerHTML = "Continua"
                modalBtn.addEventListener('click', closeModal)
                restart()
            }else if(lives ==1){
                openModal()
                modalTitle.innerHTML = "Ahi ahi ahi!!"
                modalBody.innerHTML = "Ti resta ancora una vita!!"
                modalBtn.innerHTML = "Continua"
                modalBtn.addEventListener('click', closeModal)
                restart()
            }else if (lives == 0) {        
                openModal()
                modalTitle.innerHTML = "Hai perso!!"
                modalBody.innerHTML = "Vuoi giocare ancora?"
                modalBtn.innerHTML = "Sì"
                modalBtn.addEventListener('click', rePlay)
                
                restart()
                domBoard.removeEventListener('click', ballMove)
            }
        
        
    }
}

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
               
                //console.log(bricks1.length)
                bricks1.splice(i,1)
                score++
                punti.innerHTML = score

                if(bricks1.length == 0){
                    clearInterval(timerId)
                    let hide = document.querySelector('#ball').remove()
                    
                    
                    console.log('hai vinto!')
                }
                
            }
            //console.log(bricks1.length)
            // if (bricks1.length ==0){
            //     clearInterval(timderId)
            // }
    }
}

function changeXDirection(){
    ball.direction[0] = - ball.direction[0]
}

function changeYDirection(){
    ball.direction[1] = - ball.direction[1]
}

function restart(){
    pad.remove()
    pad.display(board.width/2 - pad.width/2)
    
    ball.remove()
    ball.direction[1] = - ball.direction[1]
    ball.display((board.width/2-ball.diam/2), pad.top)
}



//vite.innerHTML = `${lives}`
//livello.innerHTML = `${level}`

        











