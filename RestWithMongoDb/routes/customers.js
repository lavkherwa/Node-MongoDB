const errors = require('restify-errors');
const Customer = require('../models/customer');


module.exports = server => {
// GET customers endpoint
server.get('/customers', async (req, res, next) => {
  try{
    const customers = await Customer.find({});
    res.send(customers);
    next(); // with restify we have to call this [Don't forget]
  }catch(err){
    return next(new errors.InvalidContentError(err));
  }
 });

 // GET single customer
 server.get('/customers/:id', async (req, res, next) => {
   try{
     const customer = await Customer.findById(req.params.id);
     res.send(customer);
     next(); // with restify we have to call this [Don't forget]
   }catch(err){
     return next(
       new errors.ResourceNotFoundError(`There is no customer with id of ${req.params.id}`)
     );
   }
  });

 // POST Customers
 server.post('/customers', async (req, res, next) => {
   // Check for json
   if(!req.is('application/json')){
     return next(new errors.InvalidContentError("Expects, 'application/json'"));
   }

   const{name, email, balance} = req.body;

   const customer = new Customer({
     name: name,
     email: email,
     balance: balance
   });

   try{
     const newCustomer = await customer.save();
     res.send(201);
     next();
   }catch(err){
     return next(new errors.InternalError(err.message));
   }
 });

 // Update a customer
 server.put('/customers/:id', async (req, res, next) => {
   // Check for json
   if(!req.is('application/json')){
     return next(new errors.InvalidContentError("Expects, 'application/json'"));
   }

   try{
     const customer = await Customer.findOneAndUpdate({_id:req.params.id}, req.body);
     res.send(200);
     next();
   }catch(err){
     return next(
       new errors.ResourceNotFoundError(`There is no customer with id of ${req.params.id}`)
     );
   }
 });

 // Delete customer
 server.del('/customers/:id', async(req, res, next) => {
   try{
     const customer = await Customer.findOneAndRemove({_id:req.params.id});
     res.send(204);
   }catch(err){
     return next(
       new errors.ResourceNotFoundError(`There is no customer with id of ${req.params.id}`)
     );
   }
 })
};
