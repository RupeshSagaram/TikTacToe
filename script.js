function gameBoard(){
    
    const board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
  ];

    const getBoard = () => board;

    const printBoard = () => {
         console.log('-------------');
         for (let i = 0; i < 3; i++) {
         console.log(`| ${board[i][0]} | ${board[i][1]} | ${board[i][2]} |`);
         console.log('-------------');
       }
    }

    return {getBoard, printBoard};

}

function Cell() {
    let value = " ";

    const addPlayerSign = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {
        addPlayerSign,
        getValue
    };

}

function gameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
){


    const board = gameBoard();
    const boardArray = board.getBoard();
    console.log(boardArray);
    const players =[
        {
            name: playerOneName,
            playerSign: "X"
        },
        {
            name: playerTwoName,
            playerSign: "O"
        }
    ];

    let currentPlayer = players[0].playerSign;

    const switchPlayerTurn = () =>{
        currentPlayer = currentPlayer === players[0].playerSign ? players[1].playerSign : players[0].playerSign;
        // 'X' ? 'O' : 'X';
    };

    // const getActivePlayer = () => currentPlayer = currentPlayer === players[0] ? players[1] : players[0];

    const printNewRound = () => {
        board.printBoard();
        console.log(`${currentPlayer}'s turn`);
    };

    function checkWin() {
        // Check rows
        for (let i = 0; i < 3; i++) {
            if (boardArray[i][0] === boardArray[i][1] && boardArray[i][1] === boardArray[i][2] && boardArray[i][0] !== ' ') {
                return boardArray[i][0];
            }
        }
    
        // Check columns
        for (let i = 0; i < 3; i++) {
            if (boardArray[0][i] === boardArray[1][i] && boardArray[1][i] === boardArray[2][i] && boardArray[0][i] !== ' ') {
                return boardArray[0][i];
            }
        }
    
        // Check diagonals
        if (boardArray[0][0] === boardArray[1][1] && boardArray[1][1] === boardArray[2][2] && boardArray[0][0] !== ' ') {
            return boardArray[0][0];
        }
        if (boardArray[0][2] === boardArray[1][1] && boardArray[1][1] === boardArray[2][0] && boardArray[0][2] !== ' ') {
            return boardArray[0][2];
        }
    
        return null;
    }
    
    function isBoardFull() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (boardArray[i][j] === ' ') {
                    return false;
                }
            }
        }
        return true;
    }
    
    while (true) {
        printNewRound();
    
        const row = prompt('Enter row (0-2): ');
        const col = prompt('Enter column (0-2): ');
    
        if (row < 0 || row > 2 || col < 0 || col > 2 || boardArray[row][col] !== ' ') {
            console.log('Invalid move. Try again.');
            continue;
        }
    
        boardArray[row][col] = currentPlayer;
    
        const winner = checkWin();
        if (winner) {
            board.printBoard();
            console.log(`${winner} wins!`);
            break;
        } else if (isBoardFull()) {
            console.log('Draw!');
            break;
        }
        
       
        switchPlayerTurn(); 
    }
    
}

// gameController();
