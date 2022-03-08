// const { license } = require("../model/license.model");
const express = require("express");
const { Router } = require("express");
const { createCRUDRoutes } = require("./core/createCRUDRoutes");
const { setupModels } = require("./core/setupModels");
const { license } = require("./model/license.model");
const cors = require("cors");
const examModel = require("./model/exam.model");
const driverModel = require("./model/driver.model");
const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());
setupModels(app, [license, examModel, driverModel]);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
