import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, "Name must contain at least 3 characters."],
    maxLength: [30, "Name cannot exceed 30 characters."], 
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure no duplicate emails
    validate: [validator.isEmail, "Please provide a valid email."],
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /\d{10}/.test(v); // Simple validation for 10-digit phone numbers
      },
      message: "Please provide a valid 10-digit phone number.",
    },
  },
  address: {
    type: String,
    required: true,
  },
  Fields: {
    firstField: String,
    secondField: String,
    thirdField: String,
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Other"], // Gender field with predefined options
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password must contain at least 8 characters."],
    maxLength: [32, "Password cannot exceed 32 characters."],
    select: false, // Ensures password is not returned by default
  },
  resume: {
    public_id: String,
    url: String,
  },
  coverLetter: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: ["Job Seeker", "Employer"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String, // For password reset functionality
  resetPasswordExpire: Date,  // Expiration time for reset token
});

userSchema.pre("save", async function(next){
  if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getJWTTOKEN = function(){
   return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
   });
}

export const User = mongoose.model("User", userSchema);
