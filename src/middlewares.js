export const localsMiddleware = (req, res, next) => {
  res.locals.siteTitle = "Express Base";
  res.locals.loggedUser = req.user || null;
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect("/");
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/");
  }
};

export const onlyAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res.redirect("/");
  }
};
