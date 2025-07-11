import { useEffect, useRef, useState } from "react";
import type { Socket } from "socket.io-client";

type MessageData = {
  message: string;
  userName: string;
  roomId: string;
  time: string;
  isCurrentUserMessage?: boolean;
};

type ChatProps = {
  userName: string;
  roomId: string;
  socket: Socket;
};

export default function Chat({ userName, socket, roomId }: ChatProps) {
  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState<MessageData[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSendMessages = () => {
    if (!message) return;

    const messageData = {
      message,
      userName,
      roomId,
      time: `${new Date(Date.now()).getHours().toString().padStart(2, "0")}:${new Date(Date.now()).getMinutes().toString().padStart(2, "0")}`,
    };

    socket.emit("send-message", messageData);

    // To show the currend user messages
    setMessagesList((prevList) => [...prevList, { ...messageData, isCurrentUserMessage: true }]);

    setMessage("");
  };

  useEffect(() => {
    const receiveMessageHandler = (messageData: MessageData) => {
      setMessagesList((prevList) => [...prevList, messageData]);
    };

    socket.on("receive-message", receiveMessageHandler);

    // To prevend duplicate remount
    return () => {
      socket.off("receive-message", receiveMessageHandler);
    };
  }, [socket]);

  // Scroll to the view
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesList]);

  return (
    <section className="flex h-[70vh] w-full max-w-lg flex-col rounded-lg border-2 border-indigo-600 p-2">
      <div className="scrollbar-hide flex-1 space-y-4 overflow-y-auto p-3.5">
        {messagesList.map((message, i) => {
          const isCurrentUser = message?.isCurrentUserMessage;

          return (
            <div
              key={i}
              className={`flex items-start space-x-2 ${isCurrentUser ? "justify-end" : ""}`}
            >
              {!isCurrentUser && (
                <div className="flex size-8 items-center justify-center rounded-full bg-indigo-100 text-sm font-medium text-stone-700">
                  {message.userName.charAt(0).toUpperCase()}
                </div>
              )}

              <div className="flex flex-col">
                <div
                  className={`max-w-sm rounded-lg p-2.5 px-3 wrap-break-word ${
                    isCurrentUser ? "bg-indigo-500 text-indigo-50" : "bg-indigo-100 text-stone-700"
                  }`}
                >
                  <p>{message.message}</p>
                </div>

                <div
                  className={`mt-1 flex items-center text-xs ${isCurrentUser ? "self-end" : ""}`}
                >
                  <span className="text-gray-400">
                    {isCurrentUser ? "You" : message.userName} &#9679; {message.time}
                  </span>
                </div>
              </div>

              {isCurrentUser && (
                <div className="flex size-8 items-center justify-center rounded-full bg-indigo-500 text-sm font-medium text-indigo-50">
                  {message.userName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="message" className="sr-only block font-medium">
          Send message
        </label>

        <input
          className="h-11 w-full rounded-lg border-2 border-indigo-600 p-2 focus-visible:border-indigo-500 focus-visible:outline-none"
          type="text"
          placeholder="Message"
          id="message"
          autoComplete="off"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendMessages();
          }}
        />

        <button
          onClick={handleSendMessages}
          className="h-11 cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 hover:bg-indigo-500"
        >
          Send
        </button>
      </div>
    </section>
  );
}
