const pool = require('../config/db');

const createContactTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS contacts (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL,
            course VARCHAR(50) NOT NULL,
            parent_number VARCHAR(10) NOT NULL,
            student_number VARCHAR(10) NOT NULL,
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;
    await pool.query(query);
};

createContactTable();

module.exports = {
    async addContact(contact) {
        const { name, email, course, parentNumber, studentNumber, message } = contact;
        const query = `
            INSERT INTO contacts (name, email, course, parent_number, student_number, message)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
        `;
        const values = [name, email, course, parentNumber, studentNumber, message];
        const result = await pool.query(query, values);
        return result.rows[0];
    }
};
