const gridList = [];
const gameState = {
    ongoing: 'ONGOING',
    lost: 'LOST',
    won: 'WON'
};
const cellState = {
    hidden: 'HIDDEN',
    revealed: 'REVEALED',
    flaged: 'FLAGED'
};

function addGame(width, height, amountBombs) {
    const bombGrid = generateBombs(width, height, amountBombs);
    const grid = [];

    for (let i = 0; i < height; i++) {
        grid.push([]);
        for (let j = 0; j < width; j++) {
            const isBomb = bombGrid[i][j];

            grid[i].push({
                state: cellState.hidden,
                isBomb,
                bombsAround: !isBomb ? computeBombsAround(i, j, bombGrid) : null
            });
        }
    }

    const id = gridList.length;
    const game = { id, state: gameState.ongoing, grid }
    gridList.push(game);
    return getGame(game.id);
}

function getGame(id) {
    const game = gridList[id];
    if (!game) throw new Error('404');
    return game;
}

function getGames() {
    return gridList.map(e => ({ id: e.id, state: e.state }));
}

function updateCell(id, data) {
    const game = getGame(id);
    const { x, y, state } = data;
    const cell = game.grid[x][y];
    const { hidden, revealed, flaged } = cellState;
    const { won, lost } = gameState;
    const findInGrid = (callback) => game.grid.find(row => row.find(e => callback(e)));

    if (!Object.values(cellState).find(s => s === state)) throw new Error('400')
    if (!game) throw new Error('404');
    if (x < 0 || y < 0 || x > game.grid.length || y > game.grid[0].length) throw new Error('404');

    if (state === hidden && cell.state === flaged) {
        cell.state = state;
        if (!findInGrid(e => e.isBomb ? !(e.state === flaged) : (e.state === flaged))) game.state = won;
    } else if (state === revealed && cell.state === hidden) {
        if (cell.isBomb) game.state = lost;
        else {
            cell.state = state;
            // check if there are no non-bomb cells that are not revealed
            if (!findInGrid(e => !e.isBomb && !(e.state === revealed))) game.state = won;
        }
    } else if (state === flaged && cell.state === hidden) {
        cell.state = state;
        // check if there are no non-bomb cells are flaged and that no bombs are not flaged by using an XOR
        if (cell.isBomb && !findInGrid(e => e.isBomb ? !(e.state === flaged) : (e.state === flaged))) game.state = won;
    }

    return cell;
}

function computeBombsAround(x, y, grid) {
    let res = 0;
    for (let i = -1; i <= 1; i++) {
        const newX = x + i;
        if (newX < 0 || newX >= grid.length) continue;

        for (let j = -1; j <= 1; j++) {
            const newY = y + j;
            if (newY < 0 || newY >= grid[newX].length) continue;
            if (i === 0 && j === 0) continue;

            grid[newX][newY] ? res++ : null;
        }
    }

    return res;
}

function generateBombs(width, length, amountBombs) {
    var grid = [];
    for (let i = 0; i < length; i++) {
        grid.push([]);
        for (let j = 0; j < width; j++) {
            grid[i].push(false);
        }
    }

    for (let i = 0; i < amountBombs; i++) {
        const x = Math.floor(Math.random() * length);
        const y = Math.floor(Math.random() * width);

        if (grid[x][y]) i--;
        else grid[x][y] = true;
    }

    return grid;
}

module.exports = { addGame, getGame, getGames, updateCell };