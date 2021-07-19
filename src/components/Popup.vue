<template>
  <div class="form-outer">
    <form action="#" class="form-code">
      <h4 class="fc-title">Enter security code</h4>
      <div class="fc-input">
        <input
          type="tel"
          maxlength="1"
          pattern="[0-9A-Za-z]"
          class="form-control"
        />
        <input
          type="tel"
          maxlength="1"
          pattern="[0-9A-Za-z]"
          class="form-control"
        />
        <input
          type="tel"
          maxlength="1"
          pattern="[0-9A-Za-z]"
          class="form-control"
        />
        <input
          type="tel"
          maxlength="1"
          pattern="[0-9A-Za-z]"
          class="form-control"
        />
        <input
          type="tel"
          maxlength="1"
          pattern="[0-9A-Za-z]"
          class="form-control"
        />
      </div>
      <button type="submit" class="login-button">Verify account</button>
    </form>
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
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.8);

  display: flex;
  justify-content: center;
  align-items: center;
}
.form-code {
  padding: 28px;
  border-radius: 2px;
  background-color: rgb(17, 18, 22);
  border: 1px solid rgb(46, 46, 46);
  margin-top: -20vh;
}

.fc-title {
  color: rgb(224, 224, 224);
  margin: 16px 0 24px;
  font-size: 1.2em;
  text-align: center;
}
.fc-input {
  display: flex;
  margin: 18px 0;
}

.form-control {
  display: block;
  height: 50px;
  width: 50px;
  margin-right: 0.5rem;
  text-align: center;
  font-size: 1.25rem;
  min-width: 0;
  background-color: rgb(17, 18, 22);
  border: 1px solid rgb(46, 46, 46);
  color: rgb(226, 226, 226);
}

.form-control:last-child {
  margin-right: 0;
}

.form-control:focus {
  outline: 2px solid rgb(22, 131, 255);
}
</style>
