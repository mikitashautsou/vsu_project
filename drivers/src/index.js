import express from "express";
import cors from "cors";
import createLicense from "./functions/licenses/create-license.js";
import getAllLicenses from "./functions/licenses/get-all-licenses.js";
import updateLicense from "./functions/licenses/update-license.js";
import deleteLicense from "./functions/licenses/delete-license.js";
import { SERVER_PORT } from "./config/config.js";
import payTax from "./functions/licenses/pay-tax.js";
import revokeLicense from "./functions/licenses/revoke-license.js";
import checkLicense from "./functions/licenses/check-license.js";

const app = express();

app.use(express.json());
app.use(cors());

app.post("/licenses", createLicense);
app.post("/licenses/:licenseId/taxes", payTax);
app.get("/licenses", getAllLicenses);
app.patch("/licenses/:licenseId", updateLicense);
app.delete("/licenses/:licenseId", deleteLicense);
app.post("/licenses/:licenseId/revoke", revokeLicense);
app.get("/users/:userId/license-check", checkLicense);

app.listen(SERVER_PORT, () => {
  console.log(`Example app listening on port ${SERVER_PORT}`);
});
