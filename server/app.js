const express = require('express');
const cors = require('cors');
const app = express();
const studentRoutes = require('./routes/studentRoutes');

app.use(cors());
app.use(express.json());
app.use('/students', studentRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
