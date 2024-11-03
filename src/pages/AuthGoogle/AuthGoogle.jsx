import React, { useEffect, useState } from "react";
import classNames from 'classnames/bind';
import styles from './AuthGoogle.module.scss';
import { Col, Container, Row, Card, Button } from "react-bootstrap";
import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";  // Import required hooks
import requests from "../../utils/requests";  // Assuming requests is a pre-configured axios instance

const cx = classNames.bind(styles);
const SELECT_ROLE_URL = 'GoogleAuth/select-role-user';

export default function AuthGoogle() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const getQueryParams = () => {
        const params = new URLSearchParams(location.search);
        const userEmail = params.get("email");
        const userName = params.get("name");
        setEmail(userEmail);
        setName(userName);
    };

    useEffect(() => {
        getQueryParams();
    }, []);

    const handleRoleSelection = async (role) => {
        const roleId = role === 'Instructor' ? 2 : 1;
        console.log(`${SELECT_ROLE_URL}?email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}`);
        try {
            const response = await requests.post(
                `${SELECT_ROLE_URL}?email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}`,
                { roleId }
            );

            console.log('API response:', response.data);

            // Redirect to a success page or another action after API call
            navigate(`/googleAuth?email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}&roleId=${roleId}`);
        } catch (error) {
            console.error('Error during role selection:', error);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={8}>
                        <Card className={cx('role-selection-card')}>
                            <Card.Body>
                                <Card.Title className={cx('text-center', 'card-title')}>
                                    Choose Your Role
                                </Card.Title>
                                <Row className="justify-content-center">
                                    <Col md={5} className="d-flex flex-column align-items-center">
                                        <FaChalkboardTeacher className={cx('icon')} />
                                        <Button
                                            className={cx('role-button')}
                                            onClick={() => handleRoleSelection('Instructor')}
                                        >
                                            Instructor
                                        </Button>
                                        <p className={cx('role-description')}>
                                            Share your knowledge, create courses, and guide students to success.
                                        </p>
                                    </Col>
                                    <Col md={5} className="d-flex flex-column align-items-center">
                                        <FaUserGraduate className={cx('icon')} />
                                        <Button
                                            className={cx('role-button')}
                                            onClick={() => handleRoleSelection('Student')}
                                        >
                                            Student
                                        </Button>
                                        <p className={cx('role-description')}>
                                            Learn new skills, access a variety of courses, and start your learning journey.
                                        </p>
                                    </Col>
                                </Row>
                                <div className={cx('guide-section')}>
                                    <h4 className={cx('guide-title')}>Need Help Deciding?</h4>
                                    <p className={cx('guide-text')}>
                                        <strong>Instructor:</strong> Perfect for professionals and experts who want to create and share knowledge with a global audience.
                                        <br />
                                        <strong>Student:</strong> Ideal for learners of all levels looking to expand their skills and knowledge through comprehensive courses.
                                    </p>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
