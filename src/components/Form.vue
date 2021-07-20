<template>
  <div class="form-bg">
    <h2 class="form-title">
      Login to your
      <a class="ft-link" href="https://mod.io/" target="_blank">mod.io</a>
      account
    </h2>

    <!-- First: Enter email and api key -->
    <form @submit.prevent="login" class="form-container">
      <div
        v-if="responseMsg && !responseStatus"
        class="input-validation iv-failure"
      >
        {{ responseMsg }}
      </div>
      <div class="input-container">
        <label class="form-label">Email</label>
        <input
          v-model="emailInput"
          @input="(event) => $emit('update:emailInput', event.target.value)"
          name="usernameInput"
          class="form-input"
          type="email"
        />
      </div>

      <div class="input-container">
        <label class="form-label">API Key</label>
        <input
          v-model="apiInput"
          @input="(event) => $emit('update:apiInput', event.target.value)"
          name="apiInput"
          class="form-input"
        />
      </div>

      <button class="login-button">Login</button>
    </form>
  </div>
</template>

<script lang="ts">
export default {
  name: "Form",
  props: ["emailInput", "apiInput", "responseMsg", "responseStatus", "login"],
  // setup(props) {
  //   // let emailInput = props.emailInput;
  //   // const apiInput = props.apiInput;
  //   // const responseMsg = props.responseMsg;
  //   // const responseStatus = props.responseStatus;
  //   // const login = props.login;

  //   return {};
  // },
};
</script>

<style scoped>
@import "../styles/forms.css";
</style>
