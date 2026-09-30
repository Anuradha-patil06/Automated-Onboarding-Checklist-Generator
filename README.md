Automated Onboarding Checklist Generator

Problem Statement

The Automated Onboarding Checklist Generator creates onboarding checklists based on an employee's selected role and department. It also helps users track and manage onboarding progress.

Assigned Feature Set

Feature Set C

Role and department selection

Automatic checklist generation

Display tasks

Progress dashboard

Edit checklist

Features Implemented

Role and department selection

Automatic onboarding task generation

Display of generated tasks

Mark tasks as completed or incomplete

Total, completed, and remaining task counts

Progress percentage and visual progress bar

Editing task titles

MongoDB Atlas data storage

REST API integration

Technologies Used

Frontend: HTML, CSS, JavaScript

Backend: Node.js, Express.js

Database: MongoDB Atlas, Mongoose

Tools: Visual Studio Code, Postman, Git, GitHub

AI Tools Used

ChatGPT was used as a learning and development assistant for project planning, understanding concepts, coding, debugging, UI improvement, testing guidance, and documentation.

All AI-assisted code was reviewed, tested, and understood before implementation.

Important AI Prompts / AI Usage

Explain how to build an onboarding checklist generator using Node.js, Express.js, and MongoDB.

Create an API for generating tasks based on role and department.

Help connect Node.js with MongoDB Atlas.

Help debug backend and API errors.

Create a professional frontend interface.

Add a progress dashboard.

Add task completion and task editing functionality.

Explain how to test APIs using Postman.

Help prepare project documentation.

Instructions to Run the Project

1. Install Dependencies

Open the terminal:

cd backend
npm install

2. Configure Environment Variables

Create a .env file inside the backend folder:

MONGODB_URI=your_mongodb_connection_string

Do not upload the .env file or expose your database password.

3. Start the Backend

npm run dev

The server runs at:

http://localhost:5000

4. Open the Frontend

Open frontend/index.html in a browser. Select a role and department, then click Generate Checklist.

API Endpoints

Method

Endpoint

Purpose

POST

/api/checklist/generate

Generate a checklist

GET

/api/checklist

Get all checklists

PUT

/api/checklist/:checklistId/task/:taskId

Update task completion

GET

/api/checklist/:checklistId/progress

Get checklist progress

PUT

/api/checklist/:checklistId/task/:taskId/edit

Edit a task title

Project Structure

Automated-Onboarding
├── backend
│   ├── config/db.js
│   ├── models/Checklist.js
│   ├── routes/checklistRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend
    ├── index.html
    ├── script.js
    ├── progress.html
    └── progress.js

Screenshots of Working Project
role-selection
<img width="359" height="334" alt="role-selection" src="https://github.com/user-attachments/assets/f1e156a8-6047-4cd5-9356-37bf0830ae69" />

Progress Dashboard
<img width="384" height="437" alt="progress-dashboard" src="https://github.com/user-attachments/assets/722a2855-a803-4019-bb52-f0e138f033ce" />

Task Completion
<img width="390" height="446" alt="task-completion" src="https://github.com/user-attachments/assets/f91f2213-17b1-4f84-af12-47c62ad0958d" />


Edited Task

<img width="832" height="457" alt="edited-task" src="https://github.com/user-attachments/assets/1de21989-2620-4eab-a86c-227f5047ec32" />

Conclusion

This project simplifies employee onboarding by generating role-based checklists and providing a dashboard to monitor and manage onboarding progress.

