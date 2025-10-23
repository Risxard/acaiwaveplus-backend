import admin from 'firebase-admin';
import 'dotenv/config';
import * as fs from 'fs';
import * as path from 'path';

const serviceAccountPath = path.resolve(process.cwd(), process.env.FIREBASE_ADMIN_SDK!);

if (!fs.existsSync(serviceAccountPath)) {
  throw new Error(`Arquivo de credenciais não encontrado em: ${serviceAccountPath}`);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
