<template>
  <Header />
  <Form
    v-model:responseMsg="responseMsg"
    v-model:responseStatus="responseStatus"
    :login="login"
    :isLoading="isLoginLoading"
  />

  <Popup
    v-if="popupStatus"
    v-model:responseStatus="responseStatus"
    v-model:responseMsg="responseMsg"
    :closePopup="closePopup"
    :verify="verify"
    :sendCodeAgain="sendCodeAgain"
    :isLoading="isVerifyLoading"
  />
</template>

<script lang="ts">
import Form from "../components/Form.vue";
import Header from "../components/Header.vue";
import Popup from "../components/Popup.vue";
import { loginReq, verifyReq } from "../requests";
import {
  setWithExpiry,
  TTL,
  API_TOKEN,
  EMAIL_TOKEN,
  getWithExpiry,
} from "../localStorage";
import router from "../router";

import { ref, defineComponent } from "vue";

export default defineComponent({
  components: {
    Form,
    Popup,
    Header,
  },
  setup() {
    let responseMsg = ref<string>("");
    let responseStatus = ref<boolean>(false);
    let popupStatus = ref<boolean>(false);
    const isLoginLoading = ref<boolean>(false);
    const isVerifyLoading = ref<boolean>(false);

    // Handle login at the start with email and API Key
    function login(
      emailElem: HTMLInputElement | null,
      apiElem: HTMLInputElement | null
    ): void {
      // Start Loading
      isLoginLoading.value = true;
      let emailInput: string = "";
      let apiInput: string = "";

      // Get Email and API values from input
      if (emailElem !== null && apiElem !== null) {
        emailInput = emailElem.value;
        apiInput = apiElem.value;
      }

      if (!emailInput || !apiInput) {
        responseMsg.value =
          "Email or API key is not entered. Please try again.";
        responseStatus.value = false;
        isLoginLoading.value = false;
      } else {
        loginReq(emailInput, apiInput)
          .then((response) => {
            // console.log("Login Success: ");
            // console.log(response);

            if (response.code === 200) {
              // Save Email and API
              setWithExpiry(API_TOKEN, apiInput, TTL);
              setWithExpiry(EMAIL_TOKEN, emailInput, TTL);

              // Update the response message
              responseMsg.value = response.message;
              responseStatus.value = true;

              // Open verification popup
              openPopup();
            } else {
              responseStatus.value = false;
              responseMsg.value = "Invalid API key or email. Please try again.";
            }
            isLoginLoading.value = false;
          })
          .catch((err) => {
            responseStatus.value = false;
            responseMsg.value = "Invalid email or API key. Please try again.";
            isLoginLoading.value = false;
          });
      }
    }

    // Handle send code again after logging in with email and API
    function sendCodeAgain(): void {
      console.log("Send again");

      const apiToken: string | null = getWithExpiry(API_TOKEN);
      const emailToken: string | null = getWithExpiry(EMAIL_TOKEN);

      if (apiToken !== null && emailToken !== null) {
        loginReq(emailToken, apiToken)
          .then((response) => {
            console.log("Login again success: ");

            if (response.code === 200) {
              // Update the response message
              responseMsg.value = response.message;
              responseStatus.value = true;
            } else {
              responseStatus.value = false;
              responseMsg.value = "Invalid API key or email. Please try again.";
            }
            isLoginLoading.value = false;
          })
          .catch((err) => {
            responseStatus.value = false;
            responseMsg.value = "Invalid email or API key. Please try again.";
            isLoginLoading.value = false;
          });
      }
    }

    function getCodeFromInput(codeInputContainer: HTMLElement | null): string {
      const codeInputChildren = Array.from(codeInputContainer!.children);

      const codeArr: Array<string> = [];

      for (let i = 0; i < codeInputChildren.length; i++) {
        codeArr.push((codeInputChildren[i] as HTMLInputElement).value);
      }

      return codeArr.join("").toUpperCase();
    }

    // Handle security code verification with api key and code
    function verify(codeInputContainer: HTMLElement | null): void {
      // Start Loading
      isVerifyLoading.value = true;

      // Transform input to code
      const securityCode: string = getCodeFromInput(codeInputContainer);

      // Validate Security Code
      if (securityCode.length < 5 || securityCode === "") {
        responseStatus.value = false;
        responseMsg.value = "Invalid security code. Please try again.";
        isVerifyLoading.value = false;
      } else {
        // Get API Token from login
        const apiInput = getWithExpiry(API_TOKEN);

        // If API token is not null
        if (apiInput !== null) {
          verifyReq(securityCode, apiInput)
            .then((response) => {
              // console.log("Verification Success!");
              // console.log(response);
              if (response.code === 200) {
                responseMsg.value = response.message;
                responseStatus.value = true;
                setWithExpiry("access_token", response.access_token, TTL);
              } else {
                responseMsg.value = response.message;
                responseStatus.value = false;
              }
              goToMain();
              isVerifyLoading.value = false;
            })
            .catch((err) => {
              responseStatus.value = false;
              responseMsg.value = "Invalid security code. Please try again.";
              isVerifyLoading.value = false;
            });
        }
      }
    }

    function goToMain() {
      router.push({ name: "Home" });
    }

    function openPopup() {
      popupStatus.value = true;
    }

    function closePopup() {
      responseMsg.value = "";
      popupStatus.value = false;
    }

    return {
      responseMsg,
      responseStatus,
      popupStatus,
      login,
      verify,
      closePopup,
      sendCodeAgain,
      isLoginLoading,
      isVerifyLoading,
    };
  },
});
</script>
<style scoped></style>
