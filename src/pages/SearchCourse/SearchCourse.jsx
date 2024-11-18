import React, { useEffect, useState } from "react";
import classNames from 'classnames/bind';
import styles from './SearchCourse.module.scss';
import { Col, Row, Form, Button } from "react-bootstrap";
import { FaSearch } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import requests from "../../utils/requests";
import images from "../../assets/images";

const cx = classNames.bind(styles);
const COURSE_URL = 'Course/Courses-active';
const BOOKMARK_URL = 'BookmarkDetail';

export default function SearchCourse() {
    const [searchTerm, setSearchTerm] = useState("");
    const [priceRange, setPriceRange] = useState("all");
    const [rating, setRating] = useState("all");
    const [showDiscount, setShowDiscount] = useState(false);
    const [sortOrder, setSortOrder] = useState("newest");
    const [resultCourse, setResultCourses] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    const searchCourses = async (term = "") => {
        try {
            const params = term ? { CategoryName: term } : {};
            const response = await requests.get(COURSE_URL, { params });
            console.log(response.data);
            
            setResultCourses(response.data.items || []);
        } catch (error) {
            console.error('Error fetching courses:', error);
            setResultCourses([]);
        }
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const query = queryParams.get('query') || '';
        setSearchTerm(query); 
        searchCourses(query); 
    }, [location]);

    const handleEnroll = (courseId) => {
        navigate(`/courseDetail/${courseId}`);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        searchCourses(searchTerm); 
    };

    const getLevelText = (level) => {
        if (level === 1) return 'Beginner';
        if (level === 2) return 'Intermediate';
        if (level === 3) return 'Advanced';
        return 'Unknown';
    };

    const filteredCourses = resultCourse
        .filter(course => {
            if (priceRange === "0-50" && course.price > 50) return false;
            if (priceRange === "50-100" && (course.price < 50 || course.price > 100)) return false;
            if (priceRange === ">100" && course.price <= 100) return false;
            return true;
        })
        .filter(course => {
            if (rating !== "all" && course.averageStarRating < parseInt(rating)) return false;
            return true;
        })
        .filter(course => {
            if (showDiscount && course.discount === 0) return false;
            return true;
        })
        .sort((a, b) => {
            if (sortOrder === "newest") {
                return new Date(b.createdDate) - new Date(a.createdDate);
            } else if (sortOrder === "bestselling") {
                return b.totalAssessments - a.totalAssessments;
            } else if (sortOrder === "lowest") {
                return a.price - b.price;
            } else if (sortOrder === "highest") {
                return b.price - a.price;
            }
            return 0;
        });

        const addBookMark = async (courseId) => {
            try {
              const params = { courseId: courseId };
              const response = await requests.post(BOOKMARK_URL, params, {
                headers: {
                  'Content-Type': 'application/json'
                }
              });
              console.log(response.data);
            } catch (error) {
              console.error('Error adding bookmark:', error);
            }
          };
          

    return (
        <div className={cx('wrapper')}>
            <div className={cx('search-course-container')}>
                <Row className="justify-content-end mt-4">
                    <Col md={8}>
                        <Form onSubmit={handleSearchSubmit} className={cx('search-form')}>
                            <div className={cx('search-bar-container')}>
                                <Form.Control
                                    type="text"
                                    placeholder="Search for courses..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className={cx('search-input')}
                                />
                                <Button type="submit" className={cx('search-button')}>
                                    <FaSearch />
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>

                <Row className="justify-content-end mt-4">
                    <Col md={8} className={cx('result-container')}>
                        <h4>{filteredCourses.length} results found</h4>
                    </Col>
                </Row>

                <Row className="justify-content-center mt-4">
                    <Col md={3} className={cx('sidebar')}>
                        <h5 className={cx('filter-title')}>Filters</h5>
                        <Form.Group controlId="priceFilter">
                            <Form.Label>Price Range</Form.Label>
                            <Form.Control
                                as="select"
                                value={priceRange}
                                onChange={(e) => setPriceRange(e.target.value)}
                                className={cx('filter-select')}
                            >
                                <option value="all">All</option>
                                <option value="0-50">0 - 50</option>
                                <option value="50-100">50 - 100</option>
                                <option value=">100">Above 100</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="ratingFilter">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control
                                as="select"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                className={cx('filter-select')}
                            >
                                <option value="all">All</option>
                                <option value="5">5 stars</option>
                                <option value="4">4 stars and above</option>
                                <option value="3">3 stars and above</option>
                                <option value="2">2 stars and above</option>
                                <option value="1">1 star and above</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="discountFilter">
                            <Form.Check
                                type="checkbox"
                                label="Show only discounted courses"
                                checked={showDiscount}
                                onChange={(e) => setShowDiscount(e.target.checked)}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={9}>
                        <Row className="justify-content-between align-items-center mt-4">
                            <Col md={6}>
                                <div className={cx('sort-buttons')}>
                                    <Button
                                        variant={sortOrder === "newest" ? "primary" : "outline-primary"}
                                        onClick={() => setSortOrder("newest")}
                                    >
                                        Newest
                                    </Button>
                                    <Button
                                        variant={sortOrder === "bestselling" ? "primary" : "outline-primary"}
                                        onClick={() => setSortOrder("bestselling")}
                                    >
                                        Bestselling
                                    </Button>
                                    <Button
                                        variant={sortOrder === "lowest" ? "primary" : "outline-primary"}
                                        onClick={() => setSortOrder("lowest")}
                                    >
                                        Price: Low to High
                                    </Button>
                                    <Button
                                        variant={sortOrder === "highest" ? "primary" : "outline-primary"}
                                        onClick={() => setSortOrder("highest")}
                                    >
                                        Price: High to Low
                                    </Button>
                                </div>
                            </Col>
                        </Row>


                        <div className={cx('popular-courses-section')}>
                            {filteredCourses.length > 0 ?(
                            <Row className={cx('course-items')}>
                                {filteredCourses.map((course, index) => (
                                    <Col lg='3' key={index} className={cx('course-item')}>
                                        <div className={cx('course-image')}>
                                            <span className={cx('icon')} onClick={() => addBookMark(course.courseId)}>
                                                <i class="bi bi-heart"></i>
                                            </span>
                                            <img src={course.image || images.courseDefault} alt={course.courseTitle} />
                                            {course.discount > 0 && (
                                                <span className={cx('discount-badge')}>-{course.discount}%</span>
                                            )}
                                        </div>
                                        <div className={cx('course-body')}>
                                            <h3>{course.courseTitle}</h3>
                                            <p>{course.description}</p>
                                            <div className={cx('course-info')}>
                                                <span>Rating: {course.averageStarRating} ⭐</span>
                                                <span>Level: {getLevelText(course.level)}</span>
                                                <span>Author: {course.user.fullName}</span>
                                                <span className={cx('course-price')}>
                                                    Price: {new Intl.NumberFormat('en-US', {
                                                    style: 'currency',
                                                    currency: 'USD'
                                                }).format(course.price)}
                                                </span>
                                            </div>
                                            <Button
                                                className={cx('enroll-button')}
                                                style={{ backgroundColor: '#28a745', color: 'white', float: 'right' }}
                                                onClick={() => handleEnroll(course.courseCode)}
                                            >
                                                Enroll Now
                                            </Button>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                            ): <div className={cx('not-found')}>No course found!</div>}
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}
