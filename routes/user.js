const express=require('express');
const router=express.Router();

const {getAllUsers,getSingleUser, deleteUser,updateUser, subscriptionDetails,createUser} = require( '../controllers/userController.js');

router.get('/users',getAllUsers);

router.get('/users/:id',getSingleUser);

router.post('/users',createUser)

router.put('/users/:id',updateUser)

router.delete('/users/:id',deleteUser);

router.get('/users/subscription-details/:id',subscriptionDetails)

module.exports=router;
