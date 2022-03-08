// const { license } = require("../model/license.model");
const express = require("express");
const { Router } = require("express");
const { createCRUDRoutes } = require("./core/createCRUDRoutes");
const { setupModels } = require("./core/setupModels");
const { license, drivers, user } = require("./model/user.model");
const cors = require("cors");
const app = express();
const port = 4001;

app.use(express.json());
app.use(cors());
setupModels(app, [user]);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
