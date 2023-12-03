// models/Assignment.js
const mongoose = require('mongoose');

const internSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required:true}, // Change the type to String
  collegeName: { type: String, required: true },
  phone: { type: String, required: true },
  whatsappnumber: { type: String, required: true },
  highestqualification: { type: String, required: false },
  internshipDomain: { type: String, required: false },
  internshipDuration: { type: String, required: false },
  approved: { type: Boolean, required: false },
  sentemail: { type: Boolean, required: false },
});

const Intern = mongoose.model('Intern', internSchema);

module.exports = Intern;
