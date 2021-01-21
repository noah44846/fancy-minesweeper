const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const { gridList, addGame, getGame, getGames, clickCell } = require('./minesweeper');

const app = express();
const router = express.Router();
const port = 3000;

app.use('/api', router);

app.use(cors());
app.use(bodyParser.json());

router.get('/games', (req, res) => {
    res.send(getGames());
});

router.get('/games/:id', (req, res) => {
    const game = getGame(req.params.id);
    if (!game) return res.sendStatus(404);

    res.send(game);
});

router.post('/games', (req, res) => {
    const { gridWidth, gridHeight, numBombs } = req.body;
    const game = addGame(gridWidth, gridHeight, numBombs);
        
    res.send(game);
});

router.patch('/games/:id/click/:x/:y', (req, res) => {
    const x = Number(req.params.x);
    const y = Number(req.params.y);
    const id = Number(req.params.id);

    const cell = clickCell(id, x, y);
    
    res.send(cell);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});