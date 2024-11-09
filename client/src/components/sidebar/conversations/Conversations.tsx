/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { Conversation } from "./Conversation";
import { checkOnlineStatus } from "@/utils";

export const Conversations = ({
  onlineUsers,
  typing,
}: {
  onlineUsers: any;
  typing: any;
}) => {
  const { conversations, activeConversation } = useSelector(
    (state: any) => state.chat
  );
  const { user } = useSelector((state: any) => state.user);

  return (
    <div className="convos scrollbar">
      <ul>
        {conversations &&
          conversations
            .filter(
              (c: any) =>
                c.latestMessage ||
                c._id === activeConversation._id ||
                c.isGroup === true
            )
            .map((convo: any) => {
              return (
                <Conversation
                  convo={convo}
                  key={convo._id}
                  online={
                    !convo.isGroup &&
                    checkOnlineStatus(onlineUsers, user, convo.users)
                  }
                  typing={typing}
                />
              );
            })}
      </ul>
    </div>
  );
};
