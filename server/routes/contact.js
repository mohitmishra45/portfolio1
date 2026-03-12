import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MESSAGES_FILE = path.join(__dirname, '../data/messages.json');

const router = express.Router();

const getTransporter = () => {
    const user = process.env.EMAIL_USER;
    // Gmail app passwords should not have spaces
    const pass = process.env.EMAIL_PASS ? process.env.EMAIL_PASS.replace(/\s/g, '') : null;

    if (!user || !pass || pass === 'your_app_password_here') {
        throw new Error('Email credentials (EMAIL_USER or EMAIL_PASS) are not configured correctly in environment variables.');
    }

    return nodemailer.createTransport({
        service: 'gmail',
        auth: { user, pass }
    });
};

// ... (helpers readMessages/writeMessages remain same)

// POST contact form submission
router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // 1. Save to local file as backup
        const messages = readMessages();
        const newMessage = {
            id: Date.now().toString(),
            name,
            email,
            message,
            timestamp: new Date().toISOString()
        };
        messages.push(newMessage);
        writeMessages(messages);

        // 2. Initialize transporter and check credentials
        const transporter = getTransporter();

        // 3. Send email via Nodemailer
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.RECEIVER_EMAIL || process.env.EMAIL_USER,
            subject: `New Portfolio Message from ${name}`,
            text: `You have received a new message from your portfolio website:
            
Name: ${name}
Email: ${email}
Message: ${message}

(Saved to server/data/messages.json at ${newMessage.timestamp})`,
            html: `
                <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #10b981;">New Message Received</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Message:</strong></p>
                    <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #10b981;">
                        ${message.replace(/\n/g, '<br/>')}
                    </div>
                    <hr style="margin-top: 20px; border: none; border-top: 1px solid #eee;" />
                    <p style="font-size: 0.8em; color: #888;">Received at ${new Date(newMessage.timestamp).toLocaleString()}</p>
                </div>
            `
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log(`📩 email sent to ${process.env.RECEIVER_EMAIL || process.env.EMAIL_USER} from ${name}`);
        } catch (mailErr) {
            console.error('❌ Nodemailer Error:', mailErr.message);
            throw new Error(`Email delivery failed: ${mailErr.message}`);
        }

        res.status(201).json({ message: 'Message sent successfully!', data: newMessage });
    } catch (err) {
        console.error('Contact form error:', err.message);
        // Explicitly return the error message so the user knows what's wrong
        res.status(500).json({ 
            error: err.message || 'Failed to process contact message.' 
        });
    }
});

export default router;
