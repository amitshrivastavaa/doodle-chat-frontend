import { useState } from "react";

const MAX_LENGTH = 500;
const COUNTER_THRESHOLD = 50;

type MessageComposerProps = {
  onSend: (text: string) => void;
  disabled?: boolean;
};

export function MessageComposer({
  onSend,
  disabled = false,
}: MessageComposerProps) {
  const [value, setValue] = useState("");
  const trimmed = value.trim();
  const remaining = MAX_LENGTH - value.length;
  const canSend =
    trimmed.length > 0 && trimmed.length <= MAX_LENGTH && !disabled;

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSend) return;
    onSend(trimmed);
    setValue("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="composer-input">Message</label>
      <input
        id="composer-input"
        type="text"
        placeholder="Message"
        value={value}
        maxLength={MAX_LENGTH}
        autoComplete="off"
        disabled={disabled}
        onChange={(event) => setValue(event.target.value)}
      />
      {remaining <= COUNTER_THRESHOLD && (
        <span aria-live="polite">{remaining} characters left</span>
      )}
      <button type="submit" disabled={!canSend}>
        Send
      </button>
    </form>
  );
}
