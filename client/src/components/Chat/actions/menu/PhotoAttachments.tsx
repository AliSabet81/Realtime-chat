/* eslint-disable @typescript-eslint/no-explicit-any */
import { addFiles } from "@/features";
import { PhotoIcon } from "@/svg";
import { getFileType } from "@/utils";
import { useRef } from "react";
import { useDispatch } from "react-redux";

export const PhotoAttachments = () => {
  const dispatch = useDispatch();
  const inputRef: any = useRef();

  const imageHandler = (e: any) => {
    let files = Array.from(e.target.files);
    files.forEach((file: any) => {
      if (
        file.type !== "image/png" &&
        file.type !== "image/jpeg" &&
        file.type !== "image/gif" &&
        file.type !== "image/webp" &&
        file.type !== "image/jfif" &&
        file.type !== "video/mp4" &&
        file.type !== "video/mpeg" &&
        file.type !== "video/webm"
      ) {
        files = files.filter((item: any) => item.name !== file.name);
        return;
      } else if (file.size > 1024 * 1024 * 10) {
        files = files.filter((item: any) => item.name !== file.name);
        return;
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          dispatch(
            addFiles({
              file: file,
              fileData: e.target?.result,
              type: getFileType(file.type),
            })
          );
        };
      }
    });
  };
  return (
    <li>
      <button
        onClick={() => inputRef.current.click()}
        type="button"
        className="rounded-full bg-[#BF59CF]"
      >
        <PhotoIcon />
      </button>
      <input
        type="file"
        hidden
        multiple
        ref={inputRef}
        accept="image/png,image/jpeg,image/gif,image/webp,video/mp4,video/mpeg,video/webm"
        onChange={imageHandler}
      />
    </li>
  );
};
