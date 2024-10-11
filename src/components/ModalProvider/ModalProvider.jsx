import { createContext, useState } from 'react';

export const ModalContext = createContext(undefined);

export function ModalProvider({ children }) {
    const [activeLogIn, setActiveLogIn] = useState(false);
    const [activeSignUp, setActiveSignUp] = useState(false);
    const [auth, setAuth] = useState({});
    const [user, setUser] = useState(null); // Add user state

    // Đóng tất cả các modal
    const closeAllModals = () => {
        setActiveLogIn(false);
        setActiveSignUp(false);
    };

    const value = {
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
