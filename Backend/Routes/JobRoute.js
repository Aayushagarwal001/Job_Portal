import express from 'express';
import { isAuthenticated, isAuthorized } from "../Middleware/Auth.js";
import { postJob, getAllJobs, getMyJobs, deleteJob, getASingleJobs} from '../Controllers/JobController.js';


const router = express.Router();

router.post("/post", isAuthenticated, isAuthorized("Employer"), postJob);
router.get("/getall", getAllJobs);
router.get("/getmyjobs", isAuthenticated, isAuthorized("Employer"), getMyJobs);
router.delete("/delete/:id", isAuthenticated, isAuthorized("Employer"), deleteJob);
router.get("/get/:id", isAuthenticated, getASingleJobs);

export default router; 