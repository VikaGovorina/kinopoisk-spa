import { Movie } from "../../components/Movie/Movie";
import { Link } from "react-router-dom";
import styles from './FavoritesPage.module.css'
import { useState } from "react";
import { ConfirmModal } from "../../components/ConfirmModal/ConfirmModal";
import { useUnit } from "effector-react";
import { $favorites, removeFromFavorites } from "../../store/favorites";

export default function FavoritesPage() {
    const favorites = useUnit($favorites);

    const [movieToRemove, setMovieToRemove] = useState<number | null>(null);

    if (favorites.length === 0) {
        return <p className={styles.noMovies}>Нет избранных фильмов</p>;
    }

    const handleConfirmRemove = () => {
        if (movieToRemove !== null) {
            removeFromFavorites(movieToRemove);
            setMovieToRemove(null);
        }
    };

    const handleCancelRemove = () => {
        setMovieToRemove(null);
    };

    return (
        <div>
            <div className={styles.movieContainer}>
                {favorites.map(movie => (
                    <div className={styles.content}>
                        <Link className={styles.link} to={`/movie/${movie.id}`} key={movie.id}>
                            <Movie movieData={movie} />
                        </Link>
                        
                        <button className={styles.removeButton} onClick={() => setMovieToRemove(movie.id)}>✕</button>
                    </div>
                ))}

                {movieToRemove !== null && (
                    <ConfirmModal
                        message="Удалить фильм из избранного?"
                        onConfirm={handleConfirmRemove}
                        onCancel={handleCancelRemove}
                    />
                )}
            </div>
        </div>
    );
}
