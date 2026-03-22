import { createStore, createEvent } from "effector";
import type { MovieType } from "../types/movie";

export const addToFavorites = createEvent<MovieType>();
export const removeFromFavorites = createEvent<number>();

const initialFavorites: MovieType[] = (() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
})();

export const $favorites = createStore<MovieType[]>(initialFavorites)
  .on(addToFavorites, (state, movie) => {
    if (state.some(m => m.id === movie.id)) return state;
    const newState = [...state, movie];
    return newState;
  })
  .on(removeFromFavorites, (state, id) => {
    const newState = state.filter(m => m.id !== id);
    return newState;
  });


$favorites.watch(favs => {
  localStorage.setItem("favorites", JSON.stringify(favs));
});