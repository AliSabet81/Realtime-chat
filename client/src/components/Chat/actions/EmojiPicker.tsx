/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CloseIcon, EmojiIcon } from "@/svg";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useState } from "react";

export const EmojiPickerApp = ({
  textRef,
  message,
  setMessage,
  showPicker,
  setShowPicker,
  setShowAttachments,
}: {
  textRef: any;
  message: any;
  setMessage: any;
  showPicker: any;
  setShowPicker: any;
  setShowAttachments: any;
}) => {
  const [cursorPosition, setCursorPosition] = useState();
  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);
  const handleEmoji = (emojiData: any) => {
    const { emoji } = emojiData;
    const ref = textRef.current;
    ref.focus();
    const start = message.substring(0, ref.selectionStart);
    const end = message.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setMessage(newText);
    setCursorPosition(start.length + emoji.length);
  };
  return (
    <li className="w-full">
      <button
        onClick={() => {
          setShowAttachments(false);
          setShowPicker((prev: any) => !prev);
        }}
        className="btn"
        type="button"
      >
        {showPicker ? (
          <CloseIcon className="dark:fill-dark_svg_1" />
        ) : (
          <EmojiIcon className="dark:fill-dark_svg_1" />
        )}
      </button>
      {/* Emoji picker */}
      {showPicker ? (
        <div className="openEmojiAnimation absolute bottom-[60px] left-[-0.5px] w-full">
          <EmojiPicker theme={"dark" as any} onEmojiClick={handleEmoji} />
        </div>
      ) : null}
    </li>
  );
};
