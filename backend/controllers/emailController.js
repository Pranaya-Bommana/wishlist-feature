const Email = require('../models/Email');
const nodemailer = require('nodemailer');

exports.addEmail = async (req, res) => {
    const { email } = req.body;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    try {
        // Check if email already exists
        const existingEmail = await Email.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Save email to database
        const newEmail = new Email({ email });
        await newEmail.save();

        // Send confirmation email
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Thank You for Joining Our Wishlist!',
            text: 'We’ll keep you updated about our launch.',
        });

        res.status(201).json({ message: 'Email added successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
