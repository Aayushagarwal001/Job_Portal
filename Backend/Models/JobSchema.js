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
    },
    jobType: {
        type: String,
        required: [true, "Job type is required."],
        enum: ["Full-time", "Part-time", "Contract"],
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
    // experience: {
    //     type: String,
    //     required: true,
    // },
    vacancies: {
        type: Number,
        min: [0, "Vacancies cannot be negative."],
    },    
    // vacancies: {
    //     type: String,
    //     default: "No",
    //     enum: ["Yes", "No"],
    // },
    // skillsRequired: {
    //     type: [String],
    //     required: true,
    // },
    offers:{
        type: [String],
    },
    salary: {
        type: String,
        required: true,
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