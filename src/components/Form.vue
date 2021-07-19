<template>
  <div class="form-bg">
    <h1 class="form-title">
      Login to your
      <a class="ft-link" href="https://mod.io/" target="_blank">mod.io</a>
      account
    </h1>

    <!-- First: Enter email and api key -->
    <form @submit.prevent="login" class="form-container">
      <div class="input-container">
        <label class="form-label">Email</label>
        <input
          v-model="emailInput"
          name="usernameInput"
          class="form-input"
          type="email"
        />
      </div>

      <div class="input-container">
        <label class="form-label">API Key</label>
        <input v-model="apiInput" name="apiInput" class="form-input" />
      </div>
      <div v-if="responseMsg && !responseStatus" class="input-validation">
        {{ responseMsg }}
      </div>
      <button class="login-button">Login</button>
    </form>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { loginReq } from "../requests";

export default {
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
      login,
      emailInput,
      apiInput,
      responseMsg,
      responseStatus,
    };
  },
};
</script>

<style scoped>
@import "../styles/forms.css";
</style>
