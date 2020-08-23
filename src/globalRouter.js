import express from "express";
import { home } from "./globalController";

const globalRouter = express.Router();

globalRouter.get("/", home);

export default globalRouter;
