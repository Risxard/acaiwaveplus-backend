import { Request, Response } from 'express'
import { UserModel } from '../models/UserModel'

interface IUser {
    uid: string;
}

interface IError {
    code: number;
    message: string;
}
export class UserController {

    findByUser = async (request: Request, response: Response) => {
        const uid = (request as Request & { user: { uid: string } }).user.uid;
        const userModel = new UserModel();
        userModel.uid = uid;

        userModel.findByUser(uid).then((users: IUser[]) => {
            response.json(users);
        }).catch((error: IError) => {
            response.status(error.code).json(error);
        })
    }
}
