import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";
export const post = async ({ domain = BACKEND_URL, url, token, body }) =>
  fetch(`${domain}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status === "error") {
        toast.error(res.message, { position: toast.POSITION.BOTTOM_RIGHT });
      }
      return res;
    })
    .catch((e) => {
      toast.error(e.message, { position: toast.POSITION.BOTTOM_RIGHT });
    });
