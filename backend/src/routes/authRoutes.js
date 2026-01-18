import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router()

import { registerUser } from "../controllers/authController.js"
import { loginUser } from "../controllers/authController.js"
import User from "../models/User.js";

router.post('/register', registerUser)
router.post('/login', loginUser)

router.get('/me', authMiddleware, async (req, res)=>{
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch(err){
        console.log("Error message");
        res.status(500).send("Server Error");
    }
})


export default router;