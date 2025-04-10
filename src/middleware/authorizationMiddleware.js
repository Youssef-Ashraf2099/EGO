
function adminauth(req, res, next){
   if(req.user.role=="System Admin"){
    next()
   }else{
    res.status(401).send("unauthorized")
   }
}

function organizerauth(req,res,next){
    if(req.user.role=="Organizer"){
        next()
    }else{
        res.status(401).send("unauthorized")
    }
}

module.exorts={
    organizerauth,
    adminauth
}