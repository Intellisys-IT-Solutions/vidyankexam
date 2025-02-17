const pool = require('../config/db'); 

const SupportRequest = {
    create: async (user_id, image, description) => { // ✅ Match column name
        const query = `
            INSERT INTO support_requests (user_id, image, description, created_at)
            VALUES ($1, $2, $3, NOW()) RETURNING *;
        `;
        const values = [user_id, image, description];
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    getByUserId: async (user_id) => {
        const query = `SELECT * FROM support_requests WHERE user_id = $1;`;
        const result = await pool.query(query, [user_id]);
        return result.rows;
    }
};

module.exports = SupportRequest;
