import express from "express";
import cors from "cors";
import signUp from "./functions/sign-up.js";
import signIn from "./functions/sign-in.js";
import createAccount from "./functions/create-user.js";
import getTransactions from "./functions/get-transactions.js";
import getUsers from "./functions/get-users.js";
import transfer from "./functions/transfer.js";
import updateUser from "./functions/update-user.js";
import deleteUser from "./functions/delete-user.js";
import getUser from "./functions/get-user.js";
import createUser from "./functions/create-user.js";
import getTransaction from "./functions/get-transaction.js";
import deposit from "./functions/deposit.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/transactions/:transactionNumber", getTransaction);
app.get("/transactions", getTransactions);

app.post("/users", createUser);
app.get("/users", getUsers);
app.get("/users/:accountId", getUser);
app.patch("/users/:accountId", updateUser);
app.delete("/users/:accountId", deleteUser);

app.post("/auth/sign-up", signUp);
app.post("/auth/sign-in", signIn);
app.post("/transfer", transfer);
app.post("/deposit", deposit);

app.listen(4000, () => {
  console.log(`Example app listening on port ${4000}`);
});
