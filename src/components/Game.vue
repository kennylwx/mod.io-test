<template>
  <div class="game">
    <div class="g-header">
      <img class="game-logo" :src="game.logo.original" />
      <div class="g-info">
        <h2 class="game-name">{{ game.name }}</h2>
        <h4 class="game-date">
          Added on {{ convertStampDate(game.date_added) }}
        </h4>
      </div>
    </div>
    <div class="g-body">
      <p class="game-stat">
        Subscribers <span>{{ subCount }}</span>
      </p>
      <p class="game-stat">
        Downloads <span>{{ downCount }}</span>
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import { ref } from "vue";
import { convertStampDate } from "../util/convertStampDate";
import { isObjectEmpty } from "../util/isObjectEmpty";
import logo from "../assets/logo.png";

export default {
  name: "Game",
  props: ["game", "key"],
  setup(props) {
    const subCount = ref<number>(0);
    const downCount = ref<number>(0);

    // Check if empty

    if (!isObjectEmpty(props.game.stats)) {
      subCount.value = props.game.stats.mods_subscribers_total;
      downCount.value = props.game.stats.mods_downloads_total;
    }

    return {
      logo,
      convertStampDate,
      subCount,
      downCount,
    };
  },
};
</script>
<style scoped>
.game {
  background-color: rgb(17, 18, 22);
  border: 1px solid rgb(46, 46, 46);
  border-radius: 2px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

@media only screen and (max-width: 480px) {
  .g-header {
    flex-direction: column;
  }

  .g-info {
    margin: 0;
    margin-top: 8px;
    text-align: center;
  }

  .game-logo {
    margin: 0;
    height: 75px;
    width: 75px;
    min-width: 75px;
  }
}

.g-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.g-body {
  margin-top: 8px;
}

.g-info {
  margin-left: 8px;
}
.game-name {
  margin: 0;
  font-size: 0.92rem;
  color: rgb(221, 221, 221);
}

.game-date {
  margin: 4px 0;
  font-size: 0.76rem;
  font-weight: 500;
  color: rgb(204, 202, 202);
}

.game-logo {
  margin: 0;
  height: 50px;
  width: 50px !important;
  min-width: 50px;
  object-fit: cover;
}

.game-stat {
  margin: 4px 0 0;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  color: rgb(210, 215, 221);

  display: flex;
  justify-content: space-between;
}

.game-stat span {
  font-size: 0.82rem;
}
</style>
