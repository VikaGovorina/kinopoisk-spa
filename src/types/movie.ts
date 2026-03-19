
export interface MovieType {
    id: number;
    // name: string;
    alternativeName: string;
    rating: {
        imdb: number;
        // russianFilmCritics: number;
    };
    year: number;
    // description: string;
    // genres: Array<{ name: string }>;
    // countries: Array<{ name: string }>;
    poster?: {
        url: string;
    };
}