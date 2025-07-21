import { addUserDB, getUsernameDB } from "../dal/userDal.js";
import bcrypt from "bcrypt";

export async function createHashPassword(pass) {
  return bcrypt.hash(pass, 10);
}

export async function addUser(req, res) {
  try {
    const { username, password } = req.body;
    const hashPass = await createHashPassword(password);
    await addUserDB(username, hashPass);
    res.send({ msg: "added user" });
  } catch (error) {
    console.log("add user error massage: ", error);
    res.status(500).send({ msg: error });
  }
}

export async function getUsername(req, res) {
  try {
    const username = await getUsernameDB(req.body.username);
    if (username) {
      return username;
    }
    return;
  } catch (error) {
    console.log("get password by username error massage: ", error);
  }
}

export async function isExists(req, res) {
  try {
    const { username, password } = req.body;
    const user = await getUsernameDB(username);
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      res.send({ msg: "Verified" });
    } else {
      res.send({ msg: "Unauthorized" });
    }
  } catch (error) {
    console.log("is exists error massage: ", error);
    res.status(500).send({ msg: error });
  }
}
