const express = require("express");
const {
    registerUser,
    verifyOTP,
    loginUser,
    verifyLoginOTP,
    forgotPassword,
    verifyForgotOTP,
    resetPassword,
    sendProfileUpdateOTP,
    verifyProfileUpdateOTP,
    updateProfile,
    getUserProfile
} = require("../controllers/authController");
const { authenticate } = require("../middlewares/authMiddleware");
const { getCategories } = require("../models/User");

const router = express.Router();

router.post("/register", registerUser);
router.post("/verify-otp", verifyOTP);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/verify-forgot-otp", verifyForgotOTP);
router.post("/reset-password", resetPassword);
router.post("/send-profile-update-otp", sendProfileUpdateOTP); // Send OTP for Profile Update
router.post("/verify-profile-update-otp",authenticate, verifyProfileUpdateOTP); // Verify OTP for Profile Update
router.put("/update-profile",authenticate, updateProfile); // Update Profile
router.get("/user-profile", authenticate, getUserProfile);

router.get("/categories", async (req, res) => {
    try {
        const categories = await getCategories();
        res.status(200).json(categories);
    } catch (error) {
        console.error("❌ Error fetching categories:", error);
        res.status(500).json({ error: "Server error" });
    }
});



module.exports = router;
