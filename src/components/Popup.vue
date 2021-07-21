<template>
  <div class="form-outer" id="popup">
    <form @submit.prevent="verify(codeInputContainer)" class="form-code">
      <h4 class="fc-title">Enter security code</h4>
      <div
        class="input-validation"
        :class="[responseStatus ? 'iv-success' : 'iv-failure']"
        v-if="responseMsg"
      >
        {{ responseMsg }}
      </div>
      <div class="fc-input" ref="codeInputContainer">
        <input
          id="code-1"
          type="tel"
          maxlength="1"
          pattern="[0-9A-Za-z]"
          class="form-control"
          style="text-transform: uppercase"
        />
        <input
          id="code-2"
          type="tel"
          maxlength="1"
          pattern="[0-9A-Za-z]"
          class="form-control"
          style="text-transform: uppercase"
        />
        <input
          id="code-3"
          type="tel"
          maxlength="1"
          pattern="[0-9A-Za-z]"
          class="form-control"
          style="text-transform: uppercase"
        />
        <input
          id="code-4"
          type="tel"
          maxlength="1"
          pattern="[0-9A-Za-z]"
          class="form-control"
          style="text-transform: uppercase"
        />
        <input
          id="code-5"
          type="tel"
          maxlength="1"
          pattern="[0-9A-Za-z]"
          class="form-control"
          style="text-transform: uppercase"
        />
      </div>
      <button type="button" class="extra-button" @click="sendCodeAgain">
        Send code again
      </button>
      <img
        v-if="isLoading"
        class="loading"
        :src="LoadingIcon"
        alt="loading-icon"
      />
      <button v-if="!isLoading" type="submit" class="login-button">
        Verify account
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent, PropType } from "vue";
import LoadingIcon from "../assets/Rolling.svg";

export default defineComponent({
  name: "Popup",
  props: {
    closePopup: {
      type: Function as PropType<() => void>,
      required: true,
    },
    verify: {
      type: Function as PropType<(arg0: HTMLElement | null) => void>,
      required: true,
    },
    responseStatus: {
      type: Boolean,
      required: true,
    },
    responseMsg: {
      type: String,
      required: true,
    },
    sendCodeAgain: {
      type: Function as PropType<() => void>,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["update:popupStatus"],
  setup(props) {
    const codeInputContainer = ref<HTMLElement | null>(null);

    onMounted(() => {
      //  Whole popup
      const popupElement = document.getElementById("popup");

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function (event: MouseEvent): void {
        if (event.target == popupElement) {
          props.closePopup();
        }
      };

      // Security Code elements
      const inputElements = Array.from(codeInputContainer.value!.children);

      inputElements.forEach((ele, index) => {
        // When backspace, focus on the previous input
        ele.addEventListener("keydown", ((e: KeyboardEvent) => {
          if (
            e.key === "Backspace" &&
            (<HTMLInputElement>e.target!).value === ""
          ) {
            (inputElements[Math.max(0, index - 1)] as HTMLElement).focus();
          }
        }) as EventListener);

        // After typing a letter, focus to the next input
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

        // When paste, get the first 5 char and paste it
        ele.addEventListener("paste", ((e: ClipboardEvent) => {
          let paste = (e!.clipboardData || (<any>window).clipboardData).getData(
            "text"
          );
          const pasteStrArr = paste.substring(0, 5).toUpperCase().split("");

          inputElements.forEach((elem, index) => {
            if (index >= pasteStrArr.length) {
              return;
            }

            elem.setAttribute("value", pasteStrArr[index]);
            (inputElements[index] as HTMLElement).blur();
          });
          (inputElements[inputElements.length - 1] as HTMLElement).blur();
        }) as EventListener);
      });
    });

    return {
      codeInputContainer,
      LoadingIcon,
    };
  },
});
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

  display: flex;
  flex-direction: column;
}

@media only screen and (max-width: 480px) {
  .form-code {
    max-width: 100%;
  }
}

.fc-title {
  color: rgb(224, 224, 224);
  margin: 16px 0 14px;
  font-size: 1.2em;
  text-align: center;
}

.fc-input {
  display: flex;
  margin: 12px 0;
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
  border: 1px solid rgb(70, 66, 66);
  color: rgb(226, 226, 226);
}

.form-control:last-child {
  margin-right: 0;
}

.form-control:focus {
  outline: 2px solid rgb(22, 131, 255);
}
</style>
