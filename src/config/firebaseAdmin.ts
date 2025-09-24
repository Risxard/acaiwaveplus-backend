import admin from 'firebase-admin';
import 'dotenv/config';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(process.env.FIREBASE_ADMIN_SDK),
  });
}

export default admin;
