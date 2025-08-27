
import tmdbRepository from "../repository/tmdb.repository";
import { ImagesInterface, ImagesResponse, TMDBMedia, VideosInterface } from "../types/tmdb.types";
import cache from "../utils/cache";
import videoFilter from "../utils/videoFilter";

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
  const normalizedLanguage = language.includes("-")
    ? language.split("-")[0]
    : language;

  const cacheKey = `logos:${mediaType}:${mediaId}:${normalizedLanguage}`;
  const cached = cache.get<ImagesInterface[]>(cacheKey);

  if (cached) {
    return cached;
  }

  const data = await tmdbRepository.fetchImagesById(
    mediaId,
    mediaType,
    normalizedLanguage
  );

  const logos = data.logos[0] || {};

  cache.set(cacheKey, logos);

  return logos;
}




  async getVideoById(
    mediaId: number,
    mediaType: string,
    language: string,
    originalLanguage: string
  ): Promise<string | null | false> {
    const cacheKey = `videos:${mediaType}:${mediaId}:${language}:${originalLanguage}`;
    const cached = cache.get<string | null | false>(cacheKey);

    if (cached) {
      return cached;
    }

    const data = await tmdbRepository.getVideoById(mediaId, mediaType, language);
    const results = data.results;

    let resultado = await videoFilter(results, language, originalLanguage);


    if (resultado === null && originalLanguage !== "en-US") {
      const dataFallback = await tmdbRepository.getVideoById(mediaId, mediaType, originalLanguage);
      const resultsFallback = dataFallback.results;
      resultado = await videoFilter(resultsFallback, originalLanguage, originalLanguage);
    }

    if (resultado === null && language !== "en-US" && originalLanguage !== "en-US") {
      const dataEn = await tmdbRepository.getVideoById(mediaId, mediaType, "en-US");
      const resultsEn = dataEn.results;
      resultado = await videoFilter(resultsEn, "en-US", originalLanguage);
    }

    cache.set(cacheKey, resultado);

    return resultado;
  }




}

export default new TMDBService();
