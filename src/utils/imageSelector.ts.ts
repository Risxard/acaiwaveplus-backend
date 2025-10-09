import { ImagesInterface } from "../types/tmdb.types";


export function selectBestImage(
  images: ImagesInterface[],
  language: string,
  originalLanguage?: string,
  type: "poster" | "logo" = "poster"
): ImagesInterface | null {
  const normalizedLanguage = language.includes("-")
    ? language.split("-")[0]
    : language;

  let filtered: ImagesInterface[] = [];

  if (type === "poster") {
    filtered = images.filter((p) => p.iso_639_1 === null || p.iso_639_1 === "xx");

    if (filtered.length === 0) {
      filtered = images.filter((p) => p.iso_639_1 === normalizedLanguage);
    }

    if (filtered.length === 0) {
      filtered = images.filter((p) => p.iso_639_1 === "en");
    }

    if (filtered.length === 0 && originalLanguage) {
      filtered = images.filter((p) => p.iso_639_1 === originalLanguage);
    }

    if (filtered.length === 0 && images.length > 0) {
      filtered = images;
    }
  }

  if (type === "logo") {
    filtered = images.filter(
      (l) => l.iso_639_1 === "pt" && l.iso_3166_1 === "BR"
    );

    if (filtered.length === 0) {
      filtered = images.filter((l) => l.iso_639_1 === normalizedLanguage);
    }

    if (filtered.length === 0) {
      filtered = images.filter((l) => l.iso_639_1 === "en");
    }

    if (filtered.length === 0 && originalLanguage) {
      filtered = images.filter((l) => l.iso_639_1 === originalLanguage);
    }

    if (filtered.length === 0 && images.length > 0) {
      filtered = images;
    }
  }

  if (filtered.length > 0) {
    return filtered.reduce((prev, curr) =>
      (curr.vote_average ?? 0) > (prev.vote_average ?? 0) ? curr : prev
    );
  }

  return null;
}
