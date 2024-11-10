import React, {useMemo, useState, useEffect, useContext} from "react";
import {ReactTyped} from "react-typed";
import classNames from 'classnames/bind';
import styles from './HomePage.module.scss';
import {Col, Container, Row, Card} from "react-bootstrap";
import images from "../../assets/images";
import {SearchIcon} from '../../assets/icons/Icons';
import GreatInstructor from "./GreatInstructor/GreatInstructor";
import {FaSearch, FaBook, FaQrcode, FaGraduationCap, FaCheckCircle} from 'react-icons/fa';
import requests from '../../utils/requests';
import {useNavigate} from "react-router-dom";
import { ModalContext } from "../../components/ModalProvider/ModalProvider";
import config from "../../config";


const CATEGORY_URL = 'Category';
const COURSES_URL = 'Course/Courses-active'
const INSTRUCTOR_URL = 'User/Get-all'

const cx = classNames.bind(styles);

function HomePage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryNames, setCategoryNames] = useState([]);
    const [courses, setCourses] = useState(null);
    const [instructors, setInstructors] = useState(null);

    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/searchCourses?query=${searchQuery}`);
        }
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });

        const fetchData = async () => {
            try {
                const [categoryResponse, coursesResponse, instructorResponse] = await Promise.all([
                    requests.get(CATEGORY_URL),
                    requests.get(COURSES_URL),
                    requests.get(INSTRUCTOR_URL)
                ]);

                const categoryData = categoryResponse.data || [];
                const categories = categoryData.map(cat => cat.categoryName).filter(Boolean);
                const instructorsData = instructorResponse.data.items || [];
                const instructors = instructorsData.filter(user => user.roleId.roleName === 'Instructor');
                setCategoryNames(categories);
                setCourses(coursesResponse.data.items || []);
                setInstructors(instructors);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    console.log(instructors);

    const roadmapSteps = useMemo(() => [
        {
            step: 'Step 1: Search for Courses',
            description: 'Use our intuitive search feature to find courses that match your interests.',
            icon: <FaSearch/>,
        },
        {
            step: 'Step 2: Select Your Favorite Course',
            description: 'Review course details and select the one that best fits your learning goals.',
            icon: <FaBook/>,
        },
        {
            step: 'Step 3: Scan QR Code for Payment',
            description: 'Easily make payments by scanning the QR code and completing the transaction.',
            icon: <FaQrcode/>,
        },
        {
            step: 'Step 4: Start Learning!',
            description: 'Access course materials and start your learning journey.',
            icon: <FaGraduationCap/>,
        },
        {
            step: 'Step 5: Take Assessments',
            description: 'Test your knowledge through quizzes and assessments provided in the course.',
            icon: <FaCheckCircle/>,
        },
    ], []);

    const testimonials = useMemo(() => [
        {
            name: 'John Doe',
            content: 'The courses I took really helped me boost my skills! Highly recommend.',
            rating: 4,
            likes: 120,
        },
        {
            name: 'Jane Smith',
            content: 'Fantastic platform with a wide range of topics to choose from.',
            rating: 5,
            likes: 95,
        },
        {
            name: 'Emily Johnson',
            content: 'The instructors were amazing and really supportive throughout the learning process.',
            rating: 5,
            likes: 80,
        },
        {
            name: 'Michael Brown',
            content: 'I gained practical knowledge that I could apply immediately. Great experience!',
            rating: 4,
            likes: 110,
        },
        {
            name: 'Sarah Williams',
            content: 'The flexibility of the courses allowed me to learn at my own pace, which was a huge plus!',
            rating: 5,
            likes: 150,
        },
        {
            name: 'David Wilson',
            content: 'I love how interactive the courses are! It kept me engaged and motivated to learn.',
            rating: 5,
            likes: 75,
        },
    ], []);

    return (
        <div>
            <section className={cx('homepage-banner')} style={{backgroundImage: `url(${images.panelhome})`}}>
                <h1 className={cx('marquee')}>
                    Trust the Leading Network for
                    <span>
                        {categoryNames && categoryNames.length > 0 ? (
                            <ReactTyped
                                strings={categoryNames}
                                typeSpeed={150}
                                loop
                                backSpeed={50}
                                showCursor={true}
                            />
                        ) : (
                            '...'
                        )}
                    </span>

                    Courses Nationwide.
                </h1>
                <div className={cx('search-bar')}>
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Search courses..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <span className={cx('search-icon')} onClick={handleSearch}>
                            <SearchIcon/>
                        </span>
                    </form>
                </div>
            </section>
            <Container>
                <div className={cx('wrapper')}>
                    <div className={cx('container')}>
                        <div className={cx('body')}>
                            <Row className={cx('container__levels')}>
                                <Col lg="6" className={cx('container__tutors')}>
                                    <div className={cx('slide-track')}>
                                        {instructors && instructors.length > 0 ? (
                                            // Repeat the instructors multiple times to create the infinite scroll illusion
                                            [...Array(3)].map((_, repetitionIndex) =>
                                                instructors.map((instructor, index) => {
                                                    return (
                                                        <GreatInstructor
                                                            key={`${index}-${repetitionIndex}`} // Unique key combining instructor index and repetition index
                                                            avatar={instructor.avatar || 'https://firebasestorage.googleapis.com/v0/b/cursus-4da28.appspot.com/o/avatars%2F%E1%BA%A2nh%20ch%E1%BB%A5p%20m%C3%A0n%20h%C3%ACnh%202024-08-19%20194338.png?alt=media&token=b2fca777-cbe9-47a5-85f9-af70fcc7dda0'}
                                                            fullName={instructor.fullName}
                                                            address={instructor.address}
                                                            email={instructor.email}
                                                            phoneNumber={instructor.phoneNumber}
                                                        />
                                                    );
                                                })
                                            )
                                        ) : (
                                            <p>Loading instructors...</p>
                                        )}
                                    </div>
                                </Col>

                                <Col lg="6" className={cx('container__introduction-1')}>
                                    <img src={images.one} alt="one"></img>
                                    <span>Explore a Diverse Range of Subjects</span>
                                    <div className={cx('container__introduction-dsc')}>
                                        <p>
                                            Browse through hundreds of accredited online courses in various fields
                                            including Technology, Business, Arts, and more. Our platform offers
                                            something for everyone, no matter your interest or career goals.
                                        </p>
                                    </div>
                                </Col>
                            </Row>

                            <Row className={cx('container__levels')}>
                                <Col lg="6">
                                    <div className={cx('container__introduction-2')}>
                                        <img src={images.two} alt="two"></img>
                                        <span>Enroll with Just a Few Clicks</span>
                                        <div className={cx('container__introduction-dsc')}>
                                            <p>
                                                Once you find a course that fits your needs, enrolling is quick and
                                                easy. Simply click on the enroll button, and you will gain instant
                                                access to all course materials and resources.
                                            </p>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg="6" className={cx('container__message')}>
                                    <img src={images.clickenrol} alt="message"></img>
                                </Col>
                            </Row>

                            <Row className={cx('container__levels')}>
                                <Col lg={{span: 6, offset: 3}}>
                                    <div className={cx('container__introduction-3')}>
                                        <img src={images.three} alt="three"></img>
                                        <span>Enjoy Continuous Learning with Expert Guidance</span>
                                        <div className={cx('container__introduction-dsc')}>
                                            <p>
                                                Our courses provide you with ongoing support from experienced
                                                instructors, ensuring you stay on track. Participate in interactive
                                                discussions and receive valuable feedback as you progress through your
                                                course.
                                            </p>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>

                    <div className={cx('popular-courses-section')}>
                        <h1>Popular Courses</h1>
                        <Row className={cx('course-items')}>
                            {courses && courses.length > 0 ? (
                                courses.slice(0, 6).map((course, index) => (  // Slicing the array to get only 6 courses
                                    <Col lg='3' key={index} className={cx('course-item')}>
                                        <div className={cx('course-image')}>
                                            <img src={'https://foundr.com/wp-content/uploads/2023/04/How-to-create-an-online-course.jpg.webp'}
                                                 alt={course.courseTitle}/>
                                        </div>
                                        <div className={cx('course-body')}>
                                            <h3>{course.courseTitle}</h3>
                                            <p>{course.shortDescription}</p>
                                            <div className={cx('course-info')}>
                                                <span>Rating: {course.averageStarRating} ⭐</span>
                                                <span>Price: ${course.price}</span>
                                                <span>Level: {course.level}</span>
                                            </div>
                                            <div className={cx('instructor-info')}>
                                                <img
                                                    src={course.user?.avatar || 'https://firebasestorage.googleapis.com/v0/b/cursus-4da28.appspot.com/o/avatars%2F%E1%BA%A2nh%20ch%E1%BB%A5p%20m%C3%A0n%20h%C3%ACnh%202024-08-19%20194338.png?alt=media&token=b2fca777-cbe9-47a5-85f9-af70fcc7dda0'}
                                                    alt={course.user?.fullName || 'Instructor'}
                                                    className={cx('instructor-avatar')}
                                                />
                                                <span>{course.user?.fullName}</span>
                                            </div>
                                        </div>
                                    </Col>
                                ))
                            ) : (
                                <p>Loading courses...</p>
                            )}
                        </Row>
                    </div>


                    <div className={cx('testimonials-section')}>
                        <h1>What Our Learners Say</h1>
                        <Row className={cx('testimonial-items')}>
                            {testimonials.map((testimonial, index) => (
                                <Col lg='4' md='6' key={index} className={cx('testimonial-item')}>
                                    <div className={cx('testimonial-card')}>
                                        <div className={cx('testimonial-avatar')}>
                                            <img
                                                src='https://firebasestorage.googleapis.com/v0/b/cursus-4da28.appspot.com/o/avatars%2F%E1%BA%A2nh%20ch%E1%BB%A5p%20m%C3%A0n%20h%C3%ACnh%202024-08-19%20194338.png?alt=media&token=b2fca777-cbe9-47a5-85f9-af70fcc7dda0'
                                                alt={testimonial.name}/>
                                        </div>
                                        <p className={cx('testimonial-content')}>“{testimonial.content}”</p>
                                        <div className={cx('testimonial-rating-wrapper')}>
                                            <div className={cx('testimonial-rating')}>
                                                {Array.from({length: 5}, (_, i) => (
                                                    <span key={i}
                                                          className={cx('star', {active: i < testimonial.rating})}>
                                    ⭐
                                </span>
                                                ))}
                                            </div>
                                            <span className={cx('likes')}> {testimonial.likes} Likes</span>
                                        </div>
                                        <h5 className={cx('testimonial-name')}>- {testimonial.name}</h5>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </div>


                    <div className={cx('roadmap-section')}>
                        <h1>How to Purchase Your Course</h1>
                        <Row className={cx('roadmap-items')}>
                            {roadmapSteps.map((roadmapItem, index) => (
                                <Col lg='2' key={index} className={cx('roadmap-item')}>
                                    <div className={cx('roadmap-icon')}>{roadmapItem.icon}</div>
                                    <h4>{roadmapItem.step}</h4>
                                    <p>{roadmapItem.description}</p>
                                    {index !== roadmapSteps.length - 1 &&
                                        <div className={cx('timeline-connector')}></div>}
                                </Col>
                            ))}
                        </Row>
                    </div>

                    {/*<Row className="my-5">*/}
                    {/*    <Col>*/}
                    {/*        <h2 className={cx('testimonial-title')}>Why Students Love Our Courses</h2>*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}
                    {/*<Row className={cx('testimonials')}>*/}
                    {/*    <Col md={6} className="mb-4">*/}
                    {/*        <Card className={cx('testimonial-card')}>*/}
                    {/*            <Card.Body>*/}
                    {/*                <div className={cx('testimonial-header')}>*/}
                    {/*                    <img src="/path/to/avatar1.jpg" alt="Ashton W." className={cx('testimonial-avatar')} />*/}
                    {/*                    <div>*/}
                    {/*                        <h5>Ashton W.</h5>*/}
                    {/*                        <span className={cx('testimonial-role')}>SURFACE PATTERN</span>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*                <Card.Text>*/}
                    {/*                    <strong>This class was so helpful for me.</strong> I already had a Shopify website, but my site was in desperate need of a refresh! I was overwhelmed and not sure where to start, and this class made it seem much more doable. <strong>I’m so proud to send people to my website now.</strong> :)*/}
                    {/*                </Card.Text>*/}
                    {/*            </Card.Body>*/}
                    {/*        </Card>*/}
                    {/*    </Col>*/}
                    {/*    <Col md={6} className="mb-4">*/}
                    {/*        <Card className={cx('testimonial-card')}>*/}
                    {/*            <Card.Body>*/}
                    {/*                <div className={cx('testimonial-header')}>*/}
                    {/*                    <img src="/path/to/avatar2.jpg" alt="Sean D." className={cx('testimonial-avatar')} />*/}
                    {/*                    <div>*/}
                    {/*                        <h5>Sean D.</h5>*/}
                    {/*                        <span className={cx('testimonial-role')}>FILMMAKER, VIDEO EDITOR</span>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*                <Card.Text>*/}
                    {/*                    It’s so nice when a professional breaks down what can be a very complex topic and teach it <strong>simply, effectively and directly</strong>. Now I have a much better language for communicating lighting strategy and for lighting my work.*/}
                    {/*                </Card.Text>*/}
                    {/*            </Card.Body>*/}
                    {/*        </Card>*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}

                </div>
            </Container>
        </div>
    )
        ;
}

export default HomePage;
