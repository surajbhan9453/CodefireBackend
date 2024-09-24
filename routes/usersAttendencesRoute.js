const userController=require('../Controllers/userInfosController')
const userAttRouter=require('express').Router()


// router.get('/users/findanother/:id',userController.findeanother)

userAttRouter.get('/viewByUser/sd',userController.getallUsers_att)


userAttRouter.get('/search/:id',userController.getoneuser_att)


userAttRouter.get('/view/',userController.allAttendenceByName)

userAttRouter.get('/search/',userController.allAttendenceSearch)

userAttRouter.get('/searchByNameId/',userController.attByname)

userAttRouter.get('/filter/',userController.filterAtt)

userAttRouter.post('/create/:id',userController.addUser_att)

userAttRouter.put('/update/:id',userController.updateUser_att)

userAttRouter.delete('/delete/:id',userController.deleteUser_att)


//testing the routes
userAttRouter.get('/testing/:id/:name',userController.testing)

module.exports=userAttRouter

