import React from 'react';
import classNames from "classnames/bind";
import {useMemo} from "react";
import styles from "./Navdropdown.module.scss";
import Menu from "./Menu/Menu";
const cx = classNames.bind(styles);

function NavDropdown() {
    const navItems = useMemo(
        () => [
            {
                title: 'Find a Tutor',
                items: [
                    { label: 'Search for Tutors', link: '/findTutor' },
                    { label: 'Request a Tutor', link: '/requestTutor' },
                    { label: 'Online Tutoring', link: '/onlineTutoring' },
                ],
            },

            {
                title: 'How It Works',
                items: [{ label: 'For Student', link: '/forStudent' }],
            },

            {
                title: 'Resources',
                items: [{ label: 'News', link: '/advertisement' }],
            },

            {
                title: 'Become a Tutor',
                items: [
                    { label: 'Apply Now', link: '/registration/tutor/step1' },
                    { label: 'How It Works For Tutors', link: '/howItWork' },
                ],
            },

            {
                title: 'About Us ',
                items: [{ label: 'About Us', link: '/aboutUs' }],
            },
        ],
        [],
    );
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {navItems.map((navItem, index) => {
                    return (
                        <Menu key={index} items={navItem.items}>
                            <div key={index} className={cx('menu__item-title')}>
                                <span>{navItem.title}</span>
                            </div>
                        </Menu>
                    );
                })}
            </div>
        </div>
    )
}

export default NavDropdown;