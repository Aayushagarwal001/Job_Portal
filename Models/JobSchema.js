import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: [50, "Title cannot exceed 50 characters."],
    },
    // companyLogo: {
    //     type: String,
    //     maxLength: [200, "Company logo URL cannot exceed 200 characters."],
    // },
    companyName: {
        type: String,
        required: true,
        maxLength: [50, "Company name cannot exceed 50 characters."],
    },
    companyWebsite: {
        title: String,
        url: String
    },
    location: {
        type: String,
        required: true,
        maxLength: [80, "Location cannot exceed 80 characters."],
    },
    jobType: {
        type: String,
        required: [true, "Job type is required."],
        enum: ["Full Time", "Part Time", "Contract"],
    },    
    description: {
        type: String,
    },
    jobCategory: {
        type: String,
        required: true,
    },
    // status: {
    //     type: String,
    //     enum: ["Active", "Closed", "On Hold"],
    //     default: "Active",
    // },    
    responsibilities: {
        type: [String],
        required: true,
    },
    qualifications: {
        type: [String],
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    vacancies: {
        type: Number,
        min: [0, "Vacancies cannot be negative."],
    },
    skillsRequired: {
        type: [String],
        required: true,
    },
    offers:{
        type: [String],
    },
    salary: {
        type: Number,
        required: true,
        min: [0, "Salary cannot be negative."],
    },
    newsLetterSent: {
        type: Boolean,
        default: false, 
    },
    jobPostedOn: {
        type: Date,
        default: Date.now,
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }, 
});

export const Job = mongoose.model("Job", jobSchema);