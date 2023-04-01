import httpServer from "./app.js";

//----------Defined port----------//
const port = process.env.PORT || 9000;

//----------App listen----------//

httpServer.listen(port, () => {
  console.log(`App run at port: ${port}`);
});
