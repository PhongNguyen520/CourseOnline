import React from 'react';
import { PlusCircle, Play, Edit2, Trash2, Clock } from 'lucide-react';
import classNames from 'classnames/bind';
import styles from './LecturesInstructor.module.scss';

const cx = classNames.bind(styles);

function LecturesInstructor() {
  const lectures = [
    {
      id: 1,
      title: "Introduction to React Hooks",
      course: "React for Beginners",
      duration: "45:00",
      status: "Published",
      views: 128
    },
    {
      id: 2,
      title: "Understanding UseEffect",
      course: "React for Beginners",
      duration: "38:30",
      status: "Draft",
      views: 0
    }
  ];

  return (
    <div className={cx('lecturesPage', 'p-6', 'space-y-6')}>
      <div className={cx('header', 'flex', 'justify-between', 'items-center')}>
        <h1 className={cx('title')}>Lecture Management</h1>
        <button className={cx('addLectureBtn', 'flex', 'items-center', 'gap-2')}>
          <PlusCircle size={20} />
          Add New Lecture
        </button>
      </div>

      <div className={cx('summaryCards', 'grid', 'grid-cols-1', 'md:grid-cols-3', 'gap-4')}>
        <div className={cx('card')}>
          <div className={cx('cardHeader')}>Total Lectures</div>
          <div className={cx('cardContent')}>
            <p className={cx('value')}>{lectures.length}</p>
          </div>
        </div>
        
        <div className={cx('card')}>
          <div className={cx('cardHeader')}>Total Duration</div>
          <div className={cx('cardContent', 'flex', 'items-center', 'gap-2')}>
            <Clock size={24} />
            <span className={cx('value')}>1h 23m</span>
          </div>
        </div>
        
        <div className={cx('card')}>
          <div className={cx('cardHeader')}>Total Views</div>
          <div className={cx('cardContent')}>
            <p className={cx('value')}>
              {lectures.reduce((acc, lecture) => acc + lecture.views, 0)}
            </p>
          </div>
        </div>
      </div>

      <div className={cx('lecturesTable', 'card')}>
        <div className={cx('cardHeader')}>Your Lectures</div>
        <div className={cx('cardContent')}>
          <table className={cx('table')}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Course</th>
                <th>Duration</th>
                <th>Views</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {lectures.map((lecture) => (
                <tr key={lecture.id}>
                  <td className={cx('font-medium')}>{lecture.title}</td>
                  <td>{lecture.course}</td>
                  <td>{lecture.duration}</td>
                  <td>{lecture.views}</td>
                  <td>
                    <span className={cx('statusLabel', lecture.status.toLowerCase())}>
                      {lecture.status}
                    </span>
                  </td>
                  <td>
                    <div className={cx('actions', 'flex', 'gap-2')}>
                      <button className={cx('actionButton')}>
                        <Play size={16} />
                      </button>
                      <button className={cx('actionButton')}>
                        <Edit2 size={16} />
                      </button>
                      <button className={cx('actionButton')}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LecturesInstructor;
