import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Table, Tabs, Tag, Button, DatePicker, Select, Modal, Space, Typography, Badge } from 'antd';
import { EyeOutlined, CheckOutlined, StopOutlined } from '@ant-design/icons';
import styles from './FormRequest.module.scss';

const { RangePicker } = DatePicker;
const { Title, Text } = Typography;
const cx = classNames.bind(styles);

export default function FormRequest() {
  const [activeTab, setActiveTab] = useState('1');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');

  const sampleData = {
    '1': [ 
      {
        id: 'IR001',
        requester: 'Nguyễn Văn A',
        title: 'Đăng ký trở thành Instructor',
        submitDate: '2024-03-08',
        status: 'pending',
        email: 'nguyenvana@gmail.com',
        phone: '0912345678',
        experience: '5 năm giảng dạy JavaScript',
        skills: ['JavaScript', 'React', 'Node.js'],
        motivation: 'Mong muốn chia sẻ kiến thức và kinh nghiệm lập trình web cho cộng đồng',
        portfolio: 'https://portfolio.example.com'
      },
      {
        id: 'IR002',
        requester: 'Trần Thị B',
        title: 'Đăng ký Instructor khóa học Python',
        submitDate: '2024-03-07',
        status: 'approved',
        email: 'tranthib@gmail.com',
        phone: '0923456789',
        experience: '3 năm giảng dạy Python',
        skills: ['Python', 'Django', 'Data Science'],
        motivation: 'Muốn đóng góp vào cộng đồng học Python tại Việt Nam',
        portfolio: 'https://portfolio.example.com'
      },
    ],
    '2': [ 
      {
        id: 'CR001',
        requester: 'Lê Văn C',
        title: 'Report khóa học ABC có nội dung không phù hợp',
        submitDate: '2024-03-08',
        status: 'pending',
        courseId: 'COURSE123',
        courseName: 'Lập trình Web căn bản',
        instructorName: 'Nguyễn Văn X',
        reportReason: 'Nội dung không đúng với mô tả',
        reportDetails: 'Khóa học quảng cáo dạy React nhưng chỉ dạy HTML cơ bản',
        evidenceLinks: ['https://evidence1.example.com', 'https://evidence2.example.com']
      },
     
    ],
    '3': [ 
      {
        id: 'InR001',
        requester: 'Phạm Thị D',
        title: 'Report Instructor XYZ',
        submitDate: '2024-03-07',
        status: 'pending',
        instructorId: 'INS123',
        instructorName: 'Trần Văn Y',
        reportReason: 'Không phản hồi học viên',
        reportDetails: 'Instructor không trả lời câu hỏi và phản hồi của học viên trong 2 tuần',
        evidenceLinks: ['https://evidence1.example.com']
      },
    ],
    '4': [ 
      {
        id: 'CC001',
        requester: 'Hoàng Văn E',
        title: 'Đăng ký tạo khóa học "Machine Learning Cơ Bản"',
        submitDate: '2024-03-06',
        status: 'pending',
        courseName: 'Machine Learning Cơ Bản',
        courseDescription: 'Khóa học về các thuật toán Machine Learning căn bản',
        category: 'Data Science',
        price: 599000,
        duration: '8 tuần',
        syllabus: 'Link to syllabus document',
        sampleVideo: 'Link to sample video'
      },
    ]
  };

  const getCurrentData = () => {
    const data = sampleData[activeTab] || [];
    
    if (statusFilter !== 'all') {
      return data.filter(item => item.status === statusFilter);
    }
    
    return data;
  };

  const getModalContent = (request) => {
    switch (activeTab) {
      case '1': 
        return (
          <>
            <div className={cx('detailItem')}>
              <Text strong>Email:</Text> <Text>{request.email}</Text>
            </div>
            <div className={cx('detailItem')}>
              <Text strong>PhoneNumber:</Text> <Text>{request.phone}</Text>
            </div>
            <div className={cx('detailItem')}>
              <Text strong>Experence:</Text> <Text>{request.experience}</Text>
            </div>
            <div className={cx('detailItem')}>
              <Text strong>Skill:</Text>
              <Space>
                {request.skills.map(skill => (
                  <Tag key={skill} color="blue">{skill}</Tag>
                ))}
              </Space>
            </div>
            <div className={cx('detailItem')}>
              <Text strong>Motivation:</Text> <Text>{request.motivation}</Text>
            </div>
            <div className={cx('detailItem')}>
              <Text strong>Portfolio:</Text>
              <a href={request.portfolio} target="_blank" rel="noopener noreferrer">
                {request.portfolio}
              </a>
            </div>
          </>
        );

      case '2': 
        return (
          <>
            <div className={cx('detailItem')}>
              <Text strong>CourseName:</Text> <Text>{request.courseName}</Text>
            </div>
            <div className={cx('detailItem')}>
              <Text strong>CourseID:</Text> <Text>{request.courseId}</Text>
            </div>
            <div className={cx('detailItem')}>
              <Text strong>InstructorName:</Text> <Text>{request.instructorName}</Text>
            </div>
            <div className={cx('detailItem')}>
              <Text strong>Reason report:</Text> <Text>{request.reportReason}</Text>
            </div>
            <div className={cx('detailItem')}>
              <Text strong>Detail:</Text> <Text>{request.reportDetails}</Text>
            </div>
            <div className={cx('detailItem')}>
              <Text strong>Evidence:</Text>
              <Space direction="vertical">
                {request.evidenceLinks.map((link, index) => (
                  <a key={index} href={link} target="_blank" rel="noopener noreferrer">
                    Evidence {index + 1}
                  </a>
                ))}
              </Space>
            </div>
          </>
        );

      case '3':
        return (
          <>
            <div className={cx('detailItem')}>
              <Text strong>InstructorName:</Text> <Text>{request.instructorName}</Text>
            </div>
            <div className={cx('detailItem')}>
              <Text strong>ID Instructor:</Text> <Text>{request.instructorId}</Text>
            </div>
            <div className={cx('detailItem')}>
              <Text strong>Reason:</Text> <Text>{request.reportReason}</Text>
            </div>
            <div className={cx('detailItem')}>
              <Text strong>Detail:</Text> <Text>{request.reportDetails}</Text>
            </div>
            <div className={cx('detailItem')}>
              <Text strong>Evidence:</Text>
              <Space direction="vertical">
                {request.evidenceLinks.map((link, index) => (
                  <a key={index} href={link} target="_blank" rel="noopener noreferrer">
                    Evidence {index + 1}
                  </a>
                ))}
              </Space>
            </div>
          </>
        );

      case '4': 
        return (
          <>
            <div className={cx('detailItem')}>
              <Text strong>CourseName:</Text> <Text>{request.courseName}</Text>
            </div>
            <div className={cx('detailItem')}>
              <Text strong>Description:</Text> <Text>{request.courseDescription}</Text>
            </div>
            <div className={cx('detailItem')}>
              <Text strong>Category:</Text> <Text>{request.category}</Text>
            </div>
            <div className={cx('detailItem')}>
              <Text strong>Price:</Text> <Text>{request.price.toLocaleString()} VNĐ</Text>
            </div>
            <div className={cx('detailItem')}>
              <Text strong>Duration:</Text> <Text>{request.duration}</Text>
            </div>
            <div className={cx('detailItem')}>
              <Text strong>Syllabus:</Text>
              <a href={request.syllabus} target="_blank" rel="noopener noreferrer">
                Watch syllabus
              </a>
            </div>
            <div className={cx('detailItem')}>
              <Text strong>Sapmle Video:</Text>
              <a href={request.sampleVideo} target="_blank" rel="noopener noreferrer">
                Watch sample video 
              </a>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  const tabItems = [
    {
      key: '1',
      label: (
        <Badge count={sampleData['1'].filter(item => item.status === 'pending').length}>
          <span>SignIn Instructor</span>
        </Badge>
      ),
    },
    {
      key: '2',
      label: (
        <Badge count={sampleData['2'].filter(item => item.status === 'pending').length}>
          <span>Report Courses</span>
        </Badge>
      ),
    },
    {
      key: '3',
      label: (
        <Badge count={sampleData['3'].filter(item => item.status === 'pending').length}>
          <span>Report Instructor</span>
        </Badge>
      ),
    },
    {
      key: '4',
      label: (
        <Badge count={sampleData['4'].filter(item => item.status === 'pending').length}>
          <span>Create Courses</span>
        </Badge>
      ),
    },
  ];

  const statusTags = {
    pending: <Tag color="processing">Pending</Tag>,
    approved: <Tag color="success">Approve</Tag>,
    rejected: <Tag color="error">Reject</Tag>,
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: 'Sender',
      dataIndex: 'requester',
      key: 'requester',
      width: 150,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: 300,
    },
    {
      title: 'SubmitDate',
      dataIndex: 'submitDate',
      key: 'submitDate',
      width: 120,
      sorter: (a, b) => new Date(a.submitDate) - new Date(b.submitDate),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status) => statusTags[status],
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 250,
      render: (_, record) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleViewDetails(record)}
          >
            Detail
          </Button>
          {record.status === 'pending' && (
            <>
              <Button
                type="primary"
                icon={<CheckOutlined />}
                onClick={() => handleApprove(record)}
              >
                Approve
              </Button>
              <Button
                danger
                icon={<StopOutlined />}
                onClick={() => handleReject(record)}
              >
                Reject
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  const handleViewDetails = (record) => {
    setSelectedRequest(record);
    setIsModalVisible(true);
  };

  const handleApprove = (record) => {
    console.log('Approve:', record);
  };

  const handleReject = (record) => {
    console.log('Reject:', record);
  };

  return (
    <div className={cx('formRequest')}>
      <div className={cx('header')}>
        <Title level={2}>Form Management</Title>
        
        <div className={cx('filters')}>
          <Space size="large">
            <Select
              defaultValue="all"
              style={{ width: 200 }}
              onChange={(value) => setStatusFilter(value)}
              options={[
                { value: 'all', label: 'All' },
                { value: 'pending', label: 'Pending' },
                { value: 'approved', label: 'Approve' },
                { value: 'rejected', label: 'Reject' },
              ]}
            />
            <RangePicker 
              placeholder={['From', 'To']}
              style={{ width: 300 }}
            />
          </Space>
        </div>
      </div>

      <Tabs
        activeKey={activeTab}
        items={tabItems}
        onChange={setActiveTab}
        className={cx('tabs')}
      />

      <Table
        columns={columns}
        dataSource={getCurrentData()}
        rowKey="id"
        pagination={{
          total: getCurrentData().length,
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `Total ${total} forms`,
        }}
        className={cx('table')}
      />

      <Modal
        title={selectedRequest?.title}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setSelectedRequest(null);
        }}
        footer={[
          <Button 
            key="close" 
            onClick={() => {
              setIsModalVisible(false);
              setSelectedRequest(null);
            }}
          >
            Đóng
          </Button>,
          selectedRequest?.status === 'pending' && (
            <>
              <Button
                key="approve"
                type="primary"
                icon={<CheckOutlined />}
                onClick={() => {
                  handleApprove(selectedRequest);
                  setIsModalVisible(false);
                }}
              >
                Approve
              </Button>
              <Button
                key="reject"
                danger
                icon={<StopOutlined />}
                onClick={() => {
                  handleReject(selectedRequest);
                  setIsModalVisible(false);
                }}
              >
                Reject
              </Button>
            </>
          ),
        ].filter(Boolean)}
        width={800}
      >
        {selectedRequest && getModalContent(selectedRequest)}
      </Modal>
    </div>
  );
}