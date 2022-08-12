import box from '@mui/material/Box';
import drawer from '@mui/material/Drawer';
import button from '@mui/material/Button';
import list from '@mui/material/List';
import divider from '@mui/material/Divider';
import listitem from '@mui/material/ListItem';
import listitembutton from '@mui/material/ListItemButton';
import listitemicon from '@mui/material/ListItemIcon';
import listitemtext from '@mui/material/ListItemText';
import inboxicon from '@mui/icons-material/MoveToInbox';
import mailicon from '@mui/icons-material/Mail';
import container from '@mui/material/Container';
import grid from '@mui/material/Grid';
import paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import card from '@mui/material/Card';
import cardHeader from '@mui/material/CardHeader';
import cardMedia from '@mui/material/CardMedia';
import cardContent from '@mui/material/CardContent';
import cardActions from '@mui/material/CardActions';
import collapse from '@mui/material/Collapse';
import iconButton, { IconButtonProps } from '@mui/material/IconButton';
import typography from '@mui/material/Typography';
import favoriteIcon from '@mui/icons-material/Favorite';
import expandMoreIcon from '@mui/icons-material/ExpandMore';
import youTubeIcon from '@mui/icons-material/YouTube';
import twitterIcon from '@mui/icons-material/Twitter';
import musicNoteIcon from '@mui/icons-material/MusicNote';
import facebookIcon from '@mui/icons-material/Facebook';
import quizIcon from '@mui/icons-material/Quiz';
import instagramIcon from '@mui/icons-material/Instagram';
import languageIcon from '@mui/icons-material/Language';

export const Item = styled(paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#212121',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));

export	const	Box	=	box;
export	const	Drawer	=	drawer;
export	const	Button	=	button;
export	const	List	=	list;
export	const	Divider	=	divider;
export	const	ListItem	=	listitem;
export	const	ListItemButton	=	listitembutton;
export	const	ListItemIcon	=	listitemicon;
export	const	ListItemText	=	listitemtext;
export	const	InboxIcon	=	inboxicon;
export	const	MailIcon	=	mailicon;
export	const	Container	=	container;
export	const	Grid	=	grid;
export	const	Paper	=	paper;
export	const	Card	=	card;
export	const	CardHeader	=	cardHeader;
export	const	CardMedia	=	cardMedia;
export	const	CardContent	=	cardContent;
export	const	CardActions	=	cardActions;
export	const	Collapse	=	collapse;
export	const	Typography	=	typography;
export	const	FavoriteIcon	=	favoriteIcon;
export	const	ExpandMoreIcon	=	expandMoreIcon;
export	const	YouTubeIcon	=	youTubeIcon;
export	const	TwitterIcon	=	twitterIcon;
export	const	MusicNoteIcon	=	musicNoteIcon;
export	const	FacebookIcon	=	facebookIcon;
export	const	QuizIcon	=	quizIcon;
export	const	InstagramIcon	=	instagramIcon;
export	const	LanguageIcon	=	languageIcon;