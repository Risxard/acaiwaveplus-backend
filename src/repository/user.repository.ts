import admin from 'firebase-admin';

export class UserRepository {
    private firestore = admin.firestore();

    async getUserDataById(uid: string) {
        const userRef = this.firestore.collection('users').doc(uid);
        const userDoc = await userRef.get();

        if (!userDoc.exists) return null;

        const userData = userDoc.data();

        const profilesSnapshot = await userRef.collection('profiles').get();
        const profiles = profilesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        const mainAccountSnapshot = await userRef.collection('mainAccount').get();
        const mainAccount = mainAccountSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return {
            ...userData,
            uid: userDoc.id,
            profiles,
            mainAccount
        };
    }

    private async deleteDocumentRecursively(docRef: FirebaseFirestore.DocumentReference) {
        const subCollections = await docRef.listCollections();
        for (const subCol of subCollections) {
            await this.deleteCollectionRecursively(subCol);
        }
        await docRef.delete();
    }

    private async deleteCollectionRecursively(colRef: FirebaseFirestore.CollectionReference) {
        const snapshot = await colRef.get();
        for (const docSnap of snapshot.docs) {
            await this.deleteDocumentRecursively(docSnap.ref);
        }
    }

    async deleteUserData(uid: string) {
        const userDocRef = this.firestore.collection('users').doc(uid);
        await this.deleteDocumentRecursively(userDocRef);
    }
}
