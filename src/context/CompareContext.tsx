
import { createContext, useContext, useState } from "react";
import type { MovieType } from "../types/movie";

type CompareContextType = {
    compareList: MovieType[];
    toggleCompare: (movie: MovieType) => void;
    isInCompare: (id: number) => boolean;
};

const CompareContext = createContext<CompareContextType | null>(null);

export const CompareProvider = ({ children }: { children: React.ReactNode }) => {
    const [compareList, setCompareList] = useState<MovieType[]>([]);

    const toggleCompare = (movie: MovieType) => {
        setCompareList(prev => {
            if (prev.some(m => m.id === movie.id)) {
                return prev.filter(m => m.id !== movie.id);
            }
            if (prev.length < 2) {
                return [...prev, movie];
            }
            return [prev[1], movie];
        });
    };

    const isInCompare = (id: number) => {
        return compareList.some(m => m.id === id);
    };

    return (
        <CompareContext.Provider value={{ compareList, toggleCompare, isInCompare }}>
            {children}
        </CompareContext.Provider>
    );
};

export const useCompare = () => {
    const ctx = useContext(CompareContext);
    if (!ctx) {
        throw new Error("useCompare must be used inside provider");
    }
    return ctx;
};