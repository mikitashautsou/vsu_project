const { start } = require("./core/server");
const driverModel = require("./model/driver.model");
const examModel = require("./model/exam.model");
const licenseModel = require("./model/license.model");

start("drivers", [licenseModel, examModel, driverModel]);
