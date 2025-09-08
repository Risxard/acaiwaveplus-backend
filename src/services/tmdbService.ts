
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


  async getRecommendations(mediaType: "movie" | "tv", mediaId: number, language: string, page: number): Promise<TMDBMedia[]> {
    const cacheKey = `recommendations:${mediaType}:${mediaId}:${language}:${page}`;
    const cached = cache.get<TMDBMedia[]>(cacheKey);

    if (cached) {
      return cached;
    }

    const data = await tmdbRepository.fetchRecommendations(mediaType, mediaId, language, page);
    const movies = data.results.slice(0, 20);
    cache.set(cacheKey, movies);

    return movies;
  }

  async getNowPlaying(pageType: "movie" | "tv", language: string, region: string, page: number): Promise<TMDBMedia[]> {
    const cacheKey = `nowplaying:${pageType}:${language}:${region}${page}`;
    const cached = cache.get<TMDBMedia[]>(cacheKey);

    if (cached) {
      return cached;
    }




    const data = await tmdbRepository.fetchNowPlaying(pageType, language, region, page);
    const movies = data.results.slice(0, 10);
    cache.set(cacheKey, movies);

    return movies;
  }



  async getPerGenres(pageType: "movie" | "tv",
    language: string,
    with_genres: string,
    without_genres: string,
    sort_by: string,
    page: number = 1,): Promise<TMDBMedia[]> {
    const cacheKey = `pergenres:${pageType}:${language}:${with_genres}${page}`;
    const cached = cache.get<TMDBMedia[]>(cacheKey);

    if (cached) {
      return cached;
    }

    const data = await tmdbRepository.fetchPerGenres(pageType, language, with_genres, without_genres, sort_by, page);
    const medias = data.results.slice(0, 20);
    cache.set(cacheKey, medias);

    return medias;
  }












  async getImagesById(
    mediaId: number,
    mediaType: string,
    language: string,
    originalLanguage: string
  ): Promise<ImagesResponse<ImagesInterface>> {
    const cacheKey = `${mediaType}:${mediaId}:${language}:${originalLanguage}`;
    const cached = cache.get<ImagesResponse<ImagesInterface>>(cacheKey);

    if (cached) {
      return cached;
    }

    const data = await tmdbRepository.fetchImagesById(mediaId, mediaType, language, originalLanguage);

    cache.set(cacheKey, data);

    return data;
  }


  async getPosterImagesById(
    mediaId: number,
    mediaType: string,
    language: string,
    originalLanguage: string
  ): Promise<ImagesInterface | null> {
    const cacheKey = `posters:${mediaType}:${mediaId}:${language}:${originalLanguage}`;
    const cached = cache.get<ImagesInterface | null>(cacheKey);

    if (cached) {
      return cached;
    }

    const data = await tmdbRepository.fetchImagesById(
      mediaId,
      mediaType,
      language,
      originalLanguage
    );

    const normalizedLanguage = language.includes("-")
      ? language.split("-")[0]
      : language;

    let posters = data.posters.filter(
      (p: ImagesInterface) => p.iso_639_1 === normalizedLanguage
    );

    if (posters.length === 0) {
      posters = data.posters.filter(
        (p: ImagesInterface) => p.iso_639_1 === "en"
      );
    }

    if (posters.length === 0 && originalLanguage) {
      posters = data.posters.filter(
        (p: ImagesInterface) => p.iso_639_1 === originalLanguage
      );
    }

    if (posters.length === 0 && data.posters.length > 0) {
      posters = data.posters;
    }

    let poster: ImagesInterface | null = null;
    if (posters.length > 0) {
      poster = posters.reduce((prev, curr) =>
        (curr.vote_average ?? 0) > (prev.vote_average ?? 0) ? curr : prev
      );
    }

    cache.set(cacheKey, poster || null);

    return poster || null;
  }




  async getBackdropImagesById(
    mediaId: number,
    mediaType: string,
    language: string,
    originalLanguage: string
  ): Promise<ImagesInterface | null> {
    const cacheKey = `backdrops:${mediaType}:${mediaId}:${language}:${originalLanguage}`;
    const cached = cache.get<ImagesInterface | null>(cacheKey);

    if (cached) {
      return cached;
    }

    const data = await tmdbRepository.fetchImagesById(
      mediaId,
      mediaType,
      language,
      originalLanguage
    );

    const normalizedLanguage = language.includes("-")
      ? language.split("-")[0]
      : language;

    let backdrops = data.backdrops.filter(
      (b: ImagesInterface) => b.iso_639_1 === normalizedLanguage
    );

    if (backdrops.length === 0) {
      backdrops = data.backdrops.filter(
        (b: ImagesInterface) => b.iso_639_1 === "en"
      );
    }

    if (backdrops.length === 0 && originalLanguage) {
      backdrops = data.backdrops.filter(
        (b: ImagesInterface) => b.iso_639_1 === originalLanguage
      );
    }

    if (backdrops.length === 0 && data.backdrops.length > 0) {
      backdrops = data.backdrops;
    }

    let backdrop: ImagesInterface | null = null;
    if (backdrops.length > 0) {
      backdrop = backdrops.reduce((prev, curr) =>
        (curr.vote_average ?? 0) > (prev.vote_average ?? 0) ? curr : prev
      );
    }

    cache.set(cacheKey, backdrop || null);

    return backdrop || null;
  }


  async getLogoImagesById(
    mediaId: number,
    mediaType: string,
    language: string,
    originalLanguage: string
  ): Promise<ImagesInterface | null> {
    const cacheKey = `logos:${mediaType}:${mediaId}:${language}:${originalLanguage}`;
    const cached = cache.get<ImagesInterface | null>(cacheKey);

    if (cached) {
      return cached;
    }

    const data = await tmdbRepository.fetchImagesById(
      mediaId,
      mediaType,
      language,
      originalLanguage
    );

    const normalizedLanguage = language.includes("-")
      ? language.split("-")[0]
      : language;

    let logos = data.logos.filter(
      (l: ImagesInterface) => l.iso_639_1 === normalizedLanguage
    );

    if (logos.length === 0) {
      logos = data.logos.filter(
        (l: ImagesInterface) => l.iso_639_1 === "en"
      );
    }

    if (logos.length === 0 && originalLanguage) {
      logos = data.logos.filter(
        (l: ImagesInterface) => l.iso_639_1 === originalLanguage
      );
    }

    if (logos.length === 0 && data.logos.length > 0) {
      logos = data.logos;
    }

    let logo: ImagesInterface | null = null;
    if (logos.length > 0) {
      logo = logos.reduce((prev: { vote_average: any; }, curr: { vote_average: any; }) =>
        (curr.vote_average ?? 0) > (prev.vote_average ?? 0) ? curr : prev
      );
    }

    cache.set(cacheKey, logo || null);

    return logo || null;
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
