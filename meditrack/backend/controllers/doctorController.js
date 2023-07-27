const { Doctor } = require('../models/models');

const doctorController={};

doctorController.login= (req,res,next)=>{
    console.log('doctorController.login',req.body);
    const { email, password } = req.body;
    if (!email || !password) return next({err: 'incorrect credentials'});
    Doctor.findOne({ email: email, password: password })
    .then((doctor) => {
      console.log('this is doctor',doctor);
      if (!doctor) return next({ err: 'Error in doctormodel: Could not find user'});
      else {
        console.log("Successfully logged in!")
      res.locals.doctor = doctor;
      return next();
      }
    })
    .catch((err) => {
      return next({err: 'err occurred while logging in'});
    })
  
}
//handles doctor sign up
doctorController.signup=(req,res,next)=>{
    const{firstName, lastName, email, password}=req.body;
    const newDoctor=new Doctor({
        firstName,
        lastName,
        email,
        password
    })

    console.log('doctor signup fired', req.body);
    if (!firstName || !lastName || !email || !password)
      // return res.status(400).json({ error: 'Did not receive first name and/or last name'});
      return next({err : "Error ccreating a new doctor account, missing first name, last name, email, or password"}) //JB

      // const userExists = await User.findOne({ email })
      Doctor.findOne({ email: email})
      .then((doc)=>{
        if (doc) {
          // res.status(400)
          // throw new Error('User already exists')
          return next({err: 'doctor account already exists'});
        } })

      newDoctor.save()
        // User.create(newUser)
        .then((data) => {
            res.locals.doctor = data;
            console.log("this is our new doctor", data);
            return next();
              // res.status(200).json(newUser);
            })
        .catch((err) => {
              return {err: `failed to create new doctor, ${err}`};
            });
      // .catch((err)=>{
      //     console.log(err);
      // });
}

//handles finding a doctor
doctorController.getAllDoctors= async(req,res,next)=>{

  try{
    const doclist = await Doctor.find();
    // console.log(doclist);
    res.locals.doclist=doclist;
    return next();
  }
  catch(err){
    console.log('error finding doctor in doctorController.getAllDoctors');
    return next(err);
  }

}

doctorController.appointments=async(req,res,next)=>{
  console.log('logging req.body for appointments controller',req.body);
  try{
    const doctor=await Doctor.findOne({firstName: req.body.firstName});
    // console.log('logging doctor for appointments controller',doctor);
    
    const appointmentExists = await doctor.appointments.some(
      (appointment)=>{

        const appointmentTime = new Date(appointment.appointmentTime);
        const requestedAppointmentTime = new Date(req.body.appointments);
  
        // Compare the Date objects
        return appointmentTime.getTime() === requestedAppointmentTime.getTime();
      }
    );

    if (appointmentExists) {
      res.locals.available = false;
    } 
    if(!appointmentExists){
      doctor.appointments.push({
        patientName: req.body.patient,
        appointmentTime: req.body.appointments,
      });
      await doctor.save();
      res.locals.available = true;
      console.log('value of available',res.locals.available);
    }

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = { doctorController }