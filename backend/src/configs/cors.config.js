import cors from "cors";

const corsConfig = (app) => {
  const corsOptionsDelegate = function (req, callback) {
    const corsOptions = { origin: true };
    callback(null, corsOptions);
  };
  app.use(cors(corsOptionsDelegate));
};

export default corsConfig;
