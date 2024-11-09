/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import "react-app-polyfill/ie11"; // For IE 11 support
import "react-app-polyfill/stable"; // For modern JavaScript features support
import "randomfill";
import { Call, ChatContainer, Sidebar } from "@/components";
import { WhatsAppHome } from "@/components";
import SocketContext from "@/context/SocketContext";
import { getConversations, updateMessagesAndConversations } from "@/features";
import {
  getConversationId,
  getConversationName,
  getConversationPicture,
} from "@/utils";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Peer from "simple-peer";

const callData = {
  socketId: "",
  receiveingCall: false,
  callEnded: false,
  name: "",
  picture: "",
  signal: "",
};

const Home = ({ socket }: any) => {
  const dispatch: any = useDispatch();
  const { user } = useSelector((state: any) => state.user);
  const { activeConversation } = useSelector((state: any) => state.chat);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [call, setCall] = useState(callData);
  const [stream, setStream] = useState<any>();
  const [show, setShow] = useState(false);
  const [totalSecInCall, setTotalSecInCall] = useState(0);

  const myVideo: any = useRef();
  const userVideo: any = useRef();
  const connectionRef: any = useRef();

  const [callAccepted, setCallAccepted] = useState(false);
  const { socketId } = call;
  const [typing, setTyping] = useState(false);
  //join user into the socket io
  useEffect(() => {
    socket.emit("join", user._id);
    //get online users
    socket.on("get-online-users", (users: SetStateAction<never[]>) => {
      setOnlineUsers(users);
    });
  }, [user]);

  //call
  useEffect(() => {
    setupMedia();

    socket.on("setup socket", (id: any) => {
      setCall({ ...call, socketId: id });
    });
    socket.on(
      "call user",
      (data: { from: any; name: any; picture: any; signal: any }) => {
        setCall({
          ...call,
          socketId: data.from,
          name: data.name,
          picture: data.picture,
          signal: data.signal,
          receiveingCall: true,
        });
      }
    );
    socket.on("end call", () => {
      setShow(false);
      setCall({ ...call, callEnded: true, receiveingCall: false });
      myVideo.current.srcObject = null;
      if (callAccepted) {
        connectionRef?.current?.destroy();
      }
    });
  }, []);

  //--call user funcion
  const callUser = () => {
    enableMedia();
    setupMedia();
    setCall({
      ...call,
      name: getConversationName(user, activeConversation.users),
      picture: getConversationPicture(user, activeConversation.users),
    });
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("call user", {
        userToCall: getConversationId(user, activeConversation.users),
        signal: data,
        from: socketId,
        name: user.name,
        picture: user.picture,
      });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    socket.on("call accepted", (signal: string | Peer.SignalData) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
    connectionRef.current = peer;
  };
  //--answer call  funcion
  const answerCall = () => {
    enableMedia();
    setupMedia();
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("answer call", { signal: data, to: call.socketId });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    peer.signal(call.signal);
    connectionRef.current = peer;
  };
  //--end call  funcion
  const endCall = () => {
    setShow(false);
    setCall({ ...call, callEnded: true, receiveingCall: false });
    myVideo.current.srcObject = null;
    socket.emit("end call", call.socketId);
    connectionRef?.current?.destroy();
  };
  //--------------------------
  const setupMedia = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
      });
  };

  const enableMedia = () => {
    myVideo.current.srcObject = stream;
    setShow(true);
  };
  //get Conversations
  useEffect(() => {
    if (user?.token) {
      dispatch(getConversations(user.token));
    }
  }, [user]);
  useEffect(() => {
    //lsitening to receiving a message
    socket.on("receive message", (message: any) => {
      dispatch(updateMessagesAndConversations(message));
    });
    //listening when a user is typing
    socket.on(
      "typing",
      (conversation: boolean | ((prevState: boolean) => boolean)) =>
        setTyping(conversation)
    );
    socket.on("stop typing", () => setTyping(false));
  }, []);

  return (
    <>
      <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden">
        {/* Container */}
        <div className="container h-screen flex py-[19px]">
          {/* Sidebar */}
          <Sidebar onlineUsers={onlineUsers} typing={typing} />
          {activeConversation._id ? (
            <ChatContainer
              onlineUsers={onlineUsers}
              typing={typing}
              callUser={callUser}
            />
          ) : (
            <WhatsAppHome />
          )}
        </div>
      </div>
      <div className={(show || call.signal) && !call.callEnded ? "" : "hidden"}>
        <Call
          call={call}
          setCall={setCall}
          callAccepted={callAccepted}
          myVideo={myVideo}
          userVideo={userVideo}
          stream={stream}
          answerCall={answerCall}
          show={show}
          endCall={endCall}
          totalSecInCall={totalSecInCall}
          setTotalSecInCall={setTotalSecInCall}
        />
      </div>
    </>
  );
};

const HomeWhitSocket = (props: any) => (
  <SocketContext.Consumer>
    {(socket) => <Home {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default HomeWhitSocket;
