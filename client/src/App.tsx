import { useState } from "react";
import { io } from "socket.io-client";
import Chat from "./components/chat";
import JoinRoom from "./components/join-room";

const socket = io(import.meta.env.VITE_SOCKET_URL);

function App() {
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");
  const [showChat, setShowChat] = useState(false);

  const handleJoinRoom = () => {
    if (!roomId || !userName) return;
    const roomData = {
      roomId,
      userName,
    };

    socket.emit("join-room", roomData);
    setShowChat(true);
  };

  return (
    <main className="flex h-screen flex-col items-center justify-center p-4">
      <h1 className="mb-20 text-3xl">
        Welcome, To <span className="font-semibold text-indigo-500">Chat Chat</span>
      </h1>

      {!showChat ? (
        <JoinRoom
          userName={userName}
          roomId={roomId}
          setUserName={setUserName}
          setRoomId={setRoomId}
          onJoin={handleJoinRoom}
        />
      ) : (
        <Chat userName={userName} roomId={roomId} socket={socket} />
      )}
    </main>
  );
}

export default App;
