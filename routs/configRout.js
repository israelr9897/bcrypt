import rout from "./rout.js";

export function configRout(app){
    app.use("/user", rout)
}