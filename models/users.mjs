// Import mongoose
import mongoose from 'mongoose';

// Define the user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tasks: [{
        id:{
            type:String,
            required:true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        priority: {
            type: String,
            required: true
        },
        dueDate: {
            type: Date,
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        }
    }]
});

// Remove the 'tasks' field requirement during registration
userSchema.path('tasks').required(false);

// Create a User model from the schema
const User = mongoose.model('User', userSchema);

// Export the User model
export default User;
