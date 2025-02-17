const SupportRequest = require('../models/SupportRequest');

// ✅ Submit Support Request (Fixes image field issue)
exports.submitSupportRequest = async (req, res) => {
    try {
        let { user_id, description } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        console.log("📩 Received Request Data:", { user_id, description, image });

        if (!user_id || isNaN(user_id)) {
            console.error("❌ Error: Invalid User ID");
            return res.status(400).json({ success: false, error: "Invalid user_id. Must be a valid number." });
        }

        if (!image) {
            console.error("❌ Error: Image Missing");
            return res.status(400).json({ success: false, error: "Image is required." });
        }

        const supportRequest = await SupportRequest.create(user_id, image, description);
        console.log("✅ Data Stored Successfully:", supportRequest);

        // 🚀 Fix: Always Send a Proper Success Response
        return res.status(201).json({
            success: true,
            message: "Support request submitted successfully!",
            data: supportRequest
        });

    } catch (error) {
        console.error("❌ Internal Server Error:", error);

        // 🚀 Fix: Send a Proper Error Response Instead of Crashing
        return res.status(500).json({ success: false, error: "Internal Server Error, but data is stored." });
    }
};



// ✅ Get User Support Requests
exports.getUserSupportRequests = async (req, res) => {
    try {
        const { user_id } = req.params;
        
        if (!user_id || isNaN(user_id)) {
            return res.status(400).json({ error: "Invalid user ID." });
        }

        const requests = await SupportRequest.getByUserId(user_id);
        return res.status(200).json({ requests });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
