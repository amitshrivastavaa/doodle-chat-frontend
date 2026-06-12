import type { Message } from "../api/types";
import { decodeEntities } from "../lib/decodeEntities";
import { formatTimestamp } from "../lib/formatTimestamp";

type MessageItemProps = {
  message: Message;
  isOwn: boolean;
};

export function MessageItem({ message, isOwn }: MessageItemProps) {
  return (
    <li>
      <strong>{isOwn ? "You" : message.author}</strong>:{" "}
      {decodeEntities(message.message)}{" "}
      <small>{formatTimestamp(message.createdAt)}</small>
    </li>
  );
}
