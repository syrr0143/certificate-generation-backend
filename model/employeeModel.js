// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  employee_id: { type: String, unique: true, required: true }, // Ensure 'unique: true' for rollNo
  dob: { type: String, required: true },
  email: {
    type: String,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email',
    },
  },
  mobileNumber: { type: String, required: true },
  address: { type: String, required: true },
});


const Employee = mongoose.model('employee', employeeSchema);

module.exports = Employee;
