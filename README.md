# nadSoft
Student Management Full-Stack App

This is a full-stack web application

Server: Node.js + Express + PostgreSQL
Client: React + Redux Toolkit + V
UI: Bootstrap 5 + SweetAlert2

Features
Create Student with multiple marks
View paginated student list (4 per page)
Validation for all input fields
SweetAlert success messages


Folder Structure

/server     Node.js + PostgreSQL API
/client     React + Redux Toolkit (Vite)


How to Run the Project Locally

Server Setup

Navigate to the server folder:
cd server
npm install

Create PostgreSQL Database:
1 Create a database, `students`
2 Run this schema:

I Also Added Schema File In Server Folder There Are Table Query :

```sql
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  age INT
);

CREATE TABLE marks (
  id SERIAL PRIMARY KEY,
  student_id INT REFERENCES students(id) ON DELETE CASCADE,
  subject VARCHAR(100),
  score INT
);
```

 Configure db.js:

const pool = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'student_crud',
  password: 'your_password',
  port: 5432,
});
```

 Start the server:

node app.js
Server: `http://localhost:5000`


Client Setup

Navigate to the client:

cd client
npm install

Run client:

npm run dev
