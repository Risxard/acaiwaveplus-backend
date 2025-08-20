// src/repositories/tmdbRepository.ts
import axios from "axios";
import { TMDB_CONFIG } from "../config/tmdb";
import { TMDBMedia, TMDBResponse } from "../types/tmdb.types";

class TMDBRepository {
  async fetchTrending(
    pageType: "movie" | "tv",
    language: string,
    page: number = 1
  ): Promise<TMDBResponse<TMDBMedia>> {
    const url = `${TMDB_CONFIG.baseUrl}/trending/${pageType}/week`;

    const { data } = await axios.get<TMDBResponse<TMDBMedia>>(url, {
      headers: {
        Authorization: `Bearer ${TMDB_CONFIG.apiKey}`,
      },
      params: {
        language,
        page,
      },
    });

    return data;
  }
}

export default new TMDBRepository();
