<template>
  <!-- Second: Enter code from email -->
  <div className="form-outer">
    <div class="form-bg">
      <form @submit.prevent="enterCode" class="form-container">
        <div v-if="responseMsg && !responseStatus" class="input-validation">
          {{ responseMsg }}
        </div>
        <div class="input-container">
          <label class="form-label">Secret Code</label>
          <input
            v-model="codeInput"
            name="usernameInput"
            class="form-input"
            type="email"
          />
        </div>
        <button class="login-button">Enter code</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { loginReq } from "../requests";

export default {
  setup() {
    const codeInput = ref<string>("");
    let responseMsg = ref<string>("");
    let responseStatus = ref<boolean>(false);

    async function enterCode() {
      console.log("Enter code: " + codeInput.value);

      if (!codeInput.value) {
        responseMsg.value =
          "Email or API key is not entered. Please try again.";
        responseStatus.value = false;
      }
    }

    return {
      codeInput,
      enterCode,
      responseMsg,
      responseStatus,
    };
  },
};
</script>

<style scoped>
@import "../styles/forms.css";

.form-outer {
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.8); /* Black w/ opacity */
}

.form-bg {
  /* position: absolute; */
  /* left: -100px;
  width: 350px;
  height: 250px;
  background: blue;
  -webkit-animation: slide 0.5s forwards;
  -webkit-animation-delay: 2s;
  animation: slide 0.5s forwards;
  animation-delay: 0.5s; */

  /* margin: 15% auto; 15% from the top and centered */
  /* width: 80%; Could be more or less, depending on screen size */
}

@-webkit-keyframes slide {
  100% {
    left: 0;
  }
}

@keyframes slide {
  100% {
    left: 0;
  }
}
</style>
