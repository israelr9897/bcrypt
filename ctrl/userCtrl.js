import { addUserDB, getUsernameDB, getUsersDB } from "../dal/userDal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function createHashPassword(pass) {
  return bcrypt.hash(pass, 10);
}

export async function getUsers(req, res) {
  try {
    const users = await getUsersDB();
    res.send(users);
  } catch (error) {
    console.log("get users error massage: ", error);
    res.status(500).send({ msg: error });
  }
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
    const isMatch = await bcrypt.compare(password, user.hashPassword);
    console.log(await bcrypt.compare(password, user.hashPassword));
    if (isMatch) {
      await createToken(res, user);
    } else {
      res.send({ msg: "Unauthorized" });
    }
  } catch (error) {
    console.log("is exists error massage: ", error);
    res.status(500).send({ msg: error });
  }
}

export async function createToken(res, user) {
  const token = jwt.sign(
    {
      username: user.username,
      role: user.role,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.cookie("token", token, { httpOnly: true, sameSite: true });
  res.send({ success: true });
}
