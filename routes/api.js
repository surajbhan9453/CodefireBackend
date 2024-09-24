const api = require('express')();
const UserAttRouter=require('./usersAttendencesRoute')
const UserInfosRouter=require('./usersInfosRoute')




api.get("/", (req, res) => {
    res.send('Hello Node Server🌎 is Working Fine here...');
})



api.use('/userAttendances',UserAttRouter)

api.use('/users',UserInfosRouter)
// api.use('/login',userAuthRoute)

module.exports = api