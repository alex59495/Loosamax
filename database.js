const mongoose = require('mongoose');
const keys = require('./config/keys');

// Connect DB
if(process.env.NODE_ENV !== 'test') {
  mongoose.connect(keys.mongoURI,  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
