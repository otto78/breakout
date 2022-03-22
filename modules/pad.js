
import {Box, board, DOMboard} from './box.js'

let DOMpad = document.createElement('div')
DOMpad.classList.add('pad', 'd-flex', 'justify-content-between', 'neon-border')
DOMpad.innerHTML =`
<div class="corner"></div>
<div class="corner"></div>
`
let width = board.width*0.15


class Pad extends Box{
    
    // constructor(x){
    
    //     this.width = board.width*0.15
    //     this.height = board.height*0.03
    
    //     this.left = x
    //     this.right = x + this.width
    //     this.top = 30 + this.height
    //     this.bottom = this.height
    // }
    
    
    display(x) {
        
        DOMpad.style.left = x + 'px'
        DOMpad.style.bottom = 0 + 'px'
        
        DOMboard.append(DOMpad)
    }

    remove(){
        DOMpad.remove()
    }

    movePadMouse(event) {
        let pointer = event.clientX - board.left;
        let padPosition = pointer;
        
        // data.classList.add('data')
        // data.innerHTML = `
        // <div>Mouse x: ${event.clientX - board.left}</div>
        // <div>Mouse y: ${event.clientY - board.top}</div>
        // <div>pad width: ${width}</div>
        // <div>pad left: ${DOMpad.style.left}</div>
        // <div>pad right: ${padPosition + width/2}</div>
        // `
        
        if (pointer < width/2){
            DOMpad.left = (board.left + width  + 'px');
        } else if(pointer > board.width - width/2){
            DOMpad.left = (board.width - width/2  + 'px');
        }else{
            
            DOMpad.remove()
            DOMpad.style.left = padPosition + 'px'
            DOMboard.append(DOMpad)
        }      
    }

    movePadKey(event){
        

        let padPosition = DOMpad.getBoundingClientRect().x
        data.classList.add('data')
        data.innerHTML = `
        <div>pad position ${padPosition}</div>
        `

        if(event.key == 'ArrowLeft' && padPosition > 0){         
            padPosition = (padPosition - 100)
    
            if(padPosition < width/2) {padPosition = width/2}
            
            DOMpad.remove()
            DOMpad.style.left = padPosition + 'px'
            DOMboard.append(DOMpad)
        }
        
        if(event.key == 'ArrowRight' && padPosition < board.width - width/2){      
            padPosition = (padPosition - width + 100)    
    
            if(padPosition > board.width - width/2) {padPosition = board.width - width/2} 
    
            DOMpad.remove()
            DOMpad.style.left = padPosition + 'px'
            DOMboard.append(DOMpad)
        }
    
    
    }
    
}




export{Pad, DOMpad}