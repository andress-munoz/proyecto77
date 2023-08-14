import { Router } from "express";
import dotenv from "dotenv";
import  jwt  from "jsonwebtoken";

dotenv.config();
const loginRouter = Router();

loginRouter.get("/google", (req, res)=>{
    if(req.user){

        const payload = {
            nombre: req.user.displayName,
            correo: req.user.emails[0].value,
            foto: req.user.photos[0].value
        }

        const token = jwt.sign(
            payload, 
            process.env.TOKEN_SECRET,
            {"expiresIn":process.env.EXPIRE_TOKEN}
            );
            let options = {
                maxAge: 1000 * 60 * process.env.EXPIRE_COOKIE,
                domain: "localhost",
                expires: new Date(Date.now() + (1000 * 60) * process.env.EXPIRE_COOKIE)
            }

        res.cookie("ckeon", token, options);
        res.redirect("/v1");
    }
})




export default loginRouter;