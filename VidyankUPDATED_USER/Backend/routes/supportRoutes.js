const express = require('express');
const router = express.Router();
const supportController = require('../controllers/supportController');
const multer = require('multer');

// 🛠️ Set Up Multer for File Upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// ✅ Ensure 'image' matches frontend field name
router.post('/submit-support', upload.single('image'), supportController.submitSupportRequest);

router.get('/user/:user_id', supportController.getUserSupportRequests);

module.exports = router;
