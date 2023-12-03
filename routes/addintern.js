// routes/internRoutes.js
const express = require('express');
const router = express.Router();
const Intern = require('../model/internModel');

// Endpoint to add a new intern
router.post('/add', async (req, res) => {
  try {
    const {
      name,
      email,
      collegeName,
      phone,
      whatsappnumber,
      highestqualification,
      internshipDomain,
      internshipDuration,
      approved,
    } = req.body;

    const newIntern = new Intern({
      name,
      email,
      collegeName,
      phone,
      whatsappnumber,
      highestqualification,
      internshipDomain,
      internshipDuration,
      approved,
    });

    // Save the new intern to the database
    const savedIntern = await newIntern.save();

    res.status(201).json({ message: 'Intern added successfully', intern: savedIntern });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

module.exports = router;
