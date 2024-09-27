import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Popper from "../../../components/Popper/Popper";
import MenuItem from '../MenuItem/MenuItem';

import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function Menu({ children, items, className, ...passProps }) {
    const handleRender = () => {
        return items.map((item, index) => {
            return <MenuItem key={index} item={item} />;
        });
    };

    return (
        <Tippy
            {...passProps}
            interactive
            appendTo={() => document.body}
            // visible={true}
            delay={[0, 0]}
            placement="bottom"
            content={(
                <div className="box" tabIndex="-1">
                    <Popper>
                        <div className={cx('container')}>{handleRender()}</div>
                    </Popper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
