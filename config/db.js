const mongoose=require('mongoose');

const connectDB=async()=>{
const conn=mongoose.connect(process.env.MONGO_URI);
console.log(`MongoDB connected: ${(await conn).connection.host}`)
};

module.exports=connectDB