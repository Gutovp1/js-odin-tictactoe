(function() {
    let gameboard = {
        board:[],
        init: function(){
            this.cacheDom();
            this.render();
        },
        cacheDom: function(){
            board = document.querySelectorAll('ul');
        },
        render: function(){
            for (i=0;i<board.length;i++){
                board[i].addEventListener('click', function (e) {
                    if (e.target.textContent == "X")
                        e.target.textContent = "O";
                    else
                        e.target.textContent = "X";
                });
            };
        }
    };
    gameboard.init();
})();

function Player(){
    return Player;
};
