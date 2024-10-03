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
                title: 'Find Courses',
                items: [
                    { label: 'Search Courses', link: '/topCourses' },
                    { label: 'Excellent Instructors', link: '/courses' },
                ],
            },
            {
                title: 'The Quiz',
                items: [
                    { label: 'Practice Quizzes', link: '/quizzes/practice' },
                    { label: 'Quiz Results', link: '/quizzes/results' },
                ],
            },
            {
                title: 'How It Works',
                items: [
                    { label: 'For Students', link: '/howItWorks/students' },
                    { label: 'For Instructors', link: '/howItWorks/instructors' },
                ],
            },
            {
                title: 'Resources',
                items: [
                    { label: 'Blog', link: '/blog' },
                    { label: 'FAQs', link: '/faqs' },
                ],
            },
            {
                title: 'About Us',
                items: [
                    { label: 'Our Story', link: '/aboutUs' },
                    { label: 'Contact Us', link: '/contact' },
                ],
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