import React, {useMemo, useState, useEffect} from "react";
import {ReactTyped} from "react-typed";
import classNames from 'classnames/bind';
import styles from './HomePage.module.scss';
import {Col, Container, Row} from "react-bootstrap";
import images from "../../assets/images";
import {SearchIcon} from '../../assets/icons/Icons';
import GreatInstructor from "./GreatInstructor/GreatInstructor";
import {FaSearch, FaBook, FaQrcode, FaGraduationCap, FaCheckCircle} from 'react-icons/fa';


const cx = classNames.bind(styles);

function HomePage() {
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchQuery);
    };


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
            instructor: {
                name: 'Michael Smith',
                avatar: 'https://via.placeholder.com/50',
            },
        },
    ], []);

    const top10 = useMemo(() => [
        {
            avatar: 'https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/461184877_1080201167130354_934555959225370992_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeF1OYvztxyUATf6-j1khSRlN4WJTXKIg_s3hYlNcoiD-1-BUvSvFlmcpDo5SPWbJmXWkiNpaIFZ26YJ567WS7HU&_nc_ohc=xN1CupsQEv4Q7kNvgHaZvMm&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=AoCdzzIIuN0yWr_fqOn9dPV&oh=00_AYCKyhrodIb20tOhLAB-MRBz3Sxmb5pXsNQ2_qyN81lL3Q&oe=670668B0',
            fullName: 'Anna Johnson',
            headline: 'Expert in Data Science and Machine Learning',
            subjectTutors: 'Data Science, Machine Learning',
            totalHour: 1200,
        },
        {
            avatar: 'https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/461184877_1080201167130354_934555959225370992_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeF1OYvztxyUATf6-j1khSRlN4WJTXKIg_s3hYlNcoiD-1-BUvSvFlmcpDo5SPWbJmXWkiNpaIFZ26YJ567WS7HU&_nc_ohc=xN1CupsQEv4Q7kNvgHaZvMm&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=AoCdzzIIuN0yWr_fqOn9dPV&oh=00_AYCKyhrodIb20tOhLAB-MRBz3Sxmb5pXsNQ2_qyN81lL3Q&oe=670668B0',
            fullName: 'James Williams',
            headline: 'Specialist in Web Development',
            subjectTutors: 'HTML, CSS, JavaScript',
            totalHour: 1500,
        },
        {
            avatar: 'https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/461184877_1080201167130354_934555959225370992_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeF1OYvztxyUATf6-j1khSRlN4WJTXKIg_s3hYlNcoiD-1-BUvSvFlmcpDo5SPWbJmXWkiNpaIFZ26YJ567WS7HU&_nc_ohc=xN1CupsQEv4Q7kNvgHaZvMm&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=AoCdzzIIuN0yWr_fqOn9dPV&oh=00_AYCKyhrodIb20tOhLAB-MRBz3Sxmb5pXsNQ2_qyN81lL3Q&oe=670668B0',
            fullName: 'Emily Davis',
            headline: 'Marketing Strategist and SEO Expert',
            subjectTutors: 'Digital Marketing, SEO',
            totalHour: 900,
        },
        {
            avatar: 'https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/461184877_1080201167130354_934555959225370992_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeF1OYvztxyUATf6-j1khSRlN4WJTXKIg_s3hYlNcoiD-1-BUvSvFlmcpDo5SPWbJmXWkiNpaIFZ26YJ567WS7HU&_nc_ohc=xN1CupsQEv4Q7kNvgHaZvMm&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=AoCdzzIIuN0yWr_fqOn9dPV&oh=00_AYCKyhrodIb20tOhLAB-MRBz3Sxmb5pXsNQ2_qyN81lL3Q&oe=670668B0',
            fullName: 'Michael Brown',
            headline: 'Python Programming and Automation',
            subjectTutors: 'Python, Automation',
            totalHour: 1300,
        },
        {
            avatar: 'https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/461184877_1080201167130354_934555959225370992_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeF1OYvztxyUATf6-j1khSRlN4WJTXKIg_s3hYlNcoiD-1-BUvSvFlmcpDo5SPWbJmXWkiNpaIFZ26YJ567WS7HU&_nc_ohc=xN1CupsQEv4Q7kNvgHaZvMm&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=AoCdzzIIuN0yWr_fqOn9dPV&oh=00_AYCKyhrodIb20tOhLAB-MRBz3Sxmb5pXsNQ2_qyN81lL3Q&oe=670668B0',
            fullName: 'Sarah Miller',
            headline: 'Graphic Design Expert',
            subjectTutors: 'Graphic Design, Adobe Photoshop',
            totalHour: 1100,
        },
        {
            avatar: 'https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/461184877_1080201167130354_934555959225370992_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeF1OYvztxyUATf6-j1khSRlN4WJTXKIg_s3hYlNcoiD-1-BUvSvFlmcpDo5SPWbJmXWkiNpaIFZ26YJ567WS7HU&_nc_ohc=xN1CupsQEv4Q7kNvgHaZvMm&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=AoCdzzIIuN0yWr_fqOn9dPV&oh=00_AYCKyhrodIb20tOhLAB-MRBz3Sxmb5pXsNQ2_qyN81lL3Q&oe=670668B0',
            fullName: 'David Wilson',
            headline: 'JavaScript Full Stack Developer',
            subjectTutors: 'React, Node.js, MongoDB',
            totalHour: 1400,
        },
        {
            avatar: 'https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/461184877_1080201167130354_934555959225370992_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeF1OYvztxyUATf6-j1khSRlN4WJTXKIg_s3hYlNcoiD-1-BUvSvFlmcpDo5SPWbJmXWkiNpaIFZ26YJ567WS7HU&_nc_ohc=xN1CupsQEv4Q7kNvgHaZvMm&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=AoCdzzIIuN0yWr_fqOn9dPV&oh=00_AYCKyhrodIb20tOhLAB-MRBz3Sxmb5pXsNQ2_qyN81lL3Q&oe=670668B0',
            fullName: 'Jessica Moore',
            headline: 'Experienced in UI/UX Design',
            subjectTutors: 'UI/UX, Figma',
            totalHour: 800,
        },
        {
            avatar: 'https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/461184877_1080201167130354_934555959225370992_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeF1OYvztxyUATf6-j1khSRlN4WJTXKIg_s3hYlNcoiD-1-BUvSvFlmcpDo5SPWbJmXWkiNpaIFZ26YJ567WS7HU&_nc_ohc=xN1CupsQEv4Q7kNvgHaZvMm&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=AoCdzzIIuN0yWr_fqOn9dPV&oh=00_AYCKyhrodIb20tOhLAB-MRBz3Sxmb5pXsNQ2_qyN81lL3Q&oe=670668B0',
            fullName: 'Daniel Taylor',
            headline: 'Specialist in Cloud Computing',
            subjectTutors: 'AWS, Google Cloud',
            totalHour: 1000,
        },
        {
            avatar: 'https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/461184877_1080201167130354_934555959225370992_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeF1OYvztxyUATf6-j1khSRlN4WJTXKIg_s3hYlNcoiD-1-BUvSvFlmcpDo5SPWbJmXWkiNpaIFZ26YJ567WS7HU&_nc_ohc=xN1CupsQEv4Q7kNvgHaZvMm&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=AoCdzzIIuN0yWr_fqOn9dPV&oh=00_AYCKyhrodIb20tOhLAB-MRBz3Sxmb5pXsNQ2_qyN81lL3Q&oe=670668B0',
            fullName: 'Sophia Anderson',
            headline: 'Project Management and Agile Coaching',
            subjectTutors: 'Project Management, Agile',
            totalHour: 950,
        },
        {
            avatar: 'https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/461184877_1080201167130354_934555959225370992_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeF1OYvztxyUATf6-j1khSRlN4WJTXKIg_s3hYlNcoiD-1-BUvSvFlmcpDo5SPWbJmXWkiNpaIFZ26YJ567WS7HU&_nc_ohc=xN1CupsQEv4Q7kNvgHaZvMm&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=AoCdzzIIuN0yWr_fqOn9dPV&oh=00_AYCKyhrodIb20tOhLAB-MRBz3Sxmb5pXsNQ2_qyN81lL3Q&oe=670668B0',
            fullName: 'Matthew Thompson',
            headline: 'Blockchain and Cryptocurrency Specialist',
            subjectTutors: 'Blockchain, Cryptocurrency',
            totalHour: 1250,
        },
    ], []);


    return (
        <div>
            <section className={cx('homepage-banner')} style={{backgroundImage: `url(${images.panelhome})`}}>
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
                <div className={cx('search-bar')}>
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Search courses..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <SearchIcon/>
                    </form>
                </div>
            </section>
            <Container>
                <div className={cx('wrapper')}>
                    <div className={cx('container')}>
                        <div className={cx('body')}>
                            {/*<h1>{reasons.title}</h1>*/}
                            {/*    <Row className={cx('container-items')}>*/}
                            {/*        <Col lg='4' className={cx('items-img')}>*/}
                            {/*            <img src={reasons.image} alt="tutor"/>*/}
                            {/*        </Col>*/}
                            {/*    <Col lg='8' className={cx('items-dsc')}>*/}
                            {/*        {reasons.steps.map((items, index) => {*/}
                            {/*            return (*/}
                            {/*                <div key={index} className={cx('items-content')}>*/}
                            {/*                    <p>{items.label}</p>*/}
                            {/*                    <span>{items.content}</span>*/}
                            {/*                </div>*/}
                            {/*            );*/}
                            {/*        })}*/}
                            {/*    </Col>*/}
                            {/*</Row>*/}

                            <Row className={cx('container__levels')}>
                                <Col lg="6" className={cx('container__tutors')}>
                                    <div className={cx('slide-track')}>
                                        {top10.map((subject, index) => {
                                            return (
                                                <GreatInstructor
                                                    key={index}
                                                    avatar={subject.avatar}
                                                    fullName={subject.fullName}
                                                    headline={subject.headline}
                                                    subject={subject.subjectTutors}
                                                    hour={subject.totalHour}
                                                />
                                            );
                                        })}
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
                                                src='https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/461184877_1080201167130354_934555959225370992_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeF1OYvztxyUATf6-j1khSRlN4WJTXKIg_s3hYlNcoiD-1-BUvSvFlmcpDo5SPWbJmXWkiNpaIFZ26YJ567WS7HU&_nc_ohc=IQm2RukBjzcQ7kNvgHpob4S&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=AFWilurBFZKVaT5cQYGP0Y-&oh=00_AYAeWhAfJqhaY2otANnmht78GDXElKIev1lhTNdpMcV2iQ&oe=67038D70'
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
                                <Col lg='4' md='6' key={index} className={cx('testimonial-item')}>
                                    <div className={cx('testimonial-card')}>
                                        <div className={cx('testimonial-avatar')}>
                                            <img
                                                src='https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-1/461938509_1249316636419148_7431080090941975245_n.jpg?stp=dst-jpg_s200x200&_nc_cat=101&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeFen98joCoVGZnQKA5v5pam0kLCU58FduvSQsJTnwV26xSzeKYpfvTuU-Quor3Fy43xSQb1qSY1xbk1uFiB8oW4&_nc_ohc=FUBu5WZlTsQQ7kNvgFlNPUT&_nc_ht=scontent.fsgn2-4.fna&_nc_gid=AkmPiTWWseAQDzRUtm2fKfK&oh=00_AYCLh5iIc1W7I_KBCu25sSo-dMjRKqI9pVXpLWFOT2Itng&oe=67068506'
                                                alt={testimonial.name}/>
                                        </div>
                                        <p className={cx('testimonial-content')}>“{testimonial.content}”</p>
                                        <div className={cx('testimonial-rating-wrapper')}>
                                            <div className={cx('testimonial-rating')}>
                                                {/* Hiển thị số sao */}
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
                                    {/* Hiển thị đường nối trừ bước cuối cùng */}
                                    {index !== roadmapSteps.length - 1 &&
                                        <div className={cx('timeline-connector')}></div>}
                                </Col>
                            ))}
                        </Row>
                    </div>

                </div>
            </Container>

        </div>
    )
        ;
}

export default HomePage;
