let playGround= document.querySelector('#playGround')

let xStart = playGround.getBoundingClientRect().x
let xEnd = playGround.getBoundingClientRect().right
let yStart = playGround.getBoundingClientRect().y
let yEnd = playGround.getBoundingClientRect().bottom
let width = playGround.getBoundingClientRect().width
let height = playGround.getBoundingClientRect().height

console.log('Width: ' + width)

let pad = document.createElement('div')
pad.classList.add('pad')
pad.style.top = (height-50) +'px'




let xPosition = width/2
console.log('xPosition: '+xPosition)
drowPad()
let padWidth = pad.getBoundingClientRect().width
//console.log(padWidth)



document.addEventListener('keydown', function(event){
    if(event.key =='ArrowLeft' && xPosition>0){
        xPosition = xPosition-50
        if(xPosition<padWidth/2){
            xPosition=padWidth/2 
        }
        
        let padPosition = xPosition-padWidth/2
        console.log(padPosition)
        
        pad.remove()
        drowPad()
    }
    if(event.key=='ArrowRight' && xPosition<width-padWidth/2){
        xPosition = xPosition+50
        if(xPosition>width-padWidth/2){
            xPosition = width- padWidth/2
        } 
        let padPosition = xPosition-padWidth/2
        console.log(padPosition)
        
        pad.remove()
        drowPad()
    }
    
})

let padPosition = xPosition-padWidth/2
console.log(padPosition)


function drowPad(){   
    pad.style.left = xPosition +'px'
    playGround.append(pad)
}