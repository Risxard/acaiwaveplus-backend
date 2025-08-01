import { ProfileRepository } from "../repository/profileRepository";

export default class ProfileModel {
    uid: string;
    #repository: ProfileRepository;
    private repository = new ProfileRepository();

    constructor() {
        this.#repository = new ProfileRepository();
    }

    async updateProfileLanguage(profileId: string, language: string) {
        if (!this.uid || !profileId || !language) {
            return Promise.reject({
                code: 400,
                message: "Dados insuficientes para atualizar a linguagem do perfil",
            });
        }

        const profiles = await this.#repository.getUserProfiles(this.uid);

        const updatedProfiles = profiles.map((profile: any) => {
            if (profile.id === profileId) {
                return {
                    ...profile,
                    userInfoData: {
                        ...profile.userInfoData,
                        language,
                    },
                };
            }
            return profile;
        });

        await this.#repository.updateUserProfiles(this.uid, updatedProfiles);

        return { message: "Linguagem do perfil atualizada com sucesso" };
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


}
