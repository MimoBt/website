import express from "express";
import bodyParser from "body-parser";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config(); 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port=8080;

// Logging middleware to diagnose request parsing
app.use((req, res, next) => {
   
    
    // Capture raw body for debugging
    let rawBody = '';
    req.on('data', chunk => {
        rawBody += chunk.toString();
    });
    req.on('end', () => {
       
    });
    
    next();
});

// Middleware for parsing JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("index.ejs");
});

app.post("/process-contact", async (req, res) => {
    const {name, email, phone, service, message} = req.body;

    if(!name || !email || !phone || !service || !message){
     
        return res.status(400).json({
            success: false, 
            message: "All fields are required"
        });
    }

    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, 
        auth: {
            user: 'mimoubtt@gmail.com',
            pass: 'akmh dyjm smmw dfrw'
        }
    });

    try {
        // Send email
        await transporter.sendMail({
            from: email,
            to: 'mimoubtt@gmail.com',
            subject: 'New Contact Form Submission',
            html: `
                <p>Name: ${name}</p>
                <p>Email: ${email}</p>
                <p>Phone: ${phone}</p>
                <p>Service: ${service}</p>
                <p>Message: ${message}</p>
            `,
        });

        // If email sent successfully
        return res.json({
            success: true, 
            message: "Message sent successfully"
        });

    } catch (error) {
        console.error('Complete Error Details:', error);
        return res.status(500).json({
            success: false, 
            message: "Failed to send message",
            errorDetails: error.toString()
        });
    }
});

// document.getElementById("open-popup").addEventListener("click",()=>{
//     document.getElementsByClassName("pop-up")[0].classList.add("active");
// });

// document.getElementById("dismiss-btn").addEventListener("click",()=>{
//     document.getElementsByClassName("pop-up")[0].classList.remove("active");
// });
    

// // utils.js (can be used in both clientimport popup from './scripts/script.js'; and server)
// function validateForm(data) {
//     // Validation logic
//   }
  
//   // In browser
//   export default validateForm;
  
//   // In server
//   import validateForm from './utils.js';





app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });