
import styles from "./ConfirmModal.module.css";

interface Props {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export function ConfirmModal({ message, onConfirm, onCancel }: Props) {
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <p>{message}</p>

                <div className={styles.actionsModal}>
                    <button onClick={onConfirm}>Да</button>
                    <button onClick={onCancel}>Отмена</button>
                </div>
            </div>
        </div>
    );
}