/* eslint-disable @typescript-eslint/no-explicit-any */

import SocketContext from "@/context/SocketContext";
import { useState } from "react";
import { useSelector } from "react-redux";

export const InputWithouttSocket = ({
  message,
  setMessage,
  textRef,
  socket,
}: {
  message: string;
  setMessage: any;
  textRef: any;
  socket: any;
}) => {
  const { activeConversation } = useSelector((state: any) => state.chat);

  const [typing, setTyping] = useState(false);
  const onChangeHandler = (e: any) => {
    setMessage(e.target.value);
    if (!typing) {
      setTyping(true);
      socket.emit("typing", activeConversation._id);
    }
    const lastTypingTime = new Date().getTime();
    const timer = 1000;
    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timer && typing) {
        socket.emit("stop typing", activeConversation._id);
        setTyping(false);
      }
    }, timer);
  };
  return (
    <div className="w-full">
      <input
        type="text"
        className="dark:bg-dark_hover_1 dark:text-dark_text_1 outline-none h-[45px] w-full flex-1 rounded-lg pl-4"
        placeholder="Type a message"
        value={message}
        onChange={onChangeHandler}
        ref={textRef}
      />
    </div>
  );
};

const InputWithtSocket = (props: any) => (
  <SocketContext.Consumer>
    {(socket) => <InputWithouttSocket {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export const Input = InputWithtSocket;
