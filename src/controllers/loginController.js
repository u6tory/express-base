import passport from "passport";
import User from "../models/User";

export const kakaoLogin = passport.authenticate("kakao", {
  failureRedirect: "/",
});

export const postKakaoLogin = (req, res) => {
  res.redirect("/");
};

export const kakaoLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    const name = profile.username,
      email = profile._json.kakao_account.email,
      phone =
        "0" +
        profile._json.kakao_account.phone_number
          .replace("+82", "")
          .replace("-", "")
          .replace("-", "")
          .replace(" ", "");
    const user = await User.findOne({ phone });
    if (user) {
      await User.findByIdAndUpdate(user.id, {
        email,
        lastLogin: Date.now(),
      });
      return done(null, user);
    }
    return done("회원정보가 존재하지 않습니다.");
  } catch (error) {
    return done(error);
  }
};

export const logout = (req, res) => {
  req.logout();
  res.redirect("/");
};
