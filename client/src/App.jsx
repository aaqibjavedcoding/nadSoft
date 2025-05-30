import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';

const App = () => (
  <div className="container mt-4">
    <Routes>
      <Route path="/" element={<StudentList />} />
      <Route path="/add" element={<StudentForm />} />
    </Routes>
  </div>
);

export default App;
