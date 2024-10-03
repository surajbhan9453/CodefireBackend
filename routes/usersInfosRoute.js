const userController=require('../Controllers/userInfosController')
const userRouter=require('express').Router()
const apiValidator=require('../middleware/validatorMid')
const {userValidation}=require('../validations/userValidation')
const {userAuth}=require('../middleware/userAuthentication')

userRouter.get('/view/',userController.getallUsers)
// router.get('/users/findanother/:id',userController.findeanother)
userRouter.get('/view/:id',userController.getoneuser)

userRouter.get('/searchByName/',userController.usersByname)

userRouter.get('/usersAll/',userController.usersAll)

userRouter.post('/create',apiValidator(userValidation),userController.addUser)

userRouter.post('/login',userController.login)

userRouter.post('/logout',userController.logout)

userRouter.post('/selft-user',userAuth,userController.verifying)

userRouter.put('/update/:id',userController.updateUser)

userRouter.delete('/delete/:id',userController.deleteUser)
//roles
userRouter.post('/createrole',userController.assignRoleToUser)
userRouter.get('/readrole',userController.findRoleofusers)
userRouter.post('/createpermission',userController.assignPermissionToRole)
userRouter.get('/readpermissions',userController.findPermissontoroles)

//testing the routes
userRouter.get('/testing/:id/:name',userController.testing)


//Report Routers
userRouter.get('/report1',userController.userperday)
userRouter.get('/report2',userController.totalWorkingHr)
userRouter.get('/report3',userController.attNotExist)
userRouter.get('/report4',userController.maxDaysPresent)
userRouter.get('/avlAtt',userController.avlAtt)



module.exports=userRouter

