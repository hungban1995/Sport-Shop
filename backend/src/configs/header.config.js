const headerConfig = (app) => {
  app.use(function (req, res, next) {
     res.setHeader("Cross-Origin-Resource-Policy", "same-origin");
    next();
  });
};
export default headerConfig;
