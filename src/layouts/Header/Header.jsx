import React, {useContext, useEffect, useState} from 'react';
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import NavDropdown from "../Navdropdown/Navdropdown";
import {Col, Container, Row} from "react-bootstrap";
import images from "../../assets/images";
import {ModalContext} from "../../components/ModalProvider/ModalProvider";
import { Link } from 'react-router-dom';
import config from "../../config";
const cx = classNames.bind(styles);

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { setActiveLogIn, setActiveSignUp } = useContext(ModalContext);

    const handleScroll = () => {
        if (window.scrollY > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={cx('wrapper', {scrolled: isScrolled})}>
            <Container className={cx('header-container')}>
                <Row>
                    <Col lg='1' className={cx('logo')}>
                        <Link className={cx('container__logo-link')} to={config.routes.home}>
                            <img src={images.logo} alt="logo"/>
                        </Link>
                    </Col>

                    <Col lg="9">
                        <NavDropdown/>
                    </Col>

                    <Col lg="2" className={cx('container__login-signup')}>
                        <button onClick={()=> setActiveLogIn(true)} className={cx('container__login-signup-login-btn')}>
                            LOG IN
                        </button>
                        <button onClick={() => setActiveSignUp(true)} className={cx('container__login-signup-signup-btn')}>
                            SIGN UP
                        </button>
                    </Col>

                </Row>
            </Container>
        </div>
    );
}


