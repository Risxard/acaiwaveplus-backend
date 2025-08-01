import admin, { firestore } from 'firebase-admin';

export class ProfileRepository {
    private firestore = admin.firestore();

    async getUserProfiles(uid: string) {
        const profilesRef = this.firestore.collection('users').doc(uid).collection('profiles');
        const snapshot = await profilesRef.get();

        const profiles = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return profiles;
    }


    async updateUserProfiles(uid: string, profiles: any[]) {
        const userRef = this.firestore.collection('users').doc(uid);
        await userRef.update({ profiles });
    }

    async getProfileById(uid: string, profileId: string) {
        const profileRef = this.firestore
            .collection('users')
            .doc(uid)
            .collection('profiles')
            .doc(profileId);

        const profileDoc = await profileRef.get();

        if (!profileDoc.exists) {
            return null;
        }

        return {
            id: profileDoc.id,
            ...profileDoc.data(),
        };

    }


    async updateWatchlist(uid: string, profileId: string, type: 'movie' | 'tv', itemId: number, action: 'add' | 'remove') {
        const profileRef = admin.firestore()
            .collection('users')
            .doc(uid)
            .collection('profiles')
            .doc(profileId);

        const profileSnap = await profileRef.get();
        if (!profileSnap.exists) {
            throw { code: 404, message: 'Perfil não encontrado' };
        }

        const profileData = profileSnap.data();
        const currentList = profileData?.watchlist?.[type] || [];

        const updatedList = action === 'add'
            ? Array.from(new Set([...currentList, itemId]))
            : currentList.filter((id: number) => id !== itemId);

        await profileRef.update({
            [`watchlist.${type}`]: updatedList
        });

        const updatedProfile = await profileRef.get();
        return updatedProfile.data()?.watchlist || {};
    }




}

