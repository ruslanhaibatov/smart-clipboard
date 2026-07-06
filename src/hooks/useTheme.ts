import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export type Theme = 'light' | 'dark';

export function useTheme() {
    const [theme, setTheme] = useLocalStorage<Theme>('smart-clipboard-theme', 'light');

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
    }, [theme]);

    function toggleTheme() {
        setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
    }

    return {
        theme,
        toggleTheme
    };
}