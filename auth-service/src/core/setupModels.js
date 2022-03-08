import { createCRUDRoutes } from "./createCRUDRoutes.js";
import { connectToDB } from "./db.js";

export const setupModels = (app, models) => {
  for (const model of models) {
    app.use(`/${model.systemName}`, createCRUDRoutes(model));
  }
  app.get("/describe-yourself", async (req, res) => {
    const status = {};

    try {
      await connectToDB("test");
      status.dbAccess = "ok";
    } catch {
      status.dbAccess = "fail";
    }

    res.json({
      status,
      models,
    });
  });
};
