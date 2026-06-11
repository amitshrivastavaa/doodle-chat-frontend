/**
 * Decodes HTML entities (e.g. `&#39;`, `&amp;`) to plain text.
 *
 * Assigning to a detached <textarea>'s innerHTML decodes character references,
 * and reading `value` returns the decoded text. Because the markup lives inside
 * a textarea (an escapable raw-text element) it is never parsed into live
 * nodes, so this cannot execute scripts.
 */
export function decodeEntities(input: string): string {
  if (!input.includes("&")) {
    return input;
  }
  const textarea = document.createElement("textarea");
  textarea.innerHTML = input;
  return textarea.value;
}
