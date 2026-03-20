import { ENV } from "../config/env";
import axios from "axios";

const api = axios.create({
    baseURL: ENV.POISKKINO_API_URL,
    headers: {
        'X-API-KEY': ENV.POISKKINO_API_KEY
    }
});

export const PoiskKinoApi = {
    async getMovies(next?: string) {
        const options = {
            method: 'GET',
            url: "/movie",
            params: {
                limit: 50,
                ...(next && { next })
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
};
