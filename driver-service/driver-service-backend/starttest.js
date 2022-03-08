const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url);
async function run() {
  try {
    // Подключаемся к серверу
    await mongoClient.connect();
    const db = await mongoClient.db("test");
    const collection = db.collection("test");
    const result = await collection.find().toArray();
    await collection.insertOne({});
    // взаимодействие с базой данных
    console.log("ok");
  } catch (err) {
    console.log(err);
  } finally {
    // Закрываем подключение при завершении работы или при ошибке
    await mongoClient.close();
  }
}
run();
