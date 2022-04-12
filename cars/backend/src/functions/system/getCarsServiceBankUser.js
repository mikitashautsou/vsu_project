import { post, get } from "../../common/http.js";
import {
  AUTH_SERVICE_URL,
  BANK_SERVICE_URL,
  CARS_SERVICE_PASSWORD,
  CARS_SERVICE_USERNAME,
  SERVER_PORT,
} from "../../config/config.js";

export default async () => {
  let signInResponse = await post({
    url: `${AUTH_SERVICE_URL}/sign-in`,
    body: {
      username: CARS_SERVICE_USERNAME,
      password: CARS_SERVICE_PASSWORD,
    },
  });
  if (signInResponse.status === "error") {
    console.log("Driver service account was not created yet, creating...");
    const result = await post({
      url: `${AUTH_SERVICE_URL}/sign-up`,
      body: {
        username: CARS_SERVICE_USERNAME,
        password: CARS_SERVICE_PASSWORD,
        firstName: "Driver Service",
        lastName: "Driver Service",
      },
    });
    if (result.status === "ok") {
      console.log("Driver service user was created successfully");
      signInResponse = await post({
        url: `${AUTH_SERVICE_URL}/sign-in`,
        body: {
          username: CARS_SERVICE_USERNAME,
          password: CARS_SERVICE_PASSWORD,
        },
      });
    } else {
      console.error("Driver service can't be created");
    }
  }

  return signInResponse;
};
