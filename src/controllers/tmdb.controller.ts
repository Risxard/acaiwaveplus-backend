import { Request, Response } from "express";
import tmdbService from "../services/tmdbService";

export default class TMDBController {
  getTrending = async (req: Request, res: Response) => {
    try {
      const { timeWindow, pageType, language, page = 1 } = req.query;


      if (!timeWindow || !pageType || !language) {
        return res.status(400).json({
          error: "Parâmetros obrigatórios: timeWindow, pageType, language",
        });
      }

      const movies = await tmdbService.getTrending(
        timeWindow as "day" | "week",
        pageType as "movie" | "tv",
        language as string,
        page as number,
      );

      return res.status(200).json(movies);
    } catch (error) {
      console.error("Erro no controller:", error);
      return res.status(500).json({ error: "Erro ao buscar filmes." });
    }
  }


  getImagesById = async (req: Request, res: Response) => {
    try {
      const { mediaId, mediaType, language } = req.query;

      if (!mediaId || !mediaType || !language) {
        return res.status(400).json({
          error: "Parâmetros obrigatórios: mediaId, mediaType e language",
        });
      }

      const movies = await tmdbService.getImagesById(
        Number(mediaId),
        mediaType as "movie" | "tv",
        language as string
      );

      return res.status(200).json(movies);
    } catch (error) {
      console.error("Erro no controller:", error);
      return res.status(500).json({ error: "Erro ao buscar imagens." });
    }
  };


  getLogoImagesById = async (req: Request, res: Response) => {
    try {
      const { mediaId, mediaType, language } = req.query;

      if (!mediaId || !mediaType || !language) {
        return res.status(400).json({
          error: "Parâmetros obrigatórios: mediaId, mediaType e language",
        });
      }

      const movies = await tmdbService.getLogoImagesById(
        Number(mediaId),
        mediaType as "movie" | "tv",
        language as string
      );

      return res.status(200).json(movies);
    } catch (error) {
      console.error("Erro no controller:", error);
      return res.status(500).json({ error: "Erro ao buscar imagens." });
    }
  };

  getPostersImagesById = async (req: Request, res: Response) => {
    try {
      const { mediaId, mediaType, language } = req.query;

      if (!mediaId || !mediaType || !language) {
        return res.status(400).json({
          error: "Parâmetros obrigatórios: mediaId, mediaType e language",
        });
      }

      const movies = await tmdbService.getLogoImagesById(
        Number(mediaId),
        mediaType as "movie" | "tv",
        language as string
      );

      return res.status(200).json(movies);
    } catch (error) {
      console.error("Erro no controller:", error);
      return res.status(500).json({ error: "Erro ao buscar imagens." });
    }
  };


  getBackdropsImagesById = async (req: Request, res: Response) => {
    try {
      const { mediaId, mediaType, language } = req.query;

      if (!mediaId || !mediaType || !language) {
        return res.status(400).json({
          error: "Parâmetros obrigatórios: mediaId, mediaType e language",
        });
      }

      const movies = await tmdbService.getLogoImagesById(
        Number(mediaId),
        mediaType as "movie" | "tv",
        language as string
      );

      return res.status(200).json(movies);
    } catch (error) {
      console.error("Erro no controller:", error);
      return res.status(500).json({ error: "Erro ao buscar imagens." });
    }
  };

}

