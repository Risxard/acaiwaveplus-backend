import admin from 'firebase-admin'
import { Request, Response } from 'express';

export class UserController {

    findByUser(request: Request, response: Response) {
        admin.firestore()
            .collection('users')
            .get()
            .then(snapshot => {
                const users = snapshot.docs.map(doc => ({
                    ...doc.data(),
                    uid: doc.id
                }))
                response.json(users)
            })
            .catch(error => {
                response.status(500).json({ error: error.message });
            });
    }
}