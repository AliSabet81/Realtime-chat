/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Ringing } from ".";
import { CallActions } from "./CallActions";
import { CallArea } from "./CallArea";
import { Header } from "./Header";

export const Call = ({
  call,
  setCall,
  callAccepted,
  userVideo,
  myVideo,
  stream,
  answerCall,
  show,
  endCall,
  totalSecInCall,
  setTotalSecInCall,
}: any) => {
  const { callEnded, receiveingCall, name } = call;
  const [showActions, setShowActions] = useState(false);
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[550px] z-10 rounded-2xl overflow-hidden callbg ${
          receiveingCall && !callAccepted ? "hidden" : ""
        }`}
        onMouseOver={() => setShowActions(true)}
        onMouseOut={() => setShowActions(false)}
      >
        {/* Container */}
        <div>
          <div>
            {/* Header */}
            <Header />
            {/* Call area */}
            <CallArea
              name={name}
              totalSecInCall={totalSecInCall}
              setTotalSecInCall={setTotalSecInCall}
              callAccepted={callAccepted}
            />
            {/* Call actions */}
            {showActions && <CallActions endCall={endCall} />}
          </div>
          {/* Video streams */}
          <div>
            {/* user video */}
            {callAccepted && !callEnded ? (
              <div>
                <video
                  ref={userVideo}
                  playsInline
                  muted
                  autoPlay
                  className={`${toggle ? "smallVideoCall" : "largeVideoCall"} ${
                    showActions ? "moveVideoCall" : ""
                  }`}
                  onClick={() => setToggle((prev) => !prev)}
                ></video>
              </div>
            ) : null}
            {/* my video */}
            {stream && (
              <div>
                <video
                  ref={myVideo}
                  playsInline
                  muted
                  autoPlay
                  className={`${toggle ? "largeVideoCall" : "smallVideoCall"} ${
                    showActions ? "moveVideoCall" : ""
                  }`}
                  onClick={() => setToggle((prev) => !prev)}
                ></video>
              </div>
            )}
          </div>
        </div>
      </div>{" "}
      {/* Ringing */}
      {receiveingCall && !callAccepted && (
        <Ringing
          endCall={endCall}
          answerCall={answerCall}
          call={call}
          setCall={setCall}
        />
      )}
      {/*calling ringtone*/}
      {!callAccepted && show ? (
        <audio src="../../../../audio/ringing.mp3" autoPlay loop></audio>
      ) : null}
    </>
  );
};
