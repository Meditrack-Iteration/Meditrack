const { User, Doctor } = require('../models/models');
const CLIENT_ID = "1f252291952872a24f19"
const CLIENT_SECRET = "069daa824402315e81c41ce4251aa18f86dea563"

const gitHubController = {

    async getAccessToken(req,res,next) {
        console.log("this is the query code", req.query.code);
        const params = "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code=" + req.query.code;
        await fetch("https://github.com/login/oauth/access_token" + params, {
          method: "POST",
          headers: {
            "Accept": "application/json"
          }
        }).then((response) => {
          return response.json();
        }).then((data)=>{
            res.locals.access = data
            console.log(data);
            return next();
        });

    },

    async setAccessCookie(req,res,next) {
        res.cookie("Authorization", "Bearer " + res.locals.access.access_token);
        // console.log(res.cookies["Authorization"])
        console.log('Cookies: ', res._headers["set-cookie"])
        return next()
    },

    async getUserData(req,res,next){
        console.log("before fetching user data")
            await fetch ("https://api.github.com/user", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + res.locals.access.access_token,
                    'X-GitHub-Api-Version': '2022-11-28'
                }
                }).then((response) =>{
                    return response.json();
                }).then((data) =>{
                    res.locals.gitUser = data
                    console.log(data);
                    return next();
                })

    }



}

module.exports = {gitHubController}