const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.authenticate = (email, password) => {
  return new Promise( async (resolve, reject) => {
    try{
      // Get user by email
      const user = await User.findOne({email});
      // Match password
      bcrypt.compare(password, user.password, (err, isMatched) => {
        if(err) throw err;
        if(isMatched){
          resolve(user);
        }else{
          // Password didn't matched
          reject('Authentication failed');
        }
      });
    }catch(err){
      // Email not found
      reject('Authentication failed');
    }
  });
}
