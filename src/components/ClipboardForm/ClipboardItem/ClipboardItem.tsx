import type { ClipboardItem as ClipboardItemType } from '../../types/clipboard';
import styles from './ClipboardItem.module.css';

interface ClipboardItemProps {
  item: ClipboardItemType;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export function ClipboardItem({
  item,
  onDelete,
  onToggleFavorite
}: ClipboardItemProps) {
  async function handleCopy() {
    await navigator.clipboard.writeText(item.content);
  }

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <div>
          <h3 className={styles.title}>{item.title}</h3>
          <span className={styles.category}>{item.category}</span>
        </div>

        <button
          className={styles.iconButton}
          type="button"
          onClick={() => onToggleFavorite(item.id)}
          title="Toggle favorite"
        >
          {item.isFavorite ? '★' : '☆'}
        </button>
      </header>

      <p className={styles.content}>{item.content}</p>

      <footer className={styles.footer}>
        <button className={styles.copyButton} type="button" onClick={handleCopy}>
          Copy
        </button>

        <button
          className={styles.deleteButton}
          type="button"
          onClick={() => onDelete(item.id)}
        >
          Delete
        </button>
      </footer>
    </article>
  );
}