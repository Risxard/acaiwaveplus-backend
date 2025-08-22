
import tmdbRepository from "../repository/tmdb.repository";
import { ImagesInterface, ImagesResponse, TMDBMedia } from "../types/tmdb.types";
import cache from "../utils/cache";

class TMDBService {

  async getTrending(timeWindow: "day" | "week", pageType: "movie" | "tv", language: string, page: number): Promise<TMDBMedia[]> {
    const cacheKey = `trending:${timeWindow}:${pageType}:${language}:${page}`;
    const cached = cache.get<TMDBMedia[]>(cacheKey);

    if (cached) {
      return cached;
    }

    const data = await tmdbRepository.fetchTrending(timeWindow, pageType, language, page);
    const movies = data.results.slice(0, 10);
    cache.set(cacheKey, movies);

    return movies;
  }


  async getImagesById(
    mediaId: number,
    mediaType: string,
    language: string
  ): Promise<ImagesResponse<ImagesInterface>> {
    const cacheKey = `${mediaType}:${mediaId}:${language}`;
    const cached = cache.get<ImagesResponse<ImagesInterface>>(cacheKey);

    if (cached) {
      return cached;
    }

    const data = await tmdbRepository.fetchImagesById(mediaId, mediaType, language);

    cache.set(cacheKey, data);

    return data;
  }


  async getPosterImagesById(
    mediaId: number,
    mediaType: string,
    language: string
  ): Promise<ImagesInterface[]> {
    const cacheKey = `poster:${mediaType}:${mediaId}:${language}`;
    const cached = cache.get<ImagesInterface[]>(cacheKey);

    if (cached) {
      return cached;
    }

    const data = await tmdbRepository.fetchImagesById(mediaId, mediaType, language);

    const posters = data.posters;

    cache.set(cacheKey, posters);

    return posters;
  }



  async getBackdropsImagesById(
    mediaId: number,
    mediaType: string,
    language: string
  ): Promise<ImagesInterface[]> {
    const cacheKey = `backdrops:${mediaType}:${mediaId}:${language}`;
    const cached = cache.get<ImagesInterface[]>(cacheKey);

    if (cached) {
      return cached;
    }

    const data = await tmdbRepository.fetchImagesById(mediaId, mediaType, language);

    const backdrops = data.backdrops;

    cache.set(cacheKey, backdrops);

    return backdrops;
  }




  async getLogoImagesById(
    mediaId: number,
    mediaType: string,
    language: string
  ): Promise<ImagesInterface[]> {
    const cacheKey = `logos:${mediaType}:${mediaId}:${language}`;
    const cached = cache.get<ImagesInterface[]>(cacheKey);

    if (cached) {
      return cached;
    }

    const data = await tmdbRepository.fetchImagesById(mediaId, mediaType, language);

    const logos = data.logos;

    cache.set(cacheKey, logos);

    return logos;
  }

}

export default new TMDBService();
