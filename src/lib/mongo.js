const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.dbName = DB_NAME;
  }

  // connect() {
  //   if (!MongoLib.connection) {
  //     MongoLib.connection = new Promise((resolve, reject) => {
  //       this.client.connect((err) => {
  //         if (err) {
  //           reject(err);
  //         }

  //         console.log('Connected succesfully to mongo');
  //         resolve(this.client.db(this.dbName));
  //       });
  //     });
  //   }

  async connect() {
    if (!MongoLib.connection) {
      try {
        await this.client.connect();
        console.log('Connected succesfully to mongo');
        MongoLib.connection = this.client.db(this.dbName);
      } catch (err) {
        console.log(err);
      }
    }

    return MongoLib.connection;
  }

  async getAll(collection, query) {
    const db = await this.connect();
    const products = await db.collection(collection).find(query).toArray();
    return products;
  }

  async get(collection, id) {
    const db = await this.connect();
    const product = await db
      .collection(collection)
      .findOne({ _id: ObjectId(id) });
    return product;
  }

  async create(collection, data) {
    const db = await this.connect();
    const result = await db.collection(collection).insertOne(data);
    return result.insertedId;
  }

  async update(collection, id, data) {
    const db = await this.connect();
    const result = await db
      .collection(collection)
      .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
    return result.upsertedId || id;
  }

  async delete(collection, id) {
    const db = await this.connect();
    await db.collection(collection).deleteOne({ _id: ObjectId(id) });
    return id;
  }
}

module.exports = MongoLib;
