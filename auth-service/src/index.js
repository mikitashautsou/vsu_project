import { start } from "./core/server.js";
import user from "./model/user.model.js";

start("auth", [user]);
