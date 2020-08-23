import "@babel/polyfill";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { localsMiddleware } from "./middlewares";
import globalRouter from "./globalRouter";

const app = express();
app.use(helmet());
dotenv.config();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use("/static", express.static(path.join(__dirname, "static")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(morgan("dev"));
app.locals.moment = require("moment");
app.locals.moment.locale("ko");
app.use(localsMiddleware);
app.use("/", globalRouter);

app.listen(process.env.PORT, () =>
  console.log(`✅  Server Ready! ${process.env.PORT} is opened`)
);
