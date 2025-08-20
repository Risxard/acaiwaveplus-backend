// src/services/tmdbService.ts
import tmdbRepository from "../repository/tmdb.repository";
import { TMDBMedia } from "../types/tmdb.types";

class TMDBService {
  async getTrending(pageType: "movie" | "tv", language: string): Promise<TMDBMedia[]> {
    const data = await tmdbRepository.fetchTrending(pageType, language);
    return data.results.slice(0, 10);
  }
}

export default new TMDBService();
