/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useRef, useState } from "react";
import { IPictureUploader } from "./type";

export const Picture:FC<IPictureUploader> = ({
  readablePicture,
  setReadablePicture,
  setPicture,
}) => {
  const inputRef: any = useRef();
  const [error, setError] = useState("");
  const handlePicture = (e: any) => {
    const pic = e.target.files[0];
    if (
      pic.type !== "image/jpeg" &&
      pic.type !== "image/png" &&
      pic.type !== "image/webp"
    ) {
      setError(`${pic.name} format is not supported.`);
      return;
    } else if (pic.size > 1024 * 1024 * 5) {
      setError(`${pic.name} is too large , maximum 5mb allowed`);
      return;
    } else {
      setError("");
      setPicture(pic);
      //   reading the picture
      const reader = new FileReader();
      reader.readAsDataURL(pic);
      reader.onload = (e) => {
        setReadablePicture(e.target?.result);
      };
    }
  };
  const handleChangePicture = () => {
    setPicture();
    setReadablePicture("");
  };
  return (
    <div className="mt-8 content-center dark:text-dark_text_1 space-y-1">
      <label htmlFor="picture" className="text-sm font-bold tracking-wide">
        Picture (Optional)
      </label>
      {readablePicture ? (
        <div>
          <img
            className="w-20 h-20 object-cover rounded-full"
            src={readablePicture}
            alt="Picture"
          />
          {/* change pic */}
          <div
            onClick={() => handleChangePicture()}
            className=" mt-2 py-1 w-20 dark:bg-dark_bg_3 rounded-md text-xs flex items-center justify-center cursor-pointer"
          >
            Remove
          </div>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current.click()}
          className="w-full h-12 dark:bg-dark_bg_3 rounded-md font-bold flex items-center justify-center cursor-pointer"
        >
          Upload Picture
        </div>
      )}
      <input
        hidden
        ref={inputRef}
        type="file"
        name="picture"
        id="picture"
        accept="image/png,image/jpeg,image/webp"
        onChange={handlePicture}
      />
      {/* error */}
      <div className="mt-2">
        <p className="text-red-400">{error}</p>
      </div>
    </div>
  );
};
