import { UserRepository } from "../repository/userRepository";

export default class UserModel {
    uid: string;
    #repository: any;

    constructor() {
        this.#repository = new UserRepository();
    }

    findByUser(uid: string) {

        if (!uid) {
            return Promise.reject({
                code: 500,
                message: 'Usuário não informado',
            });
        }

        return this.#repository.getUserDataById(uid);
    }
}
