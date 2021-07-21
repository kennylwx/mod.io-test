import axios from "axios";

const config = {
  baseURL: "https://api.test.mod.io/v1/",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

export async function loginReq(email: string, apiKey: string) {
  const params = new URLSearchParams();
  params.append("email", email);
  params.append("api_key", apiKey);

  return axios
    .post("oauth/emailrequest", params, config)
    .then((response) => response.data)
    .catch((err) => {
      console.warn(err);
    });
}

export async function verifyReq(code: string, apiKey: string) {
  const params = new URLSearchParams();
  params.append("security_code", code);
  params.append("api_key", apiKey);

  return axios
    .post("oauth/emailexchange", params, config)
    .then((response) => response.data)
    .catch((err) => {
      console.warn(err);
    });
}

export async function getMyGamesReq(accessToken: string) {
  const config = {
    baseURL: "https://api.test.mod.io/v1/",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  };

  return axios
    .get("me/games", config)
    .then((response) => response.data)
    .catch((err) => {
      console.warn(err);
    });
}

export async function getGamesReq(api: string) {
  const config = {
    baseURL: "https://api.test.mod.io/v1/",
    headers: {
      Accept: "application/json",
    },
    params: {
      api_key: api,
    },
  };

  return axios
    .get("games", config)
    .then((response) => response.data)
    .catch((err) => {
      console.warn(err);
    });
}
