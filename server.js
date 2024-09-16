const express = require("express");
const cors=require('cors');

const app = express();
//Add cors if needed. 




//middleware 
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extend:true}))


//routers
const api=require('./routes/api.js')
app.use('/',api)


//testing api
app.get('/',(req,res)=>{
  res.json({message:'Hello  from Api'})
})

PORT=8081
app.listen(PORT,()=>{
  console.log(`Server is Runinng on ${PORT}`)
})



// parse requests of content-type - application/json



    
