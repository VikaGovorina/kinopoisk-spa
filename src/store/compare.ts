import { createStore, createEvent } from "effector";
import type { MovieType } from "../types/movie";

export const toggleCompare = createEvent<MovieType>();

export const $compareList = createStore<MovieType[]>([])
    .on(toggleCompare, (state, movie) => {
        if (state.some(m => m.id === movie.id)) {
            return state.filter(m => m.id !== movie.id);
        }
        if (state.length < 2) {
            return [...state, movie];
        }
        return [state[1], movie];
    });