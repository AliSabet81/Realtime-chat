/* eslint-disable @typescript-eslint/no-explicit-any */
export const getConversationId = (user: any, users: any) => {
  return users[0]._id === user._id ? users[1]._id : users[0]._id;
};
export const getConversationName = (user: any, users: any) => {
  return users[0]._id === user._id ? users[1].name : users[0].name;
};
export const getConversationPicture = (user: any, users: any) => {
  return users[0]._id === user._id ? users[1].picture : users[0].picture;
};
export const checkOnlineStatus = (onlineUsers: any, user: any, users: any) => {
  const convoId = getConversationId(user, users);
  const check = onlineUsers.find((u: any) => u.userId === convoId);
  return check ? true : false;
};
