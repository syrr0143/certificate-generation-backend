import puppeteer from 'puppeteer'
import intern from '../model/internModel'

app.get('/generate-pdf/:id', async (req, res) => {
    try {
        // Sample data for the template
        const id = req.params.id;
        const data = await intern.findById(id);
        if (!data) {
            return res.status(404).json({ message: "Data not found" });
        }

        // Specify the URL to visit
        const url = `http://localhost:3002/server/views/certificate.ejs/${id}`;

        // Launch a headless browser
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Navigate to the specified URL
        await page.goto(url, { waitUntil: 'networkidle0' }); // Adjust wait options if needed

        // Generate PDF as buffer
        const pdfBuffer = await page.pdf({ format: 'A4' });

        // Close the browser
        await browser.close();

        // Send the generated PDF buffer as a response
        res.contentType('application/pdf');
        res.send(pdfBuffer);
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).json({ message: 'Error generating PDF' });
    }
});
