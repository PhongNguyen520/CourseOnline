import React, {useState, useEffect, useCallback, useContext} from 'react';
import { MessageCircle, X } from 'lucide-react';
import './ChatFeature.scss';
import { HubConnectionBuilder, LogLevel, HttpTransportType } from '@microsoft/signalr';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import {ModalContext} from "../../../components/ModalProvider/ModalProvider";

const useSignalR = () => {
    const [messages, setMessages] = useState([]);
    const [connection, setConnection] = useState(null);
    const [connectionError, setConnectionError] = useState(null);
    const { auth } = useContext(ModalContext);

    const startConnection = useCallback(async () => {
        try {
            const token = Cookies.get('authToken');
            if (!token || typeof token !== 'string') {
                console.error("Invalid or missing token");
                return;
            }
            const newConnection = new HubConnectionBuilder()
                .withUrl('https://localhost:7269/chatHub', {
                    accessTokenFactory: () => token,
                    withCredentials: true,
                    skipNegotiation: true,
                    transport: HttpTransportType.WebSockets
                })
                .configureLogging(LogLevel.Information)
                .withAutomaticReconnect([0, 2000, 5000, 10000, 30000])
                .build();

            newConnection.on('ReceiveMessage', (fullName, message, roleId, messageId, avatar) => {
                setMessages(prevMessages => [...prevMessages, {
                    id: messageId,
                    text: message,
                    sender: roleId === 1 ? 'user' : 'instructor',
                    name: fullName,
                    avatarUrl: avatar || 'default-avatar-url.jpg'
                }]);
            });
            newConnection.on('ReceiveMessageHistory', (messageHistory) => {
                setMessages(messageHistory.map(msg => ({
                    id: msg.id,
                    text: msg.content,
                    sender: msg.senderId === auth.userName ? 'user' : 'instructor',
                    name: msg.senderName,
                    timestamp: new Date(msg.timestamp),
                    avatarUrl: msg.avatar || 'default-avatar-url.jpg'
                })));
            });
            newConnection.onclose(error => {
                setConnectionError(error);
                console.error("SignalR Connection closed: ", error);
                if (error) {
                    setTimeout(() => startConnection(), 5000);
                }
            });

            await newConnection.start();
            console.log("Connected to SignalR!");
            setConnectionError(null);
            setConnection(newConnection);
        } catch (err) {
            console.error('SignalR Connection Error: ', err);
            setConnectionError(err);
        }
    }, [auth.userName]);

    const sendMessage = async (message, courseId = null) => {
        if (connection && connection.state === 'Connected') {
            try {
                await connection.invoke('SendMessage', message, courseId);
            } catch (err) {
                console.error('Error sending message: ', err);
            }
        } else {
            console.warn('Connection is not in the Connected state.');
        }
    };

    const getMessageHistory = useCallback(async (courseId = null) => {
        if (connection && connection.state === 'Connected') {
            try {
                await connection.invoke('GetMessageHistory', courseId);
            } catch (err) {
                console.error('Error getting message history: ', err);
            }
        } else {
            console.warn('Connection is not in the Connected state.');
        }
    }, [connection]);

    useEffect(() => {
        startConnection();
        return () => {
            if (connection) connection.stop();
        };
    }, [startConnection]);

    return { messages, sendMessage, getMessageHistory, connectionError };
};


const ChatIcon = ({ onClick }) => (
    <button className="chat-icon" onClick={onClick}>
        <MessageCircle size={40} />
    </button>
);

const ChatWindow = ({ onClose, courseId }) => {
    const [inputMessage, setInputMessage] = useState('');
    const { messages, sendMessage, getMessageHistory, connectionError } = useSignalR();
    const { auth } = useContext(ModalContext);

    useEffect(() => {
        getMessageHistory(courseId);
    }, [courseId, getMessageHistory]);

    const handleSend = () => {
        if (inputMessage.trim()) {
            sendMessage(inputMessage, courseId);
            setInputMessage('');
        }
    };
    return (
        <div className="chat-window">
            <div className="chat-header">
                <h3>Chat with {courseId ? 'Instructor' : 'Admin'}</h3>
                <button onClick={onClose} className="close-button">
                    <X size={18} />
                </button>
            </div>
            <div className="chat-body">
                {connectionError ? (
                    <div className="error-message">Connection error: {connectionError.message}</div>
                ) : (
                    messages.map((msg, index) => (
                        <div key={index} className={`chat-message ${msg.sender}`}>
                            <img src={msg.avatarUrl} alt="avatar" className="avatar" />
                            <div className="message-content">
                                <div className="sender-name">{msg.name}</div>
                                <span className="message-bubble">{msg.text}</span>
                            </div>
                        </div>
                    ))
                )}
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
// Component chính ChatFeature
const ChatFeature = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {!isOpen && <ChatIcon onClick={() => setIsOpen(true)} />}
            {isOpen && <ChatWindow onClose={() => setIsOpen(false)} courseId={123} />}
        </>
    );
};

export default ChatFeature;
