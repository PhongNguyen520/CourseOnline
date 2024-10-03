import React from 'react';
import classNames from "classnames/bind";
import styles from "./MenuItem.module.scss";
import Button from "../../../components/Button/Button";
const cx = classNames.bind(styles);

function MenuItem({ item }) {
    return (
        <div className={cx('menu__item')}>
            <Button className={cx('menu__item-label')} to={item.link}>
                {item.label}
            </Button>
        </div>
    )
}

export default MenuItem;