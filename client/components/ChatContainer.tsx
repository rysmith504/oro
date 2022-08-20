import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import styled from 'styled-components';
import Picker from 'emoji-picker-react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { IoMdSend } from 'react-icons/io';
import { BsEmojiSmileFill } from 'react-icons/bs';
import { setFlagsFromString } from 'v8';
import Button from '@mui/material/Button';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import { CssTextField } from '../styles/material';

const ChatContainer: React.FC<{}> = ({ currentChat }) => {
  const theme = useTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;

  const userContext = useContext(UserContext);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState('');
  const { currentUserInfo } = userContext;
  const currentUser = currentUserInfo;

  const handleEmojiMenuToggle = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (e, emoji) => {
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  };

  const handleSendMsg = async (msg) => {
    console.log('CURRENTUSER.ID', currentUser.id);
    console.log('CURRENTchat.googleID', currentChat.googleId);

    await axios.post('/api/messages/addmsg', {
      text: msg,
      senderId: currentUser.id,
      receiverId: currentChat.googleId,
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.error(err));
  };

  const sendChat = (e) => {
    e.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg('');
    }
  };

  const enterClick = (e) => {
    if (e.keyCode === 13) {
      sendChat(e);
    }
  };

  const fontColor = {
    style: { color: '#9B27B0' }
  };

  return (
    <div>
      Welcome
      <React.Fragment>
        <Container sx={{ bgcolor: inverseMode }}>
          <Box sx={{ height: '55vh' }}>
            {/* <Messages/> */}
          </Box>
          <Grid container sx={{ bgcolor: inverseMode }}>
            <Grid item xs={1} sx={{mt: 1.5}}>
              <BsEmojiSmileFill onClick={handleEmojiMenuToggle}
                style={{ color: iconColors }}/>
              {
                showEmojiPicker &&
              <Picker
                pickerStyle={{ position: 'relative', top: '-350px', color: iconColors, boxShadow: 'none' }} onEmojiClick={handleEmojiClick} />
              }
            </Grid>
            <Grid item xs={10}>
              <CssTextField

                InputLabelProps={fontColor} inputProps={fontColor}
                hiddenLabel
                color="secondary"
                id="filled-hidden-label-small"
                defaultValue="message"
                variant="outlined"
                size="small"
                value={msg}
                onChange={(e)=>setMsg(e.target.value)}
                onKeyDown={(e)=>enterClick(e)}
              />
            </Grid>
            <Grid xs={1} sx={{mt: 1.2, color: iconColors, bgcolor: inverseMode}}>
              <IoMdSend/>
            </Grid>
          </Grid>
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
