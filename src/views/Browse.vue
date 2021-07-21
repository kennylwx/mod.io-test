<template>
  <Header />
  <div class="games-container">
    <Game v-for="(game, index) in retrievedGames" :key="index" :game="game" />
  </div>
</template>
<script lang="ts">
import { onMounted, ref } from "vue";
import { getGamesReq } from "../requests";
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
      // A game created
      const tempAPI = "43bdbcc6c1489797fa288d0dd81e4778";

      // API Call to retrieve Games
      getGamesReq(tempAPI).then((res) => {
        res.data.map(({ name, date_added, logo, stats }: GameObject) => {
          retrievedGames.value.push({
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
    });

    return {
      retrievedGames,
      displayEmptyStatus,
    };
  },
};
</script>
