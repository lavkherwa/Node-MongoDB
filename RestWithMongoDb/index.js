const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');
const rjwt = require('restify-jwt-community');

const server = restify.createServer();

// Middleware
server.use(restify.plugins.bodyParser());

// protect all routes except /auth
server.use(rjwt({
  secret: config.JWT_SECRET
}).unless({
  path: ['/auth']
})
);

// configure server to listen on port
server.listen(config.PORT, () => {
  // To avoid warning
  mongoose.set('useFindAndModify', false);
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
  require('./routes/users')(server);
  console.log(`server started on port ${config.PORT}`);
})
