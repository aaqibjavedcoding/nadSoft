const pool = require('../db');

exports.createStudent = async (req, res) => {
  const { name, email, age, marks } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO students (name, email, age) VALUES ($1, $2, $3) RETURNING *',
      [name, email, age]
    );
    const studentId = result.rows[0].id;

    for (const mark of marks) {
      await pool.query(
        'INSERT INTO marks (student_id, subject, score) VALUES ($1, $2, $3)',
        [studentId, mark.subject, mark.score]
      );
    }
    res.status(201).json({ message: 'Student created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStudents = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const offset = (page - 1) * limit;
  try {
    const result = await pool.query(
      'SELECT * FROM students ORDER BY id DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    );
    const count = await pool.query('SELECT COUNT(*) FROM students');
    res.json({ data: result.rows, total: Number(count.rows[0].count) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await pool.query('SELECT * FROM students WHERE id = $1', [id]);
    const marks = await pool.query('SELECT subject, score FROM marks WHERE student_id = $1', [id]);
    res.json({ ...student.rows[0], marks: marks.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  try {
    await pool.query('UPDATE students SET name = $1, email = $2, age = $3 WHERE id = $4', [
      name, email, age, id
    ]);
    res.json({ message: 'Student updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM students WHERE id = $1', [id]);
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
