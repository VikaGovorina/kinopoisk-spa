import { useEffect, useRef, useState } from "react"
import { PoiskKinoApi } from "../../api/PoiskKinoApi";
import type { MovieType } from "../../types/movie";
import { Movies } from "../../components/Movies/Movies";
import { Link, useSearchParams } from "react-router-dom";
import type { GenresType } from "../../types/filters";
import styles from './HomePage.module.css'
import { ComparePanel } from "../../components/ComparePanel/ComparePanel";
import { useCompare } from "../../context/CompareContext";
import TopLoader from "../../ui/TopLoader";

export default function HomePage() {
    const [movies, setMovies] = useState<MovieType[]>([]);
    const [next, setNext] = useState<string | null>(null);
    const [hasNext, setHasNext] = useState(true);
    const [loading, setLoading] = useState(false);

    const targetLoader = useRef<HTMLDivElement | null>(null);
    const initialLoadingRef = useRef(true);
    const isFetchingRef = useRef(false);
    const isInitialLoad = useRef(false);
    const nextRef = useRef<string | null>(null);
    
    // filters
    const [possibleGenres, setPossibleGenres] = useState<GenresType[]>([]);
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const genres = searchParams.get('genres')?.split(',') || [];
    const rating = searchParams.get('rating')?.split('-') || [];
    const year = searchParams.get('year')?.split('-') || [];
    const ratingFrom = rating[0];
    const ratingTo = rating[1];
    const yearFrom = year[0];
    const yearTo = year[1];

    const filters = {
        genres,
        ratingFrom,
        ratingTo,
        yearFrom,
        yearTo,
    };

    // comparing
    const {compareList} = useCompare();

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
            const data = await PoiskKinoApi.getMovies(nextRef.current || undefined, filters);
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

    const loadGenres = async () => {
        try {
            const data = await PoiskKinoApi.getPossibleGenres();

            setPossibleGenres(data);
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(() => {
        if (isInitialLoad.current) return;
        isInitialLoad.current = true;

        loadMovies();
        loadGenres();
    }, []);

    useEffect(() => {
        setMovies([]);
        setNext(null);
        setHasNext(true);

        initialLoadingRef.current = true;

        loadMovies();
    }, [searchParams.toString()]);

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
            <TopLoader loading={loading}/>

            <header>
                <Link to={`/favorites`}>
                    <div className={styles.favoritesIcon}>
                        <svg width='24' height='24' viewBox="0 0 24 24" focusable="false" aria-hidden="true" fill='#9e9b98' xmlns='http://www.w3.org/2000/svg'><path d='M5.5 3.5h13V21L12 17.45 5.5 21V3.5Z'/></svg>
                    </div>
                </Link>
            </header>

            <div className={styles.layout}>
                <div className={`${styles.moviesWrapper} ${compareList.length > 0 ? styles.withPanel : ""}`}>
                    <Movies
                        moviesData={movies}
                        isFiltersOpen={isFiltersOpen}
                        setIsFiltersOpen={setIsFiltersOpen}
                        setSearchParams={setSearchParams}
                        possibleGenres={possibleGenres}
                        genres={genres}
                        ratingFrom={ratingFrom}
                        ratingTo={ratingTo}
                        yearFrom={yearFrom}
                        yearTo={yearTo}
                    />
                    <div ref={targetLoader} style={{ height: '300px' }} />
                </div>

                <div className={`${styles.compareWrapper} ${compareList.length > 0 ? styles.open : ""}`}>
                    <ComparePanel />
                </div>
            </div>

        </>
    )
}