<template>
  <div class="header"><h1>Kenny's App &#9996; Login</h1></div>
  <Form
    v-model:emailInput="emailInput"
    v-model:apiInput="apiInput"
    v-model:responseMsg="responseMsg"
    v-model:responseStatus="responseStatus"
    :login="login"
  />

  <Popup
    v-if="popupStatus"
    v-model:popupStatus="popupStatus"
    v-model:responseStatus="responseStatus"
    v-model:responseMsg="responseMsg"
    :closePopup="closePopup"
    :verify="verify"
    :login="login"
  />
</template>

<script lang="ts">
import Form from "../components/Form.vue";
import Popup from "../components/Popup.vue";
import { loginReq, verifyReq } from "../requests";
import router from "../router";

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
    let popupStatus = ref<boolean>(false);

    // Handle login at the start with email and API Key
    async function login() {
      // console.log(
      //   "Login started with: " + emailInput.value + " " + apiInput.value
      // );

      if (!emailInput.value || !apiInput.value) {
        responseMsg.value =
          "Email or API key is not entered. Please try again.";
        responseStatus.value = false;
      } else {
        await loginReq(
          emailInput.value,
          apiInput.value,
          responseMsg,
          responseStatus,
          openPopup
        );
      }
    }

    // Handle security code verification with api key and code
    async function verify(codeInputContainer: HTMLInputElement) {
      if (codeInputContainer !== null) {
        const codeInputChildren = Array.from(codeInputContainer!.children);

        const codeArr: Array<string> = [];

        for (let i = 0; i < codeInputChildren.length; i++) {
          codeArr.push((codeInputChildren[i] as HTMLInputElement).value);
        }

        const securityCode = codeArr.join("").toUpperCase();

        // console.log(
        //   "Verification started with Code: " +
        //     securityCode +
        //     " API: " +
        //     apiInput.value
        // );

        if (securityCode.length < 5 || securityCode === "") {
          responseMsg.value = "Invalid security code. Please try again.";
        } else {
          responseMsg.value = "";
          verifyReq(
            securityCode,
            apiInput.value,
            responseMsg,
            responseStatus,
            goToMain
          );
        }
      }
    }

    function goToMain() {
      router.push("/");
    }

    function openPopup() {
      popupStatus.value = true;
    }

    function closePopup() {
      popupStatus.value = false;
    }

    return {
      emailInput,
      apiInput,
      responseMsg,
      responseStatus,
      popupStatus,
      login,
      verify,
      closePopup,
    };
  },
};
</script>
<style scoped></style>
