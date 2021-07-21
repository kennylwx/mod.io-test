<template>
  <Header />
  <div class="games-container">
    <Game v-for="(game, index) in retrievedGames" :key="game.id" :game="game" />
  </div>

  <div v-if="displayEmptyStatus" class="notice">
    Your game library is empty. &#128531; Go create them at
    <a href="https://mod.io/" target="_blank">mod.io</a>
  </div>
</template>
<script lang="ts">
import { onMounted, ref } from "vue";
import { getMyGamesReq } from "../requests";
import { getWithExpiry, ACCESS_TOKEN } from "../localStorage";
import Game from "../components/Game.vue";
import GameObject from "../interfaces/game";
import Header from "../components/Header.vue";
import { isObjectEmpty } from "../util/isObjectEmpty";

export default {
  components: {
    Game,
    Header,
  },
  setup() {
    const retrievedGames = ref<Array<GameObject>>([]);
    let displayEmptyStatus = false;

    onMounted(async () => {
      const accessToken = getWithExpiry(ACCESS_TOKEN);

      if (accessToken) {
        // API Call to retrieve Games
        getMyGamesReq(accessToken).then((res) => {
          res.data.map(({ id, name, date_added, logo, stats }: GameObject) => {
            retrievedGames.value.push({
              id: id,
              name: name,
              date_added: date_added,
              logo: logo,
              stats: stats,
            });
          });

          if (isObjectEmpty(res.data)) {
            displayEmptyStatus = true;
          }
        });
      }
    });

    return {
      retrievedGames,
      displayEmptyStatus,
    };
  },
};
</script>

<style>
.notice {
  background-color: rgb(20, 23, 27);
  padding: 18px;
  color: rgb(214, 214, 214);
  font-size: 0.9rem;
  font-weight: 600;

  max-width: 250px;
  line-height: 20px;
}

.notice a {
  text-decoration: none;
  color: rgb(42, 141, 255);
}

.games-container {
  display: grid;
  width: 100%;
  margin: 24px;
  grid-gap: 18px;

  grid-template-columns: repeat(2, 1fr);
  max-width: 560px;
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
  /* min-width: 420px; */
}

body {
  padding: 0;
  margin: 0;
}
</style>
