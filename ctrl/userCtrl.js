import {
  addUserDB,
  getUsernameDB,
  getUsersDB,
  updateUsernameDB,
} from "../dal/userDal.js";
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

export async function updateUsername(req, res) {
  try {
    const id = req.params.id;
    await updateUsernameDB(id, req.body);
    res.send({ msg: "update user" });
  } catch (error) {
    console.log("update user error massage: ", error);
    res.status(500).send({ msg: error });
  }
}
export async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await getUsernameDB(username);
    const isMatch = await bcrypt.compare(password, user.hashPassword);
    if (isMatch) {
      await createToken(res, user);
    } else {
      res.send({ msg: "Unauthorized" });
    }
  } catch (error) {
    console.log("login error massage: ", error);
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

export function decodeMessage(req, res) {
  try {
    const { list } = req.body;
    let temp = list[0];
    let result = 0;
    list.forEach((n) => {
      if (n < temp) {
        result = -1
        return;
      }
      result += n;
      temp = n;
    });
    res.send({msg: result});
  } catch (error) {
    console.log("decode Message error massage: ", error);
    res.status(500).send({ msg: error });
  }
}
