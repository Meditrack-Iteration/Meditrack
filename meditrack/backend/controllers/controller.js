const { Medication, Patient, User } = require('../models/models');

const loginController = {
  // Create a new user in the Database
  // Their information will be sent in the request body
  // This should send the created user
  async createUser(req, res, next) {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password)
      return res.status(400).json({ error: 'Did not receive first name and/or last name'});

      // const userExists = await User.findOne({ email })

      

      User.findOne({ email: email })
      .then((user)=>{
        if (user) {
          res.status(400)
          // throw new Error('User already exists')
          return next('User already exists');
        }
          // console.log("Result :", user);
      })
      // .catch((err)=>{
      //     console.log(err);
      // });


    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
    });

    newUser.save()
      .then(() => {
        res.status(200).json(newUser);
      })
      .catch((err) => {
        return res.status(400).json({error: 'failed to create new user   ' + err});
      });
  },

  // Get a user from the database and send it in the response
  // Their first name will be in the request parameter 'name'
  // This should send the found user

  async getUser(req, res, next) {
    const { email } = req.params;
    console.log(req.params)
    User.findOne({ email: email })
    .then((user) => {
      if  (!user)
        return res.status(400).json({ error: 'Error in userModel.getuser: Could not find user'});
      console.log("Successfully logged in!")
      res.send(user)
    })
    .catch((err) => {
      return next(err)
    })
  //     (err, User) => {
  //     console.log(User)
  //     if  (err || !User)
  //       return res.status(400).json({ error: 'Error in userModel.getuser: Could not find user'});
  //     res.status(200).json(User);
  //     console.log(User);
  //     return next();
  //   };
  }

//   // Get a user from the database and update the user
//   // The user's first name will be in the request parameter 'name'
//   // The user's new first name will be in the request body
//   async updateuser(req, res, next) {
//     const data = await  user.findOneAndUpdate({firstName: req.params.name}, {firstName: req.body.firstName});
//     if (data !== null) return next();
//     if (data === null) return next(400);
//   },

//   // Delete a user from the database
//   // The user's first name will be sent in the request parameter 'name'
//   // This should send a success status code
//   async deleteuser(req, res, next) {
//     const { name } = req.params;
//     const data = await user.deleteOne({ firstName: name}); // returns {deletedCount: 1}
//     if (data) return next();
//     if (!data) return next(400);
//   },
};

module.exports = { loginController };
