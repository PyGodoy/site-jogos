const gridSize = 10;
const numMines = 20;
let isGameOver = false;

const minesweeper = document.querySelector('.minesweeper');

function createEmptyGrid() {
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.row = Math.floor(i / gridSize); // Adicione atributos de dados para rastrear as coordenadas
        cell.dataset.col = i % gridSize;
        minesweeper.appendChild(cell);
    }
}

function generateMines() {
    const cells = document.querySelectorAll('.cell');
    const randomIndices = [];
    while (randomIndices.length < numMines) {
        const randomIndex = Math.floor(Math.random() * (gridSize * gridSize));
        if (!randomIndices.includes(randomIndex)) {
            randomIndices.push(randomIndex);
            cells[randomIndex].classList.add('mine');
        }
    }
}

function getAdjacentMineCount(cell) {
    const rowIndex = parseInt(cell.dataset.row);
    const colIndex = parseInt(cell.dataset.col);
    let count = 0;

    // Coordenadas das células vizinhas
    const coordinates = [
        { row: rowIndex - 1, col: colIndex - 1 },
        { row: rowIndex - 1, col: colIndex },
        { row: rowIndex - 1, col: colIndex + 1 },
        { row: rowIndex, col: colIndex - 1 },
        { row: rowIndex, col: colIndex + 1 },
        { row: rowIndex + 1, col: colIndex - 1 },
        { row: rowIndex + 1, col: colIndex },
        { row: rowIndex + 1, col: colIndex + 1 }
    ];

    // Verifique todas as células vizinhas
    for (const coord of coordinates) {
        const adjacentCell = document.querySelector(`[data-row="${coord.row}"][data-col="${coord.col}"]`);
        if (adjacentCell && adjacentCell.classList.contains('mine')) {
            count++;
        }
    }

    return count;
}

createEmptyGrid();
generateMines();

const cells = document.querySelectorAll('.cell');
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (isGameOver || cell.classList.contains('opened')) return;

        if (cell.classList.contains('mine')) {
            cell.classList.add('mine-red');
            setTimeout(() => {
                isGameOver = true;
                alert('Você perdeu! Clique em "OK" para recomeçar.');
                location.reload();
            }, 100);
        } else {
            const adjacentMineCount = getAdjacentMineCount(cell);
            if (adjacentMineCount > 0) {
                cell.textContent = adjacentMineCount; // Exiba o número na célula
            } else {
                // Se não houver bombas vizinhas, abra as células vazias
                openEmptyCells(cell);
            }
            cell.classList.add('opened');
        }
    });
});

function openEmptyCells(cell) {
    const rowIndex = parseInt(cell.dataset.row);
    const colIndex = parseInt(cell.dataset.col);

    const coordinates = [
        { row: rowIndex - 1, col: colIndex - 1 },
        { row: rowIndex - 1, col: colIndex },
        { row: rowIndex - 1, col: colIndex + 1 },
        { row: rowIndex, col: colIndex - 1 },
        { row: rowIndex, col: colIndex + 1 },
        { row: rowIndex + 1, col: colIndex - 1 },
        { row: rowIndex + 1, col: colIndex },
        { row: rowIndex + 1, col: colIndex + 1 }
    ];

    for (const coord of coordinates) {
        const adjacentCell = document.querySelector(`[data-row="${coord.row}"][data-col="${coord.col}"]`);
        if (adjacentCell && !adjacentCell.classList.contains('opened')) {
            adjacentCell.classList.add('opened');
            const adjacentMineCount = getAdjacentMineCount(adjacentCell);
            if (adjacentMineCount > 0) {
                adjacentCell.textContent = adjacentMineCount;
            } else {
                openEmptyCells(adjacentCell);
            }
        }
    }
}
