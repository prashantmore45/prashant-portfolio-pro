const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    
  let token = req.header('x-auth-token');

  if (!token && req.headers.authorization) {
    const parts = req.headers.authorization.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
      token = parts[1];
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const secret = process.env.JWT_SECRET || "secret"; 
    
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Token Verification Failed:", err.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};