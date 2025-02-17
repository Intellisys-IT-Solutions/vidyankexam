const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findUserByEmailOrContact, createUser, verifyUser, findUserByEmail,findUserById,updateUser, verifyUpdateOTP } = require("../models/User");
const { sendOTP } = require("../utils/mailer");
const pool = require("../config/db"); // ✅ Import database connection
const otpStore = {}; // ✅ Correctly defined at the top
const nodemailer = require("nodemailer");
require("dotenv").config();

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

exports.registerUser = async (req, res) => {
    const { firstName, lastName, email, password, city, contact, category, referralSource, instituteClassName } = req.body;

    if (!firstName || !lastName || !email || !password || !city || !contact || !category || !referralSource || !instituteClassName) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existingUser = await findUserByEmailOrContact(email, contact);
        if (existingUser) {
            return res.status(400).json({ message: "User with this email or contact number already exists" });
        }

        // ✅ Fetch category_id from the category table
        const categoryResult = await pool.query("SELECT category_id FROM category WHERE category_id = $1", [category]);

        if (categoryResult.rows.length === 0) {
            return res.status(400).json({ message: "Invalid category selected" });
        }
        const categoryId = categoryResult.rows[0].category_id;

        // ✅ Store OTP and user data
        const otp = generateOTP();
        console.log(`Generated OTP for ${email}: ${otp}`);

        otpStore[email] = { 
            otp, 
            userData: { firstName, lastName, email, password, city, contact, categoryId, referralSource, instituteClassName }
        };

        setTimeout(() => delete otpStore[email], 300000);

        await sendOTP(email, otp);
        res.status(200).json({ message: "OTP sent to email. Please verify to complete registration." });

    } catch (error) {
        console.error("Error in registerUser:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// ✔ Update `verifyOTP` function to use `categoryId`
exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    if (!otpStore[email]) {
        return res.status(400).json({ message: "OTP expired or not found. Please request a new OTP." });
    }

    if (otpStore[email].otp !== otp) {
        return res.status(400).json({ message: "Invalid OTP. Please try again." });
    }

    try {
        const { firstName, lastName, password, city, contact, categoryId, referralSource, instituteClassName } = otpStore[email].userData;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await createUser(firstName, lastName, email, hashedPassword, city, contact, categoryId, referralSource, instituteClassName, true);

        console.log("✅ User successfully inserted into DB:", newUser);
        delete otpStore[email];

        res.status(200).json({ message: "User successfully registered and verified!", redirect: "login.html" });

    } catch (error) {
        console.error("❌ Error verifying OTP:", error);
        res.status(500).json({ error: "Server error" });
    }
};


// ✅ LOGIN FUNCTION (Corrected)
// ✅ LOGIN FUNCTION (Updated - No OTP Required)
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT Token
        const jwtSecret = process.env.JWT_SECRET;
        const token = jwt.sign({ email, userId: user.id }, jwtSecret, { expiresIn: "1h" });

        // ✅ Dynamically Set Frontend URL
        const FRONTEND_URL = process.env.FRONTEND_URL || "http://127.0.0.1:5500";

        res.status(200).json({ 
            message: "Login successful!", 
            token, 
            user: {
                id: user.id,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email
            },
            redirect: `${FRONTEND_URL}/Frontend/pages/userDash.html`
        });

    } catch (error) {
        console.error("❌ Error logging in:", error);
        res.status(500).json({ error: "Server error" });
    }
};

const forgotOtpStore = {};

