import express from "express";
import { onlyPublic, onlyPrivate } from "./middlewares";
import {
  kakaoLogin,
  logout,
  postKakaoLogin,
} from "./controllers/loginController";
import { home } from "./controllers/globalController";
import passport from "passport";

const globalRouter = express.Router();

globalRouter.get("/", home);

globalRouter.get("/kakao", onlyPublic, kakaoLogin);
globalRouter.get(
  "/oauth",
  passport.authenticate("kakao", { failureRedirect: "/" }),
  postKakaoLogin
);
globalRouter.get("/logout", onlyPrivate, logout);

export default globalRouter;
