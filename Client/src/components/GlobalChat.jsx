import React, { useState, useEffect, useRef } from 'react';
import { Box, IconButton, Typography, TextField, Button, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LockIcon from '@mui/icons-material/Lock';
import SendIcon from '@mui/icons-material/Send';
import { NavLink } from 'react-router-dom';
import io from 'socket.io-client';
import NotLogin from './NotLogin';
const socket = io(import.meta.env.VITE_IO_BASE_URL);

const GlobalChat = ({ onClose }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState(() => {
        const storedMessages = localStorage.getItem('globalChatMessages');
        return storedMessages ? JSON.parse(storedMessages) : [];
    });
    const name = localStorage.getItem('name');
    const chatContainerRef = useRef(null);

    useEffect(() => {
        socket.on('receiveMessage', (msg) => {
            setMessages((prevMessages) => {
                const newMessages = [...prevMessages, msg];
                localStorage.setItem('globalChatMessages', JSON.stringify(newMessages)); // Save messages to local storage
                return newMessages;
            });

            // Scroll to bottom of chat messages
            if (chatContainerRef.current) {
                chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, []);

    const handleSendMessage = () => {
        if (message.trim() && name) {
            const msgObject = { name, message };
            socket.emit('sendMessage', msgObject);
            setMessage('');
        }
    };

    const handleLoginClick = () => {
        onClose();
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                right: 0,
                top: 0,
                height: '100%',
                width: '350px',
                bgcolor: '#f8f9fa',
                boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
                zIndex: 1300,
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '20px 0 0 20px',
                overflow: 'hidden',
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, bgcolor: '#007bff' }}>
                <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 'bold' }}>Global Chat</Typography>
                <IconButton onClick={onClose} sx={{ color: '#ffffff' }}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Box ref={chatContainerRef} sx={{ flex: 1, overflowY: 'auto', p: 2, '&::-webkit-scrollbar': { display: 'none' } }}>
                {messages.map((msg, index) => (
                    <Paper
                        key={index}
                        sx={{
                            p: 1.5,
                            mb: 1.5,
                            bgcolor: msg.name === name ? '#e9ecef' : '#ffffff',
                            color: '#212529',
                            borderRadius: '15px',
                            maxWidth: '80%',
                            alignSelf: msg.name === name ? 'flex-end' : 'flex-start',
                            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#007bff' }}>{msg.name}:</Typography>
                        <Typography variant="body2">{msg.message}</Typography>
                    </Paper>
                ))}
            </Box>
            {!name && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        bgcolor: 'rgba(248, 249, 250, 0.9)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        color: '#212529',
                        textAlign: 'center',
                        p: 2,
                    }}
                >
                    <LockIcon sx={{ fontSize: 60, color: '#ffc107' }} />
                    <Typography variant="h6" sx={{ mb: 2 }}>Please log in to unlock the chat</Typography>
                    <Button
                        variant="contained"
                        component={NavLink}
                        to="/login"
                        onClick={handleLoginClick}
                        sx={{
                            bgcolor: '#007bff',
                            '&:hover': { bgcolor: '#0056b3' },
                            borderRadius: '25px',
                            px: 3,
                        }}
                    >
                        Login / Register
                    </Button>
                </Box>
            )}
            {name && (
                <Box sx={{ p: 2, bgcolor: '#e9ecef' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <TextField
                            fullWidth
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Type a message..."
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    color: '#212529',
                                    '& fieldset': { borderColor: '#ced4da' },
                                    '&:hover fieldset': { borderColor: '#007bff' },
                                    '&.Mui-focused fieldset': { borderColor: '#007bff' },
                                },
                            }}
                        />
                        <IconButton onClick={handleSendMessage} sx={{ ml: 1, color: '#007bff' }}>
                            <SendIcon />
                        </IconButton>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default GlobalChat;
