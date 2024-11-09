/* eslint-disable @typescript-eslint/no-explicit-any */
import { AttachmentIcon, CloseIcon } from "@/svg";
import { Menu } from "..";

export const Attachments = ({
  setShowPicker,
  showAttachments,
  setShowAttachments,
}: {
  setShowPicker: any;
  showAttachments: any;
  setShowAttachments: any;
}) => {
  return (
    <li className="relative">
      <button
        onClick={() => {
          setShowPicker(false);
          setShowAttachments((prev: any) => !prev);
        }}
        className="btn"
        type="button"
      >
        {showAttachments ? (
          <CloseIcon className="dark:fill-dark_svg_1" />
        ) : (
          <AttachmentIcon className="dark:fill-dark_svg_1" />
        )}
      </button>
      {/* Menu */}
      {showAttachments ? <Menu /> : null}
    </li>
  );
};
