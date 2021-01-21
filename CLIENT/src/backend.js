import { get, post, patch } from 'axios';

function makeRequest(endpoint, method, body) {
    return new Promise((callback) => {
        method(process.env.VUE_APP_API_BASE_URL + endpoint, body).then((res) => {
            callback(res.data);
        });
    });
}

export default {
    getGames: () => makeRequest('/games', get),
    getGame: (id) => makeRequest(`/games/${id}`, get),
    addGame: (gridWidth, gridHeight, numBombs) => makeRequest('/games', post, { gridWidth, gridHeight, numBombs }),
    clickCell: (id, x, y) => makeRequest(`/games/${id}/click/${x}/${y}`, patch),
}