import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const token = localStorage.getItem("userToken");

    const INITAL_STATE = token? token : null;
 
    const [userToken, setToken] = useState(INITAL_STATE);

    const value = {userToken: userToken, setToken: setToken};

    return <AuthContext.Provider value={value}> {props.children} </AuthContext.Provider>

};

export default AuthContextProvider;

