/* eslint-disable @typescript-eslint/no-explicit-any */
import { addFiles } from "@/features";
import { DocumentIcon } from "@/svg";
import { getFileType } from "@/utils";
import { useRef } from "react";
import { useDispatch } from "react-redux";

export const DocumentAttachments = () => {
  const dispatch = useDispatch();
  const inputRef: any = useRef();

  const documentHandler = (e: any) => {
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
        file.type !== "audio/wav"
      ) {
        files = files.filter((item: any) => item.name !== file.name);
        return;
      } else if (file.size > 1024 * 1024 * 10) {
        files = files.filter((item: any) => item.name !== file.name);
        return;
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          dispatch(
            addFiles({
              file: file,
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
        <DocumentIcon />
      </button>
      <input
        type="file"
        hidden
        multiple
        ref={inputRef}
        accept="application/*,text/plain"
        onChange={documentHandler}
      />
    </li>
  );
};
