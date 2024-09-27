import { createContext, useState } from 'react';

export const ModalContext = createContext(undefined);

export function ModalProvider({ children }) {
    const [activeLogIn, setActiveLogIn] = useState(false);
    const [activeSignUp, setActiveSignUp] = useState(false);


    const handleActive = () => {
        setActiveLogIn(true);
    };

    const handleHiddenActive = () => {
        setActiveLogIn(false);
        setActiveSignUp(false);
    };

    const handleActiveSignUp = () => {
        setActiveSignUp(!activeLogIn);
    };


    const value = {
        activeLogIn,
        activeSignUp,
        setActiveLogIn,
        setActiveSignUp,
        handleActive,
        handleHiddenActive,
        handleActiveSignUp,
    };

    return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

