import { useEffect, useRef, useState } from "react"
import { PoiskKinoApi } from "../api/PoiskKinoApi";
import type { MovieType } from "../types/movie";
import { Movies } from "../components/Movies/Movies";

export default function HomePage() {
    const [movies, setMovies] = useState<MovieType[]>([]);
    const [next, setNext] = useState<string | null>(null);
    const [hasNext, setHasNext] = useState(true);
    const [loading, setLoading] = useState(false);
    const targetLoader = useRef<HTMLDivElement | null>(null);

    const initialLoadingRef = useRef(true);
    const isFetchingRef = useRef(false);
    const isInitialLoad = useRef(false);

    // const loadingRef = useRef(false);
    // useEffect(() => {
    //     loadingRef.current = loading;
    // }, [loading]);

    const nextRef = useRef<string | null>(null);
    useEffect(() => {
        nextRef.current = next;
    }, [next]);
    

    const loadMovies = async () => {
        if (!hasNext || isFetchingRef.current) {
            return;
        }
        isFetchingRef.current = true;

        try {
            setLoading(true);
            const data = await PoiskKinoApi.getMovies(nextRef.current || undefined);
            setMovies(oldData => [...oldData, ...data.docs]);

            setNext(data.next);
            setHasNext(data.hasNext);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            initialLoadingRef.current = false;
            isFetchingRef.current = false;
        }
    }
    
    useEffect(() => {
        if (isInitialLoad.current) return;
        isInitialLoad.current = true;

        loadMovies();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                if (initialLoadingRef.current) return;

                loadMovies();
            }
        }, {
            threshold: 0.1,
            rootMargin: '100px'
        });

        if (targetLoader.current) {
            observer.observe(targetLoader.current);
        }

        return () => {
            if (targetLoader.current) {
                observer.unobserve(targetLoader.current);
            }
        }
    }, []);

    return (
        <>
            <Movies moviesData={movies} />
            <div ref={targetLoader} style={{ height: '300px' }} />
        </>
    )
}