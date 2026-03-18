import { ENV } from "../config/env";
import axios from "axios";

export const PoiskKinoApi = {
    async getMovies() {
        const options = {
            method: 'GET',
            url: ENV.POISKKINO_API_URL,
            headers: {'X-API-KEY': ENV.POISKKINO_API_KEY}
        };

        try {
            const { data } = await axios.request(options);
            console.log(data);

            return data;
        } catch (error) {
            console.error(error);
        }

        // const result = await 
    },
};
