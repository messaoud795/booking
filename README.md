# Laser Game Booking Web APP

## Description

This project is a **Laser Game Booking Web APP** with both backend and frontend setup. The **Node.js** backend provides the API endpoints for managing bookings, while the **React** frontend allows users to interact with the booking system.

---

## Prerequisites

Before running the project, ensure that you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (Node package manager, comes with Node.js)

To verify that these are installed, run the following commands:
node -v
npm -v

Step 1: Clone the Repository
First, you need to clone the repository from GitHub. Run the following commands:

bash
git clone https://github.com/messaoud795/booking.git
cd laser_game

Step 2: Install Dependencies
To install all dependencies for both the backend and the frontend, run the following command:

bash
npm run install-all
This command will:

Install the backend dependencies in the root directory.

Running the Application
Step 3: Start Backend and Frontend
To start both the backend and frontend concurrently, use the following command:

bash
npm start

Project Structure
Below is a quick overview of the project structure:

laser_game/
├── backend/
│ ├── server.js # Main backend server file
│ ├── routes/ # API routes for backend
│ ├── controllers/ # Controllers for handling business logic
│ ├── models/ # Database models for SQLite
│ ├── config/ # Configuration files
│ ├── db/ #database Configuration
│ └── package.json # Dependencies and scripts for backend
│
├── frontend/
│ ├── src/ # Main source folder for frontend code
│ │ ├── actions/ # Folder for Redux action creators
│ │ ├── assets/ # Static assets like images, icons, and fonts
│ │ ├── components/ # Reusable React components
│ │ ├── constants/ # Constants used across the application (Redux action types, etc.)
│ │ ├── pages/ # Folder for individual pages (e.g., Home, Booking)
│ │ ├── reducers/ # Redux reducers folder to manage state
│ │ ├── utils/  
│ ├── public/ # Static assets (HTML, CSS, etc.)
│ └── package.json # Dependencies and scripts for frontend
│
├── .env # Environment variables for backend
├── package.json # Root package.json for managing scripts and dependencies
└── README.md # Project documentation

Technologies Used
Backend
Node.js: JavaScript runtime for building the backend.
Express.js: Web framework for building REST APIs.
SQLite3: Database used for storing booking data.
Moment.js: Library for handling dates and times.
Lodash: Utility library for handling data manipulation.
Dotenv: Loads environment variables from a .env file.
Frontend
React.js: JavaScript library for building user interfaces.
React Router: For managing frontend routing and navigation.
React-Big-Calendar: A customizable calendar component for managing bookings
Redux: Global state management
Lodash: Utility library for handling data manipulation.
