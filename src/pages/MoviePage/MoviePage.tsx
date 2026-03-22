import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PoiskKinoApi } from "../../api/PoiskKinoApi";
import type { MovieByIdType } from "../../types/movie";
import styles from './MoviePage.module.css';
import { useFavorites } from "../../context/FavoritesContext";
import { ConfirmModal } from "../../components/ConfirmModal/ConfirmModal";

export default function MoviePage() { // TODO: сделатб тип форматер где будет в том числе проверка напр если не имя то альтернативное
    // и еще сделать рейтинг тоже несколько и рейтинг как звездочки
    const { id } = useParams();
    const [movie, setMovie] = useState<MovieByIdType | null>(null);
    const [loading, setLoading] = useState(true);
    const { addToFavorites, isFavorite } = useFavorites(); // types!!
    const [showModal, setShowModal] = useState(false);  // types!!

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

    if (loading) {
        return <p>Loading...</p>;
    }
    if (!movie) {
        return <p>Oops, movie not found!</p>
    }

    return (
        <>
            <div className={styles.movieContainer}>
                <div className={styles.moviePoster}>
                    <img className={styles.posterImage} src={movie.poster?.url} alt={movie.alternativeName}></img>
                </div>
                <div className={styles.movieInfo}>
                    <h3>{movie.name}</h3>
                    <p>{movie.alternativeName}</p>
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
                        <p>{movie.rating.imdb}</p>
                    </div>
                </div>
            </div>      

            {showModal && (
                <ConfirmModal
                    message="Добавить фильм в избранное?"
                    onConfirm={() => {
                        addToFavorites(movie);
                        setShowModal(false);
                    }}
                    onCancel={() => setShowModal(false)}
                />
            )}
        </>
    )
}