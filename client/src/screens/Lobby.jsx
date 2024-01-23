import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div >
      <h1 className="font-bold text-[2rem] ">Lobby</h1>
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="email " className="font-semibold text-[1.2rem]">Email ID</label>
        <input
          type="email"
          id="email"
          value={email}
          className="border-solid border-2 border-black ml-[1rem] my-[1rem] px-[1rem] py-[0.5rem]"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="room" className="font-semibold text-[1.2rem]">Room Code</label>
        <input
          type="text"
          id="room"
          value={room}
          className="border-solid border-2 border-black ml-[1rem] px-[1rem] py-[0.5rem]"

          onChange={(e) => setRoom(e.target.value)}
        />
        <br />
        <button className="mt-[2rem] bg-blue-500 hover:bg-blue-600 text-white rounded-md px-[1rem] py-[0.5rem]">Join</button>
      </form>
    </div>
  );
};

export default LobbyScreen;
