// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import {
//     FaSquareXTwitter,
//     FaSquareInstagram,
//     FaYoutube,
//     FaLinkedin,
//   } from "react-icons/fa6";

// const Footer = () => {
//     const { isAuthenticated } = useSelector((state) => state.user);
//     return (
//         <>
//         <footer>
//             <div>
//                 <img src="logo.png" alt="logo" />
//             </div>  
//             <div>
//                 <h4>Support</h4>
//                 <ul>
//                     <li>F-972, Second floor, Twin Tower, Mumbai, India</li>
//                     <li>quickhireteam@gmail.com</li>
//                     <li>7896541230</li>
//                 </ul>
//             </div>
//             <div>
//                 <h4>Quick Links</h4>
//                 <ul>
//                     <li><Link to="/">Home</Link></li>
//                     <li><Link to="/jobs">Jobs</Link></li>
//                     {isAuthenticated? (
//                         <li><Link to="/dashboard">Dashboard</Link></li>
//                     ) : (
//                         <li><Link to="/login">Login</Link></li>
//                     )}
//                 </ul>
//             </div>
//             <div>
//           <h4>Follow Us</h4>
//           <ul>
//           <li>
//               <Link to={"/"}>
//                 <span>
//                   <FaLinkedin />
//                 </span>
//                 <span>LinkedIn</span>
//               </Link>
//             </li>
//             <li>
//               <Link to={"/"}>
//                 <span>
//                   <FaSquareXTwitter />
//                 </span>
//                 <span>X</span>
//               </Link>
//             </li>
//             <li>
//               <Link to={"/"}>
//                 <span>
//                   <FaSquareInstagram />
//                 </span>
//                 <span>Instagram</span>
//               </Link>
//             </li>
//             <li>
//               <Link to={"/"}>
//                 <span>
//                   <FaYoutube />
//                 </span>
//                 <span>Youtube</span>
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </footer>
//       <div className="copyright">
//         &copy; CopyRight 2024. All Rights Reserved By Quick Hire
//       </div>
//     </>
//   );
// };

// export default Footer;

import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    FaSquareXTwitter,
    FaSquareInstagram,
    FaYoutube,
    FaLinkedin,
    FaPhone,
  } from "react-icons/fa6";
  import { MdOutlineMailOutline } from "react-icons/md";

const Footer = () => {
    const { isAuthenticated } = useSelector((state) => state.user);
    return (
        <>
        <footer className="footer-container">
            <div className="footer-section logo-section">
                <img src="logo.png" alt="Quick Hire Logo" className="footer-logo"/>
                <p>Built with ❤️ in India for the world</p>
            </div>  
            <div className="footer-section">
                <h4>Support</h4>
                <ul>
                    <li>F-972, Second floor, Twin Tower, Mumbai, India</li>
                    <li> <MdOutlineMailOutline /> quickhireteam@gmail.com</li>
                    <li><FaPhone/>  +91-7896541230</li>
                </ul>
            </div>
            <div className="footer-section">
                <h4>Quick Links</h4>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/jobs">Jobs</Link></li>
                    {isAuthenticated && (
              <li>
                <Link to={"/dashboard"}>Dashboard</Link>
              </li>
            )}
                </ul>
            </div>
            <div className="footer-section">
                <h4>Follow Us</h4>
                <ul className="social-links">
                    <li>
                        <Link to="/">
                            <FaLinkedin />
                            <span>LinkedIn</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            <FaSquareXTwitter />
                            <span>X</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            <FaSquareInstagram />
                            <span>Instagram</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            <FaYoutube />
                            <span>Youtube</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </footer>
        <div className="footer-copyright">
            &copy; CopyRight 2024. All Rights Reserved By Quick Hire
        </div>
        </>
    );
};

export default Footer;
