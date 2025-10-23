import { Request, Response } from "express";
import { UserModel } from "../models/UserModel";
import { DeleteUserService } from "../services/deleteUserService";

interface IError {
    code: number;
    message: string;
}

export default class UserController {
    findByUser = async (request: Request, response: Response) => {
        const uid = (request as Request & { user: { uid: string } }).user.uid;
        const userModel = new UserModel();

        try {
            const user = await userModel.findByUser(uid);
            response.json(user);
        } catch (error: any) {
            response.status(error.code || 500).json(error);
        }
    };

    deleteUser = async (request: Request, response: Response) => {
        const { uid } = (request as Request & { user: { uid: string } }).user;
        const deleteUserService = new DeleteUserService();

        try {
            const result = await deleteUserService.execute(uid);
            return response.status(200).json(result);
        } catch (error: IError | any) {
            return response.status(error.code || 500).json(error);
        }
    };
}
