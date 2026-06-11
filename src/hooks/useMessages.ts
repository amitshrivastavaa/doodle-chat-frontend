import { useEffect, useState } from "react";
import { getMessages } from "../api/messages";
import type { Message } from "../api/types";

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
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

  return { messages, isLoading, error };
}
