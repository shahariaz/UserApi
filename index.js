const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');

const login = require('./routers/login');

const app = express();
dotenv.config();
const { DB } = process.env;
const { PORT } = process.env;
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}
//MAKING SERVER CONFIG
app.listen(PORT || 5000, () => {
  console.log('Server listening ');
});

app.use('/api/login', login);

const connectDB = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Server connected');
  } catch (err) {
    console.log('Failes to connect to MOngoDb server', err);
  }
};

connectDB();
