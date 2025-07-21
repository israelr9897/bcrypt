import express from "express";
import { config } from "dotenv";
import { configRout } from "./routs/configRout.js";
import cookie_parser from "cookie-parser";

config();
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cookie_parser());

configRout(app);

app.listen(PORT, () => {
  console.log("server is ronning on port:" + PORT);
});
