import { useState } from "react";
// import { io } from "socket.io-client";
// const socket = io("http://localhost:8080");

function App() {
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");

  const hanldeJoinRoom = () => {
    if (!roomId || !userName) return;
    const roomData = {
      roomId,
      userName,
    };
    console.log(roomData);
  };

  return (
    <main className="flex h-screen flex-col items-center justify-center p-4">
      <h1 className="mb-20 text-3xl">
        Welcome, To <span className="font-semibold text-indigo-500">Chat Chat</span>
      </h1>
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
    </main>
  );
}

export default App;
