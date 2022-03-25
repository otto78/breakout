import{board, domBoard} from './board.js'

class Ball{
    constructor(x, y){

        
        x = board.width*(x/100)
        y = board.height*(y/100)
        
        this.diam = 20
        
        this.left = x
        this.right = x + this.diam
        this.top = y + this.diam
        this.bottom = y

        //this.position = [x, y]
        this.direction = [2, 2]
        if(board.width<576){
            this.speed = 15
        }else{
            this.speed = 10
        }

    }

    display(x,y){
        let ball = document.createElement('div')
        ball.setAttribute('id', 'ball')

        this.left = x
        this.right = x + this.diam
        this.top = y + this.diam
        this.bottom = y
        //this.position = [x, y]
   
        ball.style.left = this.left + 'px'
        ball.style.bottom = this.bottom + 'px'
    
        domBoard.append(ball)
    }

    remove(){
        let b = document.querySelector('#ball')
        b.remove()
        
    }

    move(x,y){
        

            this.remove()
            this.left = x
            this.right = x + this.diam
            this.top = y + this.diam
            this.bottom = y
            this.display(x,y)
    
        
    }
}



export{Ball}