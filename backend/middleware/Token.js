const jwt = require("jsonwebtoken");
const secret = process.env.secretKey;

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: "Token not provided" });
  }

  jwt.verify(token.replace("Bearer ", ""), secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Attach user data to the request object
    req.user = decoded;

    next(); // Proceed to the next middleware or route
  });
}


module.exports = verifyToken;

