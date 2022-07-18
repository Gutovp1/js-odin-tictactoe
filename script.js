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
                gameEngine.playNow(index);
                updateBoard();
            });
        });
    };
    
    const updateBoard = () =>{
        gameCells.forEach((item, index) => {
            item.textContent = gameBoard.gameboard.board[index];
        });
    };
      
    const turnMessage = function(turn) {    
        if(turn)
            playerTurn.textContent = "Player X's turn.";
        else
            playerTurn.textContent = "Player O's turn.";
    };

    markCell();
    return {gameCells, reset, turnMessage, resultMessage};
})();

const gameEngine = (function(){
    const playerX = Player("X");
    const playerO = Player("O");
    let round = 1;
    let playerXTurn = true;
    let finished = false;


    const playNow = (index) => {
        //it plays only if the field is available.
        if(gameBoard.gameboard.board[index] != null)
            {return;}
        (playerXTurn) ? gameBoard.gameboard.setCell(index, playerX.getMark()):gameBoard.gameboard.setCell(index, playerO.getMark());
        
        if (round >=3){
            if(checkResult()){
                return;
            }
            if(round == 9){
                //draw
            }
        }    
        round++;
        
        //next player's turn
        playerXTurn = (playerXTurn == true) ? false : true;
        displayController.turnMessage(playerXTurn);
        // }
    };
    
    const checkResult = () => {
        if ( gameBoard.gameboard.board[0]!= null && gameBoard.gameboard.board[0]==gameBoard.gameboard.board[1] && gameBoard.gameboard.board[1]==gameBoard.gameboard.board[2]){
            displayController.resultMessage("Tuf"); 
            round = 1;
            return true;
        }
    };
    
    const nextPlayer = (turn)=>{
        if(turn){
            turn = false;
            // displayController.
        }
    };

    return{playNow};

})();

// 0-1-2
// 0-4-8
// 0-3-6
// 1-4-7
// 2-4-6
// 2-5-8
// 3-4-5
// 6-7-8