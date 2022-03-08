// const { license } = require("../model/license.model");
import express from "express";
import { Router } from "express";
import cors from "cors";
import { config } from "./config.js";
import { default as chalk } from "chalk";
import fetch from "node-fetch";
const app = express();

app.use(express.json());
app.use(cors());

const getServiceStatuses = async () => {
  const services = Object.entries(config.SERVICE_MAPPING);

  return await Promise.all(
    services.map(async ([service, { protocol, port, domain }]) => {
      let serviceUp = false;
      let dbUp = false;
      let url = `${protocol}://${domain}:${port}/describe-yourself`;
      try {
        const { status } = await fetch(url).then((res) => res.json());
        dbUp = status.dbAccess === "ok";
        serviceUp = true;
      } catch (e) {
        console.log(`Error occurred while connecting to ${url}`);
      }
      return {
        port,
        service,
        up: serviceUp,
        db: dbUp,
      };
    })
  );
};

app.get("/explore", async (req, res) => {
  res.json({
    config,
    statuses: await getServiceStatuses(),
  });
});

app.listen(config.PORT, () => {
  console.log(chalk.green.bold(`Coordinator service started on ${config.PORT}`));
});

getServiceStatuses().then((statuses) => {
  for (const status of statuses) {
    if (status.up) {
      if (status.db) {
        console.log(
          chalk.green.bold(
            `${status.service} service is OK, and listening on the port ${status.port}`
          )
        );
      } else {
        console.log(
          chalk.yellow.bold(
            `${status.service} service is up, but there is some issue with db connection`
          )
        );
      }
    } else {
      console.log(chalk.red.bold(`${status.service} service is down`));
    }
  }
});
