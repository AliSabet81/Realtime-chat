import { useState } from "react";
import { FileViewer } from "./FileViewer";
import { HandleAndSend } from "./HandleAndSend";
import { Header } from "./Header";
import { Input } from "./Input";

export const FilePreview = () => {
  const [message, setMessage] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative py-2 w-full flex items-center justify-center">
      {/* Container */}
      <div className="flex w-full flex-col items-center">
        {/* Header */}
        <Header activeIndex={activeIndex} />
        {/* Viewing Selected Files */}
        <FileViewer activeIndex={activeIndex} />
        <div className="flex w-full flex-col items-center">
          {/* Message input */}
          <Input message={message} setMessage={setMessage} />
          {/* Send and manipulate files */}
          <HandleAndSend
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            message={message}
          />
        </div>
      </div>
    </div>
  );
};
