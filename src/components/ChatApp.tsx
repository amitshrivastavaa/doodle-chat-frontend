import { useMessages } from "../hooks/useMessages";

export function ChatApp() {
  const { messages, isLoading, error } = useMessages();

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
              <li key={message._id}>
                <strong>{message.author}</strong>: {message.message}{" "}
                <small>{message.createdAt}</small>
              </li>
            ))}
          </ul>
        )}
      </main>

      {/* composer goes here (step 3) */}
      <footer></footer>
    </div>
  );
}
