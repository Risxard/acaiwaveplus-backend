import { Request, Response } from "express";
import tmdbService from "../services/tmdbService";

export default class TMDBController {
  async getTrending(req: Request, res: Response) {
    try {
      const { pageType = "movie", language = "en-US" } = req.query;

      const movies = await tmdbService.getTrending(
        pageType as "movie" | "tv",
        language as string
      );

      return res.status(200).json(movies);
    } catch (error) {
      console.error("Erro no controller:", error);
      return res.status(500).json({ error: "Erro ao buscar filmes." });
    }
  }
}

