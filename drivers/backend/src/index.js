import express from "express";
import cors from "cors";
import { SERVER_PORT } from "./config/config.js";
import createCar from "./functions/cars/create-car.js";
import getCars from "./functions/cars/get-cars.js";
import payTax from "./functions/cars/pay-tax.js";
import verifyTaxPayment from "./functions/cars/verify-tax-payment.js";
import sellCar from "./functions/trade/sell-car.js";
import getSellRequests from "./functions/trade/get-sell-requests.js";
import buyCar from "./functions/trade/buy-car.js";
import verifySalePayment from "./functions/trade/verify-sale-payment.js";
import createPowerOfAttorney from "./functions/power-of-attorney/create-power-of-attorney.js";
import getPoas from "./functions/power-of-attorney/get-poas.js";
import getPoa from "./functions/power-of-attorney/get-poa.js";
import deletePoa from "./functions/power-of-attorney/delete-poa.js";
import updatePoa from "./functions/power-of-attorney/update-poa.js";
import init from "./functions/system/getDriverServiceBankUser.js";
import getDriverServiceAccountId from "./functions/system/getDriverServiceAccountId.js";

const app = express();

app.use(express.json());
app.use(cors());

// app.get("/transactions/:transactionNumber", getTransaction);
// app.get("/transactions", getTransactions);

// app.post("/users", createUser);
// app.get("/users", getUsers);
// app.get("/users/:accountId", getUser);
// app.patch("/users/:accountId", updateUser);
// app.delete("/users/:accountId", deleteUser);

app.post("/cars", createCar);
app.get("/cars", getCars);
app.post("/cars/:carNo/taxes", payTax);
app.post("/cars/:carNo/taxes/verify", verifyTaxPayment);

app.post("/cars/:carNo/poa", createPowerOfAttorney);
app.get("/cars/:carNo/poa", getPoas);
app.get("/cars/:carNo/poa/:poaId", getPoa);
app.patch("/cars/:carNo/poa/:poaId", updatePoa);
app.delete("/cars/:carNo/poa/:poaId", deletePoa);
// app.get("/cars", getCars);
// app.post("/cars/:carNo/taxes", payTax);
// app.post("/cars/:carNo/taxes/verify", verifyTaxPayment);

app.post("/trade/sales", sellCar);
app.get("/trade/sales", getSellRequests);
app.post("/trade/sales/:saleId/buy", buyCar);
app.post("/trade/sales/:saleId/verify", verifySalePayment);
// app.get("/trade/sales", verifyTaxPayment);

// app.post("/deposit", deposit);

app.listen(SERVER_PORT, () => {
  console.log(`Driver service listening on ${SERVER_PORT}`);
});

// 2. автомобили (регистрация автомобилей, их владельцев, выписанных доверенностей, их состояния, не находятся ли в угоне, фиксация покупки-продажи автомобилей и уплаты гос. пошлин при оформлении документов);
