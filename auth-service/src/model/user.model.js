import { connectToDB } from "../core/db.js";
import { createJWT } from "../core/jwt.js";

export default (serviceName) => ({
  serviceName, // название базы TODO: переимновать в serviceName
  systemName: "users", // название таблицы, а также название в урлах
  name: "User", // назвнаие таблицы которое будет показываться на фронте
  pluralName: "Users", //название во множественном числе
  properties: [
    {
      name: "username",
      type: "text", //input type
      title: "Username",
    },
    {
      name: "password",
      type: "password", //input type
      title: "Password",
    },
    {
      name: "role",
      title: "Role",
      type: "enum", //input type
      values: ["driver", "policeman", "accountant", "admin"],
    },

  ],
  actions: [
    {
      name: "example action",
      systemName: "example",
      type: "per-row",
      execute: async ({ args }) => {
        console.log("ok");
      },
    },
    {
      name: "example action 2",
      systemName: "example2",
      type: "standalone",
      execute: async ({ args }) => {
        console.log("ok2");
      },
    },
    {
      name: "Log in",
      systemName: "log-in",
      // allowedFor: ["admin", "driver"],
      // icon: "<exam>",
      // modelRequired: true,
      args: ["username", "password"],
      type: "system-only",
      systemOnly: true,
      execute: async ({ args }) => {
        const { username, password } = args;

        const authDb = await connectToDB("auth");
        const user = await authDb.collection("users").findOne({
          username,
          password,
        });
        if (!user) {
          return {
            status: "error",
            message: "Invalid username or password",
          };
        }
        const token = await createJWT(user);
        return { token, user };
      },
    },
  ],
});
