import { useState } from "react";

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
    <form onSubmit={handleSubmit} aria-labelledby="name-title">
      <h1 id="name-title">What should we call you?</h1>
      <label htmlFor="name-input">Your name</label>
      <input
        id="name-input"
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
        <p id="name-error" role="alert">
          {error}
        </p>
      )}
      <button type="submit">Start chatting</button>
    </form>
  );
}
