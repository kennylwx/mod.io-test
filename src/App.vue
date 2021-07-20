<template>
  <div class="header"><h1>Kenny's App &#9996;</h1></div>
  <Form
    v-model:emailInput="emailInput"
    v-model:apiInput="apiInput"
    v-model:responseMsg="responseMsg"
    v-model:responseStatus="responseStatus"
    :login="login"
  />

  <!-- <Popup /> -->
</template>

<script lang="ts">
import Form from "./components/Form.vue";
import Popup from "./components/Popup.vue";
import { loginReq } from "./requests";

import { ref } from "vue";

export default {
  components: {
    Form,
    Popup,
  },
  setup() {
    const emailInput = ref<string>("");
    const apiInput = ref<string>("");
    let responseMsg = ref<string>("");
    let responseStatus = ref<boolean>(false);

    async function login() {
      console.log(
        "Login function selected with: " +
          emailInput.value +
          " " +
          apiInput.value
      );

      if (!emailInput.value || !apiInput.value) {
        responseMsg.value =
          "Email or API key is not entered. Please try again.";
        responseStatus.value = false;
      } else {
        await loginReq(
          emailInput.value,
          apiInput.value,
          responseMsg,
          responseStatus
        );
      }
    }

    return {
      emailInput,
      apiInput,
      responseMsg,
      responseStatus,
      login,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  height: 100vh;

  background: url("./assets/background.jpg");
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
  padding: 0 18px;
  box-sizing: border-box;
}

body {
  padding: 0;
  margin: 0;
}
</style>
