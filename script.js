
const ticTacToe = (function (){
    function gameBoard(){
        
        let board = [
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


    function gameController(
        playerOneName = "Player One",
        playerTwoName = "Player Two"
    ){


        let board = gameBoard();
        let boardArray = board.getBoard();
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

        let switchPlayerTurn = () =>{
            const getActivePlayer = () => currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
            // currentPlayer = currentPlayer === players[0].playerSign ? players[1].playerSign : players[0].playerSign;
            // 'X' ? 'O' : 'X';
        };

    
        const getActivePlayer = () => currentPlayer = currentPlayer === players[0] ? players[1] : players[0];

        const printNewRound = () => {
            board.printBoard();
            console.log(`${currentPlayer.playerSign}'s turn`);
        };

        

        const playRound = (selectedRow, selectedColumn) =>{


            const checkWin = () => {
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
            
            const isBoardFull = () => {
                return boardArray.every(row => row.every(cell => cell !== ' '));
            };
            
                
            if (boardArray[selectedRow][selectedColumn] !== ' ') {
                console.log('Invalid move. Try again.');
                 return { status: "invalid" };
                
            }
            
            boardArray[selectedRow][selectedColumn] = currentPlayer;

            console.log(boardArray);
             
                const winner = checkWin();
                if (winner) {
                    board.printBoard();
                    console.log(`${winner} wins!`);
                    
                    return { status: "win", winner };
                } else if (isBoardFull()) {
                    console.log('Draw!');
                    return { status: "draw" };
                } 
                switchPlayerTurn(); 
                printNewRound();
                return { status: "continue" };
            
                 
            
        };   

        const restart = () =>{
            
            currentPlayer = players[0].playerSign;
            
              
        }
        
            
        

            return {
                playRound,
                getActivePlayer,
                getBoard: board.getBoard,
                switchPlayerTurn,
                restart,
            };
        
    }

    
     return gameController;

 })();



function displayController(){
    const game = ticTacToe();
    const playerTurnEl = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');

    const resetBoardArray = () => {
        let board = game.getBoard(); // Access the current board array
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                board[i][j] = " "; // Set each element to an empty string
            }
        }
        console.log("Board reset:", board); // Debugging: log the reset board
    };

    const updateScreen = () =>{
        //this is to clear the board
        boardDiv.textContent = "";

         // get the newest version of the board and player turn
         let board = game.getBoard();
        const activePlayer = game.getActivePlayer();
        
        //display player's turn
        playerTurnEl.textContent = `${activePlayer.name}'s (${activePlayer.playerSign}) turn`;


        const resetGame = () => {
            game.restart(); // Reset the game state
            resetBoardArray();
            updateScreen();
           
        };
        //render board squares

        board.forEach((row,rowIndex)=>{
            row.forEach((cell,colIndex)=>{

                //create a square element
                const square = document.createElement("div");
                square.classList.add("square");
                square.textContent = cell;
                square.dataset.row = rowIndex;
                square.dataset.column = colIndex;
                boardDiv.appendChild(square);

                //add click event to handle moves



                square.addEventListener('click',(e)=>{
                    let currentPlayer = activePlayer.playerSign;
                    
                
                    const selectedRow = parseInt(e.target.dataset.row, 10);
                    const selectedColumn = parseInt(e.target.dataset.column, 10);

                    const result = game.playRound(selectedRow,selectedColumn);

                    
                       game.getBoard()[rowIndex][colIndex] = currentPlayer;   
                       
                       

                    if(result.status === "invalid"){
                        alert("Invalid move! Try again.");
                        return;
                    }
                    
                    
                    if (result.status === "win") {
                        alert(`${result.winner} wins!`);
                        resetGame();
                        
                        playerTurnEl.textContent = `${activePlayer.name}'s (${activePlayer.playerSign}) turn`;
                        console.log(game.getBoard());
                        return board;
                        
                    } else if (result.status === "draw") {
                        alert("It's a draw!");
                        resetGame();
                        return;
                    }

                    square.textContent = game.getBoard()[rowIndex][colIndex];
                    
                    // currentPlayer = activePlayer.playerSign;
                    
                       
        
                       updateScreen();
                      
                });

               
            });
            
        });

    }

    updateScreen();
}


displayController();