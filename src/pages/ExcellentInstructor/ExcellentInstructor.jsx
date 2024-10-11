import React, { useMemo, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ExcellentInstructor.module.scss";
import { Col, Row, Form, Button } from "react-bootstrap";
import { FaSearch, FaPhoneAlt } from "react-icons/fa";
import images from "../../assets/images";

const cx = classNames.bind(styles);

const instructors = [
    {
        id: 1,
        avatar: "/path/to/avatar1.jpg",
        userName: "johndoe",
        fullName: "John Doe",
        courses: 10,
        feedbacks: 200,
        email: "john@example.com",
        phoneNumber: "123-456-7890",
        address: "123 Main St",
        dob: "1980-01-01",
        status: "Active"
    },
    {
        id: 2,
        avatar: "/path/to/avatar2.jpg",
        userName: "janesmith",
        fullName: "Jane Smith",
        courses: 15,
        feedbacks: 150,
        email: "jane@example.com",
        phoneNumber: "987-654-3210",
        address: "456 Elm St",
        dob: "1985-02-15",
        status: "Active"
    },
    {
        id: 3,
        avatar: "/path/to/avatar3.jpg",
        userName: "peterparker",
        fullName: "Peter Parker",
        courses: 8,
        feedbacks: 180,
        email: "peter@example.com",
        phoneNumber: "456-789-1234",
        address: "789 Maple Ave",
        dob: "1990-03-10",
        status: "Inactive"
    },
    {
        id: 4,
        avatar: "/path/to/avatar4.jpg",
        userName: "brucewayne",
        fullName: "Bruce Wayne",
        courses: 12,
        feedbacks: 100,
        email: "bruce@example.com",
        phoneNumber: "789-123-4567",
        address: "1 Wayne Manor",
        dob: "1975-09-15",
        status: "Active"
    },
    {
        id: 5,
        avatar: "/path/to/avatar5.jpg",
        userName: "clarkkent",
        fullName: "Clark Kent",
        courses: 20,
        feedbacks: 300,
        email: "clark@example.com",
        phoneNumber: "321-654-9870",
        address: "234 Daily Planet",
        dob: "1978-06-18",
        status: "Active"
    },
    {
        id: 6,
        avatar: "/path/to/avatar5.jpg",
        userName: "clarkkent",
        fullName: "Clark Kent",
        courses: 20,
        feedbacks: 300,
        email: "clark@example.com",
        phoneNumber: "321-654-9870",
        address: "234 Daily Planet",
        dob: "1978-06-18",
        status: "Active"
    }
];

export default function ExcellentInstructor() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");

    const filteredInstructors = useMemo(() => {
        let filtered = instructors;

        if (filter === "mostCourses") {
            filtered = [...filtered].sort((a, b) => b.courses - a.courses);
        } else if (filter === "mostFeedbacks") {
            filtered = [...filtered].sort((a, b) => b.feedbacks - a.feedbacks);
        }

        if (searchTerm) {
            filtered = filtered.filter(instructor =>
                instructor.fullName.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return filtered;
    }, [searchTerm, filter]);

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
                                <Button type="submit" className={cx('search-button')}>
                                    <FaSearch/>
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
                {filteredInstructors.length > 0 ? (
                    filteredInstructors.map((instructor) => (
                        <Col key={instructor.id} xs={12} md={6} lg={4} className={cx("instructor-card")}>
                            <div className={cx("card")}>
                                <div className={cx("header")}>
                                    <div className={cx("avatar-container")}>
                                        <img
                                            src={images.defaultAvatar}
                                            alt={`${instructor.fullName}'s avatar`}
                                            className={cx("avatar")}
                                        />
                                        <span className={cx('active-status')}></span>
                                    </div>
                                    <FaPhoneAlt className={cx("phone-icon")} />
                                </div>
                                <div className={cx("info")}>
                                    <p>Email: {instructor.email}</p>
                                    <p>Address: {instructor.address}</p>
                                    <p>Date of Birth: {instructor.dob}</p>
                                    <p>Status: {instructor.status}</p>
                                    <p>Courses: {instructor.courses}</p>
                                    <p>Feedbacks: {instructor.feedbacks}</p>
                                </div>
                            </div>
                        </Col>
                    ))
                ) : (
                    <Col>
                        <p>No instructors found.</p>
                    </Col>
                )}
            </Row>
        </div>
    );
}
