import React from 'react';
import classNames from "classnames/bind";
import styles from "./MenuItem.module.scss";
const cx = classNames.bind(styles);

function MenuItem({ item }) {
    return (
        <div className={cx('menu__item')}>
            <button className={cx('menu__item-label')}>
                {item.label}
            </button>
        </div>
    )
}

export default MenuItem;