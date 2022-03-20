import express from "express";
import cors from "cors";
import signUp from "./functions/auth/sign-up.js";
import { SERVER_PORT } from "./config/config.js";
import signIn from "./functions/auth/sign-in.js";
import createCar from "./functions/cars/create-car.js";
import getCars from "./functions/cars/get-cars.js";
import payTax from "./functions/cars/pay-tax.js";
import verifyTaxPayment from "./functions/cars/verify-tax-payment.js";
import sellCar from "./functions/trade/sell-car.js";
import getSellRequests from "./functions/trade/get-sell-requests.js";
import buyCar from "./functions/trade/buy-car.js";
import verifySalePayment from "./functions/trade/verify-sale-payment.js";

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

app.post("/trade/sales", sellCar);
app.get("/trade/sales", getSellRequests);
app.post("/trade/sales/:saleId/buy", buyCar);
app.post("/trade/sales/:saleId/verify", verifySalePayment);
// app.get("/trade/sales", verifyTaxPayment);

app.post("/auth/sign-up", signUp);
app.post("/auth/sign-in", signIn);
// app.post("/deposit", deposit);

app.listen(SERVER_PORT, () => {
  console.log(`Example app listening on port ${SERVER_PORT}`);
});

// 2. автомобили (регистрация автомобилей, их владельцев, выписанных доверенностей, их состояния, не находятся ли в угоне, фиксация покупки-продажи автомобилей и уплаты гос. пошлин при оформлении документов);
