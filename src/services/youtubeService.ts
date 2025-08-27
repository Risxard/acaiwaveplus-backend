import axios from "axios";

class YoutubeService {
  async checkVideoEmbedById(videoId: string): Promise<boolean> {
    try {
      const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
      await axios.get(oembedUrl);
      return true;
    } catch {
      return false;
    }
  }
}

export default new YoutubeService();
