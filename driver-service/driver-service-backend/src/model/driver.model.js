const { createModel } = require("../core/createModel");

module.exports = {
  serviceName: "drivers", // название базы TODO: переимновать в serviceName
  systemName: "drivers", // название таблицы, а также название в урлах
  name: "Driver", // назвнаие таблицы которое будет показываться на фронте
  pluralName: "Drivers", //название во множественном числе
  permissions: {
    canBeEditedBy: ["admin", "policeman"],
    canBeReadBy: ["admin", "policeman"],
  },
  properties: [
    {
      name: "firstName",
      type: "text", //input type
      title: "First name",
    },
    {
      name: "lastName",
      type: "text", //input type
      title: "Last name",
    },
  ],
  display: (driver) => `${driver.firstName} ${driver.lastName[0]}.`,
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
