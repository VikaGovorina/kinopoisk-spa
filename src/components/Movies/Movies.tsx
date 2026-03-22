import { Link } from 'react-router-dom';
import type { GenresType } from '../../types/filters';
import type { MovieType } from '../../types/movie'
import { Filter } from '../Filter/Filter'
import { Movie } from '../Movie/Movie'
import styles from './Movies.module.css'

interface Props {
    moviesData: MovieType[];
    isFiltersOpen: boolean;
    setIsFiltersOpen: (isFiltersOpen: boolean) => void;
    setSearchParams: (params: URLSearchParams) => void;
    possibleGenres: GenresType[];
    genres: string[];
    ratingFrom: string;
    ratingTo: string;
    yearFrom: string;
    yearTo: string;
}

export const Movies = function Movies({
    moviesData,
    isFiltersOpen,
    setIsFiltersOpen,
    setSearchParams,
    possibleGenres,
    genres,
    ratingFrom,
    ratingTo,
    yearFrom,
    yearTo,
}: Props) {
    return (
        <div className={styles.container}>
            <div className={styles.containerHeader}>
                <div className={styles.containerWrapper} onClick={() => setIsFiltersOpen(!isFiltersOpen)}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style={{pointerEvents: 'none', display: 'inherit', fill: '#9e9b98'}}><path d="M9 3a4 4 0 00-3.874 3H3a1 1 0 000 2h2.126a4.002 4.002 0 007.748 0H21a1 1 0 100-2h-8.126A4 4 0 009 3Zm0 2a2 2 0 110 4 2 2 0 010-4Zm6 8a4 4 0 00-3.874 3H3a1 1 0 000 2h8.126a4.002 4.002 0 007.748 0H21a1 1 0 000-2h-2.126A4 4 0 0015 13Zm0 2a2 2 0 110 4 2 2 0 010-4Z"></path></svg>
                    <span className={ styles.filterSpan}>Фильтры</span>
                </div>
            </div>

            <div className={`${styles.filterWrapper} ${isFiltersOpen ? styles.open : styles.closed}`}>
                <Filter
                    genres={possibleGenres}
                    selectedGenres={genres}
                    ratingFrom={ratingFrom}
                    ratingTo={ratingTo}
                    yearFrom={yearFrom}
                    yearTo={yearTo}
                    onChange={(filters) => {
                        const params = new URLSearchParams();

                        if (filters.genres.length) {
                            params.set('genres', filters.genres.join(','));
                        }
                        if (filters.ratingFrom && filters.ratingTo) {
                            params.set('rating', `${filters.ratingFrom}-${filters.ratingTo}`);
                        }
                        if (filters.yearFrom && filters.yearTo) {
                            params.set('year', `${filters.yearFrom}-${filters.yearTo}`);
                        }

                        setSearchParams(params);
                    }}
                    onClose={() => setIsFiltersOpen(false)}
                />
            </div>

            <div className={styles.containerContent}>
                {moviesData.map(movie => (
                    <Link key={movie.id} to={`/movie/${movie.id}`} className={styles.link}>
                        <Movie movieData={movie} />
                    </Link>
                ))}
            </div>
        </div>
    )
}