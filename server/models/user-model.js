import mongoose from 'mongoose';
import { DB_CONNECTION_STRING } from '../config/index.js';
const { Schema, model } = mongoose;

// Create database
mongoose.connect(DB_CONNECTION_STRING);

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
const User = new model('User', userSchema);

export default User;
