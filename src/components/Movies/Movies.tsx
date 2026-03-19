import type { MovieType } from '../../types/movie'
import { Movie } from '../Movie/Movie'
import styles from './Movies.module.css'


export const Movies = function Movies({ moviesData }: { moviesData: MovieType[] }) {
    return (
        <div className={styles.container}>
            <div className={styles.containerHeader}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style={{pointerEvents: 'none', display: 'inherit', fill: '#9e9b98'}}><path d="M9 3a4 4 0 00-3.874 3H3a1 1 0 000 2h2.126a4.002 4.002 0 007.748 0H21a1 1 0 100-2h-8.126A4 4 0 009 3Zm0 2a2 2 0 110 4 2 2 0 010-4Zm6 8a4 4 0 00-3.874 3H3a1 1 0 000 2h8.126a4.002 4.002 0 007.748 0H21a1 1 0 000-2h-2.126A4 4 0 0015 13Zm0 2a2 2 0 110 4 2 2 0 010-4Z"></path></svg>
                <span className={ styles.filterSpan}>Filters</span>
            </div>
            <div className={styles.containerContent}>
                {moviesData.map(movie => <Movie key={movie.id} movieData={movie} />)}
            </div>
        </div>
    )
}