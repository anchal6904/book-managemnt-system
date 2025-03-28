const {userModel,bookModel}=require('../data/models/index.js');
const IssuedBook=require('../dtos/bookDtos.js');

exports.getAllBooks=async(req,res)=>{
    const book=await bookModel.find();
    if(book.length===0){
        return res.status(404).json({
            success:false,
            message:"No books found"
        })
    }
    res.status(200).json({
        success:true,
        message:"Books found",
        book
    })
}
exports.getSingleBook=async(req,res)=>{
    const {id}=req.params;
    const book=await bookModel.findById(id);

    if(!book){
        return res.status(404).json({
            success:false,
            message:"Book not found"
        })
    }
    return res.status(200).json({
        success:true,
        message:"Book found",
        book
    })
}
exports.getIssuedBooks=async(req,res)=>{
    const users=await userModel.find({
        issuedBook:{$exists:true}
    }).populate('issuedBook');

    const issuedBooks=users.map((each)=>new IssuedBook(each));

    if(issuedBooks.length===0){
        res.status(404).json({
            success:false,
            message:"No books issued"
        })
    }
    else{
        res.status(200).json({
            success:true,
            message:"Books are issued",
            issuedBooks
        })
    }
}
exports.addNewBook=async(req,res)=>{
    const {data}=req.body;
    if(!data){
        res.status(404).json({
            success:false,
            message:"Data not found"
        })
    }
    await bookModel.create(data);//add data to the database
    const allbooks=await bookModel.find();
    res.status(200).json({
        success:true,
        message:"Book added successfully",
        allbooks
    })
}

exports.updateBookById=async(req,res)=>{
    const {id}=req.params;
    const {data}=req.body;
    
    const updatedBook=await bookModel.findOneAndUpdate({_id:id},data,{
        new:true
    });
    return res.status(200).json({
        success:true,
        message:"Book updated successfully",
        updatedBook
    })
}