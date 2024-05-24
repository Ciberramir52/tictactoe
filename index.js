function Gameboard() {
  this.board = Array(9).fill(null);
  this.isFull = function () {
    return this.board.every((cell) => cell !== null);
  };
}

function Player(name, symbol) {
    this.name = name;
    this.symbol = symbol;
}

function Game() {
    this.gameOver = false;
    this.players = [];
    this.currenPlayerIndex = 0;
    this.gameboard = new Gameboard();

    this.addPlayer = function (name,symbol) {
        this.players.push(new Player(name,symbol));
    };

    this.getCurrentPlayer = function () {
        return this.players[this.currenPlayerIndex];
    };

    this.switchPlayer = function () {
        this.currenPlayerIndex = (this.currenPlayerIndex + 1) % this.players.length;
    };

    this.makeMove = function (position) {
        if (this.gameboard.board[position] === null && !this.gameOver) {
            this.gameboard.board[position] = this.getCurrentPlayer().symbol;
            this.switchPlayer();

            if (this.checkWin()) {
                this.gameOver = true;
                console.log(`${this.getCurrentPlayer().name} wins!`);
                return 2;
            }
            
            if (this.gameboard.isFull()) {
                this.gameOver = true;
                console.log('It is a draw');
                return 1;
            }

            console.log('Move made');
            return 0;
        } else {
            console.log('Wrong move');
            return 3;
        }
    };

    this.checkWin = function () {
        const winConditions = [
            [0,1,2],[3,4,5],[6,7,8],
            [0,3,6],[1,4,7],[2,5,8],
            [0,4,8],[2,4,6]
        ];

        for (const condition of winConditions) {
            const [a,b,c] = condition;
            if (
                this.gameboard.board[a] !== null &&
                this.gameboard.board[a] === this.gameboard.board[b] &&
                this.gameboard.board[a] === this.gameboard.board[c]
            ) {
                return true;
            }
        }
        return false;
    };
}

const game = new Game();
game.addPlayer('Player 1', 'X');
game.addPlayer('Player 2', 'O');