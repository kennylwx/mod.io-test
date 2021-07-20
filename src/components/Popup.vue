<template>
  <div class="form-outer">
    <form @submit.prevent="verify" class="form-code">
      <h4 class="fc-title">Enter security code</h4>
      <div class="input-validation">
        {{ responseMsg }}
      </div>
      <div class="fc-input" ref="codeInputContainer">
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
import { ref, onMounted } from "vue";
import { loginReq } from "../requests";

export default {
  setup() {
    const codeInputContainer = ref<HTMLElement | null>(null);

    let responseMsg = ref<string>(
      "A security code has been sent to your email (test@email.coom)."
    );

    onMounted(() => {
      const inputElements = Array.from(codeInputContainer.value!.children);
      console.log("Mounted");
      console.log(inputElements);

      inputElements.forEach((ele, index) => {
        ele.addEventListener("keydown", ((e: KeyboardEvent) => {
          if (
            e.key === "Backspace" &&
            (<HTMLInputElement>e.target!).value === ""
          )
            (inputElements[Math.max(0, index - 1)] as HTMLElement).focus();
          console.log(e);
        }) as EventListener);

        ele.addEventListener("input", ((e: KeyboardEvent) => {
          const [first, ...rest] = (<HTMLInputElement>e.target!).value;
          (<HTMLInputElement>e.target!).value = first ?? "";
          if (index !== inputElements.length - 1 && first !== undefined) {
            (inputElements[index + 1] as HTMLElement).focus();
            (inputElements[index + 1] as HTMLInputElement).value =
              rest.join("");
            inputElements[index + 1].dispatchEvent(new Event("input"));
          }
        }) as EventListener);
      });
    });

    async function verify() {
      if (codeInputContainer !== null) {
        const codeInputChildren = Array.from(
          codeInputContainer.value!.children
        );

        const codeArr: Array<string> = [];

        for (let i = 0; i < codeInputChildren.length; i++) {
          codeArr.push((codeInputChildren[i] as HTMLInputElement).value);
        }

        const securityCode = codeArr.join("");
        console.log(securityCode);
      }
    }

    return {
      codeInputContainer,
      verify,
      responseMsg,
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

  max-width: 320px;
}

@media only screen and (max-width: 480px) {
  .form-code {
    max-width: 100%;
  }
}

.fc-title {
  color: rgb(224, 224, 224);
  margin: 16px 0 24px;
  font-size: 1.2em;
  text-align: center;
}

.input-validation {
  background-color: rgba(2, 105, 11, 0.13) !important;
  border-left: 4px solid rgb(73, 214, 17) !important;
  color: rgb(12, 250, 4) !important;
}

.fc-input {
  display: flex;
  margin: 18px 0;
}

.form-control {
  display: block;
  height: 50px;
  width: 50px;
  width: 100%;
  margin-right: 8px;
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
