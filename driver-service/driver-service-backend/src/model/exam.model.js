const { createModel } = require("../core/createModel");

module.exports = {
  serviceName: "drivers", // название базы TODO: переимновать в serviceName
  systemName: "exams", // название таблицы, а также название в урлах
  name: "Exam", // назвнаие таблицы которое будет показываться на фронте
  pluralName: "Exams", //название во множественном числе
  permissions: {
    canBeEditedBy: ["admin", "policeman"],
    canBeReadBy: ["admin", "policeman", "driver"],
  },
  properties: [
    {
      name: "date",
      type: "date", //input type
      title: "Date",
    },
    {
      name: "isPassed",
      type: "boolean", //input type
      title: "Passed",
    },
    {
      name: "driverId",
      type: "foreign",
      target: {
        service: "drivers",
        model: "drivers",
        targetField: "_id",
      },
      display: (driver) => `${driver.firstName} ${driver.lastName}`,
      title: "Driver",
    },
    // {
    //   name: "driverId",
    //   type: "foreign",
    //   target: {
    //     service: "drivers",
    //     model: "drivers",
    //     targetField: "_id",
    //   },
    // },
  ],
  actions: [
    // {
    //   name: "Take exam",
    //   allowedFor: ["admin", "driver"],
    //   icon: "<exam>",
    //   modelRequired: true,
    //   //   action: (entity) => takeExam(entity),
    // },
    // {
    //   name: "example action",
    //   systemName: "example",
    //   type: "per-row",
    //   execute: async ({ args }) => {
    //     console.log("ok", { args });
    //   },
    // },
    // {
    //   name: "example action 2",
    //   systemName: "example2",
    //   type: "standalone",
    //   execute: async ({ args }) => {
    //     console.log("ok2", args);
    //   },
    // },
  ],
};
