const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const authMiddleware = (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add user from payload
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Middleware to check if user is band admin
const bandAdminMiddleware = async (req, res, next) => {
  try {
    const { Band, BandMember } = require('../models');
    
    const bandId = req.params.bandId || req.body.bandId;
    
    if (!bandId) {
      return res.status(400).json({ message: 'Band ID is required' });
    }

    // Check if user is admin of this band
    const membership = await BandMember.findOne({
      where: {
        userId: req.user.id,
        bandId: bandId,
        role: 'admin'
      }
    });

    if (!membership) {
      return res.status(403).json({ message: 'Not authorized as band admin' });
    }

    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = { authMiddleware, bandAdminMiddleware };
