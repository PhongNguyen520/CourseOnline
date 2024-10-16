import classNames from 'classnames/bind';
import React, { useState } from 'react';

import Button from "../Button/Button";
import { MoveIcon } from '../../assets/icons/Icons';

import styles from './ScrollToTop.module.scss';

const cx = classNames.bind(styles);

function ScrollToTop() {
    const [status, setStatus] = useState(false);

    useState(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY >= 1500) {
                setStatus(true);
            } else {
                setStatus(false);
            }
        });
    }, []);

    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div className={cx('wrapper')}>
            {status && (
                <Button className={cx('btn-back-top')} onClick={handleClick}>
                    <MoveIcon />
                </Button>
            )}
        </div>
    );
}

export default ScrollToTop;
