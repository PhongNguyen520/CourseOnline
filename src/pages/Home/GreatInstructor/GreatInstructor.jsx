import classNames from 'classnames/bind';
import styles from './GreatInstructor.module.scss';

const cx = classNames.bind(styles);

function ExcellentTutor({ avatar, fullName, headline, subject, hour }) {
    return (
        <div className={cx('slide')}>
            <div className={cx('container__tutors-card')}>
                <img src={avatar} alt="ntp"></img>

                <strong>{fullName}</strong>

                <div className={cx('container__tutors-icons')}></div>

                <span>{hour} hour</span>

                <p>{headline}</p>
            </div>
        </div>
    );
}

export default ExcellentTutor;
