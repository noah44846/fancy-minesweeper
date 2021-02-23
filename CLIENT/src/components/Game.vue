<template>
  <div v-if="game">
    <div v-if="game.state == 'ONGOING'">
      <div class="grid-row" :key="row.id" v-for="(row, i) in grid">
        <div
          v-on:click="reveal(i, j)"
          :key="cell.id"
          v-for="(cell, j) in row"
          class="grid-col"
        >
          <img
            v-if="cell.state === 'REVEALED'"
            :src="'/img/' + (cell.isBomb ? 'bomb' : cell.bombsAround) + '.png'"
            alt="cell image"
          />
        </div>
      </div>
    </div>
    <img v-else-if="game.state == 'WON'" src="/img/won.png" />
    <img v-else-if="game.state == 'LOST'" src="/img/lost.png" />
  </div>
  <p v-else>Loading...</p>
</template>

<script>
import backend from "../backend";

export default {
  data() {
    return {
      id: Number(this.$route.params.id),
      game: null,
      grid: null,
    };
  },
  methods: {
    reveal(x, y) {
      backend.clickCell(this.id, x, y, 'REVEALED').then(() => {
        this.getGame();
      });
    },
    getGame() {
      backend.getGame(this.id).then((data) => {
        this.game = data;
        this.grid = this.game.grid;
      });
    },
  },
  mounted() {
    this.getGame();
  },
};
</script>

<style scoped>
.grid-row {
  display: flex;
  margin: 0;
  height: 40px;
}

.grid-col {
  display: block;
  width: 40px;
  height: 40px;
  border: 1px solid #000;
  background-color: #bbb;
}

.grid-col img {
  width: 100%;
  height: 100%;
  vertical-align: baseline;
}
</style>
