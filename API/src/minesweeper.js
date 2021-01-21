const gridList = [];

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

function addGame(width, height, amountBombs) {
    const bombGrid = generateBombs(width, height, amountBombs);
    const grid = [];

    for (let i = 0; i < height; i++) {
        grid.push([]);
        for (let j = 0; j < width; j++) {
            const isBomb = bombGrid[i][j];

            grid[i].push({
                flaged: false,
                revealed: false,
                isBomb,
                bombsAround: !isBomb ? computeBombsAround(i, j, bombGrid) : null
            });
        }
    }

    const id = gridList.length;
    const game = { id, state: 'ONGOING', grid }
    gridList.push(game);

    return getGame(game.id);
}

function getGame(id) {
    const game = gridList[id];
    if (!game) return null;
    const grid = game.grid.map(row => row.map(e => {
        const { revealed, flaged } = e;
        if (revealed || true) return e;
        return { revealed, flaged };
    }));
    return { ...game, grid };
}

function getGames() {
    return gridList.map(e => getGame(e.id));
}

function clickCell(id, x, y) {
    const game = gridList[id];

    if (!game) return res.sendStatus(404);
    if (x < 0 || y < 0 || x > game.grid.length || y > game.grid[0].length) return res.sendStatus(400);

    const cell = game.grid[x][y];
    let hasOtherCellChanged = false;
    cell.revealed = true;

    if (cell.bombsAround === 0) {
        revealEmptyArea(id, x, y);
        hasOtherCellChanged = true
    }
    handleClick(id, x, y);

    return { cell, hasOtherCellChanged };
}

function handleClick(id, x, y) {
    const game = gridList[id];
    const cell = game.grid[x][y];

    if (cell.isBomb) game.state = 'LOST';
    else if (!game.grid.find(row => row.find(e => !e.isBomb && !e.revealed))) game.state = 'WON';
}

function revealEmptyArea(id, x, y) {
    const grid = gridList[id].grid;
    grid[x][y].revealed = true

    if (grid[x][y].bombsAround !== 0) return;

    for (let i = -1; i <= 1; i++) {
        const newX = x + i;
        if (newX < 0 || newX >= grid.length) continue;

        for (let j = -1; j <= 1; j++) {
            const newY = y + j;
            if (newY < 0 || newY >= grid[newX].length) continue;
            if (i === 0 && j === 0) continue;
            if (grid[newX][newY].revealed) continue;
            revealEmptyArea(id, newX, newY);
        }
    }

}

module.exports = { addGame, getGame, getGames, clickCell };
