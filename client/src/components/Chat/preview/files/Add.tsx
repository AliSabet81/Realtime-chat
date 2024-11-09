import { addFiles } from "@/features";
import { CloseIcon } from "@/svg";
import { getFileType } from "@/utils";
import { useRef } from "react";
import { useDispatch } from "react-redux";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const Add = () => {
  const dispatch = useDispatch();
  const inputRef: any = useRef(null);

  const filesHandler = (e: any) => {
    let files = Array.from(e.target.files);
    files.forEach((file: any) => {
      if (
        file.type !== "application/pdf" &&
        file.type !== "text/plain" &&
        file.type !== "application/msword" &&
        file.type !==
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
        file.type !== "application/vnd.ms-powerpoint" &&
        file.type !==
          "application/vnd.openxmlformats-officedocument.presentationml.presentation" &&
        file.type !== "application/vnd.ms-excel" &&
        file.type !==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
        file.type !== "application/vnd.rar" &&
        file.type !== "application/zip" &&
        file.type !== "audio/mpeg" &&
        file.type !== "audio/wav" &&
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
              fileData:
                getFileType(file.type) === "IMAGE" ? e.target?.result : "",
              type: getFileType(file.type),
            })
          );
        };
      }
    });
  };
  return (
    <>
      <div
        onClick={() => inputRef.current.click()}
        className="w-14 h-14 border dark:border-white rounded-md flex items-center justify-center cursor-pointer"
      >
        <span className="rotate-45">
          <CloseIcon className="dark:fill-dark_svg_1" />
        </span>
      </div>
      <input
        type="file"
        hidden
        multiple
        ref={inputRef}
        onChange={filesHandler}
      />
    </>
  );
};
