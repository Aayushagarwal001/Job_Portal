import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify"
import { clearAllJobErrors, fetchJobs } from '../store/Slices/JobSlice';
import Spinner from '../components/Spinner';
import { FaSearch } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Jobs = () => {

    const [city, setCity] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [category, setcategory] = useState("");
    const [selectedcategory, setSelectedcategory] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");

    const {jobs, loading, error } = useSelector((state) => state.jobs);

    const handleCityChange = (city) => {
        setCity(city);
        setSelectedCity(city);
    }
    const handleFieldChange = (category) => {
        setcategory(category);
        setSelectedcategory(category);
    }

    const dispatch = useDispatch();
    useEffect(() => {
        if(error){
            toast.error(error);
            dispatch(clearAllJobErrors());
        }
        dispatch(fetchJobs(city, category, searchKeyword));
    }, [dispatch, error, city, category]);

    const handleSearch = () => {
        // dispatch(fetchJobs(selectedCity, selectedcategory, searchKeyword));
        dispatch(fetchJobs(city, category, searchKeyword));
    };
    const cities = [
        "Bangalore",
        "Mumbai",
        "Delhi",
        "Hyderabad",
        "Chennai",
        "Pune",
        "Gurgaon",
        "Noida",
        "Ahmedabad",
        "Kolkata",
        "Jaipur",
        "Chandigarh",
        "Indore",
        "Coimbatore",
        "Thiruvananthapuram",
        "Surat",
        "Nagpur",
        "Vadodara",
        "Visakhapatnam",
        "Lucknow"
      ];
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
        <>
           {
            loading ? (
                <Spinner/>
            ) : (
                <section className='jobs'>
                    <div className="search-tab-wrapper">
                        <input 
                            type="text" 
                            value={searchKeyword} 
                            placeholder="Search Jobs..." 
                            onChange={(e) => setSearchKeyword(e.target.value)} 
                        />
                        <button onClick={handleSearch}>Find Jobs</button>
                        <FaSearch/>
                    </div>
                    <div className="wrapper">
                        <div className="filter-bar">
                            <div className="cities">
                                <h2>Filter Job By City</h2>
                                {cities.map((city, index) => (
                                    <div key = {index}>
                                        <input
                                            type = "radio"
                                            id = {city}
                                            name = "city"
                                            value = {city}
                                            checked = {selectedCity === city}
                                            onChange = {() => handleCityChange(city)}
                                        />
                                        <label htmlFor={city}>{city}</label>
                                    </div>
                                ))}
                            </div>
                            <div className="cities">
                                <h2>Filter Job By Field</h2>
                                {jobcategory.map((field, index) => (
                                    <div key = {index}>
                                        <input
                                            type = "radio"
                                            id = {field}
                                            name = "field"
                                            value = {field}
                                            checked = {selectedcategory === field}
                                            onChange = {() => handleFieldChange(field)}
                                        />
                                        <label htmlFor={field}>{field}</label>
                                    </div>
                                ))}
                            </div> 
                        </div> 
                        <div className="container">
                            <div className="mobile-filter">
                                <select value={city} onChange={(e) => setCity(e.target.value)}>
                                    <option value=" ">Filter By City</option>
                                    {
                                        cities.map((city, index) => (
                                            <option key={index} value={city}>
                                                {city}
                                            </option>
                                        ))
                                    }
                                </select>
                                <select value={category} onChange={(e) => setcategory(e.target.value)}>
                                    <option value=" ">Filter By Field</option>
                                    {
                                        jobcategory.map((category, index) => (
                                            <option key={index} value={category}>
                                                {category}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="jobs_container">
                                {
                                  jobs && jobs.map(element => {
                                    return (
                                        <div className="card" key={element._id}> 
                                            {element.vacancies >= 5 ? (
                                                <p className="hiring-multiple">
                                                    Multiple Vacancies 
                                                </p>
                                            ) : (
                                                 <p className="hiring">
                                                     Limited Vacancy
                                                 </p>
                                            )}
                                            <p className="title">{element.title}</p>
                                            <p className="company">{element.companyName}</p>
                                            <p className="location">{element.location}</p>
                                            <p className="salary"><span>Expected CTC : </span>Rs. {element.salary/100000} LPA</p>
                                            <p className="posted"><span>Posted On : </span>{element.jobPostedOn.substring(0,10)}</p>
                                            <div className="btn-wrapper">
                                                <Link className='btn' to={`/post/application/${element._id}`}>
                                                     Apply Now
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                  })                                    
                                }

                            </div>
                        </div>

                    </div>

                </section>
            )
           }
        </>
    )
}

export default Jobs;