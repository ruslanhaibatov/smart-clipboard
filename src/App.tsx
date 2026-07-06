import { ClipboardForm } from './components/ClipboardForm/ClipboardForm';
import { ClipboardItem } from './components/ClipboardItem/ClipboardItem';
import { FilterBar } from './components/FilterBar/FilterBar';
import { useClipboardItems } from './hooks/useClipboardItems';
import { useTheme } from './hooks/useTheme';
import styles from './App.module.css';

export default function App() {
  const {
    filteredItems,
    search,
    filter,
    setSearch,
    setFilter,
    addItem,
    deleteItem,
    toggleFavorite
  } = useClipboardItems();

  const { theme, toggleTheme } = useTheme();

  return (
    <main className={styles.app}>
      <header className={styles.header}>
        <div>
          <p className={styles.label}>Smart Clipboard</p>
          <h1 className={styles.title}>Your reusable text library</h1>
        </div>

        <button className={styles.themeButton} type="button" onClick={toggleTheme}>
          {theme === 'light' ? 'Dark' : 'Light'}
        </button>
      </header>

      <section className={styles.layout}>
        <ClipboardForm onAdd={addItem} />

        <div className={styles.content}>
          <FilterBar
            search={search}
            filter={filter}
            onSearchChange={setSearch}
            onFilterChange={setFilter}
          />

          <div className={styles.list}>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <ClipboardItem
                  key={item.id}
                  item={item}
                  onDelete={deleteItem}
                  onToggleFavorite={toggleFavorite}
                />
              ))
            ) : (
              <div className={styles.empty}>
                No snippets found.
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}