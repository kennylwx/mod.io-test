<template>
  <div class="header">
    <div class="h-left">
      <h1>Kenny's App &#9996; {{ isHome.value }}</h1>
      <div :class="[isHome ? 'nav-link nl-active' : 'nav-link nl-inactive']">
        <router-link to="/" tag="button">My Games </router-link>
      </div>
      <div :class="[!isHome ? 'nav-link nl-active' : 'nav-link nl-inactive']">
        <router-link to="/browse" tag="button">Browse</router-link>
      </div>
    </div>
    <button type="button" class="sign-out">Sign Out</button>
  </div>
</template>
<script lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "Header",
  setup() {
    let isHome = true;
    const router = useRouter();

    const currentRouteName: string = "" + router.currentRoute.value.name;
    if (currentRouteName === "Home") {
      isHome = true;
    } else {
      isHome = false;
    }

    return {
      isHome,
    };
  },
};
</script>
<style scoped>
h1 {
  margin: 0;
  font-size: 1.4em;
  color: rgb(228, 228, 228);
}

.header {
  width: 100%;

  height: 30px;
  box-sizing: border-box;
  margin: 24px 0 20px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.h-left {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.sign-out {
  background-color: transparent;
  color: rgb(185, 185, 185);
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  font-size: 1.05rem;
  font-weight: 600;
  align-self: flex-end;
  border-bottom: 3px solid transparent;
}

.sign-out:hover {
  border-bottom: 3px solid rgb(255, 200, 61);
}

.nav-link {
  align-self: flex-end;
  border-bottom: 3px solid transparent;
  margin-left: 12px;
  padding-bottom: 1px;
}

.nav-link a {
  text-decoration: none;

  font-size: 1.1rem;
  font-weight: 600;
}

.nl-active {
  border-bottom: 3px solid rgb(255, 200, 61);
}

.nl-active a {
  color: rgb(201, 201, 201) !important;
}

.nl-inactive a {
  color: rgb(80, 80, 80) !important;
}
</style>
