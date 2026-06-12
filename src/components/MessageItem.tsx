import type { Message } from "../api/types";
import { decodeEntities } from "../lib/decodeEntities";
import { formatTimestamp } from "../lib/formatTimestamp";
import styles from "./MessageItem.module.css";

type MessageItemProps = {
  message: Message;
  isOwn: boolean;
};

export function MessageItem({ message, isOwn }: MessageItemProps) {
  return (
    <li className={`${styles.message} ${isOwn ? styles.own : styles.other}`}>
      {isOwn ? (
        <span className="sr-only">You</span>
      ) : (
        <span className={styles.author}>{message.author}</span>
      )}
      <p className={styles.text}>{decodeEntities(message.message)}</p>
      <time className={styles.time} dateTime={message.createdAt}>
        {formatTimestamp(message.createdAt)}
      </time>
    </li>
  );
}
