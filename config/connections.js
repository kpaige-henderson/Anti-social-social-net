const mongoose = require('mongoose');
const connectionString = 'mongodb://127.0.0.1:27017/socialnetworkDB';

mongoose.connect('mongodb://127.0.0.1:27017/socialnetworkDB');

const db = async () => {
    try {
      await mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB Connected');
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  };

module.exports = db