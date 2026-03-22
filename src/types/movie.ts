
export interface MovieType {
    id: number;
    name: string;
    alternativeName: string;
    rating: {
        imdb: number;
        kp: number;
    };
    year: number;
    description: string;
    genres: Array<{ name: string }>;
    poster?: {
        url: string;
    };
    movieLength?: number;
}

export interface MoviesUniversalSearchType {
    docs: MovieType[];
    next: string;
    hasNext: boolean;
}