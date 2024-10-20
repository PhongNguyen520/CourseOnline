import React from "react";
import classNames from 'classnames/bind';
import styles from './AuthGoogle.module.scss';
import { Col, Container, Row, Card, Button } from "react-bootstrap";

const cx = classNames.bind(styles);

export default function AuthGoogle() {
    const handleRoleSelection = (role) => {
        console.log("Selected Role:", role);
        // Thực hiện hành động tiếp theo với vai trò đã chọn, ví dụ: chuyển đến trang chính
    };

    return (
        <div className={cx('wrapper')}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Card className={cx('role-selection-card')}>
                            <Card.Body>
                                <Card.Title className={cx('text-center')}>Select Your Role</Card.Title>
                                <Row className="justify-content-center">
                                    <Col md={5}>
                                        <Button
                                            className={cx('role-button')}
                                            onClick={() => handleRoleSelection('Instructor')}
                                        >
                                            Instructor
                                        </Button>
                                    </Col>
                                    <Col md={5}>
                                        <Button
                                            className={cx('role-button')}
                                            onClick={() => handleRoleSelection('Student')}
                                        >
                                            Student
                                        </Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
