import { Movie } from "../../components/Movie/Movie";
import { useFavorites } from "../../context/FavoritesContext";
import { Link } from "react-router-dom";
import styles from './FavoritesPage.module.css'
import { useState } from "react";
import { ConfirmModal } from "../../components/ConfirmModal/ConfirmModal";

export default function FavoritesPage() {
    const { favorites, removeFromFavorites } = useFavorites();
    const [movieToRemove, setMovieToRemove] = useState<number | null>(null);

    if (favorites.length === 0) {
        return <p>Нет избранных фильмов</p>;
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
