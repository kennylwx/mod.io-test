<template>
  <div class="form-bg">
    <h2 class="form-title">
      Login to your
      <a class="ft-link" href="https://mod.io/" target="_blank">mod.io</a>
      account
    </h2>

    <!-- First: Enter email and api key -->
    <form @submit.prevent="login(emailInput, apiInput)" class="form-container">
      <div
        v-if="responseMsg && !responseStatus"
        class="input-validation iv-failure"
      >
        {{ responseMsg }}
      </div>
      <div class="input-container">
        <label class="form-label">Email</label>
        <input
          id="emailInput"
          name="usernameInput"
          class="form-input"
          type="email"
          data-test="email-input"
        />
      </div>

      <div class="input-container">
        <label class="form-label">API Key</label>
        <input
          id="apiInput"
          name="apiInput"
          class="form-input"
          data-test="api-input"
        />
      </div>
      <img
        v-if="isLoading"
        class="loading"
        :src="LoadingIcon"
        alt="loading-icon"
      />

      <button v-if="!isLoading" class="login-button">Login</button>
    </form>
  </div>
</template>

<script lang="ts">
import LoadingIcon from "../assets/Rolling.svg";
import { defineComponent, PropType, onMounted, ref } from "vue";

export default defineComponent({
  name: "Form",
  emits: ["update:emailInput", "update:apiInput"],
  props: {
    responseMsg: {
      type: String,
      required: true,
    },
    responseStatus: {
      type: Boolean,
      required: true,
    },
    login: {
      type: Function as PropType<
        (arg0: HTMLInputElement | null, arg1: HTMLInputElement | null) => void
      >,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    const emailInput = ref<HTMLInputElement | null>(null);
    const apiInput = ref<HTMLInputElement | null>(null);
    onMounted(() => {
      emailInput.value = document.getElementById(
        "emailInput"
      ) as HTMLInputElement;
      apiInput.value = document.getElementById("apiInput") as HTMLInputElement;
    });

    return {
      LoadingIcon,
      emailInput,
      apiInput,
    };
  },
});
</script>

<style scoped>
@import "../styles/forms.css";
</style>
