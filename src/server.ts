import mongoose from "mongoose";
import config from "./config/index";
import app from "./app";


async function mongoDBconnect() {
  try {
        await mongoose.connect(config.database_url as string);
        console.log(`😂 database is connected successfully`);

        app.listen(config.port, () => {
            console.log(`Application listening on port ${config.port}`)
          })
  } catch (error) {
        console.log(`😥 failed to connect database`, error);
  }
};

mongoDBconnect()
