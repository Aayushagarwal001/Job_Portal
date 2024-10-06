import React, { useState } from 'react';
import {useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import {
  clearAllApplicationErrors,
  postApplication,
  resetApplicationSlice,
} from "../store/Slices/ApplicationSlice";
import { fetchSingleJob } from '../store/Slices/JobSlice';
import { toast } from 'react-toastify';


const PostApplication = () => {
    const { singleJob } = useSelector((state) => state.jobs);
    const { isAuthenticated, user} = useSelector((state) => state.user);
    const { loading, error, message } = useSelector((state) => state.applications);

    const { jobId } = useParams();

    const [name, setName] = useState(user && user.name);
    const [email, setEmail] = useState(user && user.email);
    const [phone, setPhone] = useState(user && user.phone);
    const [address, setAddress] = useState(user && user.address);
    const [coverLetter, setCoverLetter] = useState(user && user.coverLetter);
    const [resume, setResume] = useState(user && user.resume && user.resume.url);

    const navigateTo = useNavigate();
    const dispatch = useDispatch();

    const handlePostApplication = (e) => {
        e.preventDefault();
        const formData = new FormData();
        // formData.append("jobId", jobId);
        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("address", address);
        formData.append("coverLetter", coverLetter);
        if(resume){
            formData.append("resume", resume);
        }
        dispatch(postApplication(formData, jobId));
    };

    useEffect(() => {
        if(error){
            toast.error(error);
            dispatch(clearAllApplicationErrors());
        }
        if(message){
            toast.success(message);
            dispatch(resetApplicationSlice());
        }
        if((user && user.role === 'Employer') || !isAuthenticated){
            navigateTo('/');
        }
        dispatch(fetchSingleJob(jobId));
    }, [dispatch, error, message, jobId]);

    let qualifications = [];
    let responsibilities = [];
    let offering = [];

    if (singleJob.qualifications) {
      qualifications = singleJob.qualifications.split(". ");
    }
    if (singleJob.responsibilities) {
      responsibilities = singleJob.responsibilities.split(". ");
    }
    if (singleJob.offers) {
      offering = singleJob.offers.split(". ");
    }

    const resumeHandler = (e) => {
        const file = e.target.files[0];
        setResume(file);
    };

    return (
        <>
        </>
    )
}

export default PostApplication;