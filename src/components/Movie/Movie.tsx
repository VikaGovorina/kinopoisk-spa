import type { MovieType } from "../../types/movie"
import { movieDataFormatter } from "../../utils/movieDataFormatter"
import styles from './Movie.module.css'

export const Movie = function Movie({ movieData }: { movieData: MovieType }) {
    const moviePoster = movieDataFormatter.getPoster(movieData.poster?.url);

    return (
        <div className={styles.movieContainer}>
            <div className={styles.poster}>
                <img className={styles.posterImage} src={moviePoster} alt={movieData.name || movieData.alternativeName}></img>
                {movieData.rating.imdb > 0 || movieData.rating.kp > 0 ? 
                    <div className={styles.ratingSpanContainer}>
                        <span className={styles.ratingSpan}>{movieData.rating.imdb || movieData.rating.kp}</span>    
                    </div>
                    : null}
            </div>
            <div className={styles.textContent}>
                <p className={styles.title}>{movieData.name || movieData.alternativeName || ""}</p>
                <p className={styles.info}>{movieData.year}</p>
            </div>
        </div>
    )
}