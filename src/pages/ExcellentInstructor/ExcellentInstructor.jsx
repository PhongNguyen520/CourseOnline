import React, { useEffect, useMemo, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ExcellentInstructor.module.scss";
import { Col, Row, Form, Button } from "react-bootstrap";
import { FaSearch, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaBirthdayCake, FaCalendarAlt } from "react-icons/fa"; // Added icons
import images from "../../assets/images";
import { Link } from 'react-router-dom';
import requests from '../../utils/requests';

const cx = classNames.bind(styles);
const INSTRUCTOR_URL = 'User/Get-all';

export default function ExcellentInstructor() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");
    const [instructors, setInstructors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInstructors = async () => {
            try {
                setLoading(true);
                const response = await requests.get(INSTRUCTOR_URL);
                setInstructors(response.data.items.filter(user => user.roleId.roleName === 'Instructor') || []);
            } catch (err) {
                setError('Error fetching instructors');
                console.error('API call failed:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchInstructors();
    }, []);

    const filteredInstructors = useMemo(() => {
        let filtered = instructors;

        // if (filter === "mostCourses") {
        //     filtered = [...filtered].sort((a, b) => b.courses - a.courses);
        // } else if (filter === "mostFeedbacks") {
        //     filtered = [...filtered].sort((a, b) => b.feedbacks - a.feedbacks);
        // }

        if (searchTerm) {
            filtered = filtered.filter(instructor =>
                instructor.fullName.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return filtered;
    }, [searchTerm, filter, instructors]);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("search-instructor-container")}>
                <Row className="justify-content-end mt-4">
                    <Col md={5}>
                        <Form className={cx('search-form')}>
                            <div className={cx('search-bar-container')}>
                                <Form.Control
                                    type="text"
                                    placeholder="Search for instructor..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className={cx('search-input')}
                                />
                                <Button type="submit" className={cx('search-button')} onClick={(e) => e.preventDefault()}>
                                    <FaSearch />
                                </Button>
                            </div>
                        </Form>
                    </Col>
                    <Col lg={1}>
                        <div className={cx("filter-section")}>
                            <Form.Select
                                aria-label="Filter instructors"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            >
                                <option value="all">All Instructors</option>
                                <option value="mostCourses">Most Courses</option>
                                <option value="mostFeedbacks">Most Feedbacks</option>
                            </Form.Select>
                        </div>
                    </Col>
                </Row>
            </div>

            <Row className={cx("result-list")}>
                {loading && <p>Loading instructors...</p>}
                {error && <p>{error}</p>}
                {!loading && !error && filteredInstructors.length > 0 ? (
                    filteredInstructors.map((instructor) => (
                        <Col key={instructor.id} xs={12} md={6} lg={4} className={cx("instructor-card")}>
                            <Link to={`/excellentInstructor/${instructor.id}`}>
                                <div className={cx("card")}>
                                    <div className={cx("header")}>
                                        <div className={cx("avatar-container")}>
                                            <img
                                                src={instructor.avatar || images.defaultAvatar}
                                                alt={`${instructor.fullName}'s avatar`}
                                                className={cx("avatar")}
                                            />
                                            <span className={cx('active-status')}></span>
                                        </div>
                                        <div className={cx("full-name")}>{instructor.fullName}</div>
                                        <FaPhoneAlt className={cx("phone-icon")} />
                                    </div>
                                    <div className={cx("info")}>
                                        <p><FaEnvelope className={cx("icon")} /> {instructor.email}</p>
                                        <p><FaMapMarkerAlt className={cx("icon")} /> {instructor.address}</p>
                                        <p><FaBirthdayCake className={cx("icon")} /> {instructor.dob}</p>
                                        <p><FaCalendarAlt className={cx("icon")} /> {new Date(instructor.createdDate).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </Link>
                        </Col>
                    ))
                ) : (
                    !loading && <Col><p>No instructors found.</p></Col>
                )}
            </Row>
        </div>
    );
}
