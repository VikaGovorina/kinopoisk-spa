import { ENV } from "../config/env";
import axios from "axios";

const api = axios.create({
    baseURL: ENV.POISKKINO_API_URL,
    headers: {
        'X-API-KEY': ENV.POISKKINO_API_KEY
    }
});

export const PoiskKinoApi = {
    async getMovies(page: number) {
        const options = {
            method: 'GET',
            url: "/movie",
            params: {
                page,
                limit: 50
            },
        };

        try {
            const { data } = await api.request(options);
            console.log(`MOVIES:`);
            console.log(data);

            return data.docs;
        } catch (error) {
            console.error(error);
        }
    },
};
