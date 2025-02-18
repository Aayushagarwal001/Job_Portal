# Job Portal

A full-stack **Job Portal** application built using **MERN Stack (MongoDB, Express.js, React.js, Node.js)**. This platform allows users to register, upload resumes, apply for jobs, and for recruiters to post and manage job listings.

## 🚀 Live Demo

🔗 **[🌍Explore the Job Portal Now!](https://quickhire-portal.netlify.app/)**


## 🚀 Features

### ✅ **User Features**
- Register/Login with authentication (JWT)
- Search and filter jobs
- Apply for jobs with resume upload
- Automatic mail for new posted jobs on the basis of preferred skillset
- Profile management

### ✅ **Recruiter Features**
- Post job listings
- Manage job applications
- View applicant profiles
- View resume

### ✅ **Admin Features**
- Manage users and job postings
- Delete spam job listings

## 🛠 Tech Stack

### **Frontend**
- React.js (Vite)
- Tailwind CSS (Styling)
- Axios (API Calls)

### **Backend**
- Node.js & Express.js
- MongoDB Atlas (Database)
- Mongoose (ODM)
- Cloudinary (File Uploads)
- JWT (Authentication)

### **Deployment**
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: MongoDB Atlas

---

## 📂 Folder Structure
```
Job_Portal/
│── Backend/
│   ├── Automation/
│   ├── Config/
│   ├── Controllers/
│   ├── Database/Connection.js
│   ├── Models/
│   ├── Routes/
│   ├── Middlewares/
│   ├── Utils/
│   ├── App.js
│   ├── package-lock.json
│   ├── package.json
│   ├── Server.js
│── Frontend/ 
│   ├── src/
│   ├── public/
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│── README.md
```

---

## 🚀 Getting Started

### 1️⃣ **Clone the Repository**
```sh
git clone https://github.com/Aayushagarwal001/Job_Portal.git
cd Job_Portal
```

### 2️⃣ **Backend Setup**
```sh
cd Backend
npm install
```

- **Create a `.env` file** inside `Backend/` and add:
```env
MONGO_URI=mongodb_atlas_url
FRONTEND_URL=url(localhost or deployed site url)
JWT_SECRET_KEY=your_secret_key
JWT_EXPIRE=days(eg. 7d, 14d)
COOKIE_EXPIRE=days(eg. 7, 14)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SMTP_SERVICE=gmail
SMTP_USER=your_mail_id
SMTP_PASSWORD=your_password
SMTP_HOST=smtp.gmail.com 
SMTP_PORT=port_no
```

- **Run Backend Server**
```sh
npm run dev
```

### 3️⃣ **Frontend Setup**
```sh
cd ../Frontend
npm install
```

- **Create a `.env` file** inside `Frontend/` and add:
```env
VITE_API_BASE_URL=http://localhost:5000
```

- **Run Frontend**
```sh
npm run dev
```

---

## 🚀 Deployment

### **Frontend Deployment (Netlify)**
```sh
npm run build
```

### **Backend Deployment (Render)**
1. Push your backend code to GitHub.
2. Go to [Render](https://render.com/).
3. Create a new Web Service & connect your GitHub repo.
4. Add environment variables from `.env`.
5. Deploy the service.

---

# 📌 API Endpoints

### 🔹 User Routes

| Method | Endpoint                    | Description          |
| ------ | --------------------------- | -------------------- |
| POST   | `/api/auth/register`        | Register a new user  |
| POST   | `/api/auth/login`           | Login a user         |
| GET    | `/api/auth/logout`          | Logout a user        |
| GET    | `/api/user/getuser`         | Get user details     |
| PUT    | `/api/user/update/profile`  | Update user profile  |
| PUT    | `/api/user/update/password` | Update user password |

### 🔹 Job Routes

| Method | Endpoint               | Description                 |
| ------ | ---------------------- | --------------------------- |
| POST   | `/api/jobs/post`       | Create a job listing        |
| GET    | `/api/jobs/getall`     | Get all job listings        |
| GET    | `/api/jobs/getmyjobs`  | Get employer's job listings |
| GET    | `/api/jobs/get/:id`    | Get a single job listing    |
| DELETE | `/api/jobs/delete/:id` | Delete a job listing        |

### 🔹 Application Routes

| Method | Endpoint                            | Description                           |
| ------ | ----------------------------------- | ------------------------------------- |
| POST   | `/api/application/post/:id`         | Apply for a job                       |
| GET    | `/api/application/employer/getall`  | Get all applications for an employer  |
| GET    | `/api/application/jobseeker/getall` | Get all applications for a job seeker |
| DELETE | `/api/application/delete/:id`       | Delete an application                 |

---

## 🎯 Future Enhancements
- Add real-time chat between recruiters and job seekers
- Job recommendations using AI
- More payment integration for premium job listings

---

## 🙌 Contributing
Contributions are welcome! Feel free to open issues and submit PRs.

---

## 📜 License
This project is MIT Licensed. Feel free to modify and use it as per your need.

---

## 📞 Contact
For any queries, contact at [aayushagarwal7775@gmai.com](mailto:aayushagarwal7775@gmai.com).

Happy Coding! 🚀

