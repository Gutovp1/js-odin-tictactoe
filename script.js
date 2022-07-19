const gameBoard = (function() {
    let gameboard = {
        board: new Array(9),
        
        getCell: function(index){
            return this.board[index];
            },

        setCell: function(index, mark){
            this.board[index] = mark;
            },
        resetB: function() {
            for(let i=0; i<this.board.length; i++){
                this.board[i] = "";
            }
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
    const btnReset = document.querySelector('.reset');

    const resetDisplay = () => {
        gameCells.forEach( (item)=> {item.textContent ="";} );
        playerTurn.textContent = "Let's start with player X."; 
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
        if(turn){
            playerTurn.textContent = "Player X's turn.";
        }
        else{
            playerTurn.textContent = "Player O's turn.";
        }
    };

    btnReset.addEventListener('click', (e) => {
       e.preventDefault();
       gameBoard.gameboard.resetB();
       gameEngine.resetEngine();
       resetDisplay();
       markCell();
    });

    markCell();
    return {gameCells, resetDisplay, turnMessage, resultMessage};
})();

const gameEngine = (function(){
    const playerX = Player("X");
    const playerO = Player("O");
    let round = 1;
    let playerXTurn = true;
    let finished = false;
    
    

    const playNow = (index) => {
        while(!finished){
        //it plays only if the field is available.
        if(gameBoard.gameboard.board[index] != null)
            {return;}
        (playerXTurn) ? gameBoard.gameboard.setCell(index, playerX.getMark()):gameBoard.gameboard.setCell(index, playerO.getMark());
        
        //check a possible winner from the 5th round on
        if (round >=5){
            if(checkResult()){
                alert("oooover");
                return; 
            }
            // if(round == 9){
            //     finished = true;
            //     round=1;
            //     //gameBoard.gameboard.reset();
            //     //draw
            // }
        }    
        round++;
        
        //next player's turn
        playerXTurn = (playerXTurn == true) ? false : true;
        displayController.turnMessage(playerXTurn);
    }
    };
    
    const checkResult = () => {
        let XMarks = [];
        let OMarks = [];
        const winningConditions = [
            [0,1,2],
            [0,4,8],
            [0,3,6],
            [1,4,7],
            [2,4,6],
            [2,5,8],
            [3,4,5],
            [6,7,8]
            ];
    
        gameBoard.gameboard.board.forEach((item, index)=>{
            if(item == "X")
                XMarks.push(index);
            if(item == "O")
                OMarks.push(index);
        });
        winningConditions.forEach((wCondition)=> {
            if(wCondition.every(item => (XMarks.includes(item)))){
                displayController.resultMessage("X"); 
                finished = true;
            }
            if(wCondition.every(item => (OMarks.includes(item)))){
                displayController.resultMessage("O"); 
                finished = true;
            }
        });
        return finished;
    };
    

    const resetEngine = () => {
        round = 1;
        finished = false;
        playerXTurn = true;
    };
    

    return{playNow, resetEngine, checkResult};

})();

