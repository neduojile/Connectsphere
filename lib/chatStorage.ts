export function saveMessages(messages: any[]) {
  localStorage.setItem(
    "connectsphere_chat",
    JSON.stringify(messages)
  );
}

export function getMessages() {
  if (typeof window === "undefined") {
    return [];
  }

  const data = localStorage.getItem(
    "connectsphere_chat"
  );

  return data
    ? JSON.parse(data)
    : [];
}

export function clearMessages() {
  localStorage.removeItem(
    "connectsphere_chat"
  );
}