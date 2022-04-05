import { Db, MongoClient } from "mongodb";

const url = "mongodb://127.0.0.1:27017/";
let mongoClient;

const init = async () => {
  try {

    console.log("connecting to db");

    mongoClient = new MongoClient(url);
    mongoClient = await mongoClient.connect();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/**
 *
 * @param {string} dbName
 * @returns {Promise<Db>}
 */
export const connectToDB = async (dbName) => {
  if (!mongoClient) {
    await init();
  }
  return mongoClient.db(dbName);
};

/**
 * 
 * @returns {MongoClient}
 */
export const getMongoClient = () => mongoClient