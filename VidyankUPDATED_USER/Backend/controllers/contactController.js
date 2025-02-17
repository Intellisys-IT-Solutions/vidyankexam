const ContactModel = require('../models/contactModel');

exports.submitContactForm = async (req, res) => {
    try {
        const { name, email, course, parentNumber, studentNumber, message } = req.body;

        if (!name || !email || !course || !parentNumber || !studentNumber || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newContact = await ContactModel.addContact({
            name,
            email,
            course,
            parentNumber,
            studentNumber,
            message
        });

        res.status(201).json({ message: 'Form submitted successfully', data: newContact });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error, please try again' });
    }
};
