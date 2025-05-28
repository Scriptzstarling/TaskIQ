# TaskIQ – Smart Task Management System

A modern, full-stack web application for managing tasks with user authentication, instant email notifications, and a clean, responsive UI.

---

## 🚀 Features

- **User Authentication:** Secure signup, login, and password reset via email (JWT + Supabase Auth)
- **Task Management:** Create, update, delete, and view tasks
- **Email Notifications:** Instant task reminders using SendGrid
- **Responsive UI:** Built with React.js and Tailwind CSS
- **RESTful API:** Flask backend with modular blueprints
- **Cloud Database:** Supabase/PostgreSQL for scalable storage

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Flask (Python), REST API
- **Database & Auth:** Supabase (PostgreSQL, Auth)
- **Email:** SendGrid
- **Version Control:** Git, GitHub

---

## ⚡ Getting Started

### 1. Clone the repository

git clone https://github.com/Scriptzstarling/TaskIQ.git
cd TaskIQ

text

### 2. Setup Backend

cd backend
python -m venv venv

On Windows:
venv\Scripts\activate

On Mac/Linux:
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env # Fill in your own secrets
flask db upgrade
flask run

text

### 3. Setup Frontend

cd ../frontend
npm install
npm start

text

---

## 🔑 Environment Variables

Create a `.env` file in `/backend` with:

SENDGRID_API_KEY=your_sendgrid_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
JWT_SECRET_KEY=your_jwt_secret_key
DATABASE_URL=your_database_url

text

> **Never commit your `.env` file or secrets to GitHub!**

---

## 📚 Project Structure

TaskIQ/
backend/
app/
.env.example
requirements.txt
frontend/
src/
package.json
README.md

text

---

## 🧑‍💻 Author

**Shashwat**  
[GitHub](https://github.com/Scriptzstarling) | [LinkedIn](https://www.linkedin.com/in/shashwat8w00) | [Portfolio](https://scriptz-starling.vercel.app/)

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgements

- [Supabase](https://supabase.com/)
- [SendGrid](https://sendgrid.com/)
- [React](https://react.dev/)
- [Flask](https://flask.palletsprojects.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---
