/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";

export default function CallTimes({
  totalSecInCall,
  setTotalSecInCall,
  callAccepted,
}: {
  totalSecInCall: number;
  setTotalSecInCall: any;
  callAccepted: boolean;
}) {
  useEffect(() => {
    const setSecInCall = () => {
      setTotalSecInCall((prev: number) => prev + 1);
      setTimeout(setSecInCall, 1000);
    };
    if (callAccepted) {
      setSecInCall();
    }
    return () => setTotalSecInCall(0);
  }, [callAccepted]);
  return (
    <div
      className={`text-dark_text_2 ${
        totalSecInCall !== 0 ? "block" : "hidden"
      }`}
    >
      {parseInt((totalSecInCall / 3600 >= 0) as any) ? (
        <>
          <span>
            {parseInt(`${totalSecInCall / 3600}`).toString().length < 2
              ? "0" + parseInt(`${totalSecInCall / 3600}`)
              : parseInt(`${totalSecInCall / 3600}`)}
          </span>
          <span>:</span>
        </>
      ) : null}
      <span>
        {parseInt(`${totalSecInCall / 60}`).toString().length < 2
          ? "0" + parseInt(`${totalSecInCall / 60}`)
          : parseInt(`${totalSecInCall / 60}`)}
      </span>
      <span>:</span>
      <span>
        {(totalSecInCall % 60).toString().length < 2
          ? "0" + (totalSecInCall % 60)
          : totalSecInCall % 60}
      </span>
    </div>
  );
}
