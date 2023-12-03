// routes/approveintern.js
const express = require('express');
const Intern = require('../model/internModel');

const router = express.Router();

// Approve intern route is POST: http://localhost:4000/approveintern/:id
router.get('/certificateData/:id', async (req, res) => {
  try {
    const internId = req.params.id;

    // Check if the intern exists
    const foundIntern = await Intern.findById(internId);

    if (!foundIntern) {
      return res.status(404).json({ error: 'Intern not found' });
    }

    const internDetails = {
        name: foundIntern.name,
        internshipDomain: foundIntern.internshipDomain,
        internshipDuration: foundIntern.internshipDuration,
        email:foundIntern.email
        // Add other details as needed
      };
    


    res.status(200).json({ message: 'Intern details retrieved successfully', intern: internDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
