
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const authRoutes = require('./routes/authRouter');
const fetchuserRoutes = require('./routes/getallintern');
const databaseConfig = require('./config/database-config');
const addinternRoutes = require('./routes/addintern');
const deleteuserRoutes = require('./routes/deleteuser');
const approveinternRoutes = require('./routes/approveintern');
const fetchDetailsRoutes = require('./routes/fetchData');
const sendMailRoutes = require('./routes/sendMail');

const app = express();

// Connect to MongoDB
mongoose.connect(databaseConfig.url, databaseConfig.options)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Middleware
app.use(cors());
app.use(express.json());


app.use('/', authRoutes);
app.use('/', fetchuserRoutes);
app.use('/', addinternRoutes);
app.use('/', deleteuserRoutes);
app.use('/', approveinternRoutes);
app.use('/', fetchDetailsRoutes);
app.use('/', sendMailRoutes);
// app.use('/', searchRoutes);


app.get('/', (req,res)=> {
  res.send('Root Page');
})

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
