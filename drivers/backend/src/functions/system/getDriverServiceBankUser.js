import { post, get } from "../../common/http.js";
import {
  AUTH_SERVICE_URL,
  BANK_SERVICE_URL,
  DRIVER_SERVICE_PASSWORD,
  DRIVER_SERVICE_USERNAME,
  SERVER_PORT,
} from "../../config/config.js";

export default async () => {
  let signInResponse = await post({
    url: `${AUTH_SERVICE_URL}/sign-in`,
    body: {
      username: DRIVER_SERVICE_USERNAME,
      password: DRIVER_SERVICE_PASSWORD,
    },
  });
  if (signInResponse.status === "error") {
    console.log("Driver service account was not created yet, creating...");
    const result = await post({
      url: `${AUTH_SERVICE_URL}/sign-up`,
      body: {
        username: DRIVER_SERVICE_USERNAME,
        password: DRIVER_SERVICE_PASSWORD,
        firstName: "Driver Service",
        lastName: "Driver Service",
      },
    });
    if (result.status === "ok") {
      console.log("Driver service user was created successfully");
      signInResponse = await post({
        url: `${AUTH_SERVICE_URL}/sign-in`,
        body: {
          username: DRIVER_SERVICE_USERNAME,
          password: DRIVER_SERVICE_PASSWORD,
        },
      });
    } else {
      console.error("Driver service can't be created");
    }
  }

  return signInResponse;
};
