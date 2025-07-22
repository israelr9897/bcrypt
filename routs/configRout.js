import userRout from "./userRout.js";

export function configRout(app) {
  app.use("/user", userRout);
  app.use("/", (req, res) => {
    res.status(404).send({ msg: "rout isn't find" });
  });
}
