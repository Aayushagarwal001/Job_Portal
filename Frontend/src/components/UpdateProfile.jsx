import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile, clearAllUpdateProfileErrors} from "../store/Slices/UpdateProfileSlice";
import { toast } from "react-toastify";
import { getUser } from "../store/Slices/UserSlice";

const UpdateProfile = () => {
  const { user } = useSelector((state) => state.user);
  const { loading, error, isUpdated } = useSelector((state) => state.updateProfile);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phone, setPhone] = useState(user && user.phone);
  const [address, setAddress] = useState(user && user.address);
  const [gender, setGender] = useState(user && user.gender);
  const [coverLetter, setCoverLetter] = useState(user && user.coverLetter);
  const [firstField, setFirstField] = useState(user && user.Fields?.firstField);
  const [secondField, setSecondField] = useState(user && user.Fields?.secondField);
  const [thirdField, setThirdField] = useState(user && user.Fields?.thirdField);
  const [resume, setResume] = useState(null);
  const [resumePreview, setResumePreview] = useState(user && user.resume?.url);


  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    if (user && user.role === "Job Seeker") {
      formData.append("firstField", firstField);
      formData.append("secondField", secondField);
      formData.append("thirdField", thirdField);
      formData.append("coverLetter", coverLetter);
    }
    if (resume) {
      formData.append("resume", resume);
    }
    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if(error){
        toast.error(error);
        dispatch(clearAllUpdateProfileErrors());
    }
    if(isUpdated){
        toast.success("Profile updated successfully!");
        dispatch(getUser());
        dispatch(clearAllUpdateProfileErrors());
    }
  }, [dispatch, loading, error, isUpdated, user]);

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setResumePreview(reader.result);
      setResume(file);
    };
  };

  const jobcategory = [
    'Web Development',
    'Data Analyst',
    'Graphic Design',
    'Digital Marketing',
    'Software Engineering',
    'Project Management',
    'Customer Support',
    'Content Writing',
    'Human Resources',
    'Cybersecurity',
    'Cloud Computing',
    'Data Science',
    'Artificial Intelligence',
    'UI/UX Design',
    'Sales',
    'Finance and Accounting',
    'Product Management',
    'Operations Management',
    'Mobile App Development',
    'Legal'
  ];

  return (
    <div className="account_components">
      <h3>Update Profile</h3>
      <div>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        </div>
        <div>
            <label>Phone Number</label>
            <input
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            />
        </div>
        <div>
            <label>Gender</label>
            <input
            type="string"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            />
        </div>
        <div>
            <label>Address</label>
            <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            />
        </div>

        {user && user.role === "Job Seeker" && (
        <>
          <div>
            <label>My Preferred Job Fields</label>
            <div
                style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              <select
                value={firstField}
                onChange={(e) => setFirstField(e.target.value)}
              >
                {jobcategory.map((element, index) => {
                  return (
                    <option value={element} key={index}>
                      {element}
                    </option>
                  );
                })}
              </select>
              <select
                value={secondField}
                onChange={(e) => setSecondField(e.target.value)}
              >
                {jobcategory.map((element, index) => {
                  return (
                    <option value={element} key={index}>
                      {element}
                    </option>
                  );
                })}
              </select>
              <select
                value={thirdField}
                onChange={(e) => setThirdField(e.target.value)}
              >
                {jobcategory.map((element, index) => {
                  return (
                    <option value={element} key={index}>
                      {element}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div>
            <label>Cover Letter</label>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows={10}
            />
          </div>
          <div>
            <label>Upload Resume</label>
            <input type="file" onChange={resumeHandler} />
            {user && user.resume && (
              <div>
                <p>Current Resume:</p>
                <Link
                  to={user.resume && user.resume.url}
                  target="_blank"
                  className="view-resume"
                >
                  View Resume
                </Link>
              </div>
            )}
          </div>
        </>
        )}
        <div className="save_change_btn_wrapper">
            <button
            className="btn"
            onClick={handleUpdateProfile}
            disabled={loading}
            >
            {" "}
            Save Changes
            </button>
        </div>
     </div>
  );
};

export default UpdateProfile;