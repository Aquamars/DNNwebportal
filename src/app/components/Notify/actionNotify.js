// GA
import ReactGA from 'react-ga';

export const errorNotify = (msg) => {
  ReactGA.event({
    category: 'Notify',
    action: 'error',
    label: msg,
  });
  return {
    type: 'ERROR_NOTIFY',
    notify: {
      isOpen: true,
      msg,
      error: true,
    },
  };
};

export const closeNotify = () => ({
  type: 'CLOSE_NOTIFY',
  notify: {
    isOpen: false,
    msg: '',
    error: null,
  },
});

export const copyNotify = (msg, label) => {
  // GA
  ReactGA.event({
    category: 'Notify',
    action: 'copy',
    label,
  });
  return {
    type: 'COPY_NOTIFY',
    notify: {
      isOpen: true,
      msg,
      error: false,
    },
  };
};
