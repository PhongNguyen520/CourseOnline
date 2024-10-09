import React from "react";
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { Col, Row, Form, Button } from "react-bootstrap";

const cx = classNames.bind(styles);

export default function Profile() {
    const user = {
        avatar: 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg',
        userName: 'nguyenphong',
        fullName: 'Nguyễn Thành Phong',
        email: 'nguyenphong@gmail.com',
        phoneNumber: '0123456789',
        address: '123 Đường ABC, Quận 1, TP HCM',
        dob: '1995-01-01',
        certification: 'Chứng chỉ lập trình viên',
        createdDate: '2023-01-01',
        status: 'Active',
        comment: 'Thành viên tích cực.'
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('profile-container')}>
                <Row>
                    <Col md={4} className={cx('profile-avatar')}>
                        <img src={user.avatar} alt="Avatar" className={cx('avatar-img')} />
                    </Col>
                    <Col md={8} className={cx('profile-details')}>
                        <h2>{user.fullName}</h2>
                        <p><strong>UserName:</strong> {user.userName}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
                        <p><strong>Address:</strong> {user.address}</p>
                        <p><strong>Date of Birth:</strong> {user.dob}</p>
                        <p><strong>Certification:</strong> {user.certification}</p>
                        <p><strong>Account Created:</strong> {user.createdDate}</p>
                        <p><strong>Status:</strong> {user.status}</p>
                        <p><strong>Comment:</strong> {user.comment}</p>
                    </Col>
                </Row>
            </div>
        </div>
    );
}
