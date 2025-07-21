import bcrypt from "bcrypt";
import { addUser, getUsername } from "../ctrl/userCtrl.js";
import { addUserDB, getUsernameDB, updateUsernameDB } from "../dal/userDal.js";

export async function createHashPassword(pass){
  return bcrypt.hash(pass, 10);
}

export async function hashePass(req, res, next) {
  try {
    const username = (await getUsernameDB(req.body.username))[0];
    console.log(username);
    if (username) {
      const hashPassword = username.password;
      const isMatch = await bcrypt.compare(req.body.password, hashPassword);
      console.log("Match:", isMatch);
      if (isMatch) {
        next();
      } else {
        res.status(500).send({ msg: "Invalid password" });
      }
    } else {
      const hashPass = await createHashPassword(req.body.password)
      await addUserDB(req.body.username, hashPass);
      next()
    }
  } catch (error) {
    console.log("hash pass error massage: ", error);
  }
}

// export async function updateUser(data) {
//   try {
//     await updateUsernameDB(data);
//     console.log("update username");
//   } catch (error) {
//     console.log("add user error massage: ", error);
//   }
// }
