import type { ClipboardCategory } from '../../types/clipboard';
import styles from './FilterBar.module.css';

type Filter = ClipboardCategory | 'All' | 'Favorites';

interface FilterBarProps {
  search: string;
  filter: Filter;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: Filter) => void;
}

const filters: Filter[] = ['All', 'Favorites', 'Code', 'Link', 'Email', 'Text', 'Other'];

export function FilterBar({
  search,
  filter,
  onSearchChange,
  onFilterChange
}: FilterBarProps) {
  return (
    <section className={styles.bar}>
      <input
        className={styles.search}
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search snippets..."
      />

      <div className={styles.filters}>
        {filters.map((item) => (
          <button
            key={item}
            className={`${styles.filterButton} ${filter === item ? styles.active : ''}`}
            type="button"
            onClick={() => onFilterChange(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </section>
  );
}