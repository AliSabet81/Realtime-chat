/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { CloseIcon, ValidIcon } from "@/svg";
import { useEffect, useState } from "react";

export const Ringing = ({ call, setCall, answerCall, endCall }: any) => {
  const { name, picture } = call;
  const [timer, setTimer] = useState(0);
  let interval: any;
  const handleTimer = () => {
    interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
  };
  useEffect(() => {
    if (timer < 30) {
      handleTimer();
    } else {
      setCall({ ...call, receivingCall: false });
    }
    return () => clearInterval(interval);
  }, [timer]);
  return (
    <div className="dark:bg-dark_bg_1 rounded-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg z-30">
      {/* Container */}
      <div className="p-4 flex items-center justify-between gap-x-8">
        {/* Call infos */}
        <div className="flex items-center gap-x-2">
          <img
            src={picture}
            alt={`caller profile picture`}
            className="w-28 h-28 rounded-full"
          />
          <div>
            <h1 className="dark:text-white">
              <b>{name}</b>
            </h1>
            <span className="dark:text-dark_text_2">Whatsapp video...</span>
          </div>
        </div>
        {/* Call actions */}
        <ul className="flex items-center gap-x-2 ">
          <li>
            <button
              onClick={endCall}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500"
            >
              <CloseIcon className="fill-white w-5 h-5" />
            </button>
          </li>
          <li>
            <button
              onClick={answerCall}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500"
            >
              <ValidIcon className="fill-white w-6 mt-2" />
            </button>
          </li>
        </ul>
      </div>
      {/* Ringtone */}
      <audio autoPlay src="/audio/ringtone.mp3" loop></audio>
    </div>
  );
};
