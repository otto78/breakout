let playGround = document.querySelector('#playGround')
let command = document.querySelector('#command')

let xStart = playGround.getBoundingClientRect().x
let xEnd = playGround.getBoundingClientRect().right
let yStart = playGround.getBoundingClientRect().y
let yEnd = playGround.getBoundingClientRect().bottom
let width = playGround.getBoundingClientRect().width
let height = playGround.getBoundingClientRect().height

//console.log('Width: ' + width)

let pad = document.createElement('div')
pad.classList.add('pad')

let xPosition = width/2
//console.log('xPosition: '+xPosition)
drowPad()
pad.style.top = ((height-padHeight*3) +'px')

document.addEventListener('keydown', movePadKey)
playGround.addEventListener('mousemove', movePadMouse);
//console.log('Pad: ' + padWidth)
//command.addEventListener('pointerdown',  movePadCommand)

//Creazione ball
let ball = document.createElement('div')
ball.setAttribute('id', 'ball')
const ballStart = [width/2, (height - padHeight*5 -5)]
let ballCurrentPosition = ballStart


//playGround.append(ball)
drowBall()

document.addEventListener('click', ballMove)








//--------------------------------------------------------------------
//Funzioni Pad

function drowPad(){
    
    pad.style.left = xPosition +'px'
    playGround.append(pad)
    padWidth = pad.getBoundingClientRect().width
    padHeight = pad.getBoundingClientRect().height


}

function movePadKey(event){
    if(event.key == 'ArrowLeft' && xPosition > 0){   
        xPosition = xPosition - 50
        if(xPosition < padWidth/2) {xPosition = padWidth/2}
        
        pad.remove()
        drowPad()
    }
    
    if(event.key == 'ArrowRight' && xPosition < width - padWidth/2){    
        xPosition = xPosition + 50  
        if(xPosition > width - padWidth/2) {xPosition = width - padWidth/2} 
        
        pad.remove()
        drowPad()
    }


}

function movePadMouse(event) {
    let cursore = event.clientX - xStart;
    
    if (cursore < padWidth/2){
        pad.style.left = (padWidth/2  + 'px');
    } else if(cursore > width-padWidth/2){
        pad.style.left = (width-padWidth/2  + 'px');
    }else{
        pad.style.left = (cursore  + 'px');
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
    setInterval(move, 50)
}
function move(){
    
    ballCurrentPosition[0] +=5 
    ballCurrentPosition[1] -=5

        // ball.style.left = ((ball.style.left +5) + 'px')
        // ball.style.top = ((ball.style.top -5) + 'px')
        ball.remove()
        drowBall()

    
    
}









