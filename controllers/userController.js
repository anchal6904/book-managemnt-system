const {userModel}=require('../data/models/index.js');

exports.getAllUsers=async(req,res)=>{
    const users=await userModel.find();
    if(users.length==0){
        return res.status(404).json({
            success:false,
            message:"No user found"
        })
    }
    return res.status(200).json({
        success:true,
        message:"Users information",
        users
    })
}

exports.getSingleUser=async(req,res)=>{
    const {id}=req.params;
    const user=await userModel.findById(id);

    if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }
    return res.status(200).json({
        success:true,
        message:"User found",
        user
    })
}

exports.deleteUser=async(req,res)=>{
    const {id}=req.params;
    const result=await userModel.deleteOne({_id:id});
    if(result.deletedCount===0){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }
    return res.status(200).json({
        success:true,
        message:"User deleted successfully",
    })
}

exports.updateUser=async(req,res)=>{
    const {id}=req.params;
    const {data}=req.body;
    const user=await userModel.findOneAndUpdate({_id:id},{$set:{...data}},{new:true});
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    return res.status(200).json({
        success:true,
        message:"User updated successfully",
        user
    })
}

exports.createUser=async(req,res)=>{
    const {data}=req.body;
    if(!data){
        res.status(404).json({
            success:false,
            message:"Data not found"
        })
    }
    await userModel.create(data);
    const users=await userModel.find();
    res.status(201).json({
        success:true,
        message:"User created successfully",
        users
    })
}

exports.subscriptionDetails=async(req,res)=>{
    const {id}=req.params;
    const user=await userModel.findById(id);
    if(!user){
        return res.status(404).json({
            success:false,
            message: "User not found"
        })
    }
    else{
        const getDateInDays=(data="")=>{
            let date;
            if(data===""){
                date=new Date();
            }
            else{
                date=new Date(data);
            }
            let days=Math.floor(date/(1000*60*60*24));
            return days;
        };
        const subscriptionType=(date)=>{
            if(user.subscriptionType==="Basic"){
                date=date+90;
            }
            else if(user.subscriptionType==="Standard"){
                date+=180;
            }
            else if(user.subscriptionType==="Premium"){
                date+=365;
            }
            return date;
        };
        const returnDate=getDateInDays(user.returnDate);
        const currentDate=getDateInDays();
        const subscriptionDate=getDateInDays(user.subscriptionDate);
        const subscriptionExpiration=subscriptionType(subscriptionDate);
        const data={
            ...user,
            subscriptionExpired:subscriptionExpiration<currentDate,
            daysLeftForSubscription:subscriptionExpiration<=currentDate?
            0:
            subscriptionExpiration-currentDate,
            fine:returnDate<currentDate?
            subscriptionExpiration<=currentDate?
            200:
            100:
            0,
        }
        return res.status(200).json({
            success:true,
            data
        })
    }
}
