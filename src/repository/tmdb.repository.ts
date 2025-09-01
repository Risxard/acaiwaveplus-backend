import axios from "axios";
import { TMDB_CONFIG } from "../config/tmdb";
import { ImagesInterface, ImagesResponse, TMDBMedia, TMDBResponse, VideosInterface, VideosResponse } from "../types/tmdb.types";

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
  async fetchRecommendations(
    mediaType: "movie" | "tv",
    mediaId: number,
    language: string,
    page: number = 1
  ): Promise<TMDBResponse<TMDBMedia>> {
    const url = `${TMDB_CONFIG.baseUrl}/${mediaType}/${mediaId}/recommendations`;

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


  async fetchNowPlaying(
    pageType: "movie" | "tv",
    language: string,
    region: string,
    page: number = 1,

  ): Promise<TMDBResponse<TMDBMedia>> {
    const url = `${TMDB_CONFIG.baseUrl}/${pageType}/${pageType === 'tv' ? 'on_the_air' : 'now_playing'}`;


    const { data } = await axios.get<TMDBResponse<TMDBMedia>>(url, {
      headers: {
        Authorization: `Bearer ${TMDB_CONFIG.apiKey}`,
      },
      params: {
        language,
        region,
        timezone: region,
        page,
      },
    });

    return data;
  }


  async fetchImagesById(mediaId: number, mediaType: string, language: string, originalLanguage: string) {

    const normalizedLanguage = language.includes("-")
      ? language.split("-")[0]
      : language;

    const lang1Check = normalizedLanguage === 'en' ? '' : `${normalizedLanguage}%2C`;
    const lang2Check = originalLanguage === 'en' ? '' : `${originalLanguage}%2C`;

    const url = `${TMDB_CONFIG.baseUrl}/${mediaType}/${mediaId}/images?include_image_language=${lang1Check + lang2Check}en`;

    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${TMDB_CONFIG.apiKey}`,
      },
      params: {
        language,
      },
    });

    return data;
  }


  async getVideoById(mediaId: number, mediaType: string, language: string) {
    const url = `${TMDB_CONFIG.baseUrl}/${mediaType}/${mediaId}/videos`;

    const { data } = await axios.get<VideosResponse<VideosInterface>>(url, {
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
