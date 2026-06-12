import { useEffect, useRef } from "react";
import { useMessages } from "../hooks/useMessages";
import { MessageComposer } from "./MessageComposer";
import { MessageItem } from "./MessageItem";
import styles from "./ChatRoom.module.css";

type ChatRoomProps = {
  name: string;
};

export function ChatRoom({ name }: ChatRoomProps) {
  const { messages, isLoading, error, sendMessage } = useMessages();
  const listRef = useRef<HTMLElement>(null);

  // Jump to the newest message on load and after a successful send
  // (both are the moments `messages` changes).
  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages]);

  return (
    <div className={styles.room}>
      <h1 className="sr-only">Doodle Chat</h1>

      <main ref={listRef} className={styles.list}>
        {isLoading ? (
          <p className={styles.status}>Loading…</p>
        ) : error ? (
          <p className={styles.status}>{error}</p>
        ) : messages.length === 0 ? (
          <p className={styles.status}>No messages yet</p>
        ) : (
          <ul className={styles.messages}>
            {messages.map((message) => (
              <MessageItem
                key={message._id}
                message={message}
                isOwn={message.author === name}
              />
            ))}
          </ul>
        )}
      </main>

      <MessageComposer
        onSend={(text) => sendMessage({ message: text, author: name })}
        disabled={isLoading}
      />
    </div>
  );
}
