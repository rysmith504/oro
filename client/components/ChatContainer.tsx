import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ChatInput from './ChatInput';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import { CssTextField } from '../styles/material';

const ChatContainer: React.FC<{}> = ({ currentChat }) => {
  const theme = useTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;

  const userContext = useContext(UserContext);
  const { currentUserInfo } = userContext;
  const currentUser = currentUserInfo;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getMessages = async () => {
      const response = await axios.post('/api/messages/getmsg', {
      senderId: currentUser.id,
      receiverId: currentChat.googleId
      });
      setMessages(response.data);
    }
    getMessages();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    await axios.post('/api/messages/addmsg', {
      text: msg,
      senderId: currentUser.id,
      receiverId: currentChat.googleId,
    })
      .catch(err => console.error(err))
  }

  const fontColor = {
    style: { color: '#9B27B0' }
  };

  return (
    <div>
      Welcome
      <React.Fragment>
      <Container > 
        <Box sx={{ bgcolor: '#cfe8fc', height: '55vh' }}>
          {/* <Messages/> */}
          {
            messages.map((message, index) => {
              return (
                <div key={`currentchatmessage`+index}>
                  <div className={`message ${message.fromSelf ? 'sent' : 'received'}`}>
                    <div className='content'>
                      <p>
                        {message.message}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </Box>
        <ChatInput handleSendMsg={handleSendMsg} />
      </Container>
    </React.Fragment>
    </div>
  );
};


export default ChatContainer;

const EmojiBox = styled.div`
  .emoji-picker-react {
    position: absolute;
    top: -350px;
  }
`;
