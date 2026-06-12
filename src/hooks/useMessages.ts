import { useEffect, useState } from "react";
import { createMessage, getMessages } from "../api/messages";
import type { CreateMessagePayload, Message } from "../api/types";

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        // API returns messages oldest-first, so they map straight to the list
        // (oldest at top, newest by the composer); sends append below.
        const data = await getMessages();
        if (!cancelled) setMessages(data);
      } catch {
        if (!cancelled) setError("Could not load messages.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const sendMessage = async (payload: CreateMessagePayload) => {
    try {
      const saved = await createMessage(payload);
      setMessages((prev) => [...prev, saved]);
    } catch {
      setError("Could not send message.");
    }
  };

  return { messages, isLoading, error, sendMessage };
}
