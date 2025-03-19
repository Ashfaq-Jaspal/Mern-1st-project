import mongoose from 'mongoose';
import { MONGO_URI } from '../config/index.js';
const { Schema, model } = mongoose;
// const MONGO_URI = "mongodb+srv://AshfaqJaspal:Ashfaq%4032643264@employee-cluster.gn8ln.mongodb.net/Employee-management-app?retryWrites=true&w=majority&appName=Employee-Cluster";
mongoose
    .connect(MONGO_URI)

// Create Schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});

// Create Collection
const User = new model('User', userSchema, 'users');

export default User;
