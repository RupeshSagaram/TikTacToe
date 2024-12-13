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

    let currentPlayer = players[0];

    const switchPlayerTurn = () =>{
        currentPlayer = currentPlayer === players[0] ? players[1] :
             players[0];
    };

    const getActivePlayer = () => currentPlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer.name}'s turn`);
    };

    const playRound = () => {

        function checkWin() {
            // Check rows
            for (let i = 0; i < 3; i++) {
                if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== ' ') {
                    return board[i][0];
                }
            }
        
            // Check columns
            for (let i = 0; i < 3; i++) {
                if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== ' ') {
                    return board[0][i];
                }
            }
        
            // Check diagonals
            if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== ' ') {
                return board[0][0];
            }
            if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== ' ') {
                return board[0][2];
            }
        
            return null;
        }

        function isBoardFull() {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (board[i][j] === ' ') {
                        return false;
                    }
                }
            }
            return true;
        }

        while (true) {
            board.printBoard();
        
            const row = prompt('Enter row (0-2): ');
            const col = prompt('Enter column (0-2): ');
        
            if (row < 0 || row > 2 || col < 0 || col > 2 || board[row][col] !== ' ') {
                console.log('Invalid move. Try again.');
                continue;
            }
        
            board[row][col] = currentPlayer;
        
            const winner = checkWin();
            if (winner) {
                console.log(`${winner} wins!`);
                break;
            } else if (isBoardFull()) {
                console.log('Draw!');
                break;
            }
        
            switchPlayerTurn();
            printNewRound();
        
        return{
            playRound,
            getActivePlayer
        };    
    }


}

}

const game = gameController();



gameController();