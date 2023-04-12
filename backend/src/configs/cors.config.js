import cors from "cors";
const corsConfig = (app) => {
  const whitelist = [
    "http://sport-shop-client-three.vercel.app",
    "https://sport-shop-admin.vercel.app",
  ];

  const corsOptionsDelegate = function (req, callback) {
    let corsOptions;
    if (whitelist.indexOf(req.header("Origin")) !== -1) {
      corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
    } else {
      corsOptions = { origin: false }; // disable CORS for this request
    }
    callback(null, corsOptions); // callback expects two parameters: error and options
  };
  app.use(cors(corsOptionsDelegate));
};
export default corsConfig;
