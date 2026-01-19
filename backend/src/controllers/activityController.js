export const logActivity = async (req, res)=> {
    try{
        const newActivity = new Activity({
            user: req.user.id,
            ...req.body
        });
        const savedActivity = await newActivity.save();
        console.log("Activity Logged", savedActivity.project)
        res.json(savedActivity)
    }catch(error){
        res.status(500).send("Server Error");
    }
}

export const getMyStats = async (req, res) => {
    try{
        const activities = await Activity.find({user: req.user.id});
        res.json(activities);
    }catch(error){
        res.status(500).send("Server Error");
    }
}