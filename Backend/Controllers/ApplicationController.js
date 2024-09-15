import { catchAsyncErrors } from "../Middleware/CatchAsyncError.js";
import ErrorHandler from "../Middleware/ErrorMiddleware.js";
import { Application } from "../Models/ApplicationSchema.js";
import { Job } from "../Models/JobSchema.js";
import {v2 as cloudinary} from "cloudinary";

export const postApplication = catchAsyncErrors(async(req, res, next)=>{
    const { id } = req.params;
    const { name, email, phone, address, coverLetter } = req.body; 

    if( !name || !email || !phone || !address || !coverLetter ){
        return next(new ErrorHandler("All fields are required.", 400));
    }

    const jobSeekerInfo = {
        id: req.user._id,
        name,
        email,
        phone,
        address,
        coverLetter,
        role: "Job Seeker",
    };

    const jobDetails = await Job.findById(id);
    if(!jobDetails){
        return next(new ErrorHandler("Job not found.", 404));
    }
    const isAlreadyApplied = await Application.findOne({
        "jobInfo.id": id,
        "jobSeekerInfo.id": req.user._id
    });
    if(isAlreadyApplied){
        return next(new ErrorHandler("You have already applied for this job.", 400));
    }
    if(req.files && req.files.resume){
        const resume = req.files.resume;
        try{
            const cloudinaryResponse = await cloudinary.uploader.upload(resume.tempFilePath,{
                folder: "Job_Seekers_Resume"
            });
            if (!cloudinaryResponse || cloudinaryResponse.error) {
                return next(new ErrorHandler("Failed to upload resume.", 500));
            };
             
            jobSeekerInfo.resume = {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url
            };
        } catch(error) {
            return next(new ErrorHandler("Failed to upload resume.", 500));
        } 
    }
    else{
        if(req.user && !req.user.resume.url){
            return next(new ErrorHandler("Please upload your resume before applying for this job.", 400));
        }
        jobSeekerInfo.resume = {
            public_id: req.user && req.user.resume.public_id,
            url: req.user && req.user.resume.url
        }
    }
    const employerInfo = {
        id: jobDetails.postedBy,
        role: "Employer",
    }
    const jobInfo = {
        jobId: id,
        jobTitle: jobDetails.title,
        location: jobDetails.location,
        // description: jobDetails.description,
        // postedBy: jobDetails.postedBy,
        // createdAt: jobDetails.createdAt, 
    }

    const application = await Application.create({
        jobSeekerInfo,
        employerInfo,
        jobInfo,
    });
    res.status(201).json({
        success: true,
        message: "Application submitted successfully.",
        application
    });
});
export const employerGetAllApplication = catchAsyncErrors(async(req, res, next)=>{
    const { _id } = req.user;
    const applications = await Application.find({
        "employerInfo.id": _id,
        "deletedBy.employer" : false,
    });
    res.status(200).json({
        success: true,
        message: "Applications fetched successfully.",
        applications,
    });
});

// export const employerAcceptApplication = catchAsyncErrors(async(req, res, next)=>{
//     const { id } = req.params;
//     const application = await Application.findByIdAndUpdate(id, {
//         $set: {
//             "deletedBy.employer": true,
//         },
//     }, { new: true });
//     if(!application){
//         return next(new ErrorHandler("Oops!  Application not found.", 404));
//     }
//     res.status(200).json({
//         success: true,
//         message: "Application accepted successfully.",
//         application
//     });
// });

export const jobSeekerGetAllApplication = catchAsyncErrors(async(req, res, next)=>{
    const { _id } = req.user;
    const applications = await Application.find({
        "jobSeekerInfo.id": _id,
        "deletedBy.jobSeeker" : false,
    });
    res.status(200).json({
        success: true,
        message: "Applications fetched successfully.",
        applications,
    });
});

export const deleteApplication = catchAsyncErrors(async(req, res, next)=>{
    const { id } = req.params;
    const application = await Application.findById(id);

    if(!application){
        return next(new Error("Application not found.", 404));
    }
    const { role} = req.user;
    switch(role){
        case "Job Seeker":
            application.deletedBy.jobSeeker = true;
            await application.save()
            break;
        case "Employer":
            application.deletedBy.employer = true;
            await application.save()
            break;
        default:
            return next(new ErrorHandler("Unauthorized to delete this application.", 403));
    }

    if(application.deletedBy.jobSeeker === true && application.deletedBy.employer === true){
        await application.deleteOne();
    }

    res.status(200).json({
        success: true,
        message: "Application deleted successfully."
    }); 
});