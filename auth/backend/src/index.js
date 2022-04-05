import express from "express";
import cors from "cors";
import signUp from "./functions/auth/sign-up.js";
import signIn from "./functions/auth/sign-in.js";
import validateToken from "./functions/token/validate-token.js";
import getUsers from "./functions/users/get-users.js";
import createUser from "./functions/users/create-user.js";
import updateUser from "./functions/users/update-user.js";
import getUser from "./functions/users/get-user.js";
import deleteUser from "./functions/users/delete-user.js";
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

app.post("/sign-up", signUp);
app.post("/sign-in", signIn);
app.post("/token/validate", validateToken);

app.get("/users", getUsers);
app.post("/users", createUser);
app.put("/users/:userId", updateUser);
app.get("/users/:userId", getUser);
app.delete("/users/:userId", deleteUser);
// app.get("/transactions/:transactionNumber", getTransaction);
// app.get("/transactions", getTransactions);
// app.post("/transfer", transfer);
// app.post("/deposit", deposit);
// app.post("/request", createRequest);
// app.post("/completeRequest", completeRequest);

// app.get("/users", getUsers);
// app.get("/users/:accountId", getUser);
// app.patch("/users/:accountId", updateUser);
// app.delete("/users/:accountId", deleteUser);

// app.post("/auth/sign-up", signUp);
// app.post("/auth/sign-in", signIn);

app.listen(4000, () => {
  console.log(`Example app listening on port ${4000}`);
});
