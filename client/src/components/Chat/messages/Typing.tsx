/* eslint-disable @typescript-eslint/no-explicit-any */
import TraingleIcon from "@/svg/Triangle";
import { BeatLoader } from "react-spinners";

export const Typing = () => {
  return (
    <div className={`w-full flex mt-2 space-x-3 max-w-xs `}>
      {/* Message Container */}
      <div>
        <div
          className={`relative h-full dark:text-dark_text_1 p-2 rounded-lg dark:bg-dark_bg_2`}
        >
          {/* Typing */}
          <BeatLoader color="#fff" size={10} />

          {/* Traingle */}
          <span>
            <TraingleIcon className="dark:fill-dark_bg_2 rotate-[60deg] absolute top-[-5px] -left-1.5" />
          </span>
        </div>
      </div>
    </div>
  );
};
