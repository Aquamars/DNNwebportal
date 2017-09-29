import CryptoJS from 'crypto-js';

export const ftpPass = (username) => {
  const md5Text = CryptoJS.MD5(username + 'ITRIDNN').toString();
  const pass = md5Text.slice(0, 6);
  return pass;
};
