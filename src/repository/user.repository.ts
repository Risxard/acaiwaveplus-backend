import admin from 'firebase-admin'

export class UserRepository {

    private firestore = admin.firestore()

    async getUserDataById(uid: string) {
        const userRef = this.firestore.collection('users').doc(uid)
        const userDoc = await userRef.get()

        if (!userDoc.exists) {
            return null
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

        return {
            ...userData,
            uid: userDoc.id,
            profiles,
            mainAccount
        }
    }
}