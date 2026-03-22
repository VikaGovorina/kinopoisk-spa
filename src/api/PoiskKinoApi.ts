import { ENV } from "../config/env";
import axios from "axios";
import type { GenresType, MovieFiltersType } from "../types/filters";
import type { MoviesUniversalSearchType, MovieType } from "../types/movie";

const api = axios.create({
    baseURL: `${ENV.POISKKINO_API_URL}/v1.5`,
    headers: {
        'X-API-KEY': ENV.POISKKINO_API_KEY
    }
});

const apiV1 = axios.create({
    baseURL: `${ENV.POISKKINO_API_URL}/v1`,
    headers: {
        'X-API-KEY': ENV.POISKKINO_API_KEY
    }
});

const apiV4 = axios.create({
    baseURL: `${ENV.POISKKINO_API_URL}/v1.4`,
    headers: {
        'X-API-KEY': ENV.POISKKINO_API_KEY
    }
});

export const PoiskKinoApi = {
    async getMovies(next?: string, filters?: MovieFiltersType): Promise<MoviesUniversalSearchType> {
        const options = {
            method: 'GET',
            url: "/movie",
            params: {
                limit: 50,
                ...(next && { next }),
                ...(filters?.genres?.length && { "genres.name": filters.genres.join(',') }),
                ...(filters && filters.ratingFrom && filters.ratingTo && { "rating.imdb": `${filters.ratingFrom}-${filters.ratingTo}` }),
                ...(filters && filters.ratingFrom && filters.ratingTo && { "rating.kp": `${filters.ratingFrom}-${filters.ratingTo}` }),
                ...(filters && filters.yearFrom && filters.yearTo && { year: `${filters.yearFrom}-${filters.yearTo}` }),
            },
        };

        try {
            const { data } = await api.request(options);
            return data;
        } catch (error) {
            console.error(error);
            return {} as MoviesUniversalSearchType;
        }
    },

    async getPossibleGenres(): Promise<GenresType[]> {
        const options = {
            method: 'GET',
            url: "/movie/possible-values-by-field",
            params: {
                field: "genres.name",
            },
        };

        try {
            const { data } = await apiV1.request(options);
            return data;
        } catch (error) {
            console.error(error);
            return [];
        }
    },

    async getMovieById(id: number): Promise<MovieType> {
        const options = {
            method: 'GET',
            url: `/movie/${id}`,
        };

        try {
            const { data } = await apiV4.request(options);
            return data;
        } catch (error) {
            console.error(error);
            return {} as MovieType;
        }
    },
};
