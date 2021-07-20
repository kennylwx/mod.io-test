import axios from "axios";
import { Ref } from "vue";

const config = {
  baseURL: "https://api.test.mod.io/v1/",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

export async function loginReq(
  email: string,
  apiKey: string,
  responseMsg: Ref<string>,
  responseStatus: Ref<boolean>
) {
  const params = new URLSearchParams();
  params.append("email", email);
  params.append("api_key", apiKey);

  return axios
    .post("oauth/emailrequest", params, config)
    .then((response) => {
      if (response.status === 200) {
        responseMsg.value = response.data.message;
        responseStatus.value = true;
      } else {
        responseStatus.value = false;
        responseMsg.value = "Invalid API key or email. Please try again.";
      }
    })
    .catch((err) => {
      console.warn(err);
      responseStatus.value = false;
      responseMsg.value = "Invalid email or API key. Please try again.";
    });
}

export async function verifyReq(
  code: string,
  apiKey: string,
  responseMsg: Ref<string>,
  responseStatus: Ref<boolean>
) {
  const params = new URLSearchParams();
  params.append("security_code", code);
  params.append("api_key", apiKey);

  return axios
    .post("oauth/emailexchange", params, config)
    .then((response) => {
      if (response.status === 200) {
        responseMsg.value = response.data.message;
        responseStatus.value = true;
      } else {
        responseStatus.value = false;
        responseMsg.value = "Invalid security code. Please try again.";
      }
    })
    .catch((err) => {
      console.warn(err);
      responseStatus.value = false;
      responseMsg.value = "Invalid security code. Please try again.";
    });
}
