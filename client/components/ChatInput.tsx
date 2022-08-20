import React, { useState, useEffect, useContext } from 'react'
import TextField from '@mui/material/TextField';
import Picker from 'emoji-picker-react'
import Grid from '@mui/material/Grid';
import { BsEmojiSmileFill } from 'react-icons/bs';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { UserContext } from '../context/UserContext';

const ChatInput: React.FC<{}> = ({ handleSendMsg }) => {

  const userContext = useContext(UserContext);
  const { currentUserInfo } = userContext;
  const currentUser = currentUserInfo;
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [msg, setMsg] = useState('');

  const handleEmojiClick = (e, emoji) => {
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  }

  const handleEmojiMenuToggle = () => {
    setShowEmojiPicker(!showEmojiPicker)
  }

  const enterClick = (e) => {
    if (e.keyCode === 13) {
      sendChat(e)
    }
  };

  const sendChat = (e) => {
    e.preventDefault();
    if(msg.length > 0) {
      handleSendMsg(msg);
      setMsg('');
    }
  }

  return (
    <Grid container>
      <Grid item xs={1} sx={{mt: 1.5}}>
        <BsEmojiSmileFill onClick={handleEmojiMenuToggle} />
        {
        showEmojiPicker &&
        <Picker pickerStyle={{ position: 'relative', top: '-350px'}} onEmojiClick={handleEmojiClick} />
        }
      </Grid>
      <Grid item xs={10}>
      <TextField
        hiddenLabel
        id="filled-hidden-label-small"
        placeholder="message"
        variant="filled"
        size="small"
        value={msg}
        onChange={(e)=>setMsg(e.target.value)}
        onKeyDown={(e)=>enterClick(e)}
        />
      </Grid>
      <Grid item xs={1} sx={{mt: 1.2}}>
        <ArrowCircleUpIcon />
      </Grid>
    </Grid>
  )
}

export default ChatInput;