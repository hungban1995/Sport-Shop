import helmet from "helmet";
const helmetConfig = (app) => {
  app.use(
    helmet({
      crossOriginResourcePolicy: false,
    })
  );
};
export default helmetConfig;
