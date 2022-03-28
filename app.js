import {board, domBoard} from './modules/board.js'
import {Pad} from './modules/pad.js'
import{Brick} from './modules/brick.js'
import{Ball} from './modules/ball.js'


// Variabili globali
// ----------------------------------------------------------
let title = document.querySelector('#title')
let tabellone = document.querySelector('#tabellone')
let punti = document.querySelector('#punti')
let vite = document.querySelector('#vite')
let tempo = document.querySelector('#tempo')
let livello = document.querySelector('#livello')
let settings = document.querySelector('#settings')

//Variabili Modal
let modal = document.querySelector('#modal')
let modalHeader = document.querySelector('.modal-header')
let modalTitle = document.querySelector('#modalTitle')
let modalBody = document.querySelector('#modalBody')
let modalBtn = document.querySelector('#modalBtn')
let a = document.querySelector('a')

// Variabili suoni
let hitWall = new Audio('./media/hit-wall.mp3')
let hitBrick = new Audio('./media/hit-brick.mp3')
let crashDown = new Audio ('./media/crash-down.wav')
let winner = new Audio ('./media/winner.wav')
let sounds = [hitWall, hitBrick, crashDown, winner]

// Status level
let lives = 3
let score = 0
let level = 1

// Game timer
let sec = 0
let min = 0
let t

let soundEfx = true
sound(soundEfx)

// Start
openModal()
modalHeader.classList.add('d-flex','justify-content-center')
modalBody.classList.add('text-center')
modalTitle.innerHTML = "Benvenuto!!"
modalBody.innerHTML = "Per giocare devi solo premere sì"
modalBtn.innerHTML = "Sì"
modalBtn.addEventListener('click', rePlay)    


settings.addEventListener('click', setting)


// Funzioni timer
// ----------------------------------------------------------
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


// Pad Movement
document.addEventListener('keydown', movePadKey);
domBoard.addEventListener('mousemove', movePadMouse);

document.addEventListener('touchstart', movePadCommand, true);
document.addEventListener('touchmove', movePadCommand, true);
document.addEventListener('touchend', movePadCommand, true);
document.addEventListener('touchcancel', movePadCommand, true);

function movePadKey(e){
    
    if(e.key == 'ArrowLeft' && padPosition > 0){         
        padPosition = padPosition - 50
        
        if(padPosition < pad.width/2) {padPosition = pad.width/2}
        
        pad.remove()
        pad.display(padPosition)
    }
    
    if(e.key == 'ArrowRight' && padPosition < board.width - pad.width/2){      
        padPosition = padPosition + 50    
        
        if(padPosition > board.width - pad.width/2) {padPosition = board.width - pad.width/2} 
        
        pad.move(padPosition)
        
    }
}

