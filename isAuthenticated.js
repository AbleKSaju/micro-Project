import jwt from 'jsonwebtoken'

export async function isAuthenticated(req,res,next){
    const token=req.headers['authorization'].split(" ")[1];
    console.log(token);
    jwt.verify(token,"secret",(err,user)=>{
        if(err) return res.json({message:err});
        else{
            req.user=user
            next()
        }
    })
}