import { ProfileRepository } from "../repository/profile.repository";

export class ProfileModel {
    uid: string;
    #repository: ProfileRepository;
    private repository = new ProfileRepository();

    constructor() {
        this.#repository = new ProfileRepository();
    }


    async updateWatchlist(uid: string, profileId: string, type: 'movie' | 'tv', itemId: number, action: 'add' | 'remove') {
        if (!uid || !profileId || !type || !itemId || !action) {
            return Promise.reject({ code: 400, message: 'Dados incompletos' });
        }

        const updatedWatchlist = await this.#repository.updateWatchlist(uid, profileId, type, itemId, action);

        return {
            watchlist: updatedWatchlist
        };
    }

    async getWatchlist(uid: string, profileId: string) {
        if (!uid) {
            return Promise.reject({
                code: 400,
                message: 'UID não fornecido',
            });
        }
        if (!profileId) {
            return Promise.reject({
                code: 400,
                message: 'ProfileId não fornecido',
            });
        }

        return this.#repository.getWatchlist(uid, profileId);
    }



    getUserProfiles(uid: string) {
        if (!uid) {
            return Promise.reject({
                code: 400,
                message: 'UID não fornecido',
            });
        }

        return this.#repository.getUserProfiles(uid);
    }

    getProfileById(uid: string, profileId: string) {
        if (!uid || !profileId) {
            return Promise.reject({
                code: 400,
                message: 'UID ou Profile ID não fornecido',
            });
        }

        return this.#repository.getProfileById(uid, profileId);
    }


    createProfile(uid: string, data: { name: string; imgUrl?: string }) {
        return this.#repository.createProfile(uid, data);
    }


    async updateProfile(uid: string, profileId: string, updatedData: any) {
        return await this.repository.updateProfile(uid, profileId, updatedData);
    }

    deleteProfile(uid: string, profileId: string) {
        return this.repository.deleteProfile(uid, profileId);
    }

}
