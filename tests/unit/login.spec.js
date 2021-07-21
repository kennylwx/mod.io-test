import { mount } from "@vue/test-utils";
import Form from "@/components/Form.vue";
import { ref } from "vue";
// import { loginReq } from "@/requests.ts";

let MockAdapter = require("axios-mock-adapter");
let axios = require("axios");

describe("Set Form values", () => {
  it("renders email values when typed in", () => {
    const responseMsg = "";
    const responseStatus = false;
    const isLoading = false;
    const login = () => {};

    const wrapper = mount(Form, {
      props: { responseMsg, responseStatus, isLoading, login },
    });
    const input = wrapper.find('[data-test="email-input"]');
    input.setValue("test@email.com");
    expect(input.element.value).toMatch("test@email.com");
  });

  it("renders api values when typed in", () => {
    const responseMsg = "";
    const responseStatus = false;
    const isLoading = false;
    const login = () => {};

    const wrapper = mount(Form, {
      props: { responseMsg, responseStatus, isLoading, login },
    });
    const input = wrapper.find('[data-test="api-input"]');
    input.setValue("abcABC123");
    expect(input.element.value).toMatch("abcABC123");
  });
});

describe("Trigger Form Submit", () => {
  it("Validates failure login with bad api values", () => {
    let mock = new MockAdapter(axios);
    let validAPI = "APItest123";
    let validEmail = "valid@email.com";
    mock
      .onPost("/users", { params: { email: validEmail, api: validAPI } })
      .reply(function (config) {
        return [
          200,
          {
            code: 200,
            message:
              "An email has already been sent to (kenny_seven@icloud.com) containing your 5-digit security code. Please redeem or try again shortly.",
          },
        ];
      });
    const responseMsg = ref("");
    const responseStatus = ref(false);
    const isLoading = false;
    const login = () => {
      console.log("HELLO");
      axios
        .post("/users", { params: { email: validEmail, api: validAPI } })
        .then(function (response) {
          console.log(response.data);
          responseMsg = response.data.message;
          responseStatus = true;
          expect(
            wrapper.find('[data-test="response-msg"]').element.value
          ).toMatch("Email or API key is not entered. Please try again.");
        });
    };

    const wrapper = mount(Form, {
      props: { responseMsg, responseStatus, isLoading, login },
    });
    const apiInput = wrapper.find('[data-test="api-input"]');
    const emailInput = wrapper.find('[data-test="email-input"]');

    apiInput.setValue(validAPI);
    emailInput.setValue(validEmail);
    wrapper.find("button").trigger("click");
  });
});
