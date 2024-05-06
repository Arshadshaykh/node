const mongoose=require('mongoose');

const connectDB=async()=>{
const conn=mongoose.connect(process.env.MONGO_local_URI);
console.log(`MongoDB connected: ${(await conn).connection.host}`)
};

module.exports=connectDB