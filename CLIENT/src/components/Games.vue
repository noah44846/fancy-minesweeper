<template>
  <div>
    <form class="view-form" @submit.prevent="startNewGame">
      <input
        type="number"
        v-model.number="gridWidth"
        placeholder="width of the grid"
      />
      <input
        type="number"
        v-model.number="gridHeight"
        placeholder="height of the grid"
      />
      <input
        type="number"
        v-model.number="numBombs"
        placeholder="number of bombs"
      />
      <button class="btn btn-light" type="submit">Start new game</button>
    </form>

    <div v-if="games">
      <p>Ongoing games:</p>
      <div :key="game.id" v-for="game in games">
        <RouterLink
          :to="{ path: `/games/${game.id}` }"
          title="link to game"
        >
          Game {{ game.id }}
        </RouterLink>
      </div>
    </div>
    <p v-else>No ongoing games, start a new game...</p>
  </div>
</template>

<script>
import backend from "../backend";
import router from "../router";

export default {
  data() {
    return {
      games: null,
      gridWidth: 10,
      gridHeight: 10,
      numBombs: 15,
    };
  },
  mounted() {
    backend.getGames().then((data) => {
      // Clean prototype functions etc.
      this.games = data;
    });
  },
  methods: {
    startNewGame() {
      const { gridWidth, gridHeight, numBombs } = this;
      backend.addGame(gridWidth, gridHeight, numBombs).then(game => router.push({ path: `/games/${game.id}` }));
    },
  },
};
</script>

<style scoped>
form input {
  display: block;
  margin: 20px 0;
}
</style>
