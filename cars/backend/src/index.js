import express from "express";
import cors from "cors";
import { SERVER_PORT } from "./config/config.js";
import createCar from "./functions/cars/create-car.js";
import getCars from "./functions/cars/get-cars.js";
import payTax from "./functions/cars/pay-tax.js";
import sellCar from "./functions/trade/sell-car.js";
import getSellRequests from "./functions/trade/get-sell-requests.js";
import buyCar from "./functions/trade/buy-car.js";
import createPowerOfAttorney from "./functions/power-of-attorney/create-poa.js";
import getPoas from "./functions/power-of-attorney/get-poas.js";
import getPoa from "./functions/power-of-attorney/get-poa.js";
import deletePoa from "./functions/power-of-attorney/delete-poa.js";
import updatePoa from "./functions/power-of-attorney/update-poa.js";
import init from "./functions/system/getCarsServiceBankUser.js";
import getDriverServiceAccountId from "./functions/system/getCarsServiceAccountId.js";
import createPoa from "./functions/power-of-attorney/create-poa.js";
import updateCar from "./functions/cars/update-car.js";
import deleteCar from "./functions/cars/delete-car.js";
import deleteSale from "./functions/trade/delete-sale.js";
import checkCarPermission from "./functions/verification/check-user-car-permission.js";

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

app.post("/users/:userId/cars", createCar);
app.get("/users/:userId/cars", getCars);
app.patch("/users/:userId/cars/:carId", updateCar);
app.delete("/users/:userId/cars/:carId", deleteCar);

app.post("/users/:userId/cars/:carNo/taxes", payTax);

// app.post("/cars/:carNo/poa", createPowerOfAttorney);
// app.get("/cars/:carNo/poa", getPoas);
// app.get("/cars/:carNo/poa/:poaId", getPoa);
// app.patch("/cars/:carNo/poa/:poaId", updatePoa);
// app.delete("/cars/:carNo/poa/:poaId", deletePoa);

app.post("/users/:userId/poas", createPoa);
app.get("/users/:userId/poas", getPoas);
app.get("/users/:userId/poas/:poaId", getPoa);
app.patch("/users/:userId/poas/:poaId", updatePoa);
app.delete("/users/:userId/poas/:poaId", deletePoa);
// app.get("/cars", getCars);
// app.post("/cars/:carNo/taxes", payTax);
// app.post("/cars/:carNo/taxes/verify", verifyTaxPayment);

app.post("/users/:userId/cars/:carNo/sell", sellCar);
app.get("/sales", getSellRequests);
app.post("/sales/:saleId", buyCar);
app.delete("/sales/:saleId", deleteSale);
app.get("/users/:userId/car-permit/:carId", checkCarPermission);

// app.post("/sales/:saleId/buy", buyCar);
// app.post("/sales/:saleId/verify", verifySalePayment);
// app.get("/trade/sales", verifyTaxPayment);

// app.post("/deposit", deposit);

app.listen(SERVER_PORT, () => {
  console.log(`Driver service listening on ${SERVER_PORT}`);
});

// 2. автомобили (регистрация автомобилей, их владельцев, выписанных доверенностей, их состояния, не находятся ли в угоне, фиксация покупки-продажи автомобилей и уплаты гос. пошлин при оформлении документов);
