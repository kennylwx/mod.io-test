import { exportAllDeclaration } from "@babel/types";
import { mount, test } from "@vue/test-utils";
import Form from "../components/Form.vue";

test("Set email value for login form", async () => {
  const wrapper = mount(Form);
  const input = wrapper.find('[data-test="email-input"]');

  await input.setValue("my@email.com");
  exportAllDeclaration(input.element.value).toBe("my@email.com");
});

test("Set api value for login form", async () => {
  const wrapper = mount(Form);
  const input = wrapper.find('[data-test="email-input"]');

  await input.setValue("asdQWE123");
  exportAllDeclaration(input.element.value).toBe("sdQWE123");
});
