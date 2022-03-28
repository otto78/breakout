
import {board, domBoard} from './board.js'


class Pad{
    
    constructor(x = 0){
        if(board.width<576){
            this.width = board.width*0.20
        }
        this.width = board.width*0.15
        this.height = board.height*0.03
    
        this.left = x 
        this.right = x + this.width
        this.top = this.height*2
        this.bottom = this.height
    }
    
    display(x) {
        let domPad = document.createElement('div')
        domPad.classList.add('pad', 'd-flex', 'justify-content-between', 'neon-border')
        
        // domPad.innerHTML =`
        // <div class="corner"></div>
        // <div class="corner"></div>
        // `
        
        this.left = x 
        this.right = x + this.width
        
        domPad.style.left = (this.left + this.width/2 ) + 'px'
        domPad.style.bottom = this.bottom + 'px'   
        domBoard.append(domPad)
    }

    remove(){
        let p = document.querySelector('.pad')
        if(p){
        p.remove()
        }
    }

    move(x){

        this.remove()
        this.left = x
        this.right = this.left + this.width
        this.display(this.left)

    }  
}

export{Pad}