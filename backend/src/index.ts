import mongoose from 'mongoose';
import { DB_URI } from './helpers/constants';
import express from 'express';
import router from './routes/index';

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(router);

async function run() {
  try {
    await mongoose.connect(DB_URI, {
      tls: true,
    });
    console.log('Conexión exitosa con la DB');
    app.listen(port, () => {
      console.log('Server escuchando en el puerto', port);
    });
  } catch (error) {
    console.error('Error en conexión con DB', error);
    await mongoose.connection.close();
  }
}

run();
