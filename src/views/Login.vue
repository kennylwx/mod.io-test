<template>
  <Header />
  <Form
    v-model:emailInput="emailInput"
    v-model:apiInput="apiInput"
    v-model:responseMsg="responseMsg"
    v-model:responseStatus="responseStatus"
    :login="login"
    :isLoading="isLoginLoading"
  />

  <Popup
    v-if="popupStatus"
    v-model:popupStatus="popupStatus"
    v-model:responseStatus="responseStatus"
    v-model:responseMsg="responseMsg"
    :closePopup="closePopup"
    :verify="verify"
    :login="login"
    :isLoading="isVerifyLoading"
  />
</template>

<script lang="ts">
import Form from "../components/Form.vue";
import Header from "../components/Header.vue";
import Popup from "../components/Popup.vue";
import { loginReq, verifyReq } from "../requests";
import { setWithExpiry, TTL_MIN } from "../localStorage";
import router from "../router";

import { ref } from "vue";

export default {
  components: {
    Form,
    Popup,
    Header,
  },
  setup() {
    const emailInput = ref<string>("");
    const apiInput = ref<string>("");
    let responseMsg = ref<string>("");
    let responseStatus = ref<boolean>(false);
    let popupStatus = ref<boolean>(false);
    const isLoginLoading = ref<boolean>(false);
    const isVerifyLoading = ref<boolean>(false);

    // Handle login at the start with email and API Key
    async function login() {
      isLoginLoading.value = true;
      if (!emailInput.value || !apiInput.value) {
        responseMsg.value =
          "Email or API key is not entered. Please try again.";
        responseStatus.value = false;
        isLoginLoading.value = false;
      } else {
        loginReq(emailInput.value, apiInput.value)
          .then((response) => {
            console.log("Login Success: ");
            console.log(response);

            if (response.code === 200) {
              responseMsg.value = response.message;
              responseStatus.value = true;
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

    // Handle security code verification with api key and code
    async function verify(codeInputContainer: HTMLInputElement) {
      isVerifyLoading.value = true;
      if (codeInputContainer !== null) {
        const codeInputChildren = Array.from(codeInputContainer!.children);

        const codeArr: Array<string> = [];

        for (let i = 0; i < codeInputChildren.length; i++) {
          codeArr.push((codeInputChildren[i] as HTMLInputElement).value);
        }

        const securityCode = codeArr.join("").toUpperCase();

        if (securityCode.length < 5 || securityCode === "") {
          responseStatus.value = false;
          responseMsg.value = "Invalid security code. Please try again.";
          isVerifyLoading.value = false;
        } else {
          // responseMsg.value = "";
          verifyReq(securityCode, apiInput.value)
            .then((response) => {
              console.log("Verification Success: ");
              console.log(response);
              if (response.code === 200) {
                responseMsg.value = response.message;
                responseStatus.value = true;
                setWithExpiry(
                  "access_token",
                  response.access_token,
                  TTL_MIN * 60000
                );
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
      console.log("Redirect to main page");
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
      emailInput,
      apiInput,
      responseMsg,
      responseStatus,
      popupStatus,
      login,
      verify,
      closePopup,
      isLoginLoading,
      isVerifyLoading,
    };
  },
};
</script>
<style scoped></style>
