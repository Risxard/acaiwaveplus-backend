import { Request, Response } from 'express';
import { ProfileModel } from '../models/profileModel';

interface IError {
    code: number;
    message: string;
}

export default class ProfileController {
    updateLanguage = async (req: Request, res: Response) => {
        const uid = (req as Request & { user: { uid: string } }).user.uid;
        const { profileId } = req.params;
        const { language } = req.body;

        const model = new ProfileModel();
        model.uid = uid;

        model.updateProfileLanguage(profileId, language)
            .then(result => res.json(result))
            .catch((error: IError) => res.status(error.code).json(error));
    }

    updateWatchlist = async (req: Request, res: Response) => {
        const uid = (req as Request & { user: { uid: string } }).user.uid;
        const profileId = req.params.profileId;
        const { type, itemId, action } = req.body;

        const profileModel = new ProfileModel();

        try {
            const result = await profileModel.updateWatchlist(uid, profileId, type, itemId, action);
            return res.json(result);
        } catch (error) {
            return res.status(error.code || 500).json(error);
        }
    };


    getAllProfiles = async (req: Request, res: Response) => {
        const uid = (req as Request & { user: { uid: string } }).user.uid;
        const userModel = new ProfileModel();

        try {
            const profiles = await userModel.getUserProfiles(uid);

            if (!profiles.length) {
                return res.status(404).json({
                    code: 404,
                    message: 'Nenhum perfil encontrado para este usuário',
                });
            }

            return res.json(profiles);
        } catch (error) {
            return res.status(error.code || 500).json(error);
        }
    };


    getProfileById = async (req: Request, res: Response) => {
        const uid = (req as Request & { user: { uid: string } }).user.uid;
        const profileId = req.params.profileId;
        const profileModel = new ProfileModel();

        console.log('UID:', uid);
        console.log('Profile ID:', profileId);

        try {
            const profile = await profileModel.getProfileById(uid, profileId);

            if (!profile) {
                return res.status(404).json({
                    code: 404,
                    message: 'Perfil não encontrado',
                });
            }

            return res.json(profile);
        } catch (error) {
            return res.status((error as any).code || 500).json(error);
        }
    };




}
