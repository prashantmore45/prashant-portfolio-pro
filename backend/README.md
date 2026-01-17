🚀 Portfolio Backend (Node.js + Express API)

This repository contains the full backend API for my personal developer portfolio.
It powers:

Dynamic Project Loading

Contact Form Submission

Visitor Counter Analytics

Resume Download

JSON-based Lightweight Database

The backend is built using Node.js + Express and designed to work seamlessly with the frontend deployed on GitHub Pages.

📁 Features 

✅ Projects API
Serves dynamic project data to the frontend.

✅ Contact API
Stores visitor messages inside messages.json.

✅ Visitor Counter API
Tracks the total number of visitors.

✅ Resume Download API
Provides direct download of my resume.

✅ Lightweight JSON Database
No external database required.

✅ CORS Enabled
Frontend and backend can run on different servers.


📂 Folder Structure 

backend/
│── server.js
│── package.json
│
├── routes/
│   ├── projects.js
│   ├── contact.js
│   ├── visitor.js
│   └── resume.js
│
├── data/
│   ├── projects.json
│   ├── messages.json
│   └── visitors.json
│
└── resume/
    └── Prashant_Resume.pdf


⚙️ Tech Stack :->

> Node.js
> Express.js
> JSON for Storage
> CORS
> Render (Deployment)

🛠️ Installation & Setup (Local) 

1️⃣ Clone the backend repository
git clone https://github.com/your-username/your-backend-repo.git
cd your-backend-repo

2️⃣ Install dependencies
npm install

3️⃣ Run the server
node server.js


Server starts on:
http://localhost:5000


📡 API Endpoints :->

📌 1. Get All Projects

GET /api/projects

Response Example:

[
  {
    "id": 1,
    "title": "Amazon Clone",
    "description": "...",
    "github": "https://github.com/... ",
    "demo": "Coming Soon",
    "image": "images/amazon clone.png"
  }
]

📌 2. Submit Contact Form

POST /api/contact

Body:

{
  "name": "John Doe",
  "email": "test@example.com",
  "message": "Hello!"
}


Response:

{ "success": true, "msg": "Message sent successfully!" }

📌 3. Increment Visitor Counter

POST /api/visitors/add

Response:

{ "total": 15 }

📌 4. Get Visitor Count

GET /api/visitors

📌 5. Download Resume

GET /api/resume/download

Triggers a resume PDF download.

🌍 Deployment (Render)
1. Push this repo to GitHub
2. Go to Render → New Web Service
3. Configure settings:
Setting	Value
Environment	Node
Build Command	npm install
Start Command	node server.js
4. Deploy

After deployment, you will get a URL like:

https://your-backend.onrender.com

🔗 Connect Backend to Frontend

In your frontend script.js, update:

const BACKEND = "https://your-backend.onrender.com";


Now your frontend will fetch:

> Projects
> Visitor count
> Submit messages
> Download resume

all from your live backend.

🛡️ Security Notes

No API keys or secrets are stored in this repo.
JSON files are never exposed publicly.
All sensitive operations occur server-side.

🤝 Contributing

Pull requests are welcome.
For major changes, please open an issue first to discuss.

📜 License

This project is free to use and modify.