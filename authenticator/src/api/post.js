import { BACKEND_URL } from "../config";

export const post = async (url, body) =>
  fetch(`${BACKEND_URL}${url}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
