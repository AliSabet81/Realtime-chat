/* eslint-disable @typescript-eslint/no-explicit-any */
import { SendIcon } from "@/svg";
import { Attachments } from "./attachments";
import { EmojiPickerApp } from "./EmojiPicker";
import { Input } from "./Input";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "@/features";
import { ClipLoader } from "react-spinners";
import SocketContext from "@/context/SocketContext";

export const ChatActionswithoutSocket = ({ socket }: { socket: any }) => {
  const dispatch = useDispatch();
  const [showPicker, setShowPicker] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);

  const { activeConversation, status } = useSelector(
    (state: any) => state.chat
  );
  const { user } = useSelector((state: any) => state.user);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const textRef = useRef();
  const values = {
    message,
    convo_id: activeConversation._id,
    files: [],
    token: user.token,
  };
  const sendMessageHandler = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const newMsg = await dispatch(sendMessage(values));
    socket.emit("send message", newMsg.payload);
    setMessage("");
    setLoading(false);
  };
  return (
    <form
      onSubmit={sendMessageHandler}
      className="dark:bg-dark_bg_2 h-[60px] w-full flex items-center absolute bottom-0 py-2 px-4 select-none"
    >
      {/* Container */}
      <div className="w-full flex items-center gap-x-2 ">
        {/* Emojis and attachments */}
        <ul className="flex gap-x-2">
          <EmojiPickerApp
            message={message}
            setMessage={setMessage}
            textRef={textRef}
            showPicker={showPicker}
            setShowPicker={setShowPicker}
            setShowAttachments={setShowAttachments}
          />
          <Attachments
            setShowPicker={setShowPicker}
            showAttachments={showAttachments}
            setShowAttachments={setShowAttachments}
          />
        </ul>
        {/* Input */}
        <Input message={message} setMessage={setMessage} textRef={textRef} />
        {/* Send Button */}
        <button type="submit" className="btn">
          {status === "loading" && loading ? (
            <ClipLoader color="#E9EDEF" size={25} />
          ) : (
            <SendIcon className="dark:fill-dark_svg_1" />
          )}
        </button>
      </div>
    </form>
  );
};

const ChatActionsWithContext = (props: any) => (
  <SocketContext.Consumer>
    {(socket) => <ChatActionswithoutSocket {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export const ChatActions = ChatActionsWithContext;
