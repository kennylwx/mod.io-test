<template>
  <div class="header">
    <h1>Kenny's App &#9996; Home</h1>
  </div>
  <div class="games-container">
    <Game v-for="(game, index) in retrievedGames" :key="index" :game="game" />
  </div>
</template>
<script lang="ts">
import { onMounted, ref } from "vue";
import { getGamesReq } from "../requests";
import { getWithExpiry } from "../localStorage";
import Game from "../components/Game.vue";
import GameObject from "../interfaces/game";

export default {
  components: {
    Game,
  },
  setup() {
    const retrievedGames = ref<Array<GameObject>>([]);

    onMounted(async () => {
      const accessToken = getWithExpiry("access_token");

      // API Call to retrieve Games
      getGamesReq(accessToken).then((res) => {
        console.log(res.data);
        res.data.map(({ name, date_added, logo, stats }: GameObject) => {
          retrievedGames.value.push({
            name: name,
            date_added: date_added,
            logo: logo,
            stats: stats,
          });
        });
      });
    });

    return {
      retrievedGames,
    };
  },
};
</script>

<style>
.games-container {
  display: grid;
  width: 100%;
  margin: 24px;
  grid-gap: 18px;

  grid-template-columns: repeat(2, 1fr);
  max-width: 720px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  height: 100vh;

  background: url("../assets/background.jpg");

  padding: 0 18px;
}

h1 {
  margin: 0;
  font-size: 1.4em;
  color: rgb(228, 228, 228);
}

.header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 60px;
  box-sizing: border-box;
}

body {
  padding: 0;
  margin: 0;
}
</style>
