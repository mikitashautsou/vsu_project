import { BACKEND_URL } from "../config";

export const get = async ({ domain = BACKEND_URL, url, token }) =>
  fetch(`${domain}${url}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  }).then((res) => res.json());
