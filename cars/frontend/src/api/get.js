import { BACKEND_URL } from "../config";

export const get = async ({ url, token }) =>
  fetch(`${BACKEND_URL}${url}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  }).then((res) => res.json());
