const mongoose = require('mongoose');

const MONGODB_CONN_STR = 'mongodb+srv://dbuser:test123@cluster0-u1bu9.mongodb.net/day9?retryWrites=true&w=majority'

mongoose.connect(MONGODB_CONN_STR, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.on('error', function(err) {
  console.error('DB connection failed', err.stack);
  throw err;
});

connection.once('open', function() {
  console.log('DB Connected successfully!');
});
