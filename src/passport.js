import passport from "passport";
import User from "./models/User";
import KakaoStrategy from "passport-kakao";
import dotenv from "dotenv";
import { kakaoLoginCallback } from "./controllers/loginController";

passport.use(User.createStrategy());
dotenv.config();

passport.use(
  new KakaoStrategy(
    {
      clientID: process.env.KAKAO_ID,
      // clientSecret: clientSecret, // clientSecret을 사용하지 않는다면 넘기지 말거나 빈 스트링을 넘길 것
      callbackURL: "/oauth",
    },
    kakaoLoginCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
