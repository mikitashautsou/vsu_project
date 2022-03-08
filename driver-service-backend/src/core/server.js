const { default: fetch } = require("node-fetch");
const { COORDINATOR_SERVICE_URL } = require("./config");

let config;

const initConfig = async (serviceName) => {
  try {
    const {
      config: { SERVICE_MAPPING },
    } = await fetch(`${COORDINATOR_SERVICE_URL}/explore`).then((res) =>
      res.json()
    );

    const { port } = SERVICE_MAPPING[serviceName];
    console.log({ port });
    config = {
      SERVICE_MAPPING,
      port,
      serviceName: serviceName,
    };
  } catch (e) {
    console.error("ERROR, COORDINATOR SERVICE IS NOT STARTED!");
    process.exit(1);
  }
};
const start = async (serviceName, models) => {
  await initConfig(serviceName);
  const express = require("express");
  const { Router } = require("express");
  const { createCRUDRoutes } = require("../core/createCRUDRoutes");
  const { setupModels } = require("../core/setupModels");
  const cors = require("cors");
  const examModel = require("../model/exam.model");
  const driverModel = require("../model/driver.model");
  const app = express();

  app.use(express.json());
  app.use(cors());
  setupModels(app, models);

  app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`);
  });
};

module.exports = {
  start,
};
