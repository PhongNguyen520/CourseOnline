import React from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  CreditCard, 
  ArrowUpRight, 
  Search, 
  Filter 
} from 'lucide-react';
import classNames from 'classnames/bind';
import styles from './WalletInstructor.module.scss';

const cx = classNames.bind(styles);

function WalletInstructor() {
  const transactions = [
    {
      id: 1,
      type: "Course Purchase",
      course: "React for Beginners",
      amount: 79.99,
      date: "2024-03-15",
      status: "Completed"
    },
    {
      id: 2,
      type: "Withdrawal",
      amount: -150.00,
      date: "2024-03-14", 
      status: "Processing"
    },
    {
      id: 3,
      type: "Course Purchase",
      course: "Advanced JavaScript",
      amount: 99.99,
      date: "2024-03-13",
      status: "Completed"
    },
    {
      id: 4,
      type: "Course Purchase",
      course: "Web Development Bootcamp",
      amount: 199.99,
      date: "2024-03-12",
      status: "Completed"
    }
  ];

  return (
    <div className={cx('walletPage', 'p-6', 'space-y-6')}>
      <div className={cx('header', 'flex', 'justify-between', 'items-center')}>
        <h1 className={cx('title')}>Wallet & Earnings</h1>
        <div className={cx('controls', 'flex', 'gap-2')}>
          <button className={cx('controlButton')}>
            <Filter size={16} />
            Filter
          </button>
          <button className={cx('controlButton')}>
            <Search size={16} />
            Search
          </button>
        </div>
      </div>

      <div className={cx('summaryCards', 'grid', 'grid-cols-1', 'md:grid-cols-3', 'gap-4')}>
        <div className={cx('card')}>
          <div className={cx('cardHeader')}>Available Balance</div>
          <div className={cx('cardContent', 'flex', 'items-center', 'gap-2')}>
            <div className={cx('iconContainer', 'bg-green-100')}>
              <DollarSign size={24} className="text-green-600" />
            </div>
            <div>
              <span className={cx('value')}>$1,580.00</span>
              <p className={cx('textSmall')}>Updated 2 mins ago</p>
            </div>
          </div>
        </div>
        
        <div className={cx('card')}>
          <div className={cx('cardHeader')}>Monthly Earnings</div>
          <div className={cx('cardContent', 'flex', 'items-center', 'gap-2')}>
            <div className={cx('iconContainer', 'bg-blue-100')}>
              <TrendingUp size={24} className="text-blue-600" />
            </div>
            <div>
              <span className={cx('value')}>$890.00</span>
              <div className={cx('trend', 'flex', 'items-center', 'gap-1', 'text-green-600')}>
                <ArrowUpRight size={16} />
                <span className="text-sm">12% from last month</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className={cx('card')}>
          <div className={cx('cardHeader')}>Pending Payments</div>
          <div className={cx('cardContent', 'flex', 'items-center', 'gap-2')}>
            <div className={cx('iconContainer', 'bg-yellow-100')}>
              <CreditCard size={24} className="text-yellow-600" />
            </div>
            <div>
              <span className={cx('value')}>$150.00</span>
              <p className={cx('textSmall')}>2 pending transactions</p>
            </div>
          </div>
        </div>
      </div>

      <div className={cx('transactionsHeader', 'flex', 'justify-between', 'items-center')}>
        <h2 className="text-xl font-semibold">Recent Transactions</h2>
        <button className={cx('withdrawButton', 'flex', 'items-center', 'gap-2')}>
          Withdraw Funds
          <ArrowUpRight size={20} />
        </button>
      </div>

      <div className={cx('transactionsTable', 'card')}>
        <div className={cx('cardContent', 'p-0')}>
          <table className={cx('table')}>
            <thead>
              <tr>
                <th>Transaction Type</th>
                <th>Course</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.type}</td>
                  <td>{transaction.course || "-"}</td>
                  <td>{new Date(transaction.date).toLocaleDateString()}</td>
                  <td className={cx('font-medium', transaction.amount > 0 ? 'text-green-600' : 'text-red-600')}>
                    {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                  </td>
                  <td>
                    <span className={cx('statusLabel', transaction.status.toLowerCase())}>
                      {transaction.status}
                    </span>
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

export default WalletInstructor;
