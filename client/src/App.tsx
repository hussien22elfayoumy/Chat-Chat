import { useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:8080");

function App() {
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const [showMessages, setShowMessages] = useState(false);

  const hanldeJoinRoom = () => {
    if (!roomId || !userName) return;
    const roomData = {
      roomId,
      userName,
    };
    console.log(roomData);

    socket.emit("join-room", roomData);
    setShowMessages(true);
  };

  const handleSendMessages = () => {
    if (!message) return;
    console.log(message);

    socket.emit("send-message", message);
    setMessage("");
  };

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
          <div className="flex-1">hhhh</div>
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
