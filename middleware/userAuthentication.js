// const jwt = require('jsonwebtoken')
// const db = require('../Models/index')
// const User = db.usersInfos

// const userAuth=(req,res,next)=>{


//     const token=req.cookies.jwt||req.header['authorization']?.split(' ')[1];
//     if(!token){
//         return res.status(400).json({msg:"Access denied "})
//     }
//    jwt.verify(token,process.env.JWT_KEY,(err,user)=>{
//     if(err){
//         return res.status(400).json({msg:"Invalid Token"});
//     }
//     req.user=User;
//     next();

//    });
// };
// module.exports={
//     userAuth
// }


const jwt = require('jsonwebtoken');
const db = require('../Models/index');
const User = db.usersInfos;

const userAuth = async (req, res, next) => {
 
  let token = req.headers?.['authorization']?.split(" ")[1];  
  
  if (!token) {
    return res.status(400).json({ msg: "Access denied. No token provided." });
  }

  try {
    
    const decoded = jwt.verify(token, process.env.JWT_KEY);


    const user = await User.findByPk(decoded.id);
    
    if (!user) {
      return res.status(400).json({ msg: "User not found." });
    }


    req.user = user;
    next();
  } catch (err) {
    return res.status(400).json({ msg: "Invalid Token." });
  }
};

module.exports = {
  userAuth
};
