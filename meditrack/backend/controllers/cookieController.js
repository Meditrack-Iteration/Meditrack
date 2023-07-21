const cookieController = {
    setCookie (req, res, next) {
        console.log('received user data:' , res.locals.user)
        res.cookie('_id', res.locals.user._id)
        console.log('Cookies: ', res._headers["set-cookie"]);
        return next();
    }

}

module.exports = { cookieController };