const cookieController = {
    setCookie (req, res, next) {
        res.cookies._id = res.locals.newUser._id
    }

}

module.exports = { cookieController };