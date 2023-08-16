import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config/envConfig';

process.on('uncaughtException', error => {
  console.log(error);
  process.exit(1);
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let server: Server;

async function mongoDBconnect() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log(`😂 database is connected successfully`);

    server = app.listen(config.port, () => {
      console.log(`👽 Application listening on port: ${config.port}`);
    });
  } catch (error) {
    console.log(`😥 failed to connect database`, error);
  }

}

mongoDBconnect();
