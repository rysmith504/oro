import React, { useEffect, useState, useContext } from 'react';

import { UserContext } from '../context/UserContext';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const Contacts = () => {
  const userContext = useContext(UserContext);
  const { currentUserInfo, userContacts } = userContext;
  const currentUser = currentUserInfo;
  const userContext = useContext(UserContext);
  const { currentUserInfo, userContacts } = userContext;
  const [currentUserName, setCurrentUserName ] = useState(undefined)
  const [ currentUserImage, setCurrentUserImage ] = useState(undefined)
  const [ currentSelected, setCurrentSelected ] = useState(undefined)
  const [selectedIndex, setSelectedIndex] = useState(undefined);
  useEffect(() => {
    console.log('USERCONTACTS', userContacts, 'USER', currentUser)
    if(currentUser) {
      setCurrentUserName(currentUser.fullName);
      setCurrentUserImage(currentUser.profileURL);
    }
  }, [currentUser])
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    // changeChat(contact);
  };

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };

  return (
    <div>
      {
        userContacts.map((contact, index) => {
          return(
          <List key={'list'+index}>
          <ListItemButton 
            key={'listitembutton'+index}
            alignItems="flex-start"
            selected={selectedIndex === index}
            onClick={(event) => handleListItemClick(event, index)}
          >
              <ListItemAvatar key={'listitemavatar'+index}>
                <Avatar key={'avatar'+index} src={contact.profileURL} />
              </ListItemAvatar>
              <ListItemText
                primary={contact.fullName}
                secondary={
                  <React.Fragment>
                    <Typography
                      key={'contactTypography'+index}
                      sx={{ display: 'inline'}}
                      variant="body2"
                      color="#F3F3F3"
                    >
                    messages
                    </Typography>
                  </React.Fragment>
                }
                />
            </ListItemButton>
            <Divider key={'divider'+index} variant="inset" component="li" />
          </List>
            )})
          }
      </div>
  )
}

export default Contacts;