const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
    try {
        let token;

        // Check if the token is present in the cookies
        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        } else {
            // Check if the authorization header exists
            const authHeader = req.headers["authorization"];
            if (!authHeader) {
                return res.status(401).json({ error: "Unauthorized - No Token Provided" });
            }

            // Split the authorization header to extract the token
            token = authHeader.split("Bearer ")[1];
        }

        // Verify token
        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No Token Provided" });
        }

        // Skip token verification for logout endpoint
        if (req.path === '/logout') {
            return next();
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id).select("-password");

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            req.user = user;
            next();
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: "Unauthorized - Token Expired" });
            } else {
                return res.status(401).json({ error: "Unauthorized - Invalid Token" });
            }
        }
    } catch (error) {
        console.log("Error in auth middleware: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = auth;
