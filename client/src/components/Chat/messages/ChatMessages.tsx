/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { Message } from "./Message";
import { useEffect, useRef } from "react";
import { Typing } from "./Typing";
import { FileMessage } from "./files";

export const ChatMessages = ({ typing }: { typing: any }) => {
  const { messages, activeConversation } = useSelector(
    (state: any) => state.chat
  );
  const { user } = useSelector((state: any) => state.user);
  const endRef: any = useRef();
  const scrollToBottom = () => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <div className="mb-[60px] bg-[url('https://res.cloudinary.com/dmhcnhtng/image/upload/v1677358270/Untitled-1_copy_rpx8yb.jpg')] bg-cover bg-no-repeat">
      {/* Container */}
      <div className="scrollbar overflow-auto overflow_scrollbar py-2 px-[4%]">
        {/* Messages */}
        {messages &&
          messages.map((message: any) => (
            <>
              {/* Message files */}
              {message.files.length > 0
                ? message.files.map((file:any) => (
                    <FileMessage
                      fileMessage={file}
                      message={message}
                      key={message._id}
                      me={user._id === message.sender._id}
                    />
                  ))
                : null}
              {/* Message text */}
              {message.message.length > 0 ? (
                <Message
                  message={message}
                  key={message._id}
                  me={user._id === message.sender._id}
                />
              ) : null}
            </>
          ))}
        {typing === activeConversation._id ? <Typing /> : null}
        <div className="mt-2" ref={endRef}></div>
      </div>
    </div>
  );
};
