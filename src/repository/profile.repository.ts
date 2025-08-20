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

        return { code: 200, message: 'Watchlist atualizada com sucesso' };
    }


    async getWatchlist(uid: string, profileId: string) {
        const profileRef = this.firestore
            .collection('users')
            .doc(uid)
            .collection('profiles')
            .doc(profileId);

        const profileSnap = await profileRef.get();

        if (!profileSnap.exists) return null;

        const profileData = profileSnap.data();

        return profileData?.watchlist || { movie: [], tv: [] };
    }

    async createProfile(uid: string, data: { name: string, imgUrl?: string }) {
        const userRef = this.firestore.collection('users').doc(uid);
        const profilesRef = userRef.collection('profiles');

        const existingProfiles = await profilesRef.get();

        if (existingProfiles.size >= 5) {
            throw new Error("Número máximo de perfis (5) atingido");
        }

        const isMain = existingProfiles.empty;

        const settingsRef = userRef.collection('mainAccount').doc('settings');
        const settingsSnap = await settingsRef.get();

        if (!settingsSnap.exists) throw new Error("Configurações principais não encontradas");

        const preferences = settingsSnap.data();

        const profileData = {
            userInfoData: {
                name: data.name,
                theme: preferences.theme || 'light',
                language: preferences.language || 'pt-BR',
                img: {
                    url: data.imgUrl || 'https://m.media-amazon.com/images/G/02/CerberusPrimeVideo-FN38FSBD/adult-2.png'
                }
            },
            watchlist: {
                movie: [],
                tv: []
            },
            ...(isMain && { isMain: true })
        };

        const newProfileRef = profilesRef.doc();
        await newProfileRef.set({
            id: newProfileRef.id,
            ...profileData
        });

        return { id: newProfileRef.id, ...profileData };
    }



    async updateProfile(uid: string, profileId: string, updatedData: any) {
        const profileRef = this.firestore
            .collection('users')
            .doc(uid)
            .collection('profiles')
            .doc(profileId);

        const profileSnap = await profileRef.get();
        if (!profileSnap.exists) {
            throw { code: 404, message: 'Perfil não encontrado' };
        }

        await profileRef.update(updatedData);

        const updatedSnap = await profileRef.get();
        return {
            id: updatedSnap.id,
            ...updatedSnap.data()
        };
    }


    async deleteProfile(uid: string, profileId: string) {
        const profileRef = this.firestore
            .collection('users')
            .doc(uid)
            .collection('profiles')
            .doc(profileId);

        const profileSnap = await profileRef.get();

        if (!profileSnap.exists) {
            throw { code: 404, message: 'Perfil não encontrado' };
        }

        const profileData = profileSnap.data();
        if (profileData?.isMain) {
            throw { code: 400, message: 'Não é permitido deletar o perfil principal' };
        }

        await profileRef.delete();
        return { message: 'Perfil deletado com sucesso' };
    }

}

