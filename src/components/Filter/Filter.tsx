import { useState } from 'react';
import styles from './Filter.module.css';
import type { GenresType } from '../../types/filters';

interface Props {
    genres: GenresType[];
    selectedGenres: string[];
    ratingFrom?: string;
    ratingTo?: string;
    yearFrom?: string;
    yearTo?: string;
    onChange: (filters: {
        genres: string[];
        ratingFrom?: string;
        ratingTo?: string;
        yearFrom?: string;
        yearTo?: string;
    }) => void;
    onClose: () => void;
}

export function Filter({
    genres,
    selectedGenres,
    ratingFrom,
    ratingTo,
    yearFrom,
    yearTo,
    onChange,
    onClose,
}: Props) {
    const [localGenres, setLocalGenres] = useState<string[]>(selectedGenres);
    const [localRatingFrom, setLocalRatingFrom] = useState(ratingFrom || '');
    const [localRatingTo, setLocalRatingTo] = useState(ratingTo || '');
    const [localYearFrom, setLocalYearFrom] = useState(yearFrom || '');
    const [localYearTo, setLocalYearTo] = useState(yearTo || '');

    const toggleGenre = (genre: string) => {
        if (localGenres.includes(genre)) {
            setLocalGenres(localGenres.filter(g => g !== genre));
        } else {
            setLocalGenres([...localGenres, genre]);
        }
    };

    const applyFilters = () => {
        onChange({
            genres: localGenres,
            ratingFrom: localRatingFrom,
            ratingTo: localRatingTo,
            yearFrom: localYearFrom,
            yearTo: localYearTo,
        });
        onClose();
    };

    return (
        <div className={styles.filtersContainer}>
            <div className={styles.modal}>
                <div className={styles.column}>
                    <h4>Жанры</h4>
                    <div className={styles.genresList}>
                        {genres.map(genre => (
                            <label key={genre.name} htmlFor={genre.name}>
                                <input
                                    id={genre.name}
                                    type="checkbox"
                                    checked={localGenres.includes(genre.name)}
                                    onChange={() => toggleGenre(genre.name)}
                                />
                                {genre.name}
                            </label>
                        ))}
                    </div>
                </div>

                <div className={styles.column}>
                    <h4>Рейтинг</h4>
                    <input
                        id={styles.ratingFrom}
                        min={0}
                        max={10}
                        type="number"
                        placeholder="From"
                        value={localRatingFrom}
                        onChange={(e) => {
                            const num = Math.max(0, Math.min(10, Number(e.target.value)));
                            setLocalRatingFrom(num.toString());
                        }}
                    />
                    <input
                        id={styles.ratingTo}
                        min={0}
                        max={10}
                        type="number"
                        placeholder="To"
                        value={localRatingTo}
                        onChange={(e) => setLocalRatingTo(e.target.value)}
                    />
                </div>

                <div className={styles.column}>
                    <h4>Год</h4>
                    <input
                        id={styles.yearFrom}
                        type="number"
                        min={1990}
                        placeholder="From"
                        value={localYearFrom}
                        onChange={(e) => setLocalYearFrom(e.target.value)}
                    />
                    <input
                        id={styles.yearTo}
                        type="number"
                        min={1990}
                        placeholder="To"
                        value={localYearTo}
                        onChange={(e) => setLocalYearTo(e.target.value)}
                    />
                </div>
                
            </div>
            <div className={styles.actions}>
                <button onClick={applyFilters}>Применить</button>
                <button onClick={onClose}>Зыкрыть</button>
            </div>
        </div>
    );
}