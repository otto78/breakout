class Board{
    constructor(el){

        this.width = el.getBoundingClientRect().width,
        this.height = el.getBoundingClientRect().height

        this.left = 0,
        this.right = el.getBoundingClientRect().width,
        this.top = el.getBoundingClientRect().height,
        this.bottom = 0,
        this.x = el.getBoundingClientRect().x,
        this.y = el.getBoundingClientRect().y
    }
}

let domBoard = document.querySelector('#board')
let board = new Board(domBoard)

export{board, domBoard}