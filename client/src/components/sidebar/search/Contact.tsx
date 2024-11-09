import SocketContext from "@/context/SocketContext";
import { open_create_conversation } from "@/features";
import { useDispatch, useSelector } from "react-redux";

/* eslint-disable @typescript-eslint/no-explicit-any */
const ContactWithoutSocket = ({
  contact,
  setSearchResults,
  socket,
}: {
  contact: any;
  setSearchResults: any;
  socket: any;
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.user);
  const values = {
    receiver_id: contact._id,
    token: user.token,
    isGroup: false,
  };
  const openConversation = async () => {
    const newConvo = await dispatch(open_create_conversation(values));
    socket.emit("join conversation", newConvo.payload._id);
    setSearchResults([]);
  };

  return (
    <li
      onClick={() => openConversation()}
      className="list-none h-[72px] hover:dark:bg-dark_bg_2 cursor-pointer dark:text-dark_text_1 px-[10px]"
    >
      {/* Container */}
      <div className="flex items-center gap-x-3 py-[10px]">
        {/* Contact info */}
        <div className="flex items-center gap-x-3">
          {/* conversation user picture */}
          <div className="relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden">
            <img
              src={contact.picture}
              alt={contact.name}
              className="w-full h-full object-cover"
            />
          </div>
          {/* conversation name and message */}
          <div className="w-full flex flex-col">
            {/* conversation name */}
            <h1 className="font-bold flex items-center gap-x-2">
              {contact.name}
            </h1>
            {/* conversation status */}
            <div>
              <div className="flex items-center gap-x-1 dark:text-dark_text_2">
                <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2">
                  <p>{contact.status}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Border */}
      <div className="ml-16 border-b dark:border-b-dark_border_1"></div>
    </li>
  );
};

const ContactWithContext = (props: any) => (
  <SocketContext.Consumer>
    {(socket) => <ContactWithoutSocket {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export const Contact = ContactWithContext;
