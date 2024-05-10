import jwt from 'jsonwebtoken';
import User from '../models/users.mjs'; // Import the User model

// Controller for user registration
export const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({success:false, message: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({
      username,
      email,
      password,
    });

    // Save the user to the database
    await newUser.save();
console.log("success")
    res.status(201).json({success:true, message: 'User registered successfully' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const loginController = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        if(existingUser.password===password){
            const token = jwt.sign({ username: "teja" }, "secretkey", { expiresIn: '7d' });

        return res.send({success:true, message: 'Login Successfull!',jwt_token:token });
        }
        else{
            return res.send({success:false, message: 'Wrong Password' });
        }
      }
      else{
        return res.send({success:false, message: 'User not Exists'});
      }
    }
    catch(e){
        res.send({success:false,message:"Something went w"})
console.log(e)
    }
}

// add tasks



export const addController = async (req, res) => {
    try {
        const { mail, id, title, description, priority, dueDate, completed } = req.body;

        // Find the user by email
        const user = await User.findOne({ email: mail });

        if (!user) {
            return res.send({success:false, message: "User not found" });
        }

        // Create a new task object
        const newTask = {
            id,
            title,
            description,
            priority,
            dueDate,
            completed
        };

        // Add the new task to the user's tasks array
        user.tasks.push(newTask);

        // Save the updated user document
        await user.save();

        res.send({success:true ,message: "Task added successfully", task: newTask });
    } catch (error) {
        console.error("Error adding task:", error);
        res.send({success:false, message: "Internal server error" });
    }
};



//fetch controller


export const fetchController = async (req, res) => {
    try {
        const { mail } = req.body;

        // Find the user by email
        const user = await User.findOne({ email:mail });

        if (!user) {
            return res.send({ success:false,message: "User not found" });
        }

        // Extract tasks from the user document
        const tasks = user.tasks;
console.log(tasks)
        res.send({success:true,message:"fetched",tasks });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.send({success:false, message: "Internal server error" });
    }
};


//completedController

 export const completedController = async (req, res) => {
    try {
        const { mail, id } = req.body;

        // Find the user by email
        const user = await User.findOne({ email:mail });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find the task by ID
        const taskIndex = user.tasks.findIndex(task => task.id === id);

        if (taskIndex === -1) {
            return send({success:false, message: "Task not found" });
        }

        // Toggle the completed field of the task
        user.tasks[taskIndex].completed = !user.tasks[taskIndex].completed;

        // Save the updated user document
        await user.save();

        res.send({success:true, message: "Task completion status toggled successfully" });
    } catch (error) {
        console.error("Error toggling task completion status:", error);
        res.send({success:false, message: "Internal server error" });
    }
};



//deleteController


export const deleteController = async (req, res) => {
    try {
        const { mail, id } = req.body;

        // Find the user by email
        const user = await User.findOne({ email:mail });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find the index of the task to delete
        const taskIndex = user.tasks.findIndex(task => task.id === id);

        if (taskIndex === -1) {
            return res.send({success:false, message: "Task not found" });
        }

        // Remove the task from the tasks array
        user.tasks.splice(taskIndex, 1);

        // Save the updated user document
        await user.save();

        res.send({success:true, message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.send({success:false, message: "Internal server error" });
    }
};


//editController


export const editController = async (req, res) => {
    try {
       
        const { mail, id, title, description, priority, dueDate } = req.body;
        console.log(id)
        // Find the user by email
        const user = await User.findOne({ email:mail });

        if (!user) {
            return res.send({success:false, message: "User not found" });
        }

        // Find the task to edit
        const task = user.tasks.find(task => task.id === id);

        if (!task) {
            return res.send({success:false, message: "Task not found" });
        }

        // Update task fields
        if (title) task.title = title;
        if (description) task.description = description;
        if (priority) task.priority = priority;
        if (dueDate) task.dueDate = dueDate;
        

        // Save the updated user document
        await user.save();

        res.send({success:true, message: "Task updated successfully", updatedTask: task });
    } catch (error) {
        console.error("Error updating task:", error);
        res.send({success:false, message: "Internal server error" });
    }
};

