import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function StudentForm() {
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: '',
    email: '',
    age: '',
    marks: [{ subject: '', score: '' }]
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: name === "age" ? Number(value) : value });
  };

  const handleMarksChange = (index, e) => {
    const { name, value } = e.target;
    const newMarks = [...student.marks];
    newMarks[index][name] = name === "score" ? Number(value) : value;
    setStudent({ ...student, marks: newMarks });
  };

  const addMarkField = () => {
    setStudent({ ...student, marks: [...student.marks, { subject: '', score: '' }] });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!student.name) newErrors.name = 'Name is required';
    if (!student.email) newErrors.email = 'Email is required';
    if (!student.age) newErrors.age = 'Age is required';
    student.marks.forEach((mark, index) => {
      if (!mark.subject) newErrors[`subject${index}`] = 'Subject is required';
      if (mark.score === '' || isNaN(mark.score)) newErrors[`score${index}`] = 'Score must be a number';
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post('http://localhost:5000/students', student);
      navigate('/', { state: { success: 'Student created successfully!' } });
    } catch (error) {
        if (error.response?.data?.error?.includes('duplicate key')) {
          setErrors({ email: 'This email already exists' });
        } else {
          Swal.fire('Error', error.message, 'error');
        }
    }
  };

  return (
    <>

    
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Add New Student</h4>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input type="text" name="name" className="form-control" placeholder="Name"
            onChange={handleChange} />
          {errors.name && <small className="text-danger">{errors.name}</small>}
        </div>
        <div className="mb-3">
          <input type="email" name="email" className="form-control" placeholder="Email"
            onChange={handleChange} />
          {errors.email && <small className="text-danger">{errors.email}</small>}
        </div>
        <div className="mb-3">
          <input type="number" name="age" className="form-control" placeholder="Age"
            onChange={handleChange} />
          {errors.age && <small className="text-danger">{errors.age}</small>}
        </div>

        <h5>Marks</h5>
        {student.marks.map((mark, idx) => (
          <div key={idx} className="row mb-2">
            <div className="col">
              <input type="text" name="subject" className="form-control" placeholder="Subject"
                value={mark.subject} onChange={(e) => handleMarksChange(idx, e)} />
              {errors[`subject${idx}`] && <small className="text-danger">{errors[`subject${idx}`]}</small>}
            </div>
            <div className="col">
              <input type="number" name="score" className="form-control" placeholder="Score"
                value={mark.score} onChange={(e) => handleMarksChange(idx, e)} />
              {errors[`score${idx}`] && <small className="text-danger">{errors[`score${idx}`]}</small>}
            </div>
          </div>
        ))}
        <button type="button" className="btn btn-secondary mb-3" onClick={addMarkField}>+ Add Subject</button>
        <br />
          <button type="button" className="btn btn-secondary float-end ms-2" onClick={() => navigate('/')}>
    Cancel
  </button>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </>
  );
}

export default StudentForm;
