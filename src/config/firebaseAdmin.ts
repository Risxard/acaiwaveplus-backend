import admin from 'firebase-admin';
require('dotenv').config();

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(process.env.FIREBASE_ADMIN_SDK),
  });
} else {
  admin.app();
}

export default admin;
