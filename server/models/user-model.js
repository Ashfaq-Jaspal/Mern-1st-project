import mongoose from 'mongoose';
import { MONGO_URI } from '../config/index.js';
const { Schema, model } = mongoose;

// Create database
mongoose.connect(MONGO_URI);

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
