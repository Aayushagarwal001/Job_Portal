import { catchAsyncErrors } from "../Middleware/CatchAsyncError.js";
import ErrorHandler from "../Middleware/ErrorMiddleware.js";
import { User } from "../Models/UserSchema.js";
import { v2 as cloudinary } from "cloudinary";
import { sendTokens } from "../Utils/jwtToken.js";


export const register = catchAsyncErrors(async(req, res, next) => {
    try {
        const { name,
                email, 
                phone, 
                address, 
                password, 
                role, 
                firstField, 
                secondField, 
                thirdField, 
                coverLetter,
                gender 
        } = req.body;

        if( !name || !email || !phone || !address || !password || !role || !gender ) {
            return next(new ErrorHandler("All fields are required.", 400));
        }

        if (role === "Job Seeker" && (!firstField || !secondField || !thirdField)) {
            return next(new ErrorHandler("Please provide your preferred Job fields", 400));
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(new ErrorHandler("User already exists with this email", 400));
        }

        // Create a new user
        const userData = {
            name,
            email,
            phone,
            address,
            password, // Make sure to hash the password before saving
            role,
            gender,
            Fields: {
                firstField,
                secondField,
                thirdField,
            },
            coverLetter
        };

        if(req.files && req.files.resume){
            const { resume } = req.files;
            if(resume){
                try{
                    const cloudinaryResponse = await cloudinary.uploader.upload(
                        resume.tempFilePath,
                        { folder: "Job_Seekers_Resume" }
                      );
                      if (!cloudinaryResponse || cloudinaryResponse.error) {
                        return next(
                          new ErrorHandler("Failed to upload resume to cloud.", 500)
                        );
                      }
                      userData.resume = {
                        public_id: cloudinaryResponse.public_id,
                        url: cloudinaryResponse.secure_url,
                    };
                    } catch (error) {
                      return next(new ErrorHandler("Failed to upload resume", 500));
                    }  
            }
        }  

        const user = await User.create(userData);
        sendTokens(user, 201, res, "User registered successfully")


        } catch (error){
            next(error);
        }
});

export const login = catchAsyncErrors(async(req, res, next) => {
    console.log(req.body);
    const {role, email, password} = req.body;
    if(!role || !email || !password){
        return next(
            new ErrorHandler("All fields are required.", 400)
        );
    }

    const user = await User.findOne({ email }).select("+password");
    if(!user ||!(await user.comparePassword(password))){
        return next(
            new ErrorHandler("Invalid email or password.", 400)
        );
    } 

    if(user.role !== role){
        return next(
            new ErrorHandler("Role mismatch.", 400)
        );
    }

    sendTokens(user, 200, res, "User logged in successfully");
});


export const logout = catchAsyncErrors(async(req, res, next) => {
    res.status(200).cookie("Token", "", {
        expires : new Date(Date.now()),
        httpOnly: true,
        secure: true,
        sameSite: "None"
    }).json({
        success: true,
        message: "User logged out successfully.",
    })
});

export const getUser = catchAsyncErrors(async(req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
});

export const updateProfile = catchAsyncErrors(async(req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        coverLetter: req.body.coverLetter,
        gender: req.body.gender,
        Fields: {
          firstField: req.body.firstField,
          secondField: req.body.secondField,
          thirdField: req.body.thirdField,
        }
      }

      const {firstField, secondField, thirdField} = newUserData.Fields;

      if(req.user.role === "Job Seeker" && (!firstField && !secondField && !thirdField)) {
            return next(new ErrorHandler("Please provide your preferred Job Fields.", 400));
      }

      if(req.files){
        const resume = req.files.resume;

        if(resume){
            const currentResumeId = req.user.resume.public_id;

            if(currentResumeId){
                await cloudinary.uploader.destroy(currentResumeId);
            }

            const newResume = await cloudinary.uploader.upload(resume.tempFilePath, {
                folder: "Job_Seekers_Resume"
            });

            newUserData.resume = {
                public_id: newResume.public_id,
                url: newResume.secure_url
            };
        }
      }


      const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });

      res.status(200).json({
        success: true,
        message: "User profile updated successfully.",
        user,
      });


});

export const updatePassword = catchAsyncErrors(async(req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatch = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatch){
        return next(new ErrorHandler("Incorrect old password.", 400));
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("New password & Confirm password do not matched."), 400);
    }

    user.password = req.body.newPassword;
    await user.save();
    sendTokens(user, 200, res, "Password updated successfully");
});
