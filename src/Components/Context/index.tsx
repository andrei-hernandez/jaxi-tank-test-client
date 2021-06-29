import { createContext } from "react";

const SessionContext = createContext(
  {
    token: localStorage.getItem('token'),
    avatar: localStorage.getItem('avatar'),
    userId: localStorage.getItem('userId'),
    userName: localStorage.getItem('userName')
  }
);

export default SessionContext;