const db = require('../Models')
const { Op } = require('sequelize');


// main models
const Users = db.usersInfos

// User Table
// main work
// adding user
const addUser = async (req, res) => {
  try {
    let info = {
      name: req.body.name,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
    }
    let existingUser = await Users.findOne({ where: { phoneNumber: info.phoneNumber } });
    if(existingUser){
      return res.status(500).send("This User's Phone Number is already exist")
     
    }
    const users = await Users.create(info)
    res.status(200).send(users)
    console.log(users)
  } catch (err) {
    console.error(err)
    res.status(500).send('Error occurred while adding user.')
  }
}

// getting all users
const getallUsers = async (req, res) => {
  
  try {
    let users = await Users.findAll({
      order:[
        ['id', 'DESC']
      ]
      
     
    })
    return res.status(200).send(users)
  } catch (err) {
    console.error(err)
    res.status(500).send('Error occurred while fetching all users.')
  }
}

// getting one user
const getoneuser = async (req, res) => {
  try {
    let id = req.params.id
    let oneuser = await Users.findOne({ where:{ id:id} })
    res.status(200).send(oneuser)
  } catch (err) {
    console.error(err)
    res.status(500).send('Error occurred while fetching the user.')
  }
}

//getting all users by name
const usersByname=async(req,res)=>{
  try{
    let name=req.params.name
    let users=await Users.findAll({where:{name:name}})
    res.status(200).send(users)
  }
  catch(err){
    es.status(500).send('Error occurred while fetching the user by id.')
  }
}

// updating users
const updateUser = async (req, res) => {
  try {
    let id = req.params.id
    let info={
      name:req.body.name,
      address: req.body.address,
        phoneNumber: req.body.phoneNumber

    }
    let existingUser= await Users.findOne({
      where:{phoneNumber:info.phoneNumber}
    })
    if(existingUser){
      return res.status(400).json({error:'Error code copyRef',message:'This Phone number is already in use'})
    }

    const users = await Users.update(info, { where: { id: id } })
    res.status(200).send(`Data is updated of id=${id}`)
  } catch (err) {
    console.error(err)
    res.status(500).send('Error occurred while updating user.')
  }
}

// deleting user
const deleteUser = async (req, res) => {
  try {
    let id = req.params.id
    const users = await Users.destroy({ where: { id: id } })
    res.status(200).send(`Deleted user id is ${id}`)
  } catch (err) {
    console.error(err)
    res.status(500).send('Error occurred while deleting user.')
  }
}

const findeanother = async (req, res) => {
  try {
    const [results, metadata] = await Sequelize.query(
      'SELECT * FROM usersInfos WHERE id = ?',
      {
        replacements: [id], // Prevents SQL injection by parameterizing the query
        type: Sequelize.QueryTypes.SELECT, // Optional: defines the query type
      }
    )
    res.status(200).send(results)
  } catch (err) {
    console.error(err)
    res.status(500).send('Error occurred while executing the query.')
  }
}

// User's Attendances
const User_attendence = db.userAttendences

// adding user attendance
const addUser_att = async (req, res) => {
  try {
    let id=req.params.id
    let info = {     
      user_id: req.params.id,
      date_only: req.body.date_only,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
    }
    
let existingAtt= await User_attendence.findOne({where:{
  [Op.and]:[{user_id:id},{date_only: info.date_only}]
}})

if(existingAtt){
  return res.status(400).json({ message: "Attendance is already Exist on that date of User." })
}
    const attendence = await User_attendence.create(info,{
      where:{user_id:id}
    })
    res.status(200).send(attendence)
    console.log(attendence)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Error occurred while adding user attendance." })
  }
}

//Testing Raw Queries

const { QueryTypes } = require('sequelize');
const usersAll =async(req,res)=>{

 users= await sequelize.query('SELECT * FROM `users`', {
  type: QueryTypes.SELECT,
})} ;




// getting all User_attendences
const getallUsers_att = async (req, res) => {
  try {
    let attendence = await User_attendence.findAll({})
    return res.status(200).send(attendence)
  } catch (err) {
    console.error(err)
    res.status(500).send('Error occurred while fetching all attendances.')
  }
}

