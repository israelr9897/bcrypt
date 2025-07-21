import { MongoClient, Db } from "mongodb";
import { config } from "dotenv";
config();

const client = new MongoClient(process.env.DB_CONNECTIN);

/**
 * @type {Db | null}
 */

let db;

async function Connect() {
  if (!db) {
    await client.connect();
    db = client.db("bcrypt");
    console.log("connect to mongoDB");
  }
}
Connect();

export { db };
