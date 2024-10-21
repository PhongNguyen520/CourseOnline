import {createContext, useEffect, useState} from 'react';
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

export const ModalContext = createContext(undefined);

export function ModalProvider({ children }) {
    const [activeLogIn, setActiveLogIn] = useState(false);
    const [activeSignUp, setActiveSignUp] = useState(false);
    const [auth, setAuth] = useState({});
    const [user, setUser] = useState({});
    const [authToken] = useState(Cookies.get('authToken'));

    useEffect(() => {
        const handleTokenAuthentication = (token) => {
            try {
                const decodedToken = jwtDecode(token);
                console.log('Decoded token:', decodedToken);

                setAuth({
                    token: token,
                    role: decodedToken.RoleId
                });



                setUser({
                    fullName: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
                    userName: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
                    email: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
                    avatar: decodedToken.Avatar,
                    roleId: decodedToken.RoleId
                });
            } catch (error) {
                console.error('Error decoding token:', error);
                Cookies.remove('authToken');
                localStorage.removeItem('authToken');
            }
        };
        if (authToken){
            handleTokenAuthentication(authToken);
        }
    }, []);

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

    return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}
