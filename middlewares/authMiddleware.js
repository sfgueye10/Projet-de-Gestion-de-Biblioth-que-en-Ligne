import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'Falilou1';

export const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Accès refusé, token manquant' });
  }

  try {
    const verified = jwt.verify(token, secretKey);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Token invalide' });
  }
};
