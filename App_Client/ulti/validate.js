import { ToastAndroid } from "react-native";

export const validateRegisterInputs = (username, email, password, repassword, avatar) => {
    if (isEmpty(username) || isEmpty(email) || isEmpty(password) || isEmpty(repassword) || !avatar) {
        ToastAndroid.show('Phải điền đầy đủ thông tin', ToastAndroid.SHORT);
      return false;
    }
  
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        ToastAndroid.show('Email không đúng định dạng', ToastAndroid.SHORT);
      return false;
    }
  
    if (password !== repassword) {
        ToastAndroid.show('Mật khẩu không trùng khớp', ToastAndroid.SHORT);
      return false;
    }
  
    return true;
  };

  const isEmpty = (str) => {
    return !str || str.trim().length === 0;
  };