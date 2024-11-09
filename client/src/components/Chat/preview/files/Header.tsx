/* eslint-disable @typescript-eslint/no-explicit-any */
import { clearFiles } from "@/features";
import { CloseIcon } from "@/svg";
import { useDispatch, useSelector } from "react-redux";

export const Header = ({activeIndex}:{activeIndex:number}) => {
  const dispatch = useDispatch();
  const { files } = useSelector((state: any) => state.chat);
  const clearFileHandler = () => {
    dispatch(clearFiles());
  };
  return (
    <div className="w-full">
      {/* Container */}
      <div className="w-full flex items-center justify-between">
        {/* Close Icon / empty files */}
        <div onClick={clearFileHandler} className="translate-x-4 cursor-pointer">
          <CloseIcon className="dark:fill-dark_svg_1" />
        </div>
        {/* File Name */}
        <h1 className="dark:text-dark_text_1 text-[15px]">
          {files[activeIndex]?.file?.name}
        </h1>
        {/* Empty Tag */}
        <span></span>
      </div>
    </div>
  );
};
