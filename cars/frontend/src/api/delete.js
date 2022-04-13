import { toast } from "react-toastify";
import { BACKEND_URL } from "../config";

export const del = async ({ domain = BACKEND_URL, url, token, body }) =>
  fetch(`${domain}${url}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
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
