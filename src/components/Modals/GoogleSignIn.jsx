import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalContext } from '../ModalProvider/ModalProvider';

function GoogleSignIn() {
    const { setAuth } = useContext(ModalContext);
    const navigate = useNavigate();

    useEffect(() => {
        const handleGoogleSignIn = () => {
            const params = new URLSearchParams(window.location.search);
            const token = params.get('token');

            if (token) {
                localStorage.setItem('authToken', token);
                setAuth({ token });
                navigate('/home');
            }
        };

        handleGoogleSignIn();
    }, [setAuth, navigate]);

    return (
        <div>
            Redirecting...
        </div>
    );
}

export default GoogleSignIn;
