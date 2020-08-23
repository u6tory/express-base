export const localsMiddleware = (req, res, next) => {
  res.locals.siteTitle = "Hello Home";
  next();
};
