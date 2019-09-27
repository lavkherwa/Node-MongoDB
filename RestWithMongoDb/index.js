const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');

const server = restify.createServer();

// Middleware
server.use(restify.plugins.bodyParser());

// configure server to listen on port
server.listen(config.PORT, () => {
  // connect to our mongo db
  mongoose.connect(
    config.MONGODB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
});

// get the db connection in a variable
const db = mongoose.connection;

// check if any error occurs on db
db.on('error', (err) => console.log(err));

// create routes when db opens up [Happens only once]
db.once('open', () => {
  require('./routes/customers')(server);
  console.log(`server started on port ${config.PORT}`);
})
