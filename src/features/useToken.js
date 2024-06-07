import { useState } from "react";

export default function useToken() {
  const getToken = () => {
    const userToken = JSON.parse(localStorage.getItem("token")) || null;
    return userToken?.token;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = async (userToken) => {
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken.token);
  };

  const deleteToken = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return {
    setToken: saveToken,
    removeToken: deleteToken,
    token,
  };
}
