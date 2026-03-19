import { useEffect, useState } from "react"
import { PoiskKinoApi } from "../api/PoiskKinoApi";
import type { MovieType } from "../types/movie";
import { Movie } from "../components/Movie/Movie";
import { Movies } from "../components/Movies/Movies";

export default function HomePage() {
    const [movies, setMovies] = useState<MovieType[]>([]);

    useEffect(() => {
        PoiskKinoApi.getMovies(1).then(data => {
            setMovies(data);
        });
    }, []);

    return (
        <>
            <Movies moviesData={movies} />
        </>
    )
}