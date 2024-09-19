const userController=require('../Controllers/userInfosController')
const userRouter=require('express').Router()
const apiValidator=require('../middleware/validatorMid')
const {userValidation}=require('../validations/userValidation')

userRouter.get('/view/',userController.getallUsers)
// router.get('/users/findanother/:id',userController.findeanother)
userRouter.get('/view/:id',userController.getoneuser)

userRouter.get('/searchByName/',userController.usersByname)

userRouter.get('/usersAll/',userController.usersAll)

userRouter.post('/create',apiValidator(userValidation),userController.addUser)

userRouter.put('/update/:id',userController.updateUser)

userRouter.delete('/delete/:id',userController.deleteUser)


//testing the routes
userRouter.get('/testing/:id/:name',userController.testing)

//Report Routers
userRouter.get('/report1',userController.userperday)
userRouter.get('/report2',userController.totalWorkingHr)
userRouter.get('/report3',userController.attNotExist)
userRouter.get('/report4',userController.maxDaysPresent)

module.exports=userRouter

