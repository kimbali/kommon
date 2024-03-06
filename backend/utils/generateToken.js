import jwt from 'jsonwebtoken';

const _generateToken = (res, userId, expiresIn = '30d') => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn,
  });

  // Set JWT as an HTTP-Only cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 35 * 24 * 60 * 60 * 1000, // 35 days
  });
};

export const generateToken = (req, userId, expiresIn = '35d') => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn,
  });

  return token;
};

export default generateToken;
