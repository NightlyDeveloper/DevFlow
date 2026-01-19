import Activity from "../models/Activity.js";

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
        res.status(500).send("Server Error: ", error);
        console.error(error);
    }
}

export const getMyStats = async (req, res) => {
  try {
    const activities = await Activity.find({ user: req.user.id }).sort({ timestamp: -1 }).limit(50);
    res.json(activities);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};