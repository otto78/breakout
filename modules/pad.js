
import {board, domBoard} from './box.js'


class Pad{
    
    constructor(x = board.width/2){
    
        this.width = board.width*0.15
        this.height = board.height*0.03
    
        this.left = x
        this.right = this.left + this.width
        this.top = 30 + this.height
        this.bottom = this.height
    }
    
    display(x) {
        let domPad = document.createElement('div')
        domPad.classList.add('pad', 'd-flex', 'justify-content-between', 'neon-border')
        
        domPad.innerHTML =`
        <div class="corner"></div>
        <div class="corner"></div>
        `
        
        this.left = x
        this.right = this.left + this.width
        
        domPad.style.left = (this.left + this.width/2) + 'px'
        domPad.style.bottom = this.height + 'px'   
        domBoard.append(domPad)
    }

    remove(){
        let p = document.querySelector('.pad')
        p.remove()
        
    }

    move(x){

        this.remove()
        this.left = x
        this.right = this.left + this.width
        this.display(this.left)

    }  
}

export{Pad}