const defaultNotify = {
  isOpen: false,
  msg: '',
  error: false,
};

export default function (state = defaultNotify, action) {
  switch (action.type) {
    case 'ERROR_NOTIFY':
      return action.notify;
    case 'CLOSE_NOTIFY':
      return action.notify;
    case 'COPY_NOTIFY':
      return action.notify;
    default:
      break;
  }
  return state;
}
