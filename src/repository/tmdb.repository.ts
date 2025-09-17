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

  async fetchPerGenres(
    pageType: "movie" | "tv",
    language: string,
    with_genres: string,
    without_genres: string,
    sort_by: string,
    include_adult: string,
    page: number = 1,
  ): Promise<TMDBResponse<TMDBMedia>> {
    const url = `${TMDB_CONFIG.baseUrl}/discover/${pageType}`;


    const { data } = await axios.get<TMDBResponse<TMDBMedia>>(url, {
      headers: {
        Authorization: `Bearer ${TMDB_CONFIG.apiKey}`,
      },
      params: {
        language,
        with_genres,
        without_genres,
        sort_by,
        include_adult,
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


  async fetchVideoById(mediaId: number, mediaType: string, language: string) {
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




  async fetchSearchMulti(
    query: string,
    language: string,
    page: number = 1,

  ): Promise<TMDBResponse<TMDBMedia>> {
    const url = `${TMDB_CONFIG.baseUrl}/search/multi`;


    const { data } = await axios.get<TMDBResponse<TMDBMedia>>(url, {
      headers: {
        Authorization: `Bearer ${TMDB_CONFIG.apiKey}`,
      },
      params: {
        query,
        language,
        page,
      },
    });

    return data;
  }

  async fetchSearchPerson(
    query: string,
    language: string,
    page: number = 1,

  ): Promise<TMDBResponse<TMDBMedia>> {
    const url = `${TMDB_CONFIG.baseUrl}/search/person`;


    const { data } = await axios.get<TMDBResponse<TMDBMedia>>(url, {
      headers: {
        Authorization: `Bearer ${TMDB_CONFIG.apiKey}`,
      },
      params: {
        query,
        language,
        page,
      },
    });

    return data;
  }

}

export default new TMDBRepository();
