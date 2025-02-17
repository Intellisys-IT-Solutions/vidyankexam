const pool = require("../config/db");

// ✅ Create a new user in the database after OTP verification
const createUser = async (firstName, lastName, email, password, city, contact, categoryId, referralSource, instituteClassName, isVerified) => {
    try {
        const result = await pool.query(
            "INSERT INTO users (first_name, last_name, email, password, city, contact, category, referral_source, institute_class_name, is_verified) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
            [firstName, lastName, email, password, city, contact, categoryId, referralSource, instituteClassName, isVerified]
        );
        return result.rows[0];
    } catch (error) {
        console.error("❌ Error inserting user:", error);
        throw error;
    }
};



// ✅ Fetch categories from the database
const getCategories = async () => {
    try {
        const result = await pool.query("SELECT category_id, name FROM category");
        return result.rows;
    } catch (error) {
        console.error("❌ Error fetching categories:", error);
        throw error;
    }
};



// ✅ Find a user by email (used for login and OTP verification)
const findUserByEmail = async (email) => {
    console.log("🔍 Looking up user by email:", email);

    const query = "SELECT * FROM users WHERE LOWER(email) = LOWER($1)"; // ✅ Fix case-sensitivity
    const values = [email];

    const result = await pool.query(query, values);
    console.log("🔍 Database Query Result:", result.rows);

    return result.rows[0]; // Return user if found
};



// ✅ Check if a user exists with either the same email or contact number
const findUserByEmailOrContact = async (email, contact) => {
    try {
        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1 OR contact = $2",
            [email, contact]
        );
        return result.rows[0];
    } catch (error) {
        console.error("❌ Error checking existing user:", error);
        throw error;
    }
};

// ✅ Update user verification status to TRUE after OTP verification
const verifyUser = async (email) => {
    try {
        const result = await pool.query(
            "UPDATE users SET is_verified = TRUE WHERE email = $1 RETURNING *",
            [email]
        );
        console.log("✅ User verification updated:", result.rows[0]); // Debugging
        return result.rows[0];
    } catch (error) {
        console.error("❌ Error verifying user:", error);
        throw error;
    }
};


const updateUser = async (userId, firstName, middleName, lastName, city, contact, email) => {
    const query = `
        UPDATE users
        SET first_name = $1, middle_name = $2, last_name = $3, city = $4, contact = $5, email = $6
        WHERE id = $7
        RETURNING *;
    `;
    const values = [firstName, middleName, lastName, city, contact, email, userId];
    const result = await pool.query(query, values);
    return result.rows[0];
};


const findUserById = async (userId) => {
    const result = await pool.query(
        "SELECT id, first_name, middle_name, last_name, city, contact, email FROM users WHERE id = $1",
        [userId]
    );
    return result.rows[0]; // Return the user object
};



module.exports = {
    createUser,
    findUserByEmail,
    findUserByEmailOrContact,
    verifyUser,
    updateUser,
    findUserById,
    getCategories // Ensure this is included in exports
};

