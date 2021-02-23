const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const { addGame, getGame, getGames, updateCell } = require('./minesweeper');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/games', (req, res) => {
    res.send(getGames());
});

app.get('/games/:id', (req, res) => {
    const game = getGame(req.params.id);
    if (!game) return res.sendStatus(404);

    res.send(game);
});

app.post('/games', (req, res) => {
    const { gridWidth, gridHeight, numBombs } = req.body;
    const game = addGame(gridWidth, gridHeight, numBombs);

    res.send(game);
});

app.patch('/games/:id/cells/:x/:y', (req, res) => {
    const { params: { x, y, id }, body: { state } } = req;
    res.send(updateCell(id, { x, y, state }));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});