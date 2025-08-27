import youtubeService from "../services/youtubeService";

interface Video {
    official: boolean;
    name: string;
    type: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
}

const videoFilter = async (
    data: Video[],
    language: string,
    originalLanguage: string
): Promise<string | null | false> => {
    const filteredVideos = data.filter(
        (video: Video) =>
            video.official !== false &&
            !video.name.toLowerCase().includes("acessibilidade") &&
            !video.name.toLowerCase().includes("accesibilidad") &&
            !video.name.toLowerCase().includes("accessibility")
    );

    const trailerVideos = filteredVideos.filter(
        (video: Video) => video.type === "Trailer"
    );
    const otherVideos = filteredVideos.filter(
        (video: Video) => video.type !== "Trailer"
    );

    const orderedVideos = [...trailerVideos, ...otherVideos];

    const selectedLanguage = language === 'en-US' ? 'en' : language === 'pt-BR' ? 'pt' : null;
    const iso_3166_1Language = language.includes('-') ? language.split('-')[1].toLowerCase() : '';

    if (language === 'pt-BR') {
        const dubladoVideos = orderedVideos.filter(
            (video: Video) => video.name.toLowerCase().includes("dublado")
        );
        for (const video of dubladoVideos) {
            const videoStatus = await youtubeService.checkVideoEmbedById(video.key);
            if (videoStatus === true) {
                return video.key;
            }
        }
    }

    let candidates = orderedVideos.filter(
        (video: Video) =>
            video.iso_639_1 === selectedLanguage &&
            video.iso_3166_1 === iso_3166_1Language
    );

    if (candidates.length === 0 && selectedLanguage) {
        candidates = orderedVideos.filter(
            (video: Video) => video.iso_639_1 === selectedLanguage
        );
    }

    if (candidates.length === 0) {
        candidates = orderedVideos;
    }

    for (const video of candidates) {
        const videoStatus = await youtubeService.checkVideoEmbedById(video.key);
        if (videoStatus === true) {
            return video.key;
        }
    }

    return null;
};

export default videoFilter;
