import "@babel/polyfill";
import "./db";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { localsMiddleware } from "./middlewares";
import globalRouter from "./globalRouter";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import passport from "passport";
import session from "express-session";
import "./passport";

const app = express();
app.use(helmet());
dotenv.config();
const CookieStore = MongoStore(session);

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use("/static", express.static(path.join(__dirname, "static")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(morgan("dev"));
app.locals.moment = require("moment");
app.locals.moment.locale("ko");
app.use(localsMiddleware);
app.use("/", globalRouter);

app.listen(process.env.PORT, () =>
  console.log(`✅  Server Ready! ${process.env.PORT} is opened`)
);
