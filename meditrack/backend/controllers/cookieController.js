const cookieController = {
    setCookie (req, res, next) {
        console.log('received user data:' , res.locals.user)
        res.cookie('_id', res.locals.user._id)
        console.log('Cookies: ', res._headers["set-cookie"]);
        return next();
    },
    setDoctorCookie (req,res,next){
        console.log('received doctor data',res.locals.doctor)
        res.cookie('_id', res.locals.doctor._id)
        res.cookie('doctor',true)
        // res.cookie({'_id': res.locals.doctor._id, 'doctor':true})
        console.log('Cookies: ', res._headers["set-cookie"])
        return next();
    }


}



module.exports = { cookieController };