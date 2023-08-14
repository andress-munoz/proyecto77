import express from "express";
import dotenv from "dotenv";
import home from "./routes/homepage.routes.js";
import contact from "./routes/homepage.routes.js";
import comoFunciona from "./routes/homepage.routes.js";
import sobreNosotros from "./routes/homepage.routes.js";
import tienda from "./routes/tienda.routes.js";
import admin from "./routes/homepage.routes.js";
import blog from "./routes/homepage.routes.js";
import compra from "./routes/homepage.routes.js";
import menulogin from "./routes/homepage.routes.js";
import ejs from "ejs";
import path from "path";
import * as url from "url"
import loginRouter from "./routes/login.routes.js";
import loginUser from "./routes/loginuser.routes.js";
import passport from "passport";
import "./middlewares/google.js";
import dash from "./routes/dashboard.routes.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import Swal from "sweetalert2";
import bcrypt from 'bcryptjs';
import session from 'express-session';
import mysql from 'mysql';

//inicializando constantes
const app = express();
dotenv.config();
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//utilizando Middleware
app.use(express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));
app.use(passport.initialize());
app.use(cookieParser());
app.use(bodyParser.urlencoded({"extended":true}));

// rutas
app.use("/v1", dash);
app.use("/", home);
app.use("/tienda", tienda)
app.use("/contact", contact);
app.use("/comoFunciona", comoFunciona)
app.use("/sobreNosotros", sobreNosotros)
app.use("/admin", admin)
app.use("/blog", blog)
app.use("/compra", compra)
app.use("/menulogin", menulogin)
app.use("/loginUser", loginUser)
app.use("/auth", passport.authenticate("auth-google",{
    scope:["https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile"
    ],
    session:false
}), loginRouter)




//Asignando puerto a la propiedad de app
app.set("port", process.env.PORT);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

export default app;