// getting one User_attendences
const getoneuser_att = async (req, res) => {
  try {
    let id = req.params.id
    let attendence = await User_attendence.findOne({ where: { user_id: id } })
    res.status(200).send(attendence)
  } catch (err) {
    console.error(err)
    res.status(500).send('Error occurred while fetching attendance.')
  }
}

// updating User_attendences
const updateUser_att = async (req, res) => {
  try {
    let id = req.params.id
    const attendence = await User_attendence.update(req.body, { where: { id: id } })
    res.status(200).send(attendence)
  } catch (err) {
    console.error(err)
    res.status(500).json({message:'Error occurred while updating attendance.'})
  }
}

// deleting User_attendences
const deleteUser_att = async (req, res) => {
  try {
    let id = req.params.id
    const attendence = await User_attendence.destroy({ where: { id: id } })
    res.status(200).json({message:`Deleted attendance id is ${id}`})
  } catch (err) {
    console.error(err)
    res.status(500).json({message:'Error occurred while deleting attendance.'})
  }
}

// Relationship Association
//all user's name waise attendences 
const allAttendenceByName = async (req, res) => {
 
    try {
      
      const data = await User_attendence.findAll({
        include: [{
          model: Users,  
          as: "usersInfos",
          attributes: ['name'], 
          where: { name: { [Op.not]: null } } 
        }],
        attributes: ['id', 'user_id', 'date_only', 'start_time', 'end_time'],
        order:[
          ['date_only', 'DESC']
        ],
       
        
      });
      const transformedData = data.map(record => {
        const { usersInfos, ...attendence } = record.toJSON(); 
        return {
          ...attendence, name: usersInfos ? usersInfos.name : null  
          
        };
      });    
      res.status(200).json({message:transformedData});
    }
   catch (err) {
    console.error(err)
    res.status(500).json({message:'Error occurred while fetching attendance by user.'})
  }
}




//Get attendece by user name wise attendences
const getattenByuser = async (req, res) => {
  try {
    let id = req.params.id;
  
    // let options = {
    //   where : {
    //     id : id
    //   } ,
    //   attributes :["id" ,"name" , "address" , "phoneNumber"],
    //   include :[
    //     {
    //       association : "userAttendenceDetails" ,
    //       attributes : ["id" ,"user_id" ,"date_only"]
    //     }
    //   ]
    // }
    const data = await Users.findAll({
      attributes:["name"],
      include:[{
        model: Users,
      
        as:"userAttendences",
        
      }],
      
      
      where: {id:id}
    })
    res.status(200).json({message:data})
  } catch (err) {
    console.error(err)
    res.status(500).send('Error occurred while fetching attendance by user.')
  }
}




//testing controller
const testing=async(req,res)=>{
  let id=req.params.id;
  let names=req.params.name;
  try{
    const data= await Users.findAll({
       where:{
      [Op.and]:[{id:id,name:names}]
    }
  })
    res.status(200).json({message:data})

  }
  catch(err){
    res.status(500).json({message:"Error while testing"})

  }
}







//Report 1 user perday hrs.

const userperday=async(req,res)=>{
try{
  const data=await Users.findAll({
    include:{
      model:User_attendence,
      as: "UserAttendences",
      attributes:['date_only',[sequalize.fn(time_format(timediff(sequalize.col(end_time),sequalize.col(att.start_time)),"%h")),'Working_Hrs']]

    },
    attributes:['name'],
    order:[
      "name", "desc"
    ]

  })
  res.status(200).json({message:data})

}catch(err){
  res.status(500).json({message:err})
}
}




module.exports = {
  // users
  addUser,
  getallUsers,
  getoneuser,
  updateUser,
  deleteUser,
  findeanother,
  usersByname,

  // user's attendance
  addUser_att,
  getallUsers_att,
  getoneuser_att,
  updateUser_att,
  deleteUser_att,

  //Raw Queries Export
  usersAll,

  // 1 to many
  getattenByuser,
  allAttendenceByName,


  //Testing 
  testing,


  //Reports Routes
  userperday

}
