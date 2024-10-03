const userRoles=require('../Controllers/userInfosController')
const rolesRouter=require('express').Router()

rolesRouter.get('/create',userRoles.assignRoleToUser)