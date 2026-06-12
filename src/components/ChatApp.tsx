import { useMessages } from "../hooks/useMessages";
import { MessageComposer } from "./MessageComposer";
import { MessageItem } from "./MessageItem";

export function ChatApp() {
  const { messages, isLoading, error, sendMessage } = useMessages();

  return (
    <div>
      <header>
        <h1>Chat</h1>
      </header>

      <main>
        {isLoading ? (
          <p>Loading…</p>
        ) : error ? (
          <p>{error}</p>
        ) : messages.length === 0 ? (
          <p>No messages yet</p>
        ) : (
          <ul>
            {messages.map((message) => (
              <MessageItem key={message._id} message={message} />
            ))}
          </ul>
        )}
      </main>

      <footer>
        <MessageComposer
          onSend={(text) => {
            sendMessage({ message: text, author: "Amit" });
          }}
          disabled={isLoading}
        />
      </footer>
    </div>
  );
}
