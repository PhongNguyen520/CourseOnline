import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './MyClasses.module.scss';
import images from '../../assets/images';

const cx = classNames.bind(styles);

export default function MyClasses() {
    const [courses] = useState([
        {
            id: 1,
            title: 'Basics of C# and Unity for Complete Beginners - Part 2',
            instructor: 'Alex Dev',
            image: '/api/placeholder/400/250',
            progress: 8
        },
        {
            id: 2,
            title: 'Developing Cloud-Native Apps w/ Microservices',
            instructor: 'Red Hat, Inc.',
            image: '/api/placeholder/400/250',
            progress: 0
        },
        {
            id: 3,
            title: 'Building of Web3 Token Balance Applications',
            instructor: 'MTF Institute of Management',
            image: '/api/placeholder/400/250',
            progress: 0
        },
        {
            id: 4,
            title: 'Practical Web Design & Development: 7 Courses in 1',
            instructor: 'Creative Online School',
            image: '/api/placeholder/400/250',
            progress: 0
        }
    ]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('filters')}>
                    <div className={cx('filter-item')}>
                        <select defaultValue="recent">
                            <option value="recent">Recently Accessed</option>
                            <option value="name">Course Name</option>
                            <option value="progress">Progress</option>
                        </select>
                    </div>
                    <div className={cx('filter-item')}>
                        <select defaultValue="">
                            <option value="">Categories</option>
                            <option value="programming">Programming</option>
                            <option value="design">Design</option>
                            <option value="business">Business</option>
                        </select>
                    </div>
                    <div className={cx('filter-item')}>
                        <select defaultValue="">
                            <option value="">Progress</option>
                            <option value="not-started">Not Started</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    <div className={cx('filter-item')}>
                        <select defaultValue="">
                            <option value="">Instructor</option>
                            <option value="alex">Alex Dev</option>
                            <option value="redhat">Red Hat, Inc.</option>
                        </select>
                    </div>
                </div>
                <div className={cx('search')}>
                    <input type="text" placeholder="Search my courses" />
                </div>
            </div>

            <div className={cx('courses-grid')}>
                {courses.map(course => (
                    <div key={course.id} className={cx('course-card')}>
                        <div className={cx('course-image')}>
                            <img src={course.image && images.courseDefault} alt={course.title} />
                            <button className={cx('more-options')}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM3 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM13 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                </svg>
                            </button>
                        </div>
                        <div className={cx('course-content')}>
                            <h3 className={cx('course-title')}>{course.title}</h3>
                            <p className={cx('course-instructor')}>{course.instructor}</p>
                            {course.progress > 0 && (
                                <>
                                    <div className={cx('progress-bar')}>
                                        <div 
                                            className={cx('progress')} 
                                            style={{ width: `${course.progress}%` }}
                                        />
                                    </div>
                                    <p className={cx('progress-text')}>{course.progress}% complete</p>
                                </>
                            )}
                        </div>
                        <div className={cx('course-action')}>
                            <button>
                                {course.progress > 0 ? 'Continue Course' : 'Start Course'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}