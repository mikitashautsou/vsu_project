import express from "express";
import cors from "cors";
import { PORT } from "./config/config.js";
import createAccount from "./functions/accounts/create-account.js";
import getAccounts from "./functions/accounts/get-accounts.js";
import getAllAccounts from "./functions/accounts/get-all-accounts.js";
import deleteAccount from "./functions/accounts/delete-account.js";
import deposit from "./functions/ntransactions/deposit.js";
import createRequest from "./functions/ntransactions/create-request.js";
import completeRequest from "./functions/ntransactions/complete-request.js";
// import signUp from "./functions/auth/sign-up.js";
// import signIn from "./functions/auth/sign-in.js";
// import createAccount from "./functions/users/create-user.js";
// import getTransactions from "./functions/transactions/get-transactions.js";
// import getUsers from "./functions/users/get-users.js";
// import transfer from "./functions/transactions/transfer.js";
// import updateUser from "./functions/users/update-user.js";
// import deleteUser from "./functions/users/delete-user.js";
// import getUser from "./functions/users/get-user.js";
// import createUser from "./functions/users/create-user.js";
// import getTransaction from "./functions/transactions/get-transaction.js";
// import deposit from "./functions/transactions/deposit.js";
// import createRequest from "./functions/transactions/create-request.js";
// import completeRequest from "./functions/transactions/complete-request.js";

const app = express();

app.use(express.json());
app.use(cors());

// app.get("/transactions/:transactionNumber", getTransaction);
// app.get("/transactions", getTransactions);
// app.post("/transfer", transfer);
app.put("/users/:userId/accounts/:accountId/deposit", deposit);
app.post("/users/:userId/accounts/:accountId/request", createRequest);
app.post(
  "/users/:userId/accounts/:accountId/complete-request/:requestId",
  completeRequest
);
// app.post("/request", createRequest);
// app.post("/completeRequest", completeRequest);

app.post("/users/:userId/accounts", createAccount);
app.get("/users/:userId/accounts", getAccounts);
app.get("/accounts", getAllAccounts);
// app.patch("/users/:userId/accounts/:accountId", updateUser);
// app.get("/users/:accountId", getUser);
app.delete("/users/:accountId", deleteAccount);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
