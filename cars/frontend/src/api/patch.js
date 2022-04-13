import { BACKEND_URL } from "../config";

export const patch = async ({ domain = BACKEND_URL, url, token, body }) =>
  fetch(`${domain}${url}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
