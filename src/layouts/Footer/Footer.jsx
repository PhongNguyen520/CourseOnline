import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment, useMemo } from 'react';

import classNames from 'classnames/bind';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { FaceBookIcon, LineIcon, TelegramIcon, InstagramIcon } from '../../assets/icons/Icons';

import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
    const items = useMemo(
        () => [
            {
                title: 'ABOUT US',
                lists: [
                    { label: 'Who we are' },
                    { label: 'How it works' },
                    { label: 'Blog' },
                ],
            },
            {
                title: 'FOR STUDENTS',
                lists: [
                    { label: 'Browse Courses' },
                    { label: 'Student Testimonials' },
                    { label: 'Gift Cards' },
                ],
            },
            {
                title: 'FOR INSTRUCTORS',
                lists: [
                    { label: 'Instructor Dashboard' },
                    { label: 'Instructor Support' },
                    { label: 'Payment Information' },
                ],
            },
            // {
            //     title: `FOLLOW US`,
            //     lists: [
            //         {
            //             icon: FaceBookIcon,
            //             label: 'Facebook',
            //         },
            //         {
            //             icon: TelegramIcon,
            //             label: 'Telegram',
            //         },
            //         {
            //             icon: LineIcon,
            //             label: 'Line',
            //         },
            //         {
            //             icon: InstagramIcon,
            //             label: 'Instagram',
            //         },
            //     ],
            // },
            { title: 'CONTACT US', lists: [{ label: '1234 Learning St, Education City, Country' }] },
            {
                title: 'SUPPORT',
                lists: [{ label: 'Need Help? Contact Us' }],
            },
        ],
        [],
    );

    return (
        <div className={cx('wrapper')}>
            <Container>
                <Row className={cx('container')}>
                    {items.map((itemChildren, index) => {
                        return (
                            <Col lg="2" key={index} className={cx('container__content')}>
                                <div className={cx('container__content-title')}>{itemChildren.title}</div>
                                <div className={cx('container__content-link')}>
                                    {itemChildren.lists.map((item, index) => {
                                        return (
                                            <Fragment key={index}>
                                                {item.icon && (

                                                    <item.icon
                                                        className={cx('container__content-icon')}
                                                    ></item.icon>
                                                )}
                                                <div className={cx('container__content-label')}>{item.label}</div>
                                            </Fragment>
                                        );
                                    })}
                                </div>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </div>
    );
}

export default Footer;
