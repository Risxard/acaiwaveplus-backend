import { Request, Response, NextFunction } from 'express';
import admin from '../config/firebaseAdmin';

interface AuthenticatedRequest extends Request {
  user?: {
    uid: string;
    email?: string;
  };
}

export const authenticateFirebase = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token não informado' });
  }

  const idToken = authHeader.split('Bearer ')[1].trim();

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
    };

    return next();
  } catch (error) {
    console.error('Erro ao verificar token Firebase:', error);
    return res.status(401).json({ message: 'Token inválido ou expirado' });
  }
};
