const jwt = require("jsonwebtoken");
const pool = require("../config/db");

// ✅ Middleware to Authenticate User
exports.authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded; // Attach user data to request object
    next();
  } catch (error) {
    console.error("❌ Invalid Token:", error);
    res.status(401).json({ message: "Unauthorized: Token is invalid" });
  }
};






// ✅ Middleware to Authorize Superadmin Only
exports.authorize = (requiredRoles) => async (req, res, next) => {
    try {
        const userRole = await pool.query(
            "SELECT r.name FROM roles r JOIN user_roles ur ON r.id = ur.role_id WHERE ur.user_id = $1",
            [req.user.id]
        );

        const roles = userRole.rows.map(row => row.name);
        if (!requiredRoles.some(role => roles.includes(role))) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
