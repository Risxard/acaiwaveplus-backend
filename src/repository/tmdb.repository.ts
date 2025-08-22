import axios from "axios";
import { TMDB_CONFIG } from "../config/tmdb";
import { ImagesInterface, ImagesResponse, TMDBMedia, TMDBResponse } from "../types/tmdb.types";

class TMDBRepository {
  async fetchTrending(
    timeWindow: string,
    pageType: "movie" | "tv",
    language: string,
    page: number = 1
  ): Promise<TMDBResponse<TMDBMedia>> {
    const url = `${TMDB_CONFIG.baseUrl}/trending/${pageType}/${timeWindow}`;

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


  async fetchImagesById(mediaId: number, mediaType: string, language: string){
    const url = `${TMDB_CONFIG.baseUrl}/${mediaType}/${mediaId}/images`;

        const { data } = await axios.get<ImagesResponse<ImagesInterface>>(url, {
      headers: {
        Authorization: `Bearer ${TMDB_CONFIG.apiKey}`,
      },
      params: {
        language,
      },
    });

    return data;
  }
}

export default new TMDBRepository();
