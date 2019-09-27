const errors = require('restify-errors');
const bcrypt = require ('bcryptjs');
const jwt = require('jsonwebtoken');
const User  = require('../models/user');
const auth = require('../auth');
const config = require('../config');


module.exports = server => {
  // register user
  server.post('/register', (req, res, next) => {
    const{ email, password } = req.body;

    const user = new User({
      email,
      password
    });

    // Encrypt the password before keeping it in DB
    // Obvious thing to do
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, async (err, hash) =>{
        // hash password
        user.password = hash;
        // save user now
        try{
          const newUser = await user.save();
          res.send(201);
          next();
        }catch(err){
          return next(new errors.InternalError(err.message));
        }
      });
    });
  });

  // Authenticate User
  server.post('/auth', async (req, res, next) => {
    const {email, password} = req.body;
    try{
      // Authenticate user
      const user = await auth.authenticate(email, password);

      // create a token and sign it with jwt
      const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
        expiresIn: '15m',
        header: {
          origin: "testApp"
        }
      });

      const {iat, exp} = jwt.decode(token);
      // return the token back
      res.send({issuedAt: iat, expiredIn: exp, token});
    }catch(err){
      // user un-authorized
      return next(new errors.UnauthorizedError(err));
    }
  });
};
