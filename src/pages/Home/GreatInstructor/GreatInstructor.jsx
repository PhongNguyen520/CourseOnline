import classNames from 'classnames/bind';
import styles from './GreatInstructor.module.scss';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'; // Importing the address icon

const cx = classNames.bind(styles);

function GreatInstructor({ avatar, fullName, address, email, phoneNumber }) {
    return (
        <div className={cx('slide')}>
            <div className={cx('container__tutors-card')}>
                <img src={avatar} alt="avatar" className={cx('avatar')} />

                <strong>{fullName}</strong>

                <div className={cx('container__tutors-details')}>
                    <p>
                        <FaMapMarkerAlt className={cx('icon')} /> {address}
                    </p>
                    <p>
                        <FaEnvelope className={cx('icon')} /> {email}
                    </p>
                    <p>
                        <FaPhone className={cx('icon')} /> {phoneNumber}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default GreatInstructor;
