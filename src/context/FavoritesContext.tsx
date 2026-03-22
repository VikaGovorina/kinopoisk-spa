import { createContext, useContext, useEffect, useState } from "react";
import type { MovieType } from "../types/movie";

type FavoritesContextType = {
    favorites: MovieType[];
    addToFavorites: (movie: MovieType) => void;
    removeFromFavorites: (id: number) => void;
    isFavorite: (id: number) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
    const [favorites, setFavorites] = useState<MovieType[]>(() => {
        const stored = localStorage.getItem("favorites");
        return stored ? JSON.parse(stored) : [];
    } );

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const addToFavorites = (movie: MovieType) => {
        setFavorites(prev => {
            if (prev.some(m => m.id === movie.id)) return prev;
            return [...prev, movie];
        });
    };

    const removeFromFavorites = (id: number) => {
        setFavorites(prev => prev.filter(m => m.id !== id));
    };

    const isFavorite = (id: number) => {
        return favorites.some(m => m.id === id);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const ctx = useContext(FavoritesContext);
    if (!ctx) {
        throw new Error("useFavorites must be used inside provider");
    }
    return ctx;
};