import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";
export const post = async (url, body) =>
  fetch(`${BACKEND_URL}${url}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
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
