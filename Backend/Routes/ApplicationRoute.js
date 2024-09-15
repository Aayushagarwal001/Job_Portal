import express from 'express';
import { isAuthenticated, isAuthorized } from "../Middleware/Auth.js";
import {postApplication, employerGetAllApplication, jobSeekerGetAllApplication, deleteApplication} from "../Controllers/ApplicationController.js"

const router = express.Router();

router.post("/post/:id", isAuthenticated, isAuthorized("Job Seeker"), postApplication);
router.get("/employer/getall", isAuthenticated, isAuthorized("Employer"), employerGetAllApplication );
router.get("/jobseeker/getall", isAuthenticated, isAuthorized("Job Seeker"), jobSeekerGetAllApplication );
router.delete("/delete/:id", isAuthenticated, deleteApplication);


export default router; 