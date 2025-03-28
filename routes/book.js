const express=require('express');
const router=express.Router();


const {getAllBooks,getSingleBook,addNewBook,getIssuedBooks,updateBookById}=require('../controllers/bookController.js')

// router.get('/',(req,res)=>{
//     res.status(200).json({
//         success:true,
//         message:"Got all the books",
//         books
//     })
// })

router.get('/',getAllBooks);

router.get('/:id',getSingleBook);

router.get('/issued/byuser',getIssuedBooks);

router.post('/',addNewBook);

router.put('/:id',updateBookById);

module.exports=router;