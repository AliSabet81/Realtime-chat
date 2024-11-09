import { CameraIcon, ContactIcon, PollIcon, StickerIcon } from "@/svg";
import { PhotoAttachments } from "./PhotoAttachments";
import { DocumentAttachments } from "./DocumentAttachments";

export const Menu = () => {
  return (
    <ul className="absolute bottom-14 openEmojiAnimation">
      <li>
        <button type="button" className="rounded-full">
          <PollIcon />
        </button>
      </li>
      <li>
        <button type="button" className="rounded-full bg-[#0EABF4]">
          <ContactIcon />
        </button>
      </li>
      <DocumentAttachments />
      <li>
        <button type="button" className="rounded-full bg-[#D3396D]">
          <CameraIcon />
        </button>
      </li>
      <li>
        <button type="button" className="rounded-full">
          <StickerIcon />
        </button>
      </li>
      <PhotoAttachments />
    </ul>
  );
};
