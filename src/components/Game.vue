<template>
  <div class="game">
    <div class="g-header">
      <img class="game-logo" :src="logo" />
      <div class="g-info">
        <h2 class="game-name">{{ gameName }}</h2>
        <h4 class="game-date">Added on {{ gameDate }}</h4>
      </div>
    </div>
    <div class="g-body">
      <p class="game-stat">
        Subscribers <span>{{ gameSubscribers }}</span>
      </p>
      <p class="game-stat">
        Downloads <span>{{ gameDownloads }}</span>
      </p>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import logo from "../assets/logo.png";

export default {
  name: "Game",
  props: [
    "gameName",
    "gameDate",
    "gameLogo",
    "gameSubscribers",
    "gameDownloads",
  ],
  setup() {
    return {
      logo,
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
  width: 50px;
  background-color: rgb(235, 252, 8);
}

.game-stat {
  margin: 4px 0;
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
