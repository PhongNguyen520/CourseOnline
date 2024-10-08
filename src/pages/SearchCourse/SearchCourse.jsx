import React, {useMemo, useState} from "react";
import classNames from 'classnames/bind';
import styles from './SearchCourse.module.scss';
import {Col, Row, Form, Button} from "react-bootstrap";
import {FaSearch} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

export default function SearchCourse() {
    const [searchTerm, setSearchTerm] = useState("");
    const [priceRange, setPriceRange] = useState("all");
    const [rating, setRating] = useState("all");
    const [showDiscount, setShowDiscount] = useState(false);
    const [sortOrder, setSortOrder] = useState("newest")

    const navigate = useNavigate();

    const handleEnroll = (courseId) => {
        navigate(`/courseDetail/${courseId}`);
    };


    const popularCourses = useMemo(() => [
        {
            title: 'JavaScript Basics',
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtME2Ho74uhChIuase5oqeJujVV-wmBEAWAg&s',
            description: 'An introduction to JavaScript programming language.',
            rating: 4.5,
            totalLessons: 12,
            totalAssessments: 3,
            difficulty: 'Beginner',
            createdDate: '2023-01-01',
            price: 50,
            discount: 10,
            instructor: {
                name: 'John Doe',
                avatar: 'https://via.placeholder.com/50',
            },
        },
        {
            title: 'Digital Marketing Strategies',
            img: 'https://cdn.educba.com/academy/wp-content/uploads/2023/07/Digital-Marketing-Stratergies-2.jpg',
            description: 'Learn how to market effectively in the digital world.',
            rating: 4.7,
            totalLessons: 10,
            totalAssessments: 2,
            difficulty: 'Intermediate',
            createdDate: '2023-02-15',
            price: 30,
            discount: 5,
            instructor: {
                name: 'Jane Smith',
                avatar: 'https://via.placeholder.com/50',
            },
        },
        {
            title: 'Graphic Design Essentials',
            img: 'https://media.licdn.com/dms/image/D4D12AQGORwvtJOu1bA/article-cover_image-shrink_720_1280/0/1705732412004?e=2147483647&v=beta&t=DHAKmieYrgisUipU2lEmG7Lfi3dVN5dDbgmLL0hJi4E',
            description: 'Master the fundamentals of graphic design.',
            rating: 4.8,
            totalLessons: 15,
            totalAssessments: 4,
            difficulty: 'Beginner',
            createdDate: '2023-03-20',
            price: 40,
            discount: 0,
            instructor: {
                name: 'Emily Johnson',
                avatar: 'https://via.placeholder.com/50',
            },
        },
        {
            title: 'Data Science with Python',
            img: 'https://daxg39y63pxwu.cloudfront.net/images/blog/python-for-data-science/Python_for_Data_Science.png',
            description: 'Learn how to analyze data using Python programming.',
            rating: 4.6,
            totalLessons: 8,
            totalAssessments: 3,
            difficulty: 'Intermediate',
            createdDate: '2023-04-10',
            price: 85,
            discount: 5,
            instructor: {
                name: 'Mark Brown',
                avatar: 'https://via.placeholder.com/50',
            },
        },
        {
            title: 'Web Development Bootcamp',
            img: 'https://techvify-software.com/wp-content/uploads/2023/08/best-web-development-tools-semidot-infotech-1.png',
            description: 'Build responsive websites using HTML, CSS, and JavaScript.',
            rating: 4.9,
            totalLessons: 20,
            totalAssessments: 5,
            difficulty: 'Advanced',
            createdDate: '2023-07-20',
            price: 12,
            discount: 20,
            instructor: {
                name: 'Sophia Lee',
                avatar: 'https://via.placeholder.com/50',
            },
        },
        {
            title: 'Introduction to Machine Learning',
            img: 'https://corebi.com.ar/wp-content/uploads/2023/04/Machine-learning.jpeg',
            description: 'Explore the basics of machine learning algorithms and applications.',
            rating: 4.4,
            totalLessons: 11,
            totalAssessments: 2,
            difficulty: 'Intermediate',
            createdDate: '2023-08-10',
            price: 70,
            discount: 0,
            instructor: {
                name: 'Michael Smith',
                avatar: 'https://via.placeholder.com/50',
            },
        },
    ], []);

    const filteredCourses = popularCourses.filter(course => {
        return (priceRange === "all" ||
                (priceRange === "0-500" && course.price <= 500000) ||
                (priceRange === "500-1000" && course.price > 500000 && course.price <= 1000000) ||
                (priceRange === ">1000" && course.price > 1000000)) &&
            (rating === "all" ||
                (rating === "5" && course.difficulty === "Advanced") ||
                (rating === "4" && (course.difficulty === "Advanced" || course.difficulty === "Intermediate")) ||
                (rating === "3" && (course.difficulty === "Advanced" || course.difficulty === "Intermediate" || course.difficulty === "Beginner")) ||
                (rating === "2" && (course.difficulty === "Beginner")) ||
                (rating === "1")) &&
            (!showDiscount || course.discount > 0);
    });

    const sortedCourses = filteredCourses.sort((a, b) => {
        if (sortOrder === "newest") {
            return new Date(b.createdDate) - new Date(a.createdDate);
        } else if (sortOrder === "highest") {
            return b.price - a.price;
        } else if (sortOrder === "lowest") {
            return a.price - b.price;
        } else if (sortOrder === "bestselling") {
            return b.totalAssessments - a.totalAssessments;
        }
        return 0;
    });

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Search Term:", searchTerm);
        console.log("Price Range:", priceRange);
        console.log("Rating:", rating);
        console.log("Show Discount:", showDiscount);
    };


    return (
        <div className={cx('wrapper')}>
            <div className={cx('search-course-container')}>
                <Row className="justify-content-end mt-4">
                    <Col md={8}>
                        <Form onSubmit={handleSearch} className={cx('search-form')}>
                            <div className={cx('search-bar-container')}>
                                <Form.Control
                                    type="text"
                                    placeholder="Search for courses..."
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
                </Row>

                {/* Search Result Count */}
                <Row className="justify-content-end mt-4">
                    <Col md={8} className={cx('result-container')}>
                        <h4>{sortedCourses.length} results found</h4>
                    </Col>
                </Row>

                {/* Filters Section */}
                <Row className="justify-content-center mt-4">
                    <Col md={3} className={cx('sidebar')}>
                        <h5 className={cx('filter-title')}>Filters</h5>
                        {/* Price Filter */}
                        <Form.Group controlId="priceFilter">
                            <Form.Label>Price Range</Form.Label>
                            <Form.Control
                                as="select"
                                value={priceRange}
                                onChange={(e) => setPriceRange(e.target.value)}
                                className={cx('filter-select')}
                            >
                                <option value="all">All</option>
                                <option value="0-500">0 - 500k</option>
                                <option value="500-1000">500k - 1 million</option>
                                <option value=">1000">Above 1 million</option>
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
                            <Row className={cx('course-items')}>
                                {popularCourses.map((course, index) => (
                                    <Col lg='3' key={index} className={cx('course-item')}>
                                        <div className={cx('course-image')}>
                                            <img src={course.img} alt={course.title}/>
                                            {course.discount > 0 && (
                                                <span className={cx('discount-badge')}>-{course.discount}%</span>
                                            )}
                                        </div>
                                        <div className={cx('course-body')}>
                                            <h3>{course.title}</h3>
                                            <p>{course.description}</p>
                                            <div className={cx('course-info')}>
                                                <span>Rating: {course.rating} ⭐</span>
                                                <span>Total Lessons: {course.totalLessons}</span>
                                                <span>Total Assessments: {course.totalAssessments}</span>
                                                <span>Difficulty: {course.difficulty}</span>
                                                <span className={cx('course-price')}>
                                                Price: {new Intl.NumberFormat('en-US', {
                                                    style: 'currency',
                                                    currency: 'USD'
                                                }).format(course.price)}
                                                </span>
                                            </div>
                                            <Button
                                                className={cx('enroll-button')}
                                                style={{backgroundColor: '#28a745', color: 'white', float: 'right'}}
                                                onClick={() => handleEnroll(10)}
                                            >
                                                Enroll Now
                                            </Button>
                                        </div>
                                    </Col>
                                ))}
                            </Row>


                        </div>

                    </Col>
                </Row>
            </div>
        </div>
    );
}
