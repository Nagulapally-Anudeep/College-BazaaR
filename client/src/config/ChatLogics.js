export const getSender = (currentUser, users) => {
  return users[0]._id === currentUser._id ? users[1].name : users[0].name;
};

export const checkAvatarSender = (messages, m, i, userId) => {
  return (
    (i < messages.length - 1 &&
      m.sender._id !== userId &&
      messages[i + 1].sender._id !== m.sender._id) ||
    (i === messages.length - 1 && m.sender._id !== userId)
  );
};

export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};

export const messageMargin = (messages, m, i, userId) => {
  // console.log(i === messages.length - 1);

  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return "auto";
};
