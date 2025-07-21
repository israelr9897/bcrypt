import { db } from "../db.js";

export async function getUsersDB() {
  return db.collection("Users").find().toArray();
}

export async function addUserDB(UN, pass) {
  try {
    await db.collection("Users").insertOne({ username: UN, hashPassword: pass });
  } catch (error) {
    throw error;
  }
}

export async function getUsernameDB(UN) {
  try {
    return db.collection("Users").findOne({ username: UN });
  } catch (error) {
    throw error;
  }
}

export async function updateUsernameDB(data) {
  try {
    await db
      .collection("Users")
      .updateOne({ username: username }, { $set: { password: data.password } });
  } catch (error) {
    throw error;
  }
}
