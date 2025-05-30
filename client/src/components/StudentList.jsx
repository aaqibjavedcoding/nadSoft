import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudents, setPage } from '../store/studentSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

function StudentList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { data: students, total, page } = useSelector((state) => state.students);
  const limit = 3;

  useEffect(() => {
    dispatch(fetchStudents(page));

  if (location.state?.success) {
    Swal.fire('Success', location.state.success, 'success');
    navigate(location.pathname, { replace: true }); // clears state after alert
  }
  }, [dispatch, page]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">📘 Student Records</h2>
        <button className="btn btn-success" onClick={() => navigate('/add')}>+ Add Student</button>
      </div>
      <table className="table table-hover table-striped border">
        <thead className="table-primary">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between align-items-center">
        <button className="btn btn-outline-primary" disabled={page <= 1} onClick={() => dispatch(setPage(page - 1))}>Previous</button>
        <span className="fw-semibold">Page {page} of {totalPages}</span>
        <button className="btn btn-outline-primary" disabled={page >= totalPages} onClick={() => dispatch(setPage(page + 1))}>Next</button>
      </div>
    </div>
  );
}

export default StudentList;
