type JoinRoomProps = {
  userName: string;
  roomId: string;
  setUserName: (value: string) => void;
  setRoomId: (value: string) => void;
  onJoin: () => void;
};

export default function JoinRoom({
  userName,
  roomId,
  setUserName,
  setRoomId,
  onJoin,
}: JoinRoomProps) {
  return (
    <section className="mx-auto flex w-full max-w-lg flex-col justify-center gap-4">
      <div className="space-y-2">
        <label htmlFor="userName" className="block font-medium">
          User name
        </label>
        <input
          className="h-11 w-full rounded-lg border-2 border-indigo-600 p-2 focus-visible:border-indigo-500 focus-visible:outline-none"
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
          className="h-11 w-full rounded-lg border-2 border-indigo-600 p-2 focus-visible:border-indigo-500 focus-visible:outline-none"
          type="text"
          placeholder="roomId"
          id="roomId"
          autoComplete="off"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
      </div>

      <button
        onClick={onJoin}
        className="mt-3 h-11 cursor-pointer rounded-lg bg-indigo-600 p-2 hover:bg-indigo-500"
      >
        Join Room
      </button>
    </section>
  );
}
