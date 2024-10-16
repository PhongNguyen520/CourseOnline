import classNames from 'classnames/bind';

import styles from './Clip.module.scss';

const cx = classNames.bind(styles);

export default function Clip({ width, height, src }) {
    return (
        <div className={cx('container__clip')}>
            <section>
                <iframe
                    width={width}
                    height={height}
                    src={src}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
            </section>
        </div>
    );
}

