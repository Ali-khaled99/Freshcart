import React, { useEffect, useState } from 'react'
import { createContext } from "react";

export const AuthContext = createContext()

export default function AuthContextProvider({ children }) {

    const [userToken , setUserToken] = useState(localStorage.getItem("token") ?? "")

    return (
        <AuthContext.Provider value={{userToken , setUserToken }}>
            {children}
        </AuthContext.Provider>
    )
}
