<template>
  <div class="header"><h1>Kenny's App &#9996; Home</h1></div>
  <div class="games-container">
    <Game
      gameName="Test Game"
      gameDate="12 Jun 2019"
      gameLogo="../assets/logo.png"
      gameSubscribers="23"
      gameDownloads="56"
    />

    <Game
      gameName="Test Game"
      gameDate="12 Jun 2019"
      gameLogo="../assets/logo.png"
      gameSubscribers="23"
      gameDownloads="56"
    />

    <Game
      gameName="Test Game"
      gameDate="12 Jun 2019"
      gameLogo="../assets/logo.png"
      gameSubscribers="23"
      gameDownloads="56"
    />

    <Game
      gameName="Test Game"
      gameDate="12 Jun 2019"
      gameLogo="../assets/logo.png"
      gameSubscribers="23"
      gameDownloads="56"
    />
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import { getGamesReq } from "../requests";
import { getWithExpiry } from "../localStorage";
import Game from "../components/Game.vue";

import "../assets/logo.png";

export default {
  components: {
    Game,
  },
  setup() {
    onMounted(async () => {
      const accessToken = getWithExpiry("access_token");
      console.log("Access Token: " + accessToken);
      const response = await getGamesReq(accessToken);
      console.log("Response: " + response);
    });

    return {};
  },
};
</script>

<style>
.games-container {
  display: grid;
  width: 100%;
  margin: 24px;
  grid-gap: 10px;

  grid-template-columns: repeat(3, 1fr);
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
  /* padding: 0 18px; */
  box-sizing: border-box;
}

body {
  padding: 0;
  margin: 0;
}
</style>
