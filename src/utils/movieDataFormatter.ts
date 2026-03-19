import defaultMoviePoster from "../assets/default_movie_poster.png";

export const movieDataFormatter = {
    getPoster(posterUrl: string | undefined) {
        if (!posterUrl) {
            return defaultMoviePoster;
        }
        return posterUrl;
    }

};