const express=require("express");
const dotenv=require('dotenv');


const userRouter=require('./routes/user.js');
const bookRouter=require('./routes/book.js');
const dbConnection=require('./mongodb.js');
const {userModel,bookModel}=require('./data/models/index.js');

dotenv.config();
const app=express();
dbConnection();





const port=8081;
app.use(express.json());

app.use('/users',userRouter);
app.use('/books',bookRouter);

app.get('/',(req,res)=>{
    res.status(200).json({
        message:"Server is running",
        data:"hello"
    })
})







app.get('*',(req,res)=>{
    res.status(404).json({
        message:"No page found"
    })
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})