// ✅ Step 1: User Requests Password Reset
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required." });
    }

    try {
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: "User not found." });
        }

        // Generate OTP for password reset
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        forgotOtpStore[email] = { otp, createdAt: Date.now() };

        // OTP expires in 5 minutes
        setTimeout(() => delete forgotOtpStore[email], 300000);

        // Send OTP to user email
        await sendOTP(email, otp);

        res.status(200).json({ message: "OTP sent to email. Please verify to reset password." });

    } catch (error) {
        console.error("❌ Error in forgotPassword:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// ✅ Step 2: Verify OTP for Password Reset
exports.verifyForgotOTP = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: "Email and OTP are required." });
    }

    if (!forgotOtpStore[email]) {
        return res.status(400).json({ message: "OTP expired or not found. Please request a new OTP." });
    }

    if (forgotOtpStore[email].otp !== otp) {
        return res.status(400).json({ message: "Invalid OTP. Please try again." });
    }

    try {
        delete forgotOtpStore[email].otp; // ✅ Remove OTP but keep email stored

        // ✅ Redirect to reset-password page
        res.status(200).json({ 
            message: "OTP Verified! Proceed to reset password.", 
            email, 
            redirect: "/reset-password" 
        });

    } catch (error) {
        console.error("❌ Error verifying forgot password OTP:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// ✅ Step 3: Reset Password
exports.resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
        return res.status(400).json({ message: "Email and new password are required." });
    }

    try {
        // Hash new password before updating
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password in database
        await pool.query("UPDATE users SET password = $1 WHERE email = $2", [hashedPassword, email]);

        res.status(200).json({ message: "Password reset successful! You can now log in.", redirect: "/login.html" });

    } catch (error) {
        console.error("❌ Error resetting password:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// Profile Update OTP Store
const profileOtpStore = {}; // Store OTPs temporarily

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // Use `true` for 465, `false` for 587
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
// ✅ Function to send OTP via Email
const sendOTPUpdate = async (email, otp) => {
    try {
        const mailOptions = {
            from: `"Team Vidyank " <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Your OTP for Email Verification",
            html: `
                <h2>Hello,</h2>
                <p>Your One-Time Password (OTP) for updating your email is:</p>
                <h3 style="color: blue;">${otp}</h3>
                <p>This OTP is valid for 5 minutes. Do not share it with anyone.</p>
                <p>Thank you,<br>Team Vidyank</p>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log(`📧 OTP sent to ${email}`);
    } catch (error) {
        console.error("❌ Error sending email:", error);
        throw new Error("Failed to send OTP via Email.");
    }
};


// ✅ Step 1: Generate & Send OTP for Email Update
exports.sendProfileUpdateOTP = async (req, res) => {
    const { newEmail } = req.body; 

    if (!newEmail) {
        return res.status(400).json({ message: "New Email is required for OTP verification." });
    }

    try {
        // ✅ Generate OTP
        let otp = Math.floor(100000 + Math.random() * 900000).toString();

        // ✅ Prevent multiple OTP requests within 1 minute
        if (profileOtpStore[newEmail] && (Date.now() - profileOtpStore[newEmail].createdAt < 60000)) {
            return res.status(429).json({ message: "OTP already sent. Please wait 1 minute before requesting again." });
        }

        profileOtpStore[newEmail] = { otp, createdAt: Date.now() };

        console.log(`🔐 OTP for ${newEmail}: ${otp}`);

        // ✅ Send OTP via Email
        await sendOTPUpdate(newEmail, otp);

        res.status(200).json({ message: `OTP sent to ${newEmail}. Please verify before updating.` });
    } catch (error) {
        console.error("❌ Error sending OTP:", error);
        res.status(500).json({ message: "Server error while sending OTP." });
    }
};

// ✅ Step 2: Verify OTP for Email Update

const verifiedEmails = {}; // Store verified emails temporarily

exports.verifyProfileUpdateOTP = async (req, res) => {
    const { newEmail, otp } = req.body;
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: Token is missing" });
    }

    const token = authHeader.split(" ")[1]; // Extract the token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        req.user = decoded; // Attach user to request
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid Token" });
    }

    if (!newEmail || !otp) {
        return res.status(400).json({ message: "New Email and OTP are required." });
    }

    if (!profileOtpStore[newEmail] || (Date.now() - profileOtpStore[newEmail].createdAt > 300000)) {
        return res.status(400).json({ message: "OTP expired or not found. Request a new OTP." });
    }

    if (profileOtpStore[newEmail].otp !== otp) {
        return res.status(400).json({ message: "Invalid OTP. Please try again." });
    }

    delete profileOtpStore[newEmail]; // Remove OTP after verification
    verifiedEmails[req.user.userId] = newEmail; // ✅ Store verified email

    res.status(200).json({ message: "OTP Verified! You can now update your profile." });
};



// ✅ Step 3: Update Profile (Only if Email OTP is Verified)
exports.updateProfile = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: Token is missing or invalid" });
    }

    const userId = req.user.userId;
    const { firstName, middleName, lastName, city, newEmail } = req.body;

    if (!firstName || !lastName || !city) {
        return res.status(400).json({ message: "First Name, Last Name, and City are required." });
    }

    try {
        const user = await findUserById(userId);
        if (!user) return res.status(404).json({ message: "User not found." });

        // ✅ Ensure OTP verification before updating email
        if (newEmail && newEmail !== user.email) {
            if (verifiedEmails[userId] !== newEmail) { // ✅ Check if email was verified
                return res.status(400).json({ message: "Email change requires OTP verification." });
            }
            delete verifiedEmails[userId]; // ✅ Remove verified email after update
        }

        // ✅ Update user profile
        const updatedUser = await updateUser(userId, firstName, middleName, lastName, city, user.contact, newEmail);
        console.log("✅ Updated User in DB:", updatedUser);

        // ✅ Generate new JWT if email changed
        let newToken = null;
        if (newEmail && newEmail !== user.email) {
            newToken = jwt.sign({ userId, email: newEmail }, process.env.JWT_SECRET, { expiresIn: "7d" });
        }

        res.status(200).json({ 
            message: "Profile updated successfully", 
            user: updatedUser, 
            token: newToken 
        });

    } catch (error) {
        console.error("❌ Error updating profile:", error);
        res.status(500).json({ message: "Server error while updating profile" });
    }
};


exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.user.userId;  // Extract userId from token
        const user = await findUserById(userId);  // Fetch user by ID from DB

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            id: user.id,
            firstName: user.first_name,
            middleName: user.middle_name,
            lastName: user.last_name,
            city: user.city,
            contact: user.contact,
            email: user.email
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Server error' });
    }
};