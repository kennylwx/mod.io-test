<template>
  <div class="header">
    <div class="h-left">
      <h1>Kenny's App &#9996; {{ isHome.value }}</h1>
      <div
        v-if="!isLogin"
        :class="[isHome ? 'nav-link nl-active' : 'nav-link nl-inactive']"
      >
        <router-link to="/" tag="button">My Games </router-link>
      </div>
      <div
        v-if="!isLogin"
        :class="[!isHome ? 'nav-link nl-active' : 'nav-link nl-inactive']"
      >
        <router-link to="/browse" tag="button">Browse</router-link>
      </div>
    </div>
    <button v-if="!isLogin" @click="signout" type="button" class="sign-out">
      Sign Out
    </button>
  </div>
</template>
<script lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { remove, ACCESS_TOKEN } from "../localStorage";
import router from "../router";

export default {
  name: "Header",
  setup() {
    let isHome = false;
    let isLogin = false;
    const router = useRouter();

    const currentRouteName: string = "" + router.currentRoute.value.name;
    if (currentRouteName === "Home") {
      isHome = true;
    } else if (currentRouteName === "Login") {
      isLogin = true;
    } else {
      isHome = false;
      isLogin = false;
    }

    function signout() {
      console.log("Sign out");
      remove(ACCESS_TOKEN);
      router.push({ name: "Login" });
    }

    return {
      isHome,
      isLogin,
      signout,
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
  color: rgb(80, 80, 80) !important;
  border: none;
  cursor: pointer;
  padding: 0 0 1px;
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  align-self: flex-end;
  border-bottom: 3px solid transparent;
}

.sign-out:hover {
  border-bottom: 3px solid rgb(255, 200, 61);
  color: rgb(201, 201, 201) !important;
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
