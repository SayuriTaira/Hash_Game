const cellElements = document.querySelectorAll('[data-cell]');
const board = document.querySelector('.board')
const winningMessage = document.querySelector('.winning-message')
const winningText = document.querySelector('.winning-text')
const restartButton = document.querySelector('.restart-button')

let isCircleTurn = false;

const swapTurn = () => {
    isCircleTurn = !isCircleTurn

    board.classList.remove('x')
    board.classList.remove('circle')

    if (isCircleTurn) {
        board.classList.add('circle')
    } else {
        board.classList.add('x')
    }
}

const startGame = () => {
    winningMessage.style.display = 'none'
    cellElements.forEach(cell => {
        cell.classList.remove('x')
        cell.classList.remove('circle')
    });

    for (const cell of cellElements) {
        cell.addEventListener('click', handleClick, { once:true });
    }

    board.classList.add('x')
}

const handleClick = (e) => {
    
    //Colocar a marca (X ou Circulo)

    const classToAdd = isCircleTurn ? 'circle' : 'x' 

    const cell = e.target;
    
    cell.classList.add(classToAdd)

    //Trocar os simbolos  
    
    swapTurn();
    
    //Verificar vitoria
    
    const winnerPositions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    
    function checkWin (currentPlayer) {
        return winnerPositions.some((combination) => {
            return combination.every((index) => {
                return cellElements[index].classList.contains(currentPlayer)
            })
        })
    }

    //verficar empate
    
    const isDraw = () => {
        return Array.from(cellElements).every((cell) => {
            return cell.classList.contains('x') || cell.classList.contains('circle')
        })
    }

    const isWin = checkWin(classToAdd);

    if (isWin) {
        winningMessage.style.display = 'flex'
        winningText.innerText = isCircleTurn ? '✖ Venceu!' : '⚪ Venceu!'

    } else if (isDraw()) {
        winningText.innerText = 'Empate!';
        winningMessage.style.display = 'flex'
    }
    
}

restartButton.addEventListener('click', startGame)

startGame();


