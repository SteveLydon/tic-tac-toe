const createPlayer = function(playerName, playerMark){
    const name = playerName;
    const mark = playerMark;
    const getMark = ()=>mark;
    const getName = ()=>name;
    return {getName,getMark};
};



var game = (function(){

    player1 = createPlayer("player 1", "X");
    player2 = createPlayer("player 2", "O");

    currentPlayer = player1;
    plays = 0;

    const displayController = (function(){
        let container = document.querySelector(".container");
        const resetBoard = ()=>{
            children = container.childNodes;
            for(index in children){
                children[index].disabled = false;
                children[index].textContent = "";
            }
        };
        return {resetBoard}
    })();


    const createBoard = function(){
        const board = new Array([-1,-2,-3],[-4,-5,-6],[-7,-8,-9]);
    
        const getRow = (index)=>{
            return board[index];
        }
    
        const getColumn = (index)=>{
            return [board[0][index],board[1][index],board[2][index]];
        }
    
        const getDiagonal = (index)=>{
            return !index ? [board[0][0],board[1][1],board[2][2]] : [board[2][0],board[1][1],board[0][2]];
        }
    
        const addMark = (mark,x,y)=>{
            board[x][y] = mark;
        };
    
        return {addMark, getRow, getColumn, getDiagonal};
    };

    let board = createBoard();

    const resetBoard = function(){
        board=createBoard();
        plays = 0;
        displayController.resetBoard();
    };

    const playChoice = (element, player, playerChoiceX, playerChoiceY)=>{
        plays++;
        element.textContent = player.getMark();
        element.disabled = true;
        board.addMark(player.getMark(),playerChoiceX,playerChoiceY);
        if(checkState()){
            alert("winner = " + player.getName());
            resetBoard();
        }
        else{
            if(plays == board.getColumn(0).length*board.getRow(0).length){
                alert("no winner: tie")
                resetBoard();
            }
            if(currentPlayer==player1){
                currentPlayer=player2;
            }
            else{
                currentPlayer=player1;
            }
        }
    };

    const allEqual = (arr)=>{
        return arr.every(v=>v===arr[0])
    };

    const checkState = ()=>{
        for(let i=0;i<board.getColumn(0).length;i++){
            if(allEqual(board.getRow(i))){
                return true;
            }
            if(allEqual(board.getColumn(i))){
                return true;
            }
        }
        if(allEqual(board.getDiagonal(0)) || allEqual(board.getDiagonal(1))){
            return true;
        }else{
            return false;
        }
    };

    return {playChoice,checkState};

})();