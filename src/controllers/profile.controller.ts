import { Request, Response } from 'express';
import { ProfileModel } from '../models/ProfileModel';

interface IError {
    code: number;
    message: string;
}

export default class ProfileController {

    /**
     * Busca todos os perfis associados ao usuário autenticado.
     *
     * @param req - Objeto de requisição Express contendo:
     *   - user.uid: string (ID do usuário autenticado)
     * @param res - Objeto de resposta Express
     * @returns Retorna um array de perfis ou erro caso nenhum perfil seja encontrado.
     */

    getAllProfiles = async (req: Request, res: Response) => {
        const uid = (req as Request & { user: { uid: string } }).user.uid;
        const profileModel = new ProfileModel();

        try {
            const profiles = await profileModel.getUserProfiles(uid);

            if (!profiles.length) {
                return res.status(404).json({
                    code: 404,
                    message: 'Nenhum perfil encontrado para este usuário',
                });
            }

            return res.json(profiles);
        } catch (error: any) {
            return res.status(error.code || 500).json(error);
        }
    };


    /**
 * Busca um perfil específico pelo seu ID.
 *
 * @param req - Objeto de requisição Express contendo:
 *   - user.uid: string (ID do usuário autenticado)
 *   - params.profileId: string (ID do perfil a ser buscado)
 * @param res - Objeto de resposta Express
 * @returns Retorna o perfil encontrado ou erro caso não exista.
 */

    getProfileById = async (req: Request, res: Response) => {
        const uid = (req as Request & { user: { uid: string } }).user.uid;
        const profileId = req.params.profileId;
        const profileModel = new ProfileModel();

        try {
            const profile = await profileModel.getProfileById(uid, profileId);

            if (!profile) {
                return res.status(404).json({
                    code: 404,
                    message: 'Perfil não encontrado',
                });
            }

            return res.json(profile);
        } catch (error: any) {
            return res.status(error.code || 500).json(error);
        }
    };


    /**
 * Atualiza a watchlist de um perfil (adiciona ou remove um item).
 *
 * @param req - Objeto de requisição Express contendo:
 *   - user.uid: string (ID do usuário autenticado)
 *   - params.profileId: string (ID do perfil)
 *   - body.type: string (Tipo do item, ex: 'movie', 'series')
 *   - body.itemId: string (ID do item a ser adicionado/removido)
 *   - body.action: string ('add' ou 'remove')
 * @param res - Objeto de resposta Express
 * @returns Retorna o resultado da operação ou erro.
 */

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


    /**
 * Busca a watchlist de um perfil específico.
 *
 * @param req - Objeto de requisição Express contendo:
 *   - user.uid: string (ID do usuário autenticado)
 *   - params.profileId: string (ID do perfil)
 * @param res - Objeto de resposta Express
 * @returns Retorna a watchlist do perfil ou erro caso não exista.
 */

    getWatchlist = async (req: Request, res: Response) => {
        const uid = (req as Request & { user: { uid: string } }).user.uid;
        const profileId = req.params.profileId;
        const profileModel = new ProfileModel();

        try {
            const watchlist = await profileModel.getWatchlist(uid, profileId);

            if (!watchlist) {
                return res.status(404).json({
                    code: 404,
                    message: 'Perfil não encontrado ou sem watchlist',
                });
            }

            return res.json(watchlist);
        } catch (error: any) {
            return res.status(error.code || 500).json({ message: 'Erro interno', details: error });
        }
    };


    /**
 * Cria um novo perfil para o usuário autenticado.
 *
 * @param req - Objeto de requisição Express contendo:
 *   - user.uid: string (ID do usuário autenticado)
 *   - body.name: string (Nome do perfil, obrigatório)
 *   - body.imgUrl?: string (URL da imagem do perfil, opcional)
 * @param res - Objeto de resposta Express
 * @returns Retorna o perfil criado ou erro.
 */
    createProfile = async (req: Request, res: Response) => {
        const uid = (req as any).user.uid;
        const { name, imgUrl } = req.body;

        if (!name) return res.status(400).json({ message: "Nome do perfil é obrigatório" });

        const profileModel = new ProfileModel();

        try {
            const profile = await profileModel.createProfile(uid, { name, imgUrl });
            return res.status(201).json(profile);
        } catch (error: any) {
            return res.status(500).json({ message: "Erro ao criar perfil", error: error.message });
        }
    };


    /**
 * Atualiza os dados de um perfil existente.
 *
 * @param req - Objeto de requisição Express contendo:
 *   - user.uid: string (ID do usuário autenticado)
 *   - params.profileId: string (ID do perfil)
 *   - body: objeto com os campos a serem atualizados
 * @param res - Objeto de resposta Express
 * @returns Retorna o perfil atualizado ou erro.
 */

    updateProfile = async (req: Request, res: Response) => {
        const uid = (req as any).user.uid;
        const profileId = req.params.profileId;
        const updatedData = req.body;

        try {
            const model = new ProfileModel();
            const updatedProfile = await model.updateProfile(uid, profileId, updatedData);

            return res.json(updatedProfile);
        } catch (error) {
            return res.status(error.code || 500).json({
                message: 'Erro ao atualizar perfil',
                error: error.message || error
            });
        }
    }



    /**
 * Deleta um perfil do usuário autenticado.
 *
 * @param req - Objeto de requisição Express contendo:
 *   - user.uid: string (ID do usuário autenticado)
 *   - params.profileId: string (ID do perfil a ser deletado)
 * @param res - Objeto de resposta Express
 * @returns Retorna o resultado da exclusão ou erro.
 */

    deleteProfile = async (req: Request, res: Response) => {
        const uid = (req as any).user.uid;
        const { profileId } = req.params;

        const model = new ProfileModel();

        try {
            const result = await model.deleteProfile(uid, profileId);
            return res.json(result);
        } catch (error) {
            return res.status(error.code || 500).json({
                message: 'Erro ao deletar perfil.',
                error: error.message || error,
            });
        }
    };
}




























