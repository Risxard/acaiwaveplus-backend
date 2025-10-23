import admin from "firebase-admin";
import { UserModel } from "../models/UserModel";

export class DeleteUserService {
    #userModel: UserModel;

    constructor() {
        this.#userModel = new UserModel();
    }

    async execute(uid: string) {
        if (!uid) throw { code: 400, message: "UID não informado" };

        try {
            await this.#userModel.deleteUserData(uid);

            await admin.auth().deleteUser(uid);

            return { success: true, message: "Usuário e dados apagados com sucesso!" };
        } catch (err: any) {
            console.error("Erro ao deletar usuário:", err);
            throw { code: 500, message: err.message || "Falha ao deletar usuário" };
        }
    }
}
