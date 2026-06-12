import { useIdentity } from "../hooks/useIdentity";
import { ChatRoom } from "./ChatRoom";
import { NamePrompt } from "./NamePrompt";

export function ChatApp() {
  const { name, saveName } = useIdentity();
  if (!name) return <NamePrompt onSave={saveName} />;
  return <ChatRoom name={name} />;
}
