import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router()

import { registerUser } from "../controllers/authController.js"
import { loginUser } from "../controllers/authController.js"
import { connectGithub } from "../controllers/authController.js";
import User from "../models/User.js";
import Team from "../models/Team.js";
import { connect } from "mongoose";

router.post('/register', registerUser)
router.post('/login', loginUser)

router.get('/', authMiddleware, async (req, res)=>{ 
    try{
        const user = await User.findById(req.user.id).select('-password');
        const team = await Team.findById(user.team);
        res.json({user, team});
    }catch(err){
        console.log("Error message");
        res.status(500).send("Server Error");
    }
})

router.post('/github', authMiddleware, connectGithub);


export default router;