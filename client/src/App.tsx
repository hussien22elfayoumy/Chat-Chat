import { io } from "socket.io-client";
const socket = io("http://localhost:8080");

function App() {
  return (
    <main>
      <p>Hello Chat chat</p>
    </main>
  );
}

export default App;
