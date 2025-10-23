import { UserRepository } from "../repository/user.repository";

export class UserModel {
    uid: string;
    #repository: UserRepository;

    constructor() {
        this.#repository = new UserRepository();
    }

    async findByUser(uid: string) {
        if (!uid) {
            return Promise.reject({
                code: 400,
                message: 'Usuário não informado',
            });
        }

        return this.#repository.getUserDataById(uid);
    }

    async deleteUserData(uid: string) {
        if (!uid) {
            return Promise.reject({
                code: 400,
                message: 'UID não informado',
            });
        }

        return this.#repository.deleteUserData(uid);
    }
}
