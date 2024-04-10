const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const cors = require("cors")({origin: true}); // Enable CORS

admin.initializeApp();

// Create a transporter object for sending emails
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "scnlsrh@gmail.com",
        pass: "pivlecjxmmuzyvvj",
    },
});

// Cloud Function to handle sending email requests.
exports.sendEmail = functions.https.onRequest((req, res) => {
    cors(req, res, () => { // Use the CORS middleware
        const {name, email, message} = req.body;

        // Construct email options
        const mailOptions = {
            from: "noreply@example.com",
            to: "scnlsrh@gmail.com",
            subject: "New Message from Website",
            html: `<p><b>Name:</b> ${name}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Message:</b> ${message}</p>`,
            replyTo: email, // Include the sender's email as the reply-to address
        };

        // Send email using Nodemailer's transporter
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                res.status(500).send("Error sending email");
            } else {
                console.log("Email sent:", info.response);
                res.status(200).send("Email sent successfully");
            }
        });
    });
});




