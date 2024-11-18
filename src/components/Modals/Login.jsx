import React, { useContext, useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { CloseIcon } from '../../assets/icons/Icons';
import images from "../../assets/images";
import { ModalContext } from "../ModalProvider/ModalProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import requests from '../../utils/requests';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);
const LOGIN_URL = 'Authen/login';
const LOGIN_WITH_GOOGLE = 'GoogleAuth/login';

function Login() {
    const { setActiveLogIn, setAuth, setActiveSignUp, setUser } = useContext(ModalContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
    const notifySuccess = () => toast.success('Login successful!', {
        className: 'toast-success',
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: true,
        closeButton: false,
        pauseOnHover: false,
        draggable: false,
    });


    const notifyError = (message) => toast.error(message || 'Login failed. Please check your credentials.');
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please enter both username and password.');
            return;
        }

        setLoading(true);
        try {
            const response = await requests.post(LOGIN_URL, {
                email: email,
                password: password,
            }, { withCredentials: true });

            const token = Cookies.get('authToken');
            if (!token) {
                throw new Error('Token not found in cookies.');
            }

            const decodedToken = jwtDecode(token);
            const roleName = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

            setAuth({
                token: token,
                role: decodedToken?.RoleId
            });

            setUser({
                fullName: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
                userName: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
                email: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
                avatar: decodedToken.Avatar,
                roleName: roleName,
            });

            notifySuccess();
            setActiveLogIn(false);
            if (roleName === 'Admin') {
                navigate('/admin/dashboard');
            } else if (roleName === 'Instructor') {
                navigate('/instructor/dashboard');
            } else {
                navigate('/home');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Login failed. Please check your credentials.');
            if (err.response && err.response.data) {
                notifyError(err.response.data.message || err.message);
            } else {
                notifyError();
            }
        } finally {
            setLoading(false);
        }
    };


    const handleGoogleLogin = () => {
         window.location.href = process.env.REACT_APP_URL_API +LOGIN_WITH_GOOGLE;
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
                                <label htmlFor="Email" className={cx('modal__label')}>Email</label>
                                <input
                                    type="text"
                                    id="Email"
                                    className={cx('modal__input', 'modal__input--email')}
                                    autoComplete="off"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                <button
                                    className={cx('modal__button', 'modal__button--sign-in')}
                                    disabled={loading}
                                >
                                    {loading ? 'Logging in...' : 'Log In'}
                                </button>
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
