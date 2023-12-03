// routes/deleteintern.js
const express = require('express');
const Intern = require('../model/internModel'); // Assuming your model is in the 'models' directory

const router = express.Router();

// Delete intern route is DELETE: http://localhost:4000/deleteintern/:id
router.delete('/deleteintern/:id', async (req, res) => {
  try {
    const internId = req.params.id;

    // Check if the intern exists
    const foundIntern = await Intern.findById(internId);

    if (!foundIntern) {
      return res.status(404).json({ error: 'Intern not found' });
    }

    // Delete the intern
    await Intern.findByIdAndDelete(internId);

    res.status(200).json({ message: 'Intern deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
