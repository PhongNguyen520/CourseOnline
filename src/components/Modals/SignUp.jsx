import React, {useContext, useMemo} from 'react';
import classNames from 'classnames/bind';
import {CloseIcon} from '../../assets/icons/Icons';
import styles from './SignUp.module.scss';
import {ModalContext} from "../ModalProvider/ModalProvider";
import images from "../../assets/images";

const cx = classNames.bind(styles);

function SignUp() {
    const {setActiveLogIn, setActiveSignUp} = useContext(ModalContext);
    const SignUpInfor = useMemo(
        () => [
            {
                id: 1,
                btn: 'Become a instructor',
                link: 'signup/instructor',
                img: images.instructor
            },
            {
                id: 2,
                btn: 'Register as a student',
                link: 'signup/student',
                img: images.student
            },
        ],
        [],
    );

    return (
        <div className={cx('modal', 'show')}>
            <div className={cx('modal__wrapper')}>
                <div className={cx('modal__container')}>
                    <div onClick={() => setActiveSignUp(false)} className={cx('modal__close')}>
                        <CloseIcon className={cx('modal__close-icon')}/>
                    </div>
                    <div className={cx('modal__title')}>SIGN UP</div>
                    <div className={cx('modal__body')}>
                        <div className={cx('modal__form-wrapper')}>
                            {SignUpInfor.map((register) => (
                                <button
                                    key={register.id}
                                    className={cx('modal__button')}
                                    onClick={() => window.location.href = register.link}
                                >
                                    {/*<img src={register.img} alt={register.name} />*/}
                                    {register.btn}
                                </button>
                            ))}
                        </div>
                    </div>
                    <p className={cx('modal__login-prompt')}>
                        Already have an account?
                        <span className={cx('modal__login-link')} onClick={() => {
                            setActiveLogIn(true);
                            setActiveSignUp(false)
                        }}
                        >
                            Log in
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
