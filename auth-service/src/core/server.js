import fetch from "node-fetch";
import { COORDINATOR_SERVICE_URL } from "./config.js";
import express from "express";
import { setupModels } from "../core/setupModels.js";
import cors from "cors";

let config;

const initConfig = async (serviceName) => {
  try {
    const {
      config: { SERVICE_MAPPING },
    } = await fetch(`${COORDINATOR_SERVICE_URL}/explore`).then((res) =>
      res.json()
    );

    const { port } = SERVICE_MAPPING[serviceName];
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
export const start = async (serviceName, models) => {
  await initConfig(serviceName);

  const app = express();

  app.use(express.json());
  app.use(cors());
  setupModels(
    app,
    models.map((m) => m(serviceName))
  );

  app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`);
  });
};
