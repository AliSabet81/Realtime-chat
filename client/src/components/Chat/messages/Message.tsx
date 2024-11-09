/* eslint-disable @typescript-eslint/no-explicit-any */
import TraingleIcon from "@/svg/Triangle";
import moment from "moment";

export const Message = ({ message, me }: { message: any; me: boolean }) => {
  return (
    <div
      className={`w-full flex mt-2 space-x-3 max-w-xs ${
        me ? "ml-auto justify-end" : ""
      }`}
    >
      {/* Message Container */}
      <div className="relative">
        {/* sender userMessage */}
        {!me && message.conversation.isGroup && (
          <div className="absolute top-1 left-[-37px]">
            <img
              src={message.sender.picture}
              className="w-8 h-8 rounded-full"
              alt=""
            />
          </div>
        )}
        <div
          className={`relative h-full dark:text-dark_text_1 p-2 rounded-lg ${
            me ? "bg-green_3" : "dark:bg-dark_bg_2"
          }`}
        >
          {/* Message */}
          <p className="float-left h-full text-sm pb-4 pr-8">
            {message.message}
          </p>
          {/* Message Date */}
          <span className="absolute right-1.5 bottom-1.5 text-xs pt-6 text-dark_text_5 leading-none">
            {moment(message.createdAt).format("HH:mm")}
          </span>
          {/* Traingle */}
          {!me ? (
            <span>
              <TraingleIcon className="dark:fill-dark_bg_2 rotate-[60deg] absolute top-[-5px] -left-1.5" />
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};
