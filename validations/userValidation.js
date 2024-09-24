const Joi=require('joi');
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const userValidation=Joi.object({
    

    name:Joi.string().regex(/^[a-zA-Z ]+$/i).required().messages({
        'string.name': 'Invalid Name',
        'string.empty': 'Name is Required',
    }),
    address:Joi.string().min(5).max(50).required().messages({
        'string.address':'Invalid Address detail',
        'string.empty':'adress is Empty'
    }),
    phoneNumber:Joi.string().regex(/^[0-9]{10}$/).required().messages({
        'string.pattern.base' : 'Phone number must have 10 digits.'
    }),
  
    email: Joi.string().email().required().messages({
        'string.email': 'Invalid Email',
        'string.empty': 'Email Required',
      }),
    password: Joi.string().min(8).regex(passwordRegex).required().messages({
        'string.empty': 'Password Required',
        'string.min': 'Password must be 8 digit',
        'string.pattern.base': 'PASSWORD_ALPHANUMERIC_VALIDATION'
      }),
    
})







module.exports={
    userValidation


};