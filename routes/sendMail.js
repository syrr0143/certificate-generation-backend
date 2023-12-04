
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');
const router = express.Router();
const intern = require('../model/internModel')


// Create a nodemailer transporter using your email configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.user,
    pass:  process.env.pass // replace with your password or app-specific password
  },
});

// Function to generate PDF buffer using Puppeteer
async function generatePdfBuffer(internId) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Modify this URL or HTML content as per your requirements
  await page.goto(`https://certificate-generation-backend.onrender.com/Certificate/${internId}`, { waitUntil: 'networkidle0' });
  
  const pdfBuffer = await page.pdf({ format: 'A4' });
  
  await browser.close();
  
  return pdfBuffer;
}

// Define a route to generate PDF and send email
router.post('/generate-pdf-and-send-email', async (req, res) => {
  try {
    // Fetch data from the request body
    const { to, subject, text ,internId} = req.body;

    // Generate PDF buffer using Puppeteer
    const pdfBuffer = await generatePdfBuffer(internId);

    // Send email with defined transport object
    const info = await transporter.sendMail({
      from: `"Suvidha Foundation" <sy816120@gmail.com>`, // replace with your name and email
      to,
      subject,
      text,
      html: `<p>Dear intern,</p>
<p>Greetings of the day.</p>
<p>Congratulations on your offer from Suvidha Foundation! Please find the attached - detailed offer letter.</p>
<p>For the process of acceptance, Please revert back the physically signed copy of the Offer Letter within 48 hours. Email us here back:- hr@suvidhafoundationedutech.org</p>
<p>After Successful Completion of your internship, You will be Awarded with "Certificate of Completion" And on the basis of your Performance "Letter of Recommendation".</p>
<p>We are looking forward to hearing from you and hope you’ll join our team!</p>
<p>Best regards,</p>
<p>Sonal Godshelwar</p>
<p>Human Resource Team</p>
<p>Mail: suvidhafoundation00@gmail.com</p>
<p>Suvidha Foundation</p>
<p>R. No: MH/568/95/Nagpur</p>
<p>H.No. 1951, W.N.4, Khaperkheda, Saoner, Nagpur</p>
<p>Email: info@suvidhafoundationedutech.org</p>
<p>Phone No: +918378042291</p>`
,
      attachments: [
        {
          filename: 'offerLetter.pdf',
          content: pdfBuffer,
          encoding: 'base64',
        },
      ],
    });

    console.log('Message sent: %s', info.messageId);
    await intern.findByIdAndUpdate(internId, { sentemail: true });
    
  
    res.status(200).json({ message: `Email sent successfully to ${to} and sent email set to true`, info });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email' + error.message });
  }
});


module.exports=router;