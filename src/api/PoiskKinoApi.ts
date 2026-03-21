import { ENV } from "../config/env";
import axios from "axios";
import type { GenresType, MovieFiltersType } from "../types/filters";

const api = axios.create({
    baseURL: ENV.POISKKINO_API_URL,
    headers: {
        'X-API-KEY': ENV.POISKKINO_API_KEY
    }
});

const apiV1 = axios.create({
    baseURL: "https://api.poiskkino.dev/v1", // TODO: move to env
    headers: {
        'X-API-KEY': ENV.POISKKINO_API_KEY
    }
});

export const PoiskKinoApi = {
    async getMovies(next?: string, filters?: MovieFiltersType) {
        const options = {
            method: 'GET',
            url: "/movie",
            params: {
                limit: 50,
                ...(next && { next }),
                ...(filters?.genres?.length && { "genres.name": filters.genres.join(',') }),
                ...(filters && filters.ratingFrom && filters.ratingTo && { "rating.imdb": `${filters.ratingFrom}-${filters.ratingTo}` }),
                ...(filters && filters.yearFrom && filters.yearTo && { year: `${filters.yearFrom}-${filters.yearTo}` }),
            },
        };

        try {
            const { data } = await api.request(options);
            console.log(`MOVIES:`);
            console.log(data);

            return data;
        } catch (error) {
            console.error(error);
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
            console.log(`GENRES:`);
            console.log(data);

            return data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }
};
