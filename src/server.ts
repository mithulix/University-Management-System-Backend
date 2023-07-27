import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config/envConfig';
import { errorLogger, logger } from './shared/logger';

process.on('unhandledRejection', error => {
  errorLogger.error(error);
  process.exit(1);
});

let server: Server;

async function mongoDBconnect() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info(`😂 database is connected successfully`);

    server = app.listen(config.port, () => {
      logger.info(`Application listening on port ${config.port}`);
    });
  } catch (error) {
    errorLogger.error(`😥 failed to connect database`, error);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

mongoDBconnect();

process.on('SIGTERM', () => {
  logger.info('SIGTERM is Received');
  if (server) {
    server.close();
  }
});
