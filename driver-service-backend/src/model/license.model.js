const { createModel } = require("../core/createModel");

module.exports = {
  serviceName: "drivers", // название базы TODO: переимновать в serviceName
  systemName: "licenses", // название таблицы, а также название в урлах
  name: "License", // назвнаие таблицы которое будет показываться на фронте
  pluralName: "Licenses", //название во множественном числе
  permissions: {
    canBeEditedBy: ["admin", "policeman"],
    canBeReadBy: ["admin", "policeman", "driver"],
  },
  properties: [
    {
      name: "date",
      type: "text", //input type
      title: "Date",
    },
    //   {
    //     name: "transactionId",
    //     type: "foreign",
    //     target: {
    //       service: "bank",
    //       model: "transactions",
    //     },
    //   },
    {
      name: "name",
      type: "name", //input type
      title: "name",
    },
  ],
  actions: [
    {
      name: "Take exam",
      allowedFor: ["admin", "driver"],
      icon: "<exam>",
      modelRequired: true,
      //   action: (entity) => takeExam(entity),
    },
    {
      name: "example action",
      systemName: "example",
      type: "per-row",
      execute: async ({ args }) => {
        console.log("ok", { args });
      },
    },
    {
      name: "example action 2",
      systemName: "example2",
      type: "standalone",
      execute: async ({ args }) => {
        console.log("ok2", args);
      },
    },
  ],
};
//   drivers: {
//     dbName: "drivers", // название базы TODO: переимновать в serviceName
//     systemName: "drivers", // название таблицы, а также название в урлах
//     name: "Driver", // назвнаие таблицы которое будет показываться на фронте
//     pluralName: "Drivers", //название во множественном числе
//     properties: [
//       {
//         name: "firstName",
//         type: "text", //input type
//         title: "First name",
//       },
//       {
//         name: "lastName",
//         type: "text", //input type
//         title: "Last name",
//       },
//     ],
//     actions: [
//       {
//         name: "Take exam",
//         allowedFor: ["admin", "driver"],
//         icon: "<exam>",
//         modelRequired: true, //modelRequired: true - действие будет отобржено для всех сущностей, иначе один раз внизу таблице
//         //   action: (entity) => takeExam(entity),
//       },
//     ],
//   },
