import React from 'react';
import classNames from 'classnames/bind';
import { CheckCircle, XCircle } from 'lucide-react'; 
import { useLocation } from 'react-router-dom';
import styles from './VnPayResult.module.scss';

const cx = classNames.bind(styles);

const VnPayResult = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const orderId = searchParams.get('vnp_TxnRef') || 'N/A';
  const totalAmount = (searchParams.get('vnp_Amount') / 100).toFixed(2) || '0.00';
  const paymentMethod = searchParams.get('vnp_BankCode') || 'Unknown';
  const transactionDate = searchParams.get('vnp_PayDate') || new Date().toLocaleString();
  const transactionStatus = searchParams.get('vnp_TransactionStatus') === '00' ? 'Successful' : 'Failed';

  const formattedDate = transactionDate !== 'N/A'
    ? `${transactionDate.slice(0, 4)}-${transactionDate.slice(4, 6)}-${transactionDate.slice(6, 8)} ${transactionDate.slice(8, 10)}:${transactionDate.slice(10, 12)}:${transactionDate.slice(12, 14)}`
    : new Date().toLocaleString();

  return (
    <div className={cx('wrapper', { failed: transactionStatus === 'Failed' })}>
      <div className={cx('container')}>
        <div className={cx('content')}>
          {transactionStatus === 'Successful' ? (
            <CheckCircle className={cx('successIcon')} />
          ) : (
            <XCircle className={cx('failureIcon')} />
          )}

          {/* Title */}
          <h1 className={cx('title')}>
            {transactionStatus === 'Successful' ? 'Payment Successful!' : 'Payment Failed'}
          </h1>

          {/* Message */}
          <p className={cx('message')}>
            {transactionStatus === 'Successful'
              ? 'Thank you for your payment! Your transaction has been completed successfully.'
              : 'Unfortunately, your payment could not be processed. Please try again or contact support.'}
          </p>

          {/* Details */}
          <div className={cx('details')}>
            <div className={cx('detailRow')}>
              <span className={cx('detailLabel')}>Order ID</span>
              <span className={cx('detailValue')}>{orderId}</span>
            </div>
            <div className={cx('detailRow')}>
              <span className={cx('detailLabel')}>Total Amount</span>
              <span className={cx('detailValue')}>${totalAmount}</span>
            </div>
            <div className={cx('detailRow')}>
              <span className={cx('detailLabel')}>Transaction Date</span>
              <span className={cx('detailValue')}>{formattedDate}</span>
            </div>
            <div className={cx('detailRow')}>
              <span className={cx('detailLabel')}>Payment Method</span>
              <span className={cx('detailValue')}>{paymentMethod}</span>
            </div>
            <div className={cx('detailRow')}>
              <span className={cx('detailLabel')}>Status</span>
              <span className={cx('detailValue', transactionStatus === 'Successful' ? 'success' : 'failure')}>
                {transactionStatus}
              </span>
            </div>
          </div>

          <button
            onClick={() => window.location.href = '/'}
            className={cx('button')}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default VnPayResult;