function movePadMouse(e) {
    let pointer = e.clientX - board.x;
    
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

function movePadCommand(e) {
    let command = document.querySelector('#command')
    
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
let bricks = []

// level 1
function addbricks(){

    for(let j=0; j<1; j++){
        for(let i=0; i<8; i++){
            
            let x = 10 + i*10
            let y = 65 + j*5
            bricks.push(new Brick(x,y))
        }
    }

    for(let i=0; i<bricks.length; i++){
        let brick = document.createElement('div')
        brick.classList.add('brick', 'neon-border')
              
        brick.style.left = bricks[i].left + 'px'
        brick.style.bottom = bricks[i].bottom + 'px'
        
        domBoard.append(brick)
        
    }
}

// level 2
function addBricks2(){

    for(let j=0; j<2; j++){
        for(let i=0; i<8; i++){
            
            let x = 10 + i*10
            let y = 65 + j*5
            bricks.push(new Brick(x,y))
        }
    }

    for(let i=0; i<bricks.length; i++){
        let brick = document.createElement('div')
        brick.classList.add('brick', 'neon-border')
              
        brick.style.left = bricks[i].left + 'px'
        brick.style.bottom = bricks[i].bottom + 'px'
        
        domBoard.append(brick)
        
    }
}

// level 3
function addBricks3(){

    for(let j=0; j<3; j++){
        for(let i=0; i<8; i++){
            
            let x = 10 + i*10
            let y = 65 + j*5
            bricks.push(new Brick(x,y))
        }
    }

    for(let i=0; i<bricks.length; i++){
        let brick = document.createElement('div')
        brick.classList.add('brick', 'neon-border')
              
        brick.style.left = bricks[i].left + 'px'
        brick.style.bottom = bricks[i].bottom + 'px'
        
        domBoard.append(brick)
        
    }
}

// level Bonus
function addBricks4(){

    for(let j=0; j<4; j++){
        for(let i=0; i<8; i++){
            
            let x = 10 + i*10
            let y = 65 + j*5
            bricks.push(new Brick(x,y))
        }
    }

    for(let i=0; i<bricks.length; i++){
        let brick = document.createElement('div')
        brick.classList.add('brick', 'neon-border')
              
        brick.style.left = bricks[i].left + 'px'
        brick.style.bottom = bricks[i].bottom + 'px'
        
        domBoard.append(brick)
        
    }
}




// Creazione ball
// ----------------------------------------------------------
let ball = new Ball(0,0)
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


// Modal conditions
// ----------------------------------------------------------
function play(){
    modalBtn.removeEventListener('click', play)
    closeModal()
    restart()
    domBoard.addEventListener('click', ballMove)
}

function goOn(){
    modalBtn.removeEventListener('click', goOn)
    closeModal()
    domBoard.addEventListener('click', ballMove)

    soundEfx = document.querySelector('#soundEfx').checked
    sound(soundEfx)
}

function rePlay(){
    modalBtn.removeEventListener('click', rePlay)
    modalHeader.classList.remove('d-flex','justify-content-center')
    modalBody.classList.remove('text-center')
    tabellone.classList.remove('d-none')
    title.classList.add('d-none')

    
    closeModal()
    restart()

    ball.speed = 10
    level = 1
    score = 0
    lives = 3
    min = 0
    sec = 0
    
    vite.innerHTML = `${lives}`
    punti.innerHTML =`${score}`
    livello.innerHTML = `${level}`
    tempo.innerHTML="00:00"

    bricks = []
    let mattoni = Array.from(document.querySelectorAll('.brick'))
    
    for(let i=0; i<mattoni.length; i++){
        mattoni[i].remove()
    }
    mattoni = []
    
    addbricks()
  
    domBoard.addEventListener('click', ballMove)
}

function nextLevel(){
    modalBtn.removeEventListener('click', nextLevel)
    closeModal()
    restart()

    ball.speed = ball.speed - 2

    // let mattoni = Array.from(document.querySelectorAll('.brick'))
    // for(let i=0; i<mattoni.length; i++){
    //     mattoni[i].remove()
    // }
    // mattoni = []
    // bricks = []
    
    if(level == 2){
        addBricks2()
    }else if (level == 3){
        addBricks3()
    }else if (level == 4){
        addBricks4()
    }
    
  
    domBoard.addEventListener('click', ballMove)
}

function restart(){
    pad.remove()
    ball.remove()
    
    ball.direction[1] = 2
    
    let rnd = Math.floor(Math.random()*10)+1
    if  (rnd>=5)
    {ball.direction[0] = 2}
    else{ball.direction[0] = -2}
    
    pad.display(board.width/2 - pad.width/2)
    ball.display((board.width/2-ball.diam/2), pad.top)
    command.style.left = (board.width/2+ board.x -40) + 'px'
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
    
    // Walls collision
    if(ball.right>= board.right || ball.left <= 0){       
        changeXDirection() 

        if(hitWall.volume != 0){
            hitWall.cloneNode(true).play()
        }
    }

    // Ceil collision
    if(ball.top >= board.top){
        changeYDirection()
        if(hitWall.volume != 0){
            hitWall.cloneNode(true).play()
        }
    }

    //Pad Collision
    let lastX = pastArrX[pastArrX.length-2]
    let lastY = pastArrY[pastArrY.length-2]
      
    if((ball.right >= (pad.left) && ball.left <= (pad.right))         
    && ((ball.bottom <= (pad.top)) && (ball.top >= (pad.bottom))))
    {
        if(((lastY+ball.diam)< pad.bottom) || lastY > pad.top){
            changeYDirection()
            hitWall.play()
        }
        else if(((lastX+ball.diam) < pad.left) || lastX>pad.right){
            changeXDirection()
            hitWall.play()
        }
    }
                      
    // Lost consition
    if(ball.bottom < 0){
        lives--
        vite.innerHTML = `${lives}`
               
        clearInterval(timerId)
        clearInterval(t)
        crashDown.play()
        
        if(lives >=2){
            openModal()
            modalTitle.innerHTML = "Ahi ahi ahi!!"
            modalBody.innerHTML = "Ti restano ancora due vite!!"
            modalBtn.innerHTML = "Continua"
            modalBtn.addEventListener('click', play)               
        }else if(lives ==1){
            openModal()
            modalTitle.innerHTML = "Ahi ahi ahi!!"
            modalBody.innerHTML = "Ti resta ancora una vita!!"
            modalBtn.innerHTML = "Continua"
            modalBtn.addEventListener('click', play)           
        }else if (lives == 0) {        
            openModal()
            modalTitle.innerHTML = "Hai perso!!"
            modalBody.innerHTML = "Vuoi giocare ancora?"
            modalBtn.innerHTML = "Sì"
            modalBtn.addEventListener('click', rePlay)                        
        }       
    }
}

function checkBrickCollision(){
    let lastX = pastArrX[pastArrX.length-2]
    let lastY = pastArrY[pastArrY.length-2]
    
    for(let i=0; i<bricks.length; i++){       
        
        let mattoni = Array.from(document.querySelectorAll('.brick'))

        if((ball.right >= (bricks[i].left) && ball.left <= (bricks[i].right))
        && ((ball.bottom <= (bricks[i].top)) && (ball.top >= (bricks[i].bottom))))
        {

            if(((lastY+ball.diam)< bricks[i].bottom) || lastY > bricks[i].top){
                changeYDirection()
            }
            else if(((lastX+ball.diam) < bricks[i].left) || lastX>bricks[i].right){
                changeXDirection()
            }

            pastArrX=[]
            pastArrY=[]
        
            mattoni[i].remove()              
            bricks.splice(i,1)
            if(bricks.length>0){
                if(hitBrick.volume != 0){
                    hitBrick.cloneNode(true).play()
                }
            }else{
                
                crashDown.play()
            }
            
            score++
            punti.innerHTML = score
            

            // Winner conditions
            if(bricks.length == 0){
                clearInterval(timerId)
                clearInterval(t)
                level++
                livello.innerHTML = `${level}`
                winner.play()

                if(level<=2){
                    openModal()
                    modalTitle.innerHTML = "Hai vinto!!"
                    modalBody.innerHTML = "Next Level?"
                    modalBtn.innerHTML = "Ovvio"

                    modalBtn.addEventListener('click', nextLevel)             
                }else if(level==3){
                    openModal()
                    modalTitle.innerHTML = "Hai vinto!!"
                    modalBody.innerHTML = "Bravo, ultimo livello!"
                    modalBtn.innerHTML = "Vai"

                    modalBtn.addEventListener('click', nextLevel) 
                }else if(level==4){
                    livello.innerHTML = "Bonus"
                    openModal()
                    modalTitle.innerHTML = "Hai vinto!!"
                    modalBody.innerHTML = "Ok! Adesso basta così!"
                    modalBtn.innerHTML = "Ancora una dai!"
                    modalBtn.addEventListener('click', nextLevel)

                    a.innerHTML="Va bene, ciao!" 

                }else if(level>4){
                    livello.innerHTML = "Bonus"
                    openModal()
                    modalTitle.innerHTML = "Hai vinto!!"
                    modalBody.innerHTML = "Ok! Adesso basta così!"
                    modalBtn.innerHTML = "Ricomincia da capo"
                    modalBtn.addEventListener('click', rePlay)

                    a.innerHTML="Va bene, ciao!" 
                }
            }               
        }          
    }
}

function changeXDirection(){
    ball.direction[0] = - ball.direction[0]
}

function changeYDirection(){
    ball.direction[1] = - ball.direction[1]
}


// Settings
// ----------------------------------------------------------
function sound(val){
    for(let i=0; i<sounds.length; i++){
        if (val == true){
            sounds[i].volume = 1
            sounds[2].volume = 0.2
        }else if (val == false){
            sounds[i].volume = 0
        }
    }
}

let efxCheck

function setting(){
    openModal()
    
    clearInterval(timerId)
    clearInterval(t)

    if(soundEfx == true){
        efxCheck = 'checked'
    }else{efxCheck = ''}

    modalTitle.innerHTML = "Settings"
    modalBody.innerHTML = `
        <div class="row">
            <div class="col-6">Sound Effects</div>
            <div class="col-6">
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="soundEfx" ${efxCheck} />
                </div>
            </div>
        </div>
    
    `
    modalBtn.innerHTML = "Continua"
    a.innerHTML = "Annulla"
    modalBtn.addEventListener('click', goOn)

}







        











