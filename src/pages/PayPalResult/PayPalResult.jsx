import React from 'react';
import classNames from 'classnames/bind';
import { Shield, X } from 'lucide-react';
import styles from './PayPal.module.scss';

const cx = classNames.bind(styles);

function PayPalResult() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('receipt')}>
        <div className={cx('header')}>
          <h1>Farm Fresh</h1>
        </div>

        <div className={cx('transactionInfo')}>
          <div>
            <div>Transaction</div>
            <div>NP1128996887</div>
          </div>
          <div>
            <div>Date</div>
            <div>03/01/2023</div>
          </div>
        </div>

        <div className={cx('purchaseItem')}>
          <div className={cx('coins')}>
            <div className={cx('coinIcon')}></div>
            <div className={cx('coinIcon')}></div>
            <span>100 Coins</span>
          </div>
          <span className={cx('amount')}>$0.93</span>
        </div>

        <div className={cx('subtotal')}>
          <span>Subtotal</span>
          <span>$0.93</span>
        </div>

        <div className={cx('total')}>
          <span>Total</span>
          <span>$0.93</span>
        </div>
      </div>

      <div className={cx('failureNotice')}>
        <img 
          src="/api/placeholder/120/120"
          alt="Payment Failed"
          className={cx('icon')}
        />

        <div className={cx('title')}>
          Payment failed <span className={cx('dot')}></span>
        </div>

        <p className={cx('message')}>
          Your payment could not be processed. Please contact{' '}
          <a href="#">customer support</a> for further assistance.
        </p>

        <div className={cx('supportSection')}>
          <h3>Get instant support from Babka via chat and messengers</h3>
          <button className={cx('button', 'primary')}>
            Contact support
          </button>
        </div>

        <button className={cx('button', 'secondary')}>
          Retry payment
        </button>

        <div className={cx('footer')}>
          <div className={cx('secure')}>
            <Shield size={16} />
            <span>Secure connection</span>
          </div>
          <div className={cx('links')}>
            <a href="#">Legal</a>
            <a href="#">Privacy settings</a>
            <a href="#">Refund policy</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PayPalResult;