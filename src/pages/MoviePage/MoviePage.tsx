import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PoiskKinoApi } from "../../api/PoiskKinoApi";
import type { MovieType } from "../../types/movie";
import styles from './MoviePage.module.css';
import { useFavorites } from "../../context/FavoritesContext";
import { ConfirmModal } from "../../components/ConfirmModal/ConfirmModal";
import TopLoader from "../../ui/TopLoader";
import { movieDataFormatter } from "../../utils/movieDataFormatter";

export default function MoviePage() {
    const { id } = useParams();
    const [movie, setMovie] = useState<MovieType | null>(null);
    const [loading, setLoading] = useState(true);
    const { addToFavorites, isFavorite, removeFromFavorites } = useFavorites();
    const [showModal, setShowModal] = useState<boolean>(false);
    const moviePoster = movieDataFormatter.getPoster(movie?.poster?.url);

    useEffect(() => {
        if (!id) {
            return;
        }

        const fetchMovieData = async () => {
            try {
                const movieData = await PoiskKinoApi.getMovieById(+id);
                setMovie(movieData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchMovieData();
    }, [id]);

    return (
        <>
            <TopLoader loading={loading} />

            {movie && <div className={styles.movieContainer}>
                <div className={styles.moviePoster}>
                    <img className={styles.posterImage} src={moviePoster} alt={movie.alternativeName || movie.name}></img>
                </div>
                <div className={styles.movieInfo}>
                    <h3>{movie.name}</h3>
                    <p>{movie.alternativeName !== movie.name ? movie.alternativeName : ""}</p>
                    <button className={styles.addToFavoritesButton} onClick={() => setShowModal(true)}>
                        {isFavorite(movie.id) ? "В избранном" : "Добавить в избранное"}
                    </button>
                    <div className={styles.meta}>
                        <p>Год производства</p>
                        <p>{movie.year}</p>

                        <p>Жанр</p>
                        <p>{movie.genres.map(genre => genre.name).join(', ')}</p>
                    </div>
                    <p className={styles.description}>{movie.description}</p>
                    <div className={styles.ratingContainer}>
                        <p>Рейтинг</p>
                        <p>{movie.rating.imdb || movie.rating.kp || '0'}</p>
                    </div>
                </div>
            </div>
            
            }      

            {movie && showModal && (
                <ConfirmModal
                    message={`${isFavorite(movie.id) ? "Удалить из избранного?" : "Добавить в избранное?"}`}
                    onConfirm={() => {
                        if (isFavorite(movie.id)) {
                            removeFromFavorites(movie.id);
                        } else {
                            addToFavorites(movie);
                        }
                        setShowModal(false);
                    }}
                    onCancel={() => setShowModal(false)}
                />
            )}

            {!movie && !loading && <p>Oops, movie not found!</p>}
        </>
    )
}