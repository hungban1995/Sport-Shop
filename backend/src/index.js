import app from "./app.js";
import { socketIo } from "./socket.js";

//----------Defined port----------//
const port = process.env.PORT || 9000;
//----------App listen----------//
socketIo();

app.listen(port, () => {
  console.log(`App run at port: ${port}`);
});
