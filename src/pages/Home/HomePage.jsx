import React, {useMemo} from 'react';
import {ReactTyped} from "react-typed";
import classNames from 'classnames/bind';
import styles from './HomePage.module.scss';
import {Col, Container, Row} from "react-bootstrap";
import images from "../../assets/images";

const cx = classNames.bind(styles);

function HomePage() {
    const reasons = useMemo(() => ({
        title: 'Discovering Premium Courses Made Simple',
        image: "https://www.mooc.org/hubfs/are-free-online-courses-worth-it.jpg",
        steps: [
            {
                label: '1. Explore a Diverse Range of Subjects',
                content: 'Browse through hundreds of accredited online courses in various fields including Technology, Business, Arts, and more. Our platform offers something for everyone, no matter your interest or career goals.',
            },
            {
                label: '2. Enroll with Just a Few Clicks',
                content: 'Once you find a course that fits your needs, enrolling is quick and easy. Simply click on the enroll button, and you will gain instant access to all course materials and resources.',
            },
            {
                label: '3. Enjoy Continuous Learning with Expert Guidance',
                content: 'Our courses provide you with ongoing support from experienced instructors, ensuring you stay on track. Participate in interactive discussions and receive valuable feedback as you progress through your course.',
            },
        ],
    }), []);

    const roadmapSteps = useMemo(() => [
        {
            step: 'Step 1: Search for Courses',
            description: 'Use our intuitive search feature to find courses that match your interests.',
            icon: '🔍',
        },
        {
            step: 'Step 2: Select Your Favorite Course',
            description: 'Review course details and select the one that best fits your learning goals.',
            icon: '📚',
        },
        {
            step: 'Step 3: Scan QR Code for Payment',
            description: 'Easily make payments by scanning the QR code and completing the transaction.',
            icon: '💳',
        },
        {
            step: 'Step 4: Start Learning!',
            description: 'Access course materials and start your learning journey.',
            icon: '🎓',
        },
        {
            step: 'Step 5: Take Assessments',
            description: 'Test your knowledge through quizzes and assessments provided in the course.',
            icon: '✅',
        },
    ], []);

    const testimonials = useMemo(() => [
        {
            name: 'John Doe',
            content: 'The courses I took really helped me boost my skills! Highly recommend.',
        },
        {
            name: 'Jane Smith',
            content: 'Fantastic platform with a wide range of topics to choose from.',
        },
        {
            name: 'Emily Johnson',
            content: 'The instructors were amazing and really supportive throughout the learning process.',
        },
        {
            name: 'Michael Brown',
            content: 'I gained practical knowledge that I could apply immediately. Great experience!',
        },
        {
            name: 'Sarah Williams',
            content: 'The flexibility of the courses allowed me to learn at my own pace, which was a huge plus!',
        },
        {
            name: 'David Wilson',
            content: 'I love how interactive the courses are! It kept me engaged and motivated to learn.',
        },
    ], []);


    const popularCourses = useMemo(() => [
        {
            title: 'JavaScript Basics',
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtME2Ho74uhChIuase5oqeJujVV-wmBEAWAg&s',
            description: 'An introduction to JavaScript programming language.',
            rating: 4.5,
            totalLessons: 12,
            totalAssessments: 3,
            difficulty: 'Beginner',
            instructor: {
                name: 'John Doe',
                avatar: 'https://via.placeholder.com/50', // Thay bằng URL của avatar
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
            instructor: {
                name: 'Jane Smith',
                avatar: 'https://via.placeholder.com/50', // Thay bằng URL của avatar
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
            instructor: {
                name: 'Emily Johnson',
                avatar: 'https://via.placeholder.com/50', // Thay bằng URL của avatar
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
            instructor: {
                name: 'Mark Brown',
                avatar: 'https://via.placeholder.com/50', // Thay bằng URL của avatar
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
            instructor: {
                name: 'Sophia Lee',
                avatar: 'https://via.placeholder.com/50', // Thay bằng URL của avatar
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
            instructor: {
                name: 'Michael Smith',
                avatar: 'https://via.placeholder.com/50', // Thay bằng URL của avatar
            },
        },
    ], []);


    return (
        <div>
            <section className={cx('homepage-banner')} style={{ backgroundImage: `url(${images.panelhome})` }}>
                <h1 className={cx('marquee')}>
                    Trust the Leading Network for
                    <span>
                        <ReactTyped
                            strings={['Chemistry', 'Math', 'JavaScript', 'English', 'Writing']}
                            typeSpeed={150}
                            loop
                            backSpeed={50}
                            showCursor={true}
                        />
                    </span>
                    Courses Nationwide.
                </h1>
            </section>
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <div className={cx('body')}>
                        <h1>{reasons.title}</h1>
                        <Row className={cx('container-items')}>
                            <Col lg='4' className={cx('items-img')}>
                                <img src={reasons.image} alt="tutor"/>
                            </Col>
                            <Col lg='8' className={cx('items-dsc')}>
                                {reasons.steps.map((items, index) => {
                                    return (
                                        <div key={index} className={cx('items-content')}>
                                            <p>{items.label}</p>
                                            <span>{items.content}</span>
                                        </div>
                                    );
                                })}
                            </Col>
                        </Row>
                    </div>
                </div>


                <div className={cx('popular-courses-section')}>
                    <h1>Popular Courses</h1>
                    <Row className={cx('course-items')}>
                        {popularCourses.map((course, index) => (
                            <Col lg='3' key={index} className={cx('course-item')}>
                                <div className={cx('course-image')}>
                                    <img src={course.img}
                                         alt={course.title}/>
                                </div>
                                <div className={cx('course-body')}>
                                    <h3>{course.title}</h3>
                                    <p>{course.description}</p>
                                    <div className={cx('course-info')}>
                                        <span>Rating: {course.rating} ⭐</span>
                                        <span>Total Lessons: {course.totalLessons}</span>
                                        <span>Total Assessments: {course.totalAssessments}</span>
                                        <span>Difficulty: {course.difficulty}</span>
                                    </div>
                                    <div className={cx('instructor-info')}>
                                        <img
                                            src='https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/461184877_1080201167130354_934555959225370992_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeF1OYvztxyUATf6-j1khSRlN4WJTXKIg_s3hYlNcoiD-1-BUvSvFlmcpDo5SPWbJmXWkiNpaIFZ26YJ567WS7HU&_nc_ohc=xKK72H38mBcQ7kNvgGMsCmA&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=Au6tCbSgZ1fU_GFWQuaO8wI&oh=00_AYAPzN9u_V7cHmobz-63xIvXVfO6XKGWgKLQPvTNniqFQw&oe=66FBA470'
                                            alt={course.instructor.name}
                                            className={cx('instructor-avatar')}/>
                                        <span>{course.instructor.name}</span>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>


                <div className={cx('testimonials-section')}>
                    <h1>What Our Learners Say</h1>
                    <Row className={cx('testimonial-items')}>
                        {testimonials.map((testimonial, index) => (
                            <Col lg='4' key={index} className={cx('testimonial-item')}>
                                <p>"{testimonial.content}"</p>
                                <h5>- {testimonial.name}</h5>
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
                                {/* Hiển thị đường nối trừ bước cuối cùng */}
                                {index !== roadmapSteps.length - 1 && <div className={cx('timeline-connector')}></div>}
                            </Col>
                        ))}
                    </Row>
                </div>

            </div>
        </div>
    )
        ;
}

export default HomePage;
