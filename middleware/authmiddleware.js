
const jwt = require('jsonwebtoken');
const Employee = require('../model/employeeModel'); // Assuming you have a User model

const authMiddleware = async (req, res, next) => {
  // Get the token from the request headers
  const token = req.header('Authorization');

  // Check if the token is present
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, 'your-secret-key'); // Replace 'your-secret-key' with your actual secret key

    // Find the user based on the decoded information
    const employee = await Employee.findById(decoded.employeeId);

    if (!employee) {
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }

    // Set the user details in the request object for later use
    req.employee = employee;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};

module.exports = authMiddleware;
