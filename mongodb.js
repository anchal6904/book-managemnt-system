const mongoose=require('mongoose');

function dbConnection(){
    const dburl=process.env.MONGO_URI;
    mongoose.connect(dburl,
        console.log("Connection established")
    );
}
const db=mongoose.connection;
db.on("error",console.error.bind(console,"Connection error"))
db.once("open",function(){
    console.log("Database Connected")
})
module.exports=dbConnection;