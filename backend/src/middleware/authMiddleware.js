import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const token = req.header('x-auth-token');

    console.log("--------------------------------")
    console.log("Token: ", token)
    console.log("Secret: ", process.env.JWT_SECRET)

    if(!token)
        return res.status(401).json({message: "No token, authorization denied"});

    try{
        const decoded = (jwt.verify(token, process.env.JWT_SECRET));

        req.user=decoded.user;
        next();
    }catch(error){
        console.log(error);
        res.status(401).json({message: "Token is not valid"});
    }
}

export default authMiddleware;