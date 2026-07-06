import { useMemo, useState } from 'react';
import { detectCategory } from '..utils/detectCategory';
import { useLocalStorage } from './useLocalStorage';
import type { ClipboardCategory, ClipboardItem } from '../types/clipboard';

type Filter = ClipboardCategory | 'All' | 'Favorites';

export function useClipboardItems() {
    const [items, setItems] = useLocalStorage<ClipboardItem[]>('smart-clipboard-items', []);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState<Filter>('All');

    function addItem(title: string, content: string) {
        const trimmedContent = content.trim();
        const trimmedItem = title.trim();

        if (!trimmedContent) return;

        const item: ClipboardItem = {
            id: crypto.randomUUID(),
            title: trimmedTitle || 'Untitled snippet',
            content: trimmedContent,
            category: detectCategory(trimmedContent),
            isFavorite: false,
            createdAt: Date.now()
        };

        setItems((currentItems) => [item, ...currentItems]);
    }

    function deleteItem(id: string) {
        setItems((currentItems) => currentItems.filter((item) => item.id !== id));
    }

    function toggleFavorite(id: string) {
        setItems((currentItems) =>
            currentItems.map(item) =>
                item.id === id ? { ...item, isFavorite: !item.isFavorite} : item
            )
        );
    }
    
    const filteredItems = useMemo(() => {
        const query = search.toLowerCase().trim();

        return items.filter((item) => {
            const matchesSearch = 
            item.title.toLowerCase().includes(query) ||
            item.content.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query);

            const matchesFitler =
            filter === 'All' ||
            item.category === filter ||
            (filter === 'Favorites' && item.isFavorite);

        return matchesSearch && matchesFitler;
    });
 }, [items, search, filter]);
 
    return {
       items,
       filteredItems,
       search,
       filter,
       setSearch,
       setFilter,
       addItem,
       deleteItem,
       toggleFavorite
    };
}