import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/UserContext';
// import styled from 'styled-components';
import Picker from 'emoji-picker-react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { IoMdSend } from 'react-icons/io'
import { BsEmojiSmileFill } from 'react-icons/bs';
import { setFlagsFromString } from 'v8';
import Button from '@mui/material/Button';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import Grid from '@mui/material/Grid';



const ChatContainer: React.FC<{}> = () => {
  const userContext = useContext(UserContext);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)


  const handleEmojiMenuToggle = () => {
    setShowEmojiPicker(!showEmojiPicker)
  }

  const handleEmojiClick = (e, emoji) => {
    let message = msg;
    message + -emoji.emoji;
    setMsg(message);
  }

  return (
    <div>
      Welcome
      
      <React.Fragment>
      <Container >
        <Box sx={{ bgcolor: '#cfe8fc', height: '55vh' }}>
          {/* <Messages/> */}
        </Box>
      <Grid container>
        <Grid item xs={1} sx={{mt: 1.5}}>
          <BsEmojiSmileFill onClick={handleEmojiMenuToggle} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </Grid>
        <Grid item xs={10}>
          <TextField
            hiddenLabel
            id="filled-hidden-label-small"
            defaultValue="message"
            variant="filled"
            size="small"
            />
        </Grid>
        <Grid item xs={1} sx={{mt: 1.2}}>
          <IoMdSend />
        </Grid>
      </Grid>
      </Container>
    </React.Fragment>
    </div>
  )
}

export default ChatContainer;