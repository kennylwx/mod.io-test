<template>
  <div class="header"><h1>Kenny's App &#9996;</h1></div>
  <Form />
  <!-- <Popup /> -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Form from "./components/Form.vue";
import Popup from "./components/Popup.vue";

export default defineComponent({
  name: "App",
  components: {
    Form,
    Popup,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  height: 100vh;

  background: url("./assets/background.jpg");
}

h1 {
  margin: 0;
  font-size: 1.4em;
  color: rgb(228, 228, 228);
}

.header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 60px;
  padding: 0 18px;
  box-sizing: border-box;
}

body {
  padding: 0;
  margin: 0;
}
</style>
