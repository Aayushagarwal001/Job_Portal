// import React from 'react';
// import { Link } from 'react-router-dom';

// const NotFound = () => {
//     return (
//         <section className="notfound">
//             <div className="content">
//             <h1> 404 </h1>
//             <p>Opps... Page Not Found</p>
//                 <Link to={"/"} className='btn'>
//                 Back To Home Page
//                 </Link>
//             </div>
//         </section>
//     )
// }

// export default NotFound;


import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <section className="notfound">
            <div className="overlay"></div>
            <div className="content">
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <p>Oops! The page you're looking for doesn't exist. It may have been moved or deleted.</p>
                <Link to="/" className="btn">
                    Back To Home
                </Link>
            </div>
        </section>
    );
};

export default NotFound;
