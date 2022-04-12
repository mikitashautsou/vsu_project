import { get, post } from "../../common/http.js";
import { BANK_SERVICE_URL } from "../../config/config.js";
import getDriverServiceToken from "./getCarsServiceBankUser.js";

export default async () => {
  const {
    token,
    user: { _id: userId },
  } = await getDriverServiceToken();

  let accountsResponse = await get({
    url: `${BANK_SERVICE_URL}/users/${userId}/accounts`,
    headers: {
      authorization: token,
    },
  });
  if (accountsResponse.response.length === 0) {
    console.log("Driver service doesn't have bank account, creating...");
    await post({
      url: `${BANK_SERVICE_URL}/users/${userId}/accounts`,
      headers: {
        authorization: token,
      },
    });
    console.log("Driver service account created");
  }
  accountsResponse = await get({
    url: `${BANK_SERVICE_URL}/users/${userId}/accounts`,
    headers: {
      authorization: token,
    },
  });
  return accountsResponse.response[0]._id;
};
