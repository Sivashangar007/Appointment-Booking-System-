const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const appointmentRoutes = require('./routes/appointments');
const user = require('./routes/userRoutes');
const login = require('./routes/loginRoute');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use('/api', appointmentRoutes);
app.use('/api',user)
app.use('/api',login)

sequelize.authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


sequelize.sync().then(() => console.log('Database synced.'));

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
