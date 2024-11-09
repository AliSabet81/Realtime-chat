/* eslint-disable @typescript-eslint/no-explicit-any */
import { capitalize } from "@/utils";
import CallTimes from "./CallTimes";

export const CallArea = ({
  name,
  totalSecInCall,
  setTotalSecInCall,
  callAccepted,
}: {
  name: string;
  totalSecInCall: number;
  setTotalSecInCall: any;
  callAccepted: boolean;
}) => {
  return (
    <div className="absolute top-12 z-40 w-full p-1">
      {/* Container */}
      <div className="flex flex-col items-center">
        {/* call infos */}
        <div className="flex flex-col items-center gap-y-1">
          <h1 className="text-white text-lg">
            <b>{name ? capitalize(name) : ""}</b>
          </h1>
          {totalSecInCall === 0 ? (
            <span className="text-dark_text_1">Ringing...</span>
          ) : null}
          <CallTimes
            totalSecInCall={totalSecInCall}
            setTotalSecInCall={setTotalSecInCall}
            callAccepted={callAccepted}
          />
        </div>
      </div>
    </div>
  );
};
