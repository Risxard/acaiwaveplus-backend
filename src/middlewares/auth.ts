import { Request, Response, NextFunction } from 'express';
import admin from '../config/firebaseAdmin';

interface AuthenticatedRequest extends Request {
  user?: {
    uid: string;
  };
}

export const authenticateFirebase = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token não informado' });
  }

  const idToken = authHeader.split(' ')[1];

  try {
    const decoded = await admin.auth().verifyIdToken(idToken);

    req.user = {
      uid: decoded.user_id,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido ou expirado' });
  }
};