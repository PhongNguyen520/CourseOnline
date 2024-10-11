import React, {useContext, useEffect, useRef, useState} from 'react';
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import NavDropdown from "../Navdropdown/Navdropdown";
import {Col, Container, Row} from "react-bootstrap";
import images from "../../assets/images";
import {ModalContext} from "../../components/ModalProvider/ModalProvider";
import {Link, useLocation, useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import config from "../../config";
import 'bootstrap-icons/font/bootstrap-icons.css';

const cx = classNames.bind(styles);

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { setActiveLogIn, setActiveSignUp, auth, setAuth } = useContext(ModalContext);
    const isAuthenticated = Boolean(auth?.token);
    const [userName, setUserName] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const handleScroll = () => {
        if (window.scrollY > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownVisible(false); // Ẩn dropdown khi nhấn ngoài
        }
    };

    const signOut = () => {
        Cookies.remove('authToken');
        setAuth(null);
        navigate(config.routes.home);
        console.log('Logged out');
    };
    useEffect(() => {
        if (isAuthenticated) {
            const decodedToken = jwtDecode(auth.token);
            setUserName(decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] || ""); // Lưu username
        }
    }, [auth, isAuthenticated]);

    useEffect(() => {
        setDropdownVisible(false);
    }, [location]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={cx('wrapper', { scrolled: isScrolled })}>
            <Container className={cx('header-container')}>
                <Row>
                    <Col lg='1' className={cx('logo')}>
                        <Link className={cx('container__logo-link')} to={config.routes.home}>
                            <img src={images.logo} alt="logo" />
                        </Link>
                    </Col>

                    <Col lg="9">
                        <NavDropdown />
                    </Col>

                    <Col lg="2" className={cx('container__login-signup')}>
                        {!isAuthenticated ? (
                            <>
                                <button onClick={() => setActiveLogIn(true)}
                                        className={cx('container__login-signup-login-btn')}>
                                    LOG IN
                                </button>
                                <button onClick={() => setActiveSignUp(true)}
                                        className={cx('container__login-signup-signup-btn')}>
                                    SIGN UP
                                </button>
                            </>
                        ) : (
                            <div className={cx('user-container')}>
                                <div className={cx('container__bookmark')}>
                                    <Link to="/bookmarks">
                                        <i className="bi bi-heart-fill"></i>
                                    </Link>
                                </div>
                                <div className={cx('container__cart')}>
                                    <Link to="/cart">
                                        <i className="bi bi-bag-fill"></i>
                                    </Link>
                                </div>

                                <div className={cx('profile-container')} ref={dropdownRef}>
                                    <div
                                        className={cx('container__login-user')}
                                        onClick={toggleDropdown}
                                    >
                                        <img
                                            src='https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg'
                                            alt='avatar'
                                            className={cx('container__login-user-img')}
                                        />
                                    </div>

                                    {isDropdownVisible && (
                                        <div className={cx('dropdown-menu')}>
                                            <div className={cx('user-info')}>
                                                <div className={cx('avatar-container')}>
                                                    <img
                                                        src='https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg'
                                                        alt='avatar'
                                                        className={cx('dropdown-avatar')}
                                                    />
                                                    <span className={cx('active-status')}></span> {/* Chấm xanh lục */}
                                                </div>
                                                <div className={cx('user-details')}>
                                                    <p className={cx('user-name')}>{userName}</p>
                                                    <Link to={config.routes.profile} className={cx('profile-link')}>
                                                        <i className="bi bi-person"></i>
                                                        See profile
                                                    </Link>
                                                </div>
                                            </div>

                                            {/* Các mục menu */}
                                            <ul className={cx('menu-list')}>
                                                <Link to="/classes">
                                                    <li>
                                                        <i className="bi bi-book"></i> My Classes
                                                    </li>
                                                </Link>
                                                <Link to="/requestOfStudent">
                                                    <li>
                                                        <i className="bi bi-file-earmark-text"></i> Forms
                                                    </li>
                                                </Link>
                                                <Link to="/myblog">
                                                    <li>
                                                        <i className="bi bi-pencil-square"></i> My Post
                                                    </li>
                                                </Link>
                                                <Link to="/walletstudent">
                                                    <li>
                                                        <i className="bi bi-wallet2"></i> Wallet
                                                    </li>
                                                </Link>
                                                <li onClick={signOut}>
                                                    <i className="bi bi-box-arrow-right"></i> Log out
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}