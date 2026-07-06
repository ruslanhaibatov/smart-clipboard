import { FormEvent, useState } from 'react';
import styles from './ClipboardForm.module.css';

interface ClipboardFormProps {
    onAdd: (title: string, content: string) => void;
}

export function ClipboardForm({ on Add }: ClipboardFormProps) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    function handleSubmit(event: FormEvent<HTMLFormeElement>) {
        event.preventDefault();

        onAdd(title, content);

        setTitle('');
        setContent('');
    }
    
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <input
            className={styles.input}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Title"
        />

        <textarea
          className={styles.textarea}
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="paste your reusable text here..."
          rows={5}
        />

        <button className={styles.button} type="submit">
            save snippet
        </button>
      </form>
    );
}