import { BACKEND_URL } from "../config";

export const post = async ({ domain = BACKEND_URL, url, token, body }) =>
  fetch(`${domain}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
