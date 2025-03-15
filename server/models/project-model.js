import mongoose from "mongoose";
const {model, Schema} = mongoose

const projectSchema = new Schema({
name: {
    type: String,
    required: true,
},
description: {
    type: String,
    required: true,
},
startDate: {
    type: Date,
    required: true,
},
endDate: {
    type: Date,
    required: true,
},
employees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
}]
})

const Project = model('Project', projectSchema, 'projects')

export default Project