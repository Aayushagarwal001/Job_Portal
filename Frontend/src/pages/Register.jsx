import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearAllUserErrors, register } from "../store/Slices/UserSlice";
import { toast } from "react-toastify";
import { FaAddressBook, FaPencilAlt, FaRegUser } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdCategory, MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";

const Register = () => {
    const [role, setRole] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState(""); 
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [firstField, setFirstField] = useState("");
    const [secondField, setSecondField] = useState("");
    const [thirdField, setThirdField] = useState("");
    const [coverLetter, setCoverLetter] = useState("");
    const [resume, setResume] = useState("");

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

    const resumeHandler = (e) => {
        const file = e.target.files[0];
        setResume(file);
    }

    const {loading, isAuthenticated, error, message} = useSelector(state => state.user);

    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    
    const handleRegister = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("role", role);
        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("address", address);
        formData.append("password", password);
        formData.append("gender", gender);
        if(role === "Job Seeker") {
            formData.append("firstField", firstField);
            formData.append("secondField", secondField);
            formData.append("thirdField", thirdField);
            formData.append("coverLetter", coverLetter);
            formData.append("resume", resume);
        }
        dispatch(register(formData));
    };
  //   const handleRegister = (e) => {
  //     e.preventDefault();
  
  //     // Basic validation to check if all required fields are filled
  //     if (!role || !name || !email || !phone || !password || !address || !gender) {
  //         toast.error("All fields are required!", {
  //             position: "top-right"
  //         });
  //         return;
  //     }
  
  //     // Additional validation for Job Seeker role fields
  //     if (role === "Job Seeker" && (!firstField || !secondField || !thirdField || !coverLetter || !resume)) {
  //         toast.error("All Job Seeker fields are required!", {
  //             position: "top-right"
  //         });
  //         return;
  //     }
  
  //     // Create form data if all validations pass
  //     const formData = new FormData();
  //     formData.append("role", role);
  //     formData.append("name", name);
  //     formData.append("email", email);
  //     formData.append("phone", phone);
  //     formData.append("address", address);
  //     formData.append("password", password);
  //     formData.append("gender", gender);
  
  //     if (role === "Job Seeker") {
  //         formData.append("firstField", firstField);
  //         formData.append("secondField", secondField);
  //         formData.append("thirdField", thirdField);
  //         formData.append("coverLetter", coverLetter);
  //         formData.append("resume", resume);
  //     }
  
  //     dispatch(register(formData));
  // };
  
    useEffect(() => {
        if(error){
           toast.error(error);
           dispatch(clearAllUserErrors()); 
        }
        if(isAuthenticated){
            navigateTo("/");
        }
    }, [dispatch, error, loading, isAuthenticated, message]);
    
    return (
        <>
          <section className="authPage">
            <div className="container">
              <div className="header">
                <h3>Create a new account</h3>
              </div>
              <form onSubmit={handleRegister}>
                <div className="wrapper">
                  <div className="inputTag">
                    <label>Register As</label>
                    <div>
                      <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="">Select Role</option>
                        <option value="Employer">Register as an Employer</option>
                        <option value="Job Seeker">Register as a Job Seeker</option>
                      </select>
                      <FaRegUser />
                    </div>
                  </div>
                  <div className="inputTag">
                    <label>Name</label>
                    <div>
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <FaPencilAlt />
                    </div>
                  </div>
                </div>
                <div className="wrapper">
                  <div className="inputTag">
                    <label>Email Address</label>
                    <div>
                      <input
                        type="email"
                        placeholder="youremail@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <MdOutlineMailOutline />
                    </div>
                  </div>
                  <div className="inputTag">
                    <label>Phone Number</label>
                    <div>
                      <input
                        type="number"
                        placeholder="111-222-333"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      <FaPhoneFlip/>
                    </div>
                  </div>
                </div>
                <div className="wrapper">
                  <div className="inputTag">
                    <label>Address</label>
                    <div>
                      <input
                        type="text"
                        placeholder="Your Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                      <FaAddressBook />
                    </div>
                  </div>
                  <div className="inputTag">
                    <label>Password</label>
                    <div>
                      <input
                        type="password"
                        placeholder="Your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <RiLock2Fill />
                    </div>
                  </div>
                </div>
    
                {/* Gender Field */}
                <div className="wrapper">
                  <div className="inputTag">
                    <label>Gender</label>
                    <div>
                      <select value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
    
                {role === "Job Seeker" && (
                  <>
                    <div className="wrapper">
                      <div className="inputTag">
                        <label>Your First Field</label>
                        <div>
                          <select value={firstField} onChange={(e) => setFirstField(e.target.value)}>
                            <option value="">Your Field</option>
                            {jobcategory.map((Field, index) => (
                              <option key={index} value={Field}>
                                {Field}
                              </option>
                            ))}
                          </select>
                          <MdCategory />
                        </div>
                      </div>
                      <div className="inputTag">
                        <label>Your Second Field</label>
                        <div>
                        <select
                            value={secondField} onChange={(e) => setSecondField(e.target.value)}>
                            <option value="">Your Field</option>
                            {jobcategory.map((Field, index) => {
                            return (
                                <option key={index} value={Field}>
                                {Field}
                                </option>
                            );
                            })}
                        </select>
                        <MdCategory />
                        </div>
                    </div>
                    <div className="inputTag">
                        <label>Your Third Field</label>
                            <div>
                            <select
                                value={thirdField} onChange={(e) => setThirdField(e.target.value)}>
                                <option value="">Your Field</option>
                                {jobcategory.map((Field, index) => {
                                return (
                                    <option key={index} value={Field}>
                                    {Field}
                                    </option>
                                );
                                })}
                            </select>
                            <MdCategory />
                            </div>
                        </div>
                    </div>
                    <div className="wrapper">
                        <div className="inputTag">
                            <label>Coverletter</label>
                            <div>
                            <textarea
                                value={coverLetter}
                                onChange={(e) => setCoverLetter(e.target.value)}
                                rows={10}
                            />
                            </div>
                        </div>
                        </div>
                        <div className="wrapper">
                        <div className="inputTag">
                            <label>Resume</label>
                            <div>
                            <input
                                type="file"
                                onChange={resumeHandler}
                                style={{ border: "none" }}
                            />
                            </div>
                        </div>
                    </div>
                  </>
                )}
                <button type="submit" disabled={loading}>
                  Register
                </button>
                <Link to={"/login"}>Login Now</Link>
              </form>
            </div>
          </section>
        </>
      );
    };
    
export default Register;