const Joi=require('joi');

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
    })
})







module.exports={
    userValidation


};