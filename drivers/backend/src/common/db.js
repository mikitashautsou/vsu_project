import { Db, MongoClient } from "mongodb";
import { DB_HOST, DB_NAME } from "../config/config.js";

let mongoClient;

const init = async () => {
  try {
    mongoClient = new MongoClient(DB_HOST);
    console.log("connecting to db");
    mongoClient = await mongoClient.connect();
    console.log("Connected to DB");
  } catch (err) {
    console.error(err);
    throw err;
  }
};

/**
 *
 * @returns {Promise<Db>}
 */
export const connectToDB = async () => {
  if (!mongoClient) {
    await init();
  }
  return mongoClient.db(DB_NAME);
};

/**
 *
 * @returns {MongoClient}
 */
export const getMongoClient = () => mongoClient;
