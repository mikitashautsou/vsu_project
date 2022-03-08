const { Router } = require("express");
const { connectToDB } = require("./db");
const { ObjectId } = require("mongodb");
const { decodeJWT } = require("./jwt");
const { SERVICE_MAPPING } = require("./config");
const { default: fetch } = require("node-fetch");
const createCRUDRoutes = (model) => {
  const router = Router();
  const requirePermissions = (type) => (req, res, next) => {
    if (!model.permissions) {
      next();
      return;
    }
    const { authorization } = req.headers;
    if (!authorization) {
      res.json({
        status: "error",
        message: "Authorization token was not provided",
      });
      return;
    }

    try {
      console.log(authorization);
      const result = decodeJWT(authorization);
      if (type === "read") {
        if (!model.permissions.canBeReadBy.includes(result.role)) {
          res.json({
            status: "error",
            message: "User doesn't have permissions to do this action",
          });
          return;
        }
      }
      if (type === "write") {
        if (!model.permissions.canBeEditedBy.includes(result.role)) {
          res.json({
            status: "error",
            message: "User doesn't have permissions to do this action",
          });
          return;
        }
      }
      next();
    } catch (e) {
      res.json({
        status: "error",
        message: "Invalid authorization token",
      });
    }
    //   if (model.permissions.canBeReadBy)
  };
  // name: "driver",
  // type: "foreign",
  // target: {
  //   service: "drivers",
  //   model: "drivers",
  //   targetField: "_id",
  // },
  // display: (driver) => `${driver.firstName} ${driver.lastName}`,
  // title: "Driver",
  router.get("/", requirePermissions("read"), async (req, res) => {
    const db = await connectToDB(model.serviceName);
    const modelCollection = await db.collection(model.systemName);
    const entities = await modelCollection.find().toArray();
    const foreignProperties = model.properties.filter(
      (p) => p.type === "foreign"
    );
    for (const entity of entities) {
      for (const foreignProperty of foreignProperties) {
        const { target } = foreignProperty;
        const foreignEntity = await fetch(
          `${SERVICE_MAPPING[target.service]}/${target.model}/${
            entity[foreignProperty.name]
          }`,
          {
            headers: {
              Authorization: req.headers.authorization,
            },
          }
        ).then((res) => res.json());
        entity[`${foreignProperty.name}_label`] =
          foreignProperty.display(foreignEntity);
      }
      if (model.display) {
        entity["display_as"] = model.display(entity);
      }
    }
    res.json(entities);
  });
  router.get("/:id", requirePermissions("read"), async (req, res) => {
    const { id } = req.params;
    console.log(`reading ${model.systemName} with id ${id}`);
    const db = await connectToDB(model.serviceName);
    const modelCollection = await db.collection(model.systemName);
    const dbEntity = await modelCollection.findOne({
      _id: new ObjectId(id),
    });
    res.json(dbEntity);
  });
  router.post("/", requirePermissions("write"), async (req, res) => {
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
  router.patch("/:id", requirePermissions("write"), async (req, res) => {
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
  router.delete("/:id", requirePermissions("write"), async (req, res) => {
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
      for (const arg of action.args ?? []) {
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
