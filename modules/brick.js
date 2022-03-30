import{board} from './board.js'

class Brick{
    constructor(x, y){
        
        let brickWidth = board.width*0.10
        let brickHeight = board.height*0.05

        x = board.width*(x/100)
        y = board.height*(y/100)

        this.left = x
        this.right = x + brickWidth
        this.top = y + brickHeight
        this.bottom = y
    }
}


export{Brick}