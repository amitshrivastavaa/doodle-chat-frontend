import { useState } from "react";
import styles from "./NamePrompt.module.css";

const MAX_LENGTH = 50;
const NAME_PATTERN = /^[\w\s-]+$/;

type NamePromptProps = {
  onSave: (name: string) => void;
};

export function NamePrompt({ onSave }: NamePromptProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) {
      setError("Please enter a name.");
      return;
    }
    if (!NAME_PATTERN.test(trimmed)) {
      setError("Use only letters, numbers, spaces, hyphens, or underscores.");
      return;
    }
    onSave(trimmed);
  }

  return (
    <div className={styles.screen}>
      <form
        className={styles.card}
        onSubmit={handleSubmit}
        aria-labelledby="name-title"
      >
        <h1 id="name-title" className={styles.title}>
          What should we call you?
        </h1>
        <label htmlFor="name-input" className="sr-only">
          Your name
        </label>
        <input
          id="name-input"
          className={styles.input}
          type="text"
          placeholder="Your name"
          value={value}
          maxLength={MAX_LENGTH}
          autoFocus
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "name-error" : undefined}
          onChange={(event) => {
            setValue(event.target.value);
            setError(null);
          }}
        />
        {error && (
          <p id="name-error" className={styles.error} role="alert">
            {error}
          </p>
        )}
        <button type="submit" className={styles.submit}>
          Start chatting
        </button>
      </form>
    </div>
  );
}
