import User from "../models/User.js"
import Team from "../models/Team.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import axios from "axios"

export const registerUser = async (req, res) => {
    const { name, email, password, team:teamName } = req.body;

    try{
        let user = await User.findOne({ email })
        if(user){
            return res.status(400).json({ message: "User already exists" })
        }

        let team = await Team.findOne({ name: teamName })
        if(!team){
            team = await Team.create({ name: teamName })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            name,
            email,
            password: hashedPassword,
            team: team._id,
            role: 'developer'
        });

        await user.save();

        const payload = {user: {id: user.id, role: user.role}};
        jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '5d'}, (error, token)=>{
            if(error) throw error;
            res.json({
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    role: user.role,
                    team: team.name
                }
            })
        })
    }catch(error){
        console.log(error)
    }
}

export const loginUser = async(req, res) => {
    const { email, password } = req.body;

    try{
        const user = await User.findOne({ email})
        if(!user){
            return res.status(400).json({message: "User does not exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials"})
        }

        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '5d'}, (error, token)=>{
            if(error) throw error;
            res.json({
                token, 
                user: {
                    id: user.id,
                    name: user.name,
                    role: user.role,
                    team: user.team
                }
            })
        })
    }catch(error){
        console.log("Error logging in: ", error)
        return res.status(500).json({message: "Server error"+error})
    }
}

export const connectGithub = async (req, res)=> {
    const { code } = req.body;

    try{
        const tokenResponse = await axios.post('https://github.com/login/oauth/access_token', {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code
        }, {
            headers: {Accept: 'application/json'}
        })

        const accessToken = tokenResponse.data.access_token;
        console.log(accessToken);
        if(!accessToken) return res.status(400).json({message: "Github login failed"});

        const userRes = await axios.get('https://api.github.com/user', {
            headers: {Authorization: `Bearer ${accessToken}`}
        })

        const user= await User.findOne({ _id: req.user.id });
        user.githubAccessToken = accessToken;
        user.githubUsername = userRes.data.login;
        await user.save();

        res.json(user);
    }catch(error){
        console.log(error);
        res.status(500).json({message: `Server error`});
    }
}