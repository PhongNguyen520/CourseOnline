import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import './ChatFeature.scss';
import { HubConnectionBuilder } from '@microsoft/signalr';

// const useSignalR = () => {
//     const [messages, setMessages] = useState([]);
//
//     const sendMessage = (message) => {
//         setMessages([...messages, {
//             text: message,
//             sender: 'user',
//             name: 'AvatarDropdown Name',
//             avatarUrl: 'https://m.media-amazon.com/images/S/pv-target-images/16627900db04b76fae3b64266ca161511422059cd24062fb5d900971003a0b70.jpg'
//         }]);
//
//         // Simulate received message from instructor
//         setTimeout(() => {
//             setMessages(prev => [...prev, {
//                 text: 'Thanks for your message!',
//                 sender: 'instructor',
//                 name: 'Instructor Name',
//                 avatarUrl: 'https://assets-prd.ignimgs.com/2022/11/22/avatar-blogroll2-1669090391194.jpg'
//             }]);
//         }, 1000);
//     };
//
//     return { messages, sendMessage };
// };
const useSignalR = () => {
    const [messages, setMessages] = useState([]);
    const [connection, setConnection] = useState(null);

    useEffect(() => {
        // Khởi tạo kết nối với SignalR server
        const newConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:7269/chatHub')
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(() => {
                    console.log('Connected to SignalR!');

                    // Lắng nghe sự kiện khi nhận tin nhắn
                    connection.on('ReceiveMessage', (user, message, role) => {
                        setMessages(prevMessages => [...prevMessages, {
                            text: message,
                            sender: role === 1 ? 'user' : 'instructor',
                            name: user,
                            avatarUrl: role === 1
                                ? 'https://m.media-amazon.com/images/S/pv-target-images/16627900db04b76fae3b64266ca161511422059cd24062fb5d900971003a0b70.jpg'
                                : 'https://assets-prd.ignimgs.com/2022/11/22/avatar-blogroll2-1669090391194.jpg'
                        }]);
                    });
                })
                .catch(e => console.log('SignalR Connection Failed: ', e));
        }
    }, [connection]);

    const sendMessage = async (message) => {
        if (connection) {
            try {
                await connection.send('SendMessage', message);  // Gửi tin nhắn tới server
            } catch (err) {
                console.error('Error sending message: ', err);
            }
        }
    };

    return { messages, sendMessage };
};
const ChatIcon = ({ onClick }) => (
    <button className="chat-icon" onClick={onClick}>
        <MessageCircle size={40} />
    </button>
);

const ChatWindow = ({ onClose }) => {
    const [inputMessage, setInputMessage] = useState('');
    const { messages, sendMessage } = useSignalR();

    const handleSend = () => {
        if (inputMessage.trim()) {
            sendMessage(inputMessage);
            setInputMessage('');
        }
    };

    return (
        <div className="chat-window">
            <div className="chat-header">
                <h3>Chat with Instructor</h3>
                <button onClick={onClose} className="close-button">
                    <X size={18}/>
                </button>
            </div>
            <div className="chat-body">
                {messages.map((msg, index) => (
                    <div key={index} className={`chat-message ${msg.sender}`}>
                        <img src={msg.avatarUrl} alt="avatar" className="avatar"/>
                        <div className="message-content">
                            <div className="sender-name">{msg.name}</div>
                            <span className="message-bubble">{msg.text}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="chat-footer">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type a message..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};

const ChatFeature = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {!isOpen && <ChatIcon onClick={() => setIsOpen(true)}/>}
            {isOpen && <ChatWindow onClose={() => setIsOpen(false)}/>}
        </>
    );
};

export default ChatFeature;