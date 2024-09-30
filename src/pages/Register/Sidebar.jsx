import React, { useMemo } from 'react';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Sidebar() {

    const roles = useMemo(
        () => [
            {
                id: 1,
                btn: 'Apply to become a tutor',
                link: 'tutor/step1',
            },
            {
                id: 2,
                btn: 'Register as a student',
                link: 'student/step1',
            },
        ],
        [],
    );

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('side_navigation')}>
                    {roles.map((role) => (
                        <button
                            key={role.id}
                            // onClick={() => handleNavigation(role.link)}
                            className={cx('sidebar-button')}
                        >
                            {role.btn}
                        </button>
                    ))}
                    <button>Back to Home</button>
                </div>
                <p className={cx('label')}>Your username</p>
                <ul className={cx('side_role')}>
                    <li>
                        <span>Free to Sign Up</span>
                        <p>
                            You won’t pay a thing until your lesson is complete. And our Good Fit Guarantee means you’ll
                            love your lesson, or we’ll cover the first hour.
                        </p>
                    </li>
                    <li>
                        <span>Access 1,000+ Experts</span>
                        <p>
                            Welcome to the nation’s largest network of 1–to–1 learning. Browse tutor profiles, hourly
                            rates and over one million reviews and ratings.
                        </p>
                    </li>
                    <li>
                        <span>Find help in over 250 subjects</span>
                        <p>
                            There’s no limit to what you can learn on CourseOnline. While most take lessons in traditional
                            academic subjects like math and science, students can also search for art, music, and
                            language tutors.
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
