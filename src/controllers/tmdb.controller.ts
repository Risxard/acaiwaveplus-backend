import { Request, Response } from "express";
import tmdbService from "../services/tmdbService";

export default class TMDBController {
  getTrending = async (req: Request, res: Response) => {
    try {
      const { timeWindow, pageType, language, page = 1 } = req.query;


      if (!timeWindow || !pageType || !language || !page) {
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

  getRecommendations = async (req: Request, res: Response) => {
    try {
      const { mediaType, mediaId, language, page = 1 } = req.query;

      if (!mediaType || !mediaId || !language) {
        return res.status(400).json({
          error: "Parâmetros obrigatórios: mediaType, mediaId, language, page",
        });
      }

      const movies = await tmdbService.getRecommendations(
        mediaType as "movie" | "tv",
        Number(mediaId),
        language as string,
        Number(page),
      );

      return res.status(200).json(movies);
    } catch (error) {
      console.error("Erro no controller:", error);
      return res.status(500).json({ error: "Erro ao buscar recomendações." });
    }
  };

  getNowPlaying = async (req: Request, res: Response) => {
    try {
      const { pageType, language, region, page = 1 } = req.query;

      if (!pageType || !region || !language) {
        return res.status(400).json({
          error: "Parâmetros obrigatórios: mediaType, mediaId, language, page",
        });
      }



      const movies = await tmdbService.getNowPlaying(
        pageType as "movie" | "tv",
        language as string,
        region as string,
        Number(page),
      );

      return res.status(200).json(movies);
    } catch (error) {
      console.error("Erro no controller:", error);
      return res.status(500).json({ error: "Erro ao buscar nos cinemas." });
    }
  };

  getPerGenres = async (req: Request, res: Response) => {
    try {
      const { pageType, language, with_genres, page } = req.query;

      if (!pageType || !language || !with_genres || !page) {
        return res.status(400).json({
          error: "Parâmetros obrigatórios: pageType, language, page e with_genres",
        });
      }

      const data = await tmdbService.getPerGenres(
        pageType as "movie" | "tv",
        language as string,
        with_genres as string,
        Number(page),
      );

      return res.status(200).json(data);
    } catch (error) {
      console.error("Erro no controller:", error);
      return res.status(500).json({ error: "Erro ao buscar medias por genero." });
    }
  };







  getImagesById = async (req: Request, res: Response) => {
    try {
      const { mediaId, mediaType, language, originalLanguage } = req.query;

      if (!mediaId || !mediaType || !language || !originalLanguage) {
        return res.status(400).json({
          error: "Parâmetros obrigatórios: mediaId, mediaType e language",
        });
      }

      const movies = await tmdbService.getImagesById(
        Number(mediaId),
        mediaType as "movie" | "tv",
        language as string,
        originalLanguage as string
      );

      return res.status(200).json(movies);
    } catch (error) {
      console.error("Erro no controller:", error);
      return res.status(500).json({ error: "Erro ao buscar imagens." });
    }
  };


  getLogoImagesById = async (req: Request, res: Response) => {
    try {
      const { mediaId, mediaType, language, originalLanguage } = req.query;

      if (!mediaId || !mediaType || !language || !originalLanguage) {
        return res.status(400).json({
          error: "Parâmetros obrigatórios: mediaId, mediaType e language",
        });
      }

      const movies = await tmdbService.getLogoImagesById(
        Number(mediaId),
        mediaType as "movie" | "tv",
        language as string,
        originalLanguage as string
      );

      return res.status(200).json(movies);
    } catch (error) {
      console.error("Erro no controller:", error);
      return res.status(500).json({ error: "Erro ao buscar imagens." });
    }
  };

  getPostersImagesById = async (req: Request, res: Response) => {
    try {
      const { mediaId, mediaType, language, originalLanguage } = req.query;

      if (!mediaId || !mediaType || !language || !originalLanguage) {
        return res.status(400).json({
          error: "Parâmetros obrigatórios: mediaId, mediaType e language",
        });
      }

      const movies = await tmdbService.getLogoImagesById(
        Number(mediaId),
        mediaType as "movie" | "tv",
        language as string,
        originalLanguage as string
      );

      return res.status(200).json(movies);
    } catch (error) {
      console.error("Erro no controller:", error);
      return res.status(500).json({ error: "Erro ao buscar imagens." });
    }
  };


  getBackdropsImagesById = async (req: Request, res: Response) => {
    try {
      const { mediaId, mediaType, language, originalLanguage } = req.query;

      if (!mediaId || !mediaType || !language || !originalLanguage) {
        return res.status(400).json({
          error: "Parâmetros obrigatórios: mediaId, mediaType e language",
        });
      }

      const movies = await tmdbService.getLogoImagesById(
        Number(mediaId),
        mediaType as "movie" | "tv",
        language as string,
        originalLanguage as string
      );

      return res.status(200).json(movies);
    } catch (error) {
      console.error("Erro no controller:", error);
      return res.status(500).json({ error: "Erro ao buscar imagens." });
    }
  };

  getVideoById = async (req: Request, res: Response) => {
    try {
      const { mediaId, mediaType, language, originalLanguage } = req.query;

      if (!mediaId || !mediaType || !language) {
        return res.status(400).json({
          error: "Parâmetros obrigatórios: mediaId, mediaType e language",
        });
      }

      const movies = await tmdbService.getVideoById(
        Number(mediaId),
        mediaType as "movie" | "tv",
        language as string,
        originalLanguage as string
      );

      return res.status(200).json(movies);
    } catch (error) {
      console.error("Erro no controller:", error);
      return res.status(500).json({ error: "Erro ao buscar video." });
    }
  };

}

