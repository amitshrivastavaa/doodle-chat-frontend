import type { Message } from "../api/types";
import { decodeEntities } from "../lib/decodeEntities";
import { formatTimestamp } from "../lib/formatTimestamp";

type MessageItemProps = {
  message: Message;
};

export function MessageItem({ message }: MessageItemProps) {
  return (
    <li>
      <strong>{message.author}</strong>: {decodeEntities(message.message)}{" "}
      <small>{formatTimestamp(message.createdAt)}</small>
    </li>
  );
}
