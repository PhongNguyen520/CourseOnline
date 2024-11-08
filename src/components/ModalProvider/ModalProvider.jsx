import { createContext, useEffect, useState } from 'react';
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

export const ModalContext = createContext(undefined);

export function ModalProvider({ children }) {
    const [activeLogIn, setActiveLogIn] = useState(false);
    const [activeSignUp, setActiveSignUp] = useState(false);
    const [auth, setAuth] = useState(null);
    const [user, setUser] = useState(null);
    const [pathName, setPathName] = useState(null);
    const [authToken] = useState(Cookies.get('authToken'));
    
    useEffect(() => {
        if (authToken) {
            try {
                const decodedToken = jwtDecode(authToken);
                console.log('Decoded token:', decodedToken);
                const roleName = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
                
                setAuth({
                    token: authToken,
                    role: decodedToken.RoleId
                });
                
                setUser({
                    fullName: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
                    userName: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
                    email: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
                    avatar: decodedToken.Avatar,
                    roleName: roleName
                });
                
                const currentPath = window.location.pathname;
                setPathName(currentPath);
                
                
            } catch (error) {
                console.error('Error decoding token:', error);
                Cookies.remove('authToken');
                localStorage.removeItem('authToken');
            }
        }
    }, [authToken]);


    const closeAllModals = () => {
        setActiveLogIn(false);
        setActiveSignUp(false);
    };

    const value = {
        authToken,
        activeLogIn,
        activeSignUp,
        auth,
        user,
        setActiveLogIn,
        setActiveSignUp,
        setAuth,
        setUser,
        closeAllModals,
    };

    return (
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    );
}
