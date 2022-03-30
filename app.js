import {board, domBoard} from './modules/board.js'
import {Pad} from './modules/pad.js'
import{Brick} from './modules/brick.js'
import{Ball} from './modules/ball.js'


// Global variables
// ----------------------------------------------------------
let style = document.querySelector('#style')
let title = document.querySelector('#title')
let tabellone = document.querySelector('#tabellone')
let punti = document.querySelector('#punti')
let vite = document.querySelector('#vite')
let tempo = document.querySelector('#tempo')
let livello = document.querySelector('#livello')
let settings = document.querySelector('#settings')

// Modal variables
let modal = document.querySelector('#modal')
let modalHeader = document.querySelector('.modal-header')
let modalTitle = document.querySelector('#modalTitle')
let modalBody = document.querySelector('#modalBody')
let modalBtn = document.querySelector('#modalBtn')
let a = document.querySelector('a')

// Sound variables
let hitWall = new Audio('./media/hit-wall.mp3')
let hitBrick = new Audio('./media/hit-brick.mp3')
let crashDown = new Audio ('./media/crash-down.wav')
let winner = new Audio ('./media/winner.wav')
let sounds = [hitWall, hitBrick, crashDown, winner]
let efxCheck
let soundEfx = true
crashDown.volume = 0.2

// Music variables
let music = new Audio('./media/music1.mp3')
let musicSwitch
let musicVol = true
music.loop = true
music.volume = 0.3

// Status level variables
let lives = 3
let score
let level

// Game timer variables
let sec = 0
let min = 0
let t

//Bricks array
let bricks = []


// Start
// ----------------------------------------------------------
openModal()
modalHeader.classList.add('d-flex','justify-content-center')
modalBody.classList.add('text-center')
modalTitle.innerHTML = "Benvenuto!!"
modalBody.innerHTML = "Per giocare devi solo premere sì"
modalBtn.innerHTML = "Sì"
modalBtn.addEventListener('click', rePlay)    

settings.addEventListener('click', setting)

// Pad creation
let pad = new Pad()
let padPosition = board.width/2 - pad.width/2

// Pad Movement
document.addEventListener('keydown', movePadKey);
domBoard.addEventListener('mousemove', movePadMouse);
document.addEventListener('touchstart', movePadCommand, true);
document.addEventListener('touchmove', movePadCommand, true);
document.addEventListener('touchend', movePadCommand, true);
document.addEventListener('touchcancel', movePadCommand, true);

// Ball Creation
let ball = new Ball(0,0)
domBoard.addEventListener('click', ballMove)

let timerId
let pastArrX =[]
let pastArrY = []


// FUNCTIONS
// ----------------------------------------------------------

// Pad movement functions
// ----------------------------------------------------------
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
    e.stopPropagation();
    let touch = e.touches[0];
    command.style.left = (touch.pageX - commandWidth / 2) + 'px';
    pad.move(touch.pageX - (3/4)*pad.width)
}


// Ball movement function
// ----------------------------------------------------------
function ballMove(){
    document.removeEventListener('click', ballMove)
    music.play()
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


// Level bricks creation
// ----------------------------------------------------------
// level 1
function addbricks(){
    for(let j=0; j<2; j++){
        for(let i=0; i<6; i++){          
            let x = 8 + i*15
            let y = 65 + j*13
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
    for(let j=0; j<3; j++){
        for(let i=0; i<7; i++){          
            let x = 6 + i*13
            let y = 65 + j*10
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
    for(let j=0; j<4; j++){
        for(let i=0; i<7; i++){        
            let x = 9 + i*12
            let y = 60 + j*8
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
    for(let j=0; j<5; j++){
        for(let i=0; i<8; i++){           
            let x = 6.5 + i*11
            let y = 55 + j*7
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


// Play functions
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

    musicVol = document.querySelector('#musicVol').checked
    soundMusic(musicVol)
}

function rePlay(){
    modalBtn.removeEventListener('click', rePlay)
    modalHeader.classList.remove('d-flex','justify-content-center')
    modalBody.classList.remove('text-center')
    tabellone.classList.remove('d-none')
    title.classList.add('d-none')
   
    closeModal()
    restart()

    style.href='style1.css'

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
   
    if(level == 2){
        addBricks2()
        style.href='style2.css'
    }else if (level == 3){
        addBricks3()
        style.href='style3.css'
    }else if (level == 4){
        addBricks4()
        style.href='style4.css'
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


// Modal functions 
// ----------------------------------------------------------
function openModal() {
    music.pause()
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
            a.innerHTML="No"
        }else if(lives ==1){
            openModal()
            modalTitle.innerHTML = "Ahi ahi ahi!!"
            modalBody.innerHTML = "Ti resta ancora una vita!!"
            modalBtn.innerHTML = "Continua"
            modalBtn.addEventListener('click', play)
            a.innerHTML="No"           
        }else if (lives == 0) {        
            openModal()
            modalTitle.innerHTML = "Hai perso!!"
            modalBody.innerHTML = "Vuoi giocare ancora?"
            modalBtn.innerHTML = "Sì"
            modalBtn.addEventListener('click', rePlay)    
            a.innerHTML="No"                    
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
                    a.innerHTML="No" 
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
function setting(){
    openModal()
    
    clearInterval(timerId)
    clearInterval(t)

    if(soundEfx == true){
        efxCheck = 'checked'
    }else{efxCheck = ''}

    if(musicVol == true){
        musicSwitch = 'checked'
    }else{musicSwitch=''}

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
        <div class="row">
            <div class="col-6">Music</div>
            <div class="col-6">
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="musicVol" ${musicSwitch} />
                </div>
            </div>
        </div>
    
    `

    modalBtn.innerHTML = "Continua"
    modalBtn.addEventListener('click', goOn)
    
    a.innerHTML = "Annulla"
    a.addEventListener('click', annulla)
}

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

function soundMusic(musicVol){
    if (musicVol == true){
        music.volume = 0.3
    } else if(musicVol == false){
        music.volume = 0
    }
}

function annulla(e){
    a.removeEventListener('click', annulla)
    e.preventDefault()
    closeModal()

    a.href = "https://otto78.github.io/hello-world/"
    a.target = "blank"
}


// Timer functions
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



        











