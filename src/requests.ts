import axios from "axios";
import { Ref } from "vue";
import { setWithExpiry } from "./localStorage";

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
  responseStatus: Ref<boolean>,
  openPopup: () => void
) {
  const params = new URLSearchParams();
  params.append("email", email);
  params.append("api_key", apiKey);

  axios
    .post("oauth/emailrequest", params, config)
    .then((response) => {
      console.log(response);

      if (response.status === 200) {
        responseMsg.value = response.data.message;
        responseStatus.value = true;
        openPopup();
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

const TTL_MIN = 15;

export async function verifyReq(
  code: string,
  apiKey: string,
  responseMsg: Ref<string>,
  responseStatus: Ref<boolean>,
  goToMain: () => void
) {
  const params = new URLSearchParams();
  params.append("security_code", code);
  params.append("api_key", apiKey);

  return axios
    .post("oauth/emailexchange", params, config)
    .then((response) => {
      console.log(response);

      if (response.status === 200) {
        responseMsg.value = response.data.message;
        responseStatus.value = true;
        setWithExpiry(
          "access_token",
          response.data.access_token,
          TTL_MIN * 60000
        );

        goToMain();
      } else {
        responseMsg.value = response.data.message;
        responseStatus.value = false;
      }
    })
    .catch((err) => {
      console.warn(err);
      responseStatus.value = false;
      console.log(err);
      responseMsg.value = "Invalid security code. Please try again.";
    });
}

export async function getGamesReq(accessToken: string) {
  const config = {
    baseURL: "https://api.test.mod.io/v1/",
    headers: {
      Authorization: `Bearer {${accessToken}}`,
      Accept: "application/json",
    },
  };

  axios
    .get("me/games", config)
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((err) => {
      console.warn(err);
    });
}
