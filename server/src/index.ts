import { app } from './app.js';
import { connectMongoDB } from './databases/mongo/connect.js';
import { PORT, MONGODB_URL } from './configs/app.config.js';
import process from 'process';
import { Server } from 'http';

async function startServer() {
  try {
    if (MONGODB_URL) {
      await connectMongoDB(MONGODB_URL);
    } else {
      console.error('MONGODB_URL not provided');
    }

    const server: Server = app.listen(PORT, () => {
      console.log(`Inex – app listening at port:${PORT}`);
    });

    process.on('SIGTERM', () => shutDown(server));
    process.on('SIGINT', () => shutDown(server));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

startServer().catch((err) => {
  console.error(err);
  process.exit(1);
});

function shutDown(server: Server) {
  console.log('Received kill signal, shutting down gracefully');

  server.close(() => {
    console.log('Closed out remaining connections');
    process.exit(0);
  });

  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
}
