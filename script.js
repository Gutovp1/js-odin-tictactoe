// const gamerBoard = (function() {
//     let gameboard = {
//         board:[],
//         init: function(){
//             this.cacheDom();
//             this.render();
//         },
//         cacheDom: function(){
//             board = document.querySelectorAll('ul');
//         },
//         render: function(){
//             for (i=0;i<board.length;i++){
//                 board[i].addEventListener('click', e => {
//                     if (e.target.textContent == "X")
//                         e.target.textContent = "O";
//                     else
//                         e.target.textContent = "X";
//                 });
//             };
//         },
            
//     };
//     gameboard.init();
// })();
 
const gameBoard = (function() {
    let gameboard = {
        board: new Array(9),
        
        getCell: function(index){
            return this.board[index];
            },

        setCell: function(index, mark){
            this.board[index] = mark;
            },
        reset: () => {
            for(let i=0; i<this.board.length; i++)
                this.board[i] = "";
            }
        }
        return {gameboard};
    })();

 
const Player = (mark) => {
    this.mark = mark;

    const getMark = () =>{
        return mark;
    };

    return {getMark};
};

const displayController = (() =>{
    let gameCells = document.querySelectorAll('ul');
    let playerTurn = document.querySelector('.player-turn');
    let result = document.querySelector('.result');

    const reset = () => {
        gameCells.forEach( (item)=> {item.textContent ="";} );
        playerTurn.textContent = "Player X's turn"; 
        result.textContent = "Game Restarted";
    };

    const resultMessage = function(winner){
        result.textContent = "The winner is "+ winner+"!";    
    };

    const markCell = (player) => {
        gameCells.forEach( (item, index) =>{
            item.addEventListener('click', e =>{
                item.textContent = index;
                // gameEngine.playNow(parseInt(e.target.dataset.index));
                // updateBoard();
            });
        });
    };

    const updateBoard = () =>{
        gameCells.forEach((item, index) => {
            item.textContent = gameBoard.gameboard.board[index];
        });
    };

    markCell();
    return {gameCells, reset, resultMessage, markCell};
})();

const gameEngine = (function(){
    const playerX = Player("X");
    const playerO = Player("O");
    let round = 1;
    let finished = false;

    const playNow = (index) => {
        gameBoard.gameboard.board[index] = index;
    };
    return{playNow};

})();