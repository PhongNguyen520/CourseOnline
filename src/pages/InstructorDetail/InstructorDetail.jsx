import React from 'react';
import classNames from 'classnames/bind';
import styles from './InstructorDetail.module.scss';
import {Container, Row, Col} from 'react-bootstrap';

const cx = classNames.bind(styles);

export default function InstructorDetail() {
    const instructor = {
        avatar: 'https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/461184877_1080201167130354_934555959225370992_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeF1OYvztxyUATf6-j1khSRlN4WJTXKIg_s3hYlNcoiD-1-BUvSvFlmcpDo5SPWbJmXWkiNpaIFZ26YJ567WS7HU&_nc_ohc=792z0Y7OL7gQ7kNvgEc8Vwv&_nc_zt=23&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=AFKwzl5XE7YfHrX9SY7F32J&oh=00_AYAksJ2RPzPnwf9YDJ4jNuoeCvXSn_u9co3MPI0PHPx0mw&oe=671591F0',
        fullName: 'John Doe',
        phoneNumber: '123-456-7890',
        address: '123 Main St, City, Country',
        joinDate: 'January 1, 2020',
        birthDate: 'January 1, 1980',
        certificates: [
            'https://marketplace.canva.com/EAFlVDzb7sA/1/0/1600w/canva-white-gold-elegant-modern-certificate-of-participation-bK_WEelNCjo.jpg',
        ],
        courses: [
            {
                title: 'JavaScript for Beginners',
                image: 'https://blog.haposoft.com/content/images/2022/01/cafedev_javascript.png'
            },
            {
                title: 'JavaScript for Beginners',
                image: 'https://blog.haposoft.com/content/images/2022/01/cafedev_javascript.png'
            },
            {
                title: 'Advanced React',
                image: 'https://cdn.prod.website-files.com/64ac2a10ca05a003044df744/659d92386a5b8e5d3741d5ce_Frame%2012.png'
            },
            {
                title: 'Advanced React',
                image: 'https://cdn.prod.website-files.com/64ac2a10ca05a003044df744/659d92386a5b8e5d3741d5ce_Frame%2012.png'
            },
            {
                title: 'Node.js Basics',
                image: 'https://binmile.com/wp-content/uploads/2022/12/Nodejs-Application-Development-1.webp'
            },
            {
                title: 'Node.js Basics',
                image: 'https://binmile.com/wp-content/uploads/2022/12/Nodejs-Application-Development-1.webp'
            },
            {
                title: 'Node.js Basics',
                image: 'https://binmile.com/wp-content/uploads/2022/12/Nodejs-Application-Development-1.webp'
            },
            {
                title: 'Django for Beginners',
                image: 'https://cdn.prod.website-files.com/6644659ec8fb7e45b042261c/66460b09c00f91670753ac8b_What-is-Django.webp'
            },
            {
                title: 'Django for Beginners',
                image: 'https://cdn.prod.website-files.com/6644659ec8fb7e45b042261c/66460b09c00f91670753ac8b_What-is-Django.webp'
            },
            {
                title: 'Django for Beginners',
                image: 'https://cdn.prod.website-files.com/6644659ec8fb7e45b042261c/66460b09c00f91670753ac8b_What-is-Django.webp'
            },
        ],
        feedback: [
            {reviewer: 'Alice', comment: 'Great instructor!'},
            {reviewer: 'Alice', comment: 'Great instructor!'},
            {reviewer: 'Bob', comment: 'Very informative lessons.'},
            {reviewer: 'Bob', comment: 'Very informative lessons.'},
        ],
    };

    return (
        <div className={cx('wrapper')}>
            <Container>
                <Row>
                    <Col lg={4}>
                        <div className={cx('container_instructor-info')}>
                            <div className={cx('instructor-avatar')}>
                                <img src={instructor.avatar} alt={instructor.fullName}/>
                            </div>
                            <h3>{instructor.fullName}</h3>
                            <p><strong>Phone:</strong> {instructor.phoneNumber}</p>
                            <p><strong>Address:</strong> {instructor.address}</p>
                            <p><strong>Join Date:</strong> {instructor.joinDate}</p>
                            <p><strong>Birth Date:</strong> {instructor.birthDate}</p>
                        </div>
                    </Col>
                    <Col lg={8} className={cx('container-about')}>
                        <div className={cx('certificates')}>
                            {instructor.certificates.map((certificate, index) => (
                                <img key={index} src={certificate} alt={`Certificate ${index + 1}`}
                                     className={cx('certificate-image')}/>
                            ))}
                        </div>

                        <h4>Courses</h4>
                        <div className={cx('course-grid')}>
                            {instructor.courses.map((course, index) => (
                                <div key={index} className={cx('course-item')}>
                                    <img src={course.image} alt={course.title} className={cx('course-image')}/>
                                </div>
                            ))}
                        </div>

                        <h4>Feedback</h4>
                        <ul className={cx('feedback-list')}>
                            {instructor.feedback.map((feedback, index) => (
                                <li key={index}>
                                    <strong>{feedback.reviewer}:</strong> {feedback.comment}
                                </li>
                            ))}
                        </ul>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
