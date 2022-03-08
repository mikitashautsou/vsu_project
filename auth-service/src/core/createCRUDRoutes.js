const { Router } = require("express");
const { connectToDB } = require("./db");
const { ObjectId } = require("mongodb");

const createCRUDRoutes = (model) => {
  const router = Router();
  router.get("/", async (req, res) => {
    const db = await connectToDB(model.serviceName);
    const modelCollection = await db.collection(model.systemName);
    const models = await modelCollection.find().toArray();
    res.json(models);
  });
  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const db = await connectToDB(model.serviceName);
    const modelCollection = await db.collection(model.systemName);
    const dbEntity = await modelCollection.findOne({
      _id: new ObjectId(id),
    });
    res.json(dbEntity);
  });
  router.post("/", async (req, res) => {
    const { body } = req;
    const newEntity = {};
    console.log({ body });
    for (const property of model.properties) {
      if (body[property.name] === undefined) {
        res.json({
          status: "error",
          message: `${property.name} doesn't exist in the request body`,
        });
        return;
      }
      if (
        property.type === "enum" &&
        !property.values.includes(body[property.name])
      ) {
        res.json({
          status: "error",
          message: `${
            property.name
          } should use one of these values ${property.values.join(",")}`,
        });
        return;
      }
      newEntity[property.name] = body[property.name];
    }
    const db = await connectToDB(model.serviceName);
    const modelCollection = await db.collection(model.systemName);
    await modelCollection.insertOne(newEntity);
    res.json({
      status: "acknowledged",
    });
  });
  router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const db = await connectToDB(model.serviceName);
    const modelCollection = await db.collection(model.systemName);

    const { body } = req;
    const updatedEntity = {};
    for (const property of model.properties) {
      updatedEntity[property.name] = body[property.name];
    }

    await modelCollection.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          ...updatedEntity,
        },
      }
    );
    res.json({
      status: "acknowledged",
    });
  });
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const db = await connectToDB(model.serviceName);
    const modelCollection = await db.collection(model.systemName);
    await modelCollection.deleteOne({
      _id: new ObjectId(id),
    });
    res.send({
      status: "acknowledged",
    });
  });
  for (const action of model.actions) {
    router.post(`/${action.systemName}`, async (req, res) => {
      const { body } = req;
      for (const arg of action.args) {
        if (body[arg] === undefined) {
          res.json({
            status: "error",
            message: `${arg} doesn't exist in the request body`,
          });
          return;
        }
      }

      const result = await action.execute({ args: body });
      res.json({
        status: "ok",
        ...result,
      });
    });
  }
  return router;
};

module.exports = {
  createCRUDRoutes,
};
