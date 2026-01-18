# 🚀 Prashant More | Full Stack Developer Portfolio

![Portfolio Preview](frontend/public/images/bg.png)

A modern, full-stack portfolio website built to showcase my projects and technical skills. It features a fully dynamic **Content Management System (CMS)**, allowing me to manage projects and messages via a secure Admin Dashboard without touching the codebase.

🔗 **Live Website:** [Insert Your Vercel Link Here]
🔗 **Backend API:** [Insert Your Render Link Here]

---

## 🛠️ Tech Stack

**Frontend:**
* ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) **React.js (Vite)**
* ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) **Tailwind CSS**
* ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white) **Framer Motion** (Animations)

**Backend:**
* ![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) **Node.js & Express**
* ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) **MongoDB (Mongoose)**
* ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=json%20web%20tokens) **JSON Web Tokens** (Auth)

---

## ✨ Key Features

* **⚡ Dynamic Content:** All project data is fetched from MongoDB, not hardcoded.
* **🔐 Admin Dashboard:** A protected route (`/dashboard`) to Add, Edit, or Delete projects in real-time.
* **🛡️ Secure Authentication:** JWT-based login system for the admin panel.
* **🎨 Modern UI/UX:** Dark mode aesthetic with glassmorphism and smooth scroll animations.
* **📱 Fully Responsive:** Optimized for Mobile, Tablet, and Desktop.

---

## 🚀 Getting Started (Run Locally)

This project is a **Monorepo** containing both client and server.

### 1. Clone the Repository
```bash
git clone [https://github.com/prashantmore45/prashant-portfolio-pro.git]
cd prashant-portfolio-pro
```

### 2. Backend Setup
```Bash

cd backend
npm install

# Create a .env file in /backend with:
# PORT=5000
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_secret_key
# ADMIN_USER=admin
# ADMIN_PASS=your_password

npm start
```
### 3. Frontend Setup
Open a new terminal:
```Bash

cd frontend
npm install

# Create a .env file in /frontend with:
# VITE_API_URL=http://localhost:5000/api

npm run dev
```
---

📂 Project Structure
```Bash

prashant-portfolio-pro/
├── backend/            # Express API & Database Models
│   ├── models/         # MongoDB Schemas (Project, Contact)
│   ├── routes/         # API Endpoints
│   └── server.js       # Entry point
│
└── frontend/           # React Application
    ├── src/
    │   ├── components/ # Reusable UI (Navbar, ProjectCard)
    │   ├── context/    # Auth Context (Login State)
    │   ├── pages/      # Full Pages (Home, Dashboard, Login)
    │   └── api/        # Axios Configuration

```
---

📬 Contact Me

Email: prashantmorepm05@gmail.com

LinkedIn: [Prashant More](https://www.linkedin.com/in/prashantmore45/)

GitHub: [prashantmore45](https://github.com/prashantmore45)

Made with ❤️ by Prashant More.
