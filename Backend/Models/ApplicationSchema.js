import mongoose from 'mongoose';
import validator from 'validator';

const applicationSchema = new mongoose.Schema({
    jobSeekerInfo:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        name:{
            type: String,
            required: true,
            maxLength: [30, "Name cannot exceed 30 characters."]
        },
        email:{
            type: String,
            required: true,
            validate: [validator.isEmail, "Please provide a valid email."]
        },
        phone:{
            type: Number,
            required: true,
            minLength: [10, "Phone number must contain at least 10 digits."]
        },
        address:{
            type: String,
            required: true,
            maxLength: [100, "Address cannot exceed 100 characters."]
        },
        resume:{
            public_id: String,
            url: String
        },
        coverLetter:{
            type: String,
            required: true,
        },
        role:{
            type: String,
            enum: ["Job Seeker"],
            required: true
        }

    },

    employerInfo:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        role:{
            type: String,
            enum: ["Employer"],
            required: true
        },
        // companyName:{
        //     type: String,
        //     required: true,
        //     maxLength: [50, "Company name cannot exceed 50 characters."]
        // },
        // companyDescription:{
        //     type: String,
        //     required: true,
        //     maxLength: [200, "Company description cannot exceed 200 characters."]
        // },
        // companyLogo:{
        //     public_id: String,
        //     url: String
        // },
        // companyWebsite:{
        //     title: String,
        //     url: String
        // },
        // companyLocation:{
        //     type: String,
        //     required: true,
        //     maxLength: [80, "Company location cannot exceed 80 characters."]
        // },
        // companySize:{
        //     type: String,
        //     enum: ["Small", "Medium", "Large"],
        //     required: true
        // }
    },

    jobInfo:{
        jobId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        jobTitle:{
            type: String,
            required: true,
            maxLength: [50, "Title cannot exceed 50 characters."]
        },
        // companyLogo:{
        //     type: String,
        //     maxLength: [200, "Company logo URL cannot exceed 200 characters."]
        // },
        // companyWebsite:{
        //     title: String,
        //     url: String
        // },
        // location:{
        //     type: String,
        //     required: true,
        //     maxLength: [80, "Location cannot exceed 80 characters."]
        // },
        // jobType:{
        //     type: String,
        //     required: [true, "Job type is required."],
        //     enum: ["Full Time", "Part Time", "Contract"]
        // },
        // description:{
        //     type: String,
        // }
    },

    deletedBy:{
        jobSeeker:{
            type: Boolean,
            default: false,
        },
        employer:{
            type: Boolean,
            default: false,
        },
    }, 
});

export const Application = mongoose.model("Application", applicationSchema);