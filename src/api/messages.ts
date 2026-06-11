import { apiRequest } from "./client";
import type { CreateMessagePayload, GetMessagesParams, Message } from "./types";

export function getMessages(
  params: GetMessagesParams = {},
): Promise<Message[]> {
  const query = new URLSearchParams();
  if (params.after) query.set("after", params.after);
  if (params.before) query.set("before", params.before);
  if (params.limit != null) query.set("limit", String(params.limit));

  const qs = query.toString();

  return apiRequest<Message[]>(`/api/v1/messages${qs ? `?${qs}` : ""}`, {});
}

export function createMessage(payload: CreateMessagePayload): Promise<Message> {
  return apiRequest("/api/v1/messages", {
    method: "POST",
    body: payload,
  });
}
