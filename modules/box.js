class Box{
    constructor(el){

        this.width = el.getBoundingClientRect().width,
        this.height = el.getBoundingClientRect().height

        this.left = el.getBoundingClientRect().x,
        this.right = el.getBoundingClientRect().x + el.getBoundingClientRect().width,
        this.top = el.getBoundingClientRect().y, 
        this.bottom = el.getBoundingClientRect().y + el.getBoundingClientRect().height
    }
}

let domBoard = document.querySelector('#board')
let board = new Box(domBoard)

export{Box, board, domBoard}