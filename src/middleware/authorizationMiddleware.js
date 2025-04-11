module.exports = function authorizationMiddleware(roles){
    return (req,res,next)=>{
        const role = req.user.role
        if(!roles.includes(role))
            return res.status(403).json('unauthorized access')
    
        next()
    }


}