// routes/userRoutes.js
const express = require('express');
const authMiddleware = require('../middleware/authmiddleware');
const Employee = require('../model/employeeModel');
const intern = require('../model/internModel');

const router = express.Router();

// Get all users authmidelleware to be added
router.get('/all-users',authMiddleware, async (req, res) => {
  try {
    // Fetch all users from the database
    const allUsers = await intern.find();

    // Exclude sensitive information like passwords before sending the response
    const sanitizedUsers = allUsers.map(user => ({
        name: user.name,
        collegeName: user.collegeName,
        email: user.email,
        phone: user.phone,
        highestqualification: user.highestqualification,
        internshipDomain: user.internshipDomain,
        internshipDuration: user.internshipDuration,
        approved:user.approved,
        id:user._id
    }));

    res.status(200).json({ users: sanitizedUsers });
  }catch (error) {
    console.error(error);
  
    let errorMessage = 'Internal server error';
    
    if (error.message) {
      errorMessage = error.message;
    }
  
    res.status(500).json({ error: errorMessage });
  }
  
});
module.exports = router;
