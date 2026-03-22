
import { useCompare } from "../../context/CompareContext";
import styles from "./ComparePanel.module.css";

export const ComparePanel = () => {
    const { compareList } = useCompare();

    if (compareList.length === 0) return null;

    return (
        <div className={styles.panel}>
            <h3>Сравнение</h3>

            <table>
                <tbody>
                    <tr>
                        <td>Название</td>
                        {compareList.map(m => <td key={m.id}>{m.name || m.alternativeName}</td>)}
                    </tr>

                    <tr>
                        <td>Год</td>
                        {compareList.map(m => <td key={m.id}>{m.year}</td>)}
                    </tr>

                    <tr>
                        <td>Рейтинг</td>
                        {compareList.map(m => <td key={m.id}>{m.rating.imdb || m.rating.kp || "-"}</td>)}
                    </tr>

                    <tr>
                        <td>Жанры</td>
                        {compareList.map(m => (
                            <td key={m.id}>
                                {m.genres?.map(g => g.name).join(", ") || "-"}
                            </td>
                        ))}
                    </tr>

                    <tr>
                        <td>Длительность</td>
                        {compareList.map(m => (
                            <td key={m.id}>
                                {m.movieLength || "-"}
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};