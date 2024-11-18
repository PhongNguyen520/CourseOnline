import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Play, Check } from 'lucide-react';
import classNames from 'classnames/bind';
import styles from './Lectures.module.scss';

const cx = classNames.bind(styles);

const mockCourseData = {
  sections: [
    {
      title: "Section 1: Introduction",
      duration: "11min",
      lectures: [
        { id: 1, title: "Introduction", duration: "1min", completed: true }
      ]
    },
    {
      title: "Section 2: Before you start",
      duration: "1min",
      lectures: [
        { id: 2, title: "Important to know", duration: "1min", completed: true }
      ]
    },
    {
      title: "Section 3: Gun and bullet",
      duration: "39min",
      lectures: [
        { id: 3, title: "Gun and gun's rotation", duration: "8min", completed: false },
        { id: 4, title: "Gun's Flip and Aim", duration: "7min", completed: false },
        { id: 5, title: "Bullet and Target", duration: "10min", completed: false },
        { id: 6, title: "Target spawner", duration: "15min", completed: false }
      ]
    }
  ],
  currentVideo: {
    title: "Learn How to Make a Simple 2D Game in Unity",
    rating: 4.9,
    students: 7192,
    duration: "1.5 hours",
    reviews: 271
  }
};

const Lectures = () => {
  const [expandedSections, setExpandedSections] = useState(new Set([0, 1, 2]));
  const [selectedLecture, setSelectedLecture] = useState(1);

  const toggleSection = (index) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedSections(newExpanded);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('video-container')}>
        <div className={cx('video-player')}>
          <div className={cx('placeholder-video')}>
            <Play size={48} className={cx('play-icon')} />
          </div>
        </div>
        <div className={cx('video-info')}>
          <h1>{mockCourseData.currentVideo.title}</h1>
          <div className={cx('stats')}>
            <span className={cx('rating')}>{mockCourseData.currentVideo.rating} ★</span>
            <span className={cx('students')}>{mockCourseData.currentVideo.students.toLocaleString()} students</span>
            <span className={cx('reviews')}>{mockCourseData.currentVideo.reviews} reviews</span>
          </div>
        </div>
      </div>
      
      <div className={cx('content-sidebar')}>
        <div className={cx('course-content')}>
          <h2>Course content</h2>
          {mockCourseData.sections.map((section, index) => (
            <div key={index} className={cx('section')}>
              <button
                className={cx('section-header')}
                onClick={() => toggleSection(index)}
              >
                <div className={cx('section-title')}>
                  {expandedSections.has(index) ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  <span>{section.title}</span>
                </div>
                <span className={cx('duration')}>{section.duration}</span>
              </button>
              
              {expandedSections.has(index) && (
                <div className={cx('lectures-list')}>
                  {section.lectures.map(lecture => (
                    <button
                      key={lecture.id}
                      className={cx('lecture-item', { 'selected': selectedLecture === lecture.id })}
                      onClick={() => setSelectedLecture(lecture.id)}
                    >
                      <div className={cx('lecture-info')}>
                        {lecture.completed ? <Check size={16} className={cx('check-icon')} /> : <Play size={16} />}
                        <span>{lecture.title}</span>
                      </div>
                      <span className={cx('duration')}>{lecture.duration}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lectures;