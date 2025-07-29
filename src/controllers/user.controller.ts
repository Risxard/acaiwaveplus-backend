import admin from 'firebase-admin'
import { Request, Response } from 'express'

export class UserController {
    async findByUser(request: Request, response: Response) {
        const uid = (request as Request & { user: { uid: string } }).user.uid

        try {
            const userRef = admin.firestore().collection('users').doc(uid)
            const userDoc = await userRef.get()

            if (!userDoc.exists) {
                return response.status(404).json({ error: 'Usuário não encontrado' })
            }

            const userData = userDoc.data()


            const profilesSnapshot = await userRef.collection('profiles').get()
            const profiles = profilesSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))


            const mainAccountSnapshot = await userRef.collection('mainAccount').get()
            const mainAccount = mainAccountSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))


            response.json({
                ...userData,
                uid: userDoc.id,
                profiles,
                mainAccount
            })

        } catch (error: any) {
            response.status(500).json({
                error: 'Erro ao buscar dados do usuário',
                details: error.message
            })
        }
    }
}
