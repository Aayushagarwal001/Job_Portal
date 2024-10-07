import { catchAsyncErrors } from "../Middleware/CatchAsyncError.js";
import ErrorHandler from "../Middleware/ErrorMiddleware.js";
import { Job } from "../Models/JobSchema.js";

export const postJob = catchAsyncErrors(async (req, res, next) => {
    const { 
        title,
        companyName,
        jobType,
        location,    
        description,
        responsibilities,
        qualifications,
        // experience,
        // skillsRequired,
        offers,
        salary,
        vacancies,
        companyWebsiteTitle,
        companyWebsiteUrl,
        jobCategory
    } = req.body;

    // Validate required fields
    if (
        !title ||
        !companyName ||
        !jobType ||
        !location ||    
        !description ||
        !responsibilities ||
        !qualifications ||
        // !experience ||
        // !skillsRequired ||
        !salary ||
        !jobCategory
    ) {
        return next(new ErrorHandler("All fields are required", 400));
    }

    // Ensure website title and URL are both provided or both missing
    if ((companyWebsiteTitle && !companyWebsiteUrl) || (!companyWebsiteTitle && companyWebsiteUrl)) {
        return next(new ErrorHandler("Company website title and URL must be provided together", 400));
    }

    // Check if the job with the same title, company, job type, and location already exists
    const existingJob = await Job.findOne({
        title,
        companyName,
        jobType,
        location
    });

    if (existingJob) {
        return next(new ErrorHandler("This job has already been posted.", 400));
    }

    // Proceed to create the new job
    const postedBy = req.user._id;
    const job = await Job.create({
        title,
        companyName,
        jobType,
        location,    
        description,
        responsibilities,
        qualifications,
        // experience,
        // skillsRequired,
        salary,
        vacancies,
        companyWebsite: {
            title: companyWebsiteTitle,
            url: companyWebsiteUrl
        },
        jobCategory,
        offers,
        postedBy
    });

    res.status(201).json({
        success: true,
        message: "Job posted successfully.",
        job
    });
});

export const getAllJobs = catchAsyncErrors(async(req, res, next)=>{
    const {city, category, searchKeyword} = req.query;
    const query = {};

    if(city){
        query.location = { $regex: city, $options: 'i' };
    }
    if(category){
        query.jobCategory = { $regex: category, $options: 'i' };
    }
    if(searchKeyword){
        query.$or = [
            { title: {$regex: searchKeyword, $options: 'i'}},
            { companyName: {$regex: searchKeyword, $options: 'i'}},
            { description: {$regex: searchKeyword, $options: 'i'}}
        ];
    }

    const jobs = await Job.find(query)
       res.status(200).json({
        success: true,
        message: "Jobs fetched successfully.",
        jobs,
        count: jobs.length
    });
});

export const getMyJobs = catchAsyncErrors(async(req, res, next)=>{
    const myJobs = await Job.find({postedBy: req.user._id});
    res.status(200).json({
      success: true,
        message: "Jobs fetched successfully.",
        jobs: myJobs,
        count: myJobs.length
    });
});

export const deleteJob = catchAsyncErrors(async(req, res, next)=>{
    const { id } = req.params;
    const job = await Job.findById(id);
    
    if(!job){
        return next(new ErrorHandler("Oops!  Job not found.", 404));
    }
    await Job.deleteOne();
    res.status(200).json({
        success: true,
        message: "Job deleted successfully."
    });
});

export const getASingleJob = catchAsyncErrors(async(req, res, next)=>{
    const { id } = req.params;
    const job = await Job.findById(id);
    
    if(!job){
        return next(new ErrorHandler("Job not found.", 404));
    }
    res.status(200).json({
        success: true,
        job
    });
});

