import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:8080");

type MessageData = {
  message: string;
  userName: string;
  roomId: string;
  time: string;
};

let flag = 0;

function App() {
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const [showMessages, setShowMessages] = useState(false);
  const [messagesList, setMessagesList] = useState<MessageData[]>([]);

  const hanldeJoinRoom = () => {
    if (!roomId || !userName) return;
    const roomData = {
      roomId,
      userName,
    };

    socket.emit("join-room", roomData);
    setShowMessages(true);
  };

  const handleSendMessages = () => {
    if (!message) return;

    const messageData = {
      message,
      userName,
      roomId,
      time: `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`,
    };

    socket.emit("send-message", messageData);
    setMessagesList((prevList) => [...prevList, messageData]);

    setMessage("");
  };

  useEffect(() => {
    socket.on("receive-message", (messageData) => {
      console.log(messageData);
      setMessagesList((prevList) => [...prevList, messageData]);
    });
  }, [socket]);

  return (
    <main className="flex h-screen flex-col items-center justify-center p-4">
      <h1 className="mb-20 text-3xl">
        Welcome, To <span className="font-semibold text-indigo-500">Chat Chat</span>
      </h1>
      {!showMessages ? (
        <section className="mx-auto flex w-full max-w-lg flex-col justify-center gap-4">
          <div className="space-y-2">
            <label htmlFor="userName" className="block font-medium">
              User name
            </label>
            <input
              className="w-full rounded-md border-2 border-indigo-600 p-2 focus-visible:border-indigo-500 focus-visible:outline-none"
              type="text"
              placeholder="Username"
              id="userName"
              autoComplete="off"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="roomId" className="block font-medium">
              Room Id
            </label>
            <input
              className="w-full rounded-md border-2 border-indigo-600 p-2 focus-visible:border-indigo-500 focus-visible:outline-none"
              type="text"
              placeholder="roomId"
              id="roomId"
              autoComplete="off"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
            />
          </div>

          <button
            onClick={hanldeJoinRoom}
            className="cursor-pointer rounded-md bg-indigo-600 p-2 hover:bg-indigo-500"
          >
            Join Room
          </button>
        </section>
      ) : (
        <section className="flex h-[70vh] w-full max-w-lg flex-col rounded-md border-2 border-indigo-600 p-2">
          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {messagesList.map((message, i) => {
              const isCurrentUser = message.userName === userName;

              return (
                <div
                  key={i}
                  className={`flex items-start space-x-2 ${isCurrentUser ? "justify-end" : ""}`}
                >
                  <div className="flex flex-col">
                    <div
                      className={`max-w-md rounded-md p-3 text-sm wrap-break-word ${
                        isCurrentUser
                          ? "bg-indigo-500 text-indigo-50"
                          : "bg-indigo-100 text-stone-700"
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
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="message" className="sr-only block font-medium">
              Room Id
            </label>
            <input
              className="h-11 w-full rounded-md border-2 border-indigo-600 p-2 focus-visible:border-indigo-500 focus-visible:outline-none"
              type="text"
              placeholder="message"
              id="message"
              autoComplete="off"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              onClick={handleSendMessages}
              className="h-11 cursor-pointer rounded-md bg-indigo-600 px-4 py-2 hover:bg-indigo-500"
            >
              Send
            </button>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
