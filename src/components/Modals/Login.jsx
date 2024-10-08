import React, { useContext, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { CloseIcon } from '../../assets/icons/Icons';
import images from "../../assets/images";
import { ModalContext } from "../ModalProvider/ModalProvider";
import axios from 'axios';
import { API_URL } from "../../config/API";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);

function Login() {
    const { setActiveLogIn, setAuth, setActiveSignUp } = useContext(ModalContext);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const notifySuccess = () => toast.success('Login successful!', {
        className: 'toast-success',
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        hideProgressBar: true,
        closeButton: false,
        pauseOnHover: false,
        draggable: false,
    });
    const notifyError = (message) => toast.error(message || 'Login failed. Please check your credentials.');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/Authen/login`, {
                email: userName,
                password: password,
            });

            // Check response status code for different cases
            if (response.status === 200) {
                setAuth({
                    token: response.data.token,
                    userName: response.data.userName,
                });
                setActiveLogIn(false);
                notifySuccess();
            } else if (response.status === 401) {
                setError('Invalid username or password.');
                notifyError('Invalid username or password.');
            } else if (response.status === 500) {
                setError('Server error. Please try again later.');
                notifyError('Server error. Please try again later.');
            } else {
                setError('An unknown error occurred.');
                notifyError('An unknown error occurred.');
            }
        } catch (err) {
            // Handle errors that might occur during request
            setError('Login failed. Please check your credentials.');
            if (err.response && err.response.data) {
                notifyError(err.response.data.message || err.message);
            } else {
                notifyError();
            }
        }
    };


    const handleGoogleLogin = () => {
        window.location.href = `${API_URL}/GoogleAuth/login`;
    };

    return (
        <div className={cx('modal', 'show')}>
            <div className={cx('modal__wrapper')}>
                <div className={cx('modal__container')}>
                    <div onClick={() => setActiveLogIn(false)} className={cx('modal__close')}>
                        <CloseIcon className={cx('modal__close-icon')} />
                    </div>
                    <div className={cx('modal__title')}>LOGIN</div>
                    <div className={cx('modal__body')}>
                        <div className={cx('modal__form-wrapper')}>
                            <form className={cx('modal__form', 'modal__form--sign-in')} onSubmit={handleSubmit}>
                                <label htmlFor="userName" className={cx('modal__label')}>User name</label>
                                <input
                                    type="text"
                                    id="userName"
                                    className={cx('modal__input', 'modal__input--username')}
                                    autoComplete="off"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    required
                                />
                                <label htmlFor="password" className={cx('modal__label')}>Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    className={cx('modal__input', 'modal__input--password')}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                {error && <div className={cx('modal__error')}>{error}</div>}
                                <button className={cx('modal__button', 'modal__button--sign-in')}>Log In</button>
                            </form>
                            <div className={cx('modal__support')}>
                                <a className={cx('modal__forgot-link')}>
                                    Forgot username or password?
                                </a>
                            </div>
                            <button
                                className={cx('modal__button', 'modal__button--google-sign-in')}
                                onClick={handleGoogleLogin}
                            >
                                <img src={images.google} alt='Google' className={cx('modal__button-icon')} />
                                <span className={cx('modal__button-text')}>Login with Google</span>
                            </button>
                            <div className={cx('modal__license')}>
                                <p className={cx('modal__license-content')}>
                                    <span>By continuing with an account located in Vietnam, you agree to our Terms of </span>
                                    <a href="#" className={cx('modal__link')}>Service</a>
                                    <span> and acknowledge that you have read our </span>
                                    <a href="#" className={cx('modal__link')}>Privacy Policy</a>.
                                </p>
                            </div>
                        </div>
                    </div>
                    <p className={cx('modal__signup-prompt')}>
                        Don't have an account?
                        <span className={cx('modal__signup-link')} onClick={() => {
                            setActiveLogIn(false);
                            setActiveSignUp(true)
                        }}>Sign up</span>
                    </p>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Login;
