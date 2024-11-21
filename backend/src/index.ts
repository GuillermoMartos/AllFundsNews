import mongoose from 'mongoose';
import { DB_URI, API_NEWS_TOKEN } from './constants';

async function run() {
  try {
    await mongoose.connect(DB_URI, {
      tls: true,
    });

    var url =
      'https://api.currentsapi.services/v1/search?' +
      'keywords=Amazon&language=en&' +
      'apiKey=' +
      API_NEWS_TOKEN;
    var req = new Request(url);
    await fetch(req).then(function (response) {
      console.log(response.json());
    });
    console.log('Conexión exitosa con la DB');
  } catch (error) {
    console.error('Error en conexión con DB', error);
    await mongoose.connection.close();
  } finally {
    console.log('Cerrando conexión con DB');
  }
}

run();
