/// <reference types="react" />
import drawer from '@mui/material/Drawer';
import listitemicon from '@mui/material/ListItemIcon';
import listitemtext from '@mui/material/ListItemText';
import cardActions from '@mui/material/CardActions';
import collapse from '@mui/material/Collapse';
import muiAccordion from '@mui/material/Accordion';
import muiAccordionDetails from '@mui/material/AccordionDetails';
import textField from '@mui/material/TextField';
import dialog from '@mui/material/Dialog';
import dialogActions from '@mui/material/DialogActions';
import dialogContent from '@mui/material/DialogContent';
import snackbar from '@mui/material/Snackbar';
export declare const Item: import("@emotion/styled").StyledComponent<{
    children?: import("react").ReactNode;
    classes?: Partial<import("@mui/material/Paper").PaperClasses>;
    elevation?: number;
    square?: boolean;
    sx?: import("@mui/material/styles").SxProps<import("@mui/material/styles").Theme>;
    variant?: "elevation" | "outlined";
} & import("@mui/material/OverridableComponent").CommonProps & Omit<Pick<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof import("react").HTMLAttributes<HTMLDivElement>> & {
    ref?: import("react").Ref<HTMLDivElement>;
}, "square" | "elevation" | "children" | "sx" | keyof import("@mui/material/OverridableComponent").CommonProps | "variant"> & import("@mui/system").MUIStyledCommonProps<import("@mui/material/styles").Theme>, {}, {}>;
export declare const TextField: typeof textField;
export declare const CssTextField: import("@emotion/styled").StyledComponent<import("@mui/material/TextField").TextFieldProps & import("@mui/system").MUIStyledCommonProps<import("@mui/material/styles").Theme>, {}, {}>;
export declare const StyledProvider: any;
export declare const Box: import("@mui/material/OverridableComponent").OverridableComponent<import("@mui/material/Box").BoxTypeMap<{}, "div">>;
export declare const Modal: import("@mui/material/Modal").ExtendModalUnstyled<import("@mui/material/Modal").ModalTypeMap<"div", {}>>;
export declare const IconButton: import("@mui/material/ButtonBase").ExtendButtonBase<import("@mui/material/IconButton").IconButtonTypeMap<{}, "button">>;
export declare const OutlinedInput: ((props: import("@mui/material/OutlinedInput").OutlinedInputProps) => JSX.Element) & {
    muiName: string;
};
export declare const Fab: import("@mui/material/ButtonBase").ExtendButtonBase<import("@mui/material/Fab").FabTypeMap<{}, "button">>;
export declare const Avatar: import("@mui/material/OverridableComponent").OverridableComponent<import("@mui/material/Avatar").AvatarTypeMap<{}, "div">>;
export declare const Box: import("@mui/material/OverridableComponent").OverridableComponent<import("@mui/material/Box").BoxTypeMap<{}, "div">>;
export declare const Drawer: typeof drawer;
export declare const Button: import("@mui/material/ButtonBase").ExtendButtonBase<import("@mui/material/Button").ButtonTypeMap<{}, "button">>;
export declare const List: import("@mui/material/List").ExtendList<import("@mui/material/List").ListTypeMap<{}, "ul">>;
export declare const Divider: import("@mui/material/OverridableComponent").OverridableComponent<import("@mui/material/Divider").DividerTypeMap<{}, "hr">>;
export declare const ListItem: ((props: {
    href: string;
} & {
    button: true;
} & import("@mui/material/ListItem").ListItemBaseProps & {
    components?: {
        Root?: import("react").ElementType<any>;
    };
    componentsProps?: {
        root?: import("react").HTMLAttributes<HTMLDivElement> & import("@mui/material/ListItem").ListItemComponentsPropsOverrides;
    };
} & Omit<{
    action?: import("react").Ref<import("@mui/material/ButtonBase").ButtonBaseActions>;
    centerRipple?: boolean;
    children?: import("react").ReactNode;
    classes?: Partial<import("@mui/material/ButtonBase").ButtonBaseClasses>;
    disabled?: boolean;
    disableRipple?: boolean;
    disableTouchRipple?: boolean;
    focusRipple?: boolean;
    focusVisibleClassName?: string;
    LinkComponent?: import("react").ElementType<any>;
    onFocusVisible?: import("react").FocusEventHandler<any>;
    sx?: import("@mui/material/styles").SxProps<import("@mui/material/styles").Theme>;
    tabIndex?: number;
    TouchRippleProps?: Partial<import("@mui/material/ButtonBase/TouchRipple").TouchRippleProps>;
    touchRippleRef?: import("react").Ref<import("@mui/material/ButtonBase/TouchRipple").TouchRippleActions>;
}, "classes"> & import("@mui/material/OverridableComponent").CommonProps & Omit<Pick<import("react").DetailedHTMLProps<import("react").AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, "key" | keyof import("react").AnchorHTMLAttributes<HTMLAnchorElement>> & {
    ref?: import("react").Ref<HTMLAnchorElement>;
}, "button" | "style" | "dense" | "alignItems" | "disabled" | "action" | "autoFocus" | "className" | "tabIndex" | "selected" | "children" | "sx" | "classes" | "disableGutters" | "components" | "divider" | "centerRipple" | "disableRipple" | "disableTouchRipple" | "focusRipple" | "focusVisibleClassName" | "LinkComponent" | "onFocusVisible" | "TouchRippleProps" | "touchRippleRef" | "componentsProps" | "disablePadding" | "ContainerComponent" | "ContainerProps" | "secondaryAction">) => JSX.Element) & import("@mui/material/OverridableComponent").OverridableComponent<import("@mui/material/ButtonBase").ExtendButtonBaseTypeMap<import("@mui/material/ListItem").ListItemTypeMap<{
    button: true;
}, "div">>> & import("@mui/material/OverridableComponent").OverridableComponent<import("@mui/material/ListItem").ListItemTypeMap<{
    button?: false;
}, "li">>;
export declare const ListItemButton: import("@mui/material/ButtonBase").ExtendButtonBase<import("@mui/material/ListItemButton").ListItemButtonTypeMap<{}, "div">>;
export declare const ListItemIcon: typeof listitemicon;
export declare const ListItemText: typeof listitemtext;
export declare const InboxIcon: import("@mui/material/OverridableComponent").OverridableComponent<import("@mui/material").SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
};
export declare const MailIcon: import("@mui/material/OverridableComponent").OverridableComponent<import("@mui/material").SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
};
export declare const Container: import("@mui/material/OverridableComponent").OverridableComponent<import("@mui/material/Container").ContainerTypeMap<{}, "div">>;
export declare const Grid: import("@mui/material/OverridableComponent").OverridableComponent<import("@mui/material/Grid").GridTypeMap<{}, "div">>;
export declare const Paper: import("@mui/material/OverridableComponent").OverridableComponent<import("@mui/material/Paper").PaperTypeMap<{}, "div">>;
export declare const Card: import("@mui/material/OverridableComponent").OverridableComponent<import("@mui/material/Card").CardTypeMap<{}, "div">>;
export declare const CardHeader: import("@mui/material/CardHeader").OverridableCardHeader;
export declare const CardMedia: import("@mui/material/OverridableComponent").OverridableComponent<import("@mui/material/CardMedia").CardMediaTypeMap<{}, "div">>;
export declare const CardContent: import("@mui/material/OverridableComponent").OverridableComponent<import("@mui/material/CardContent").CardContentTypeMap<{}, "div">>;
export declare const CardActions: typeof cardActions;
export declare const Collapse: typeof collapse;
export declare const Typography: import("@mui/material/OverridableComponent").OverridableComponent<import("@mui/material/Typography").TypographyTypeMap<{}, "span">>;
export declare const FavoriteIcon: import("@mui/material/OverridableComponent").OverridableComponent<import("@mui/material").SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
};
export declare const ExpandMoreIcon: import("@mui/material/OverridableComponent").OverridableComponent<import("@mui/material").SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
};
export declare const YouTubeIcon: import("@mui/material/OverridableComponent").OverridableComponent<import("@mui/material").SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
};
export declare const TwitterIcon: import("@mui/material/OverridableComponent").OverridableComponent<import("@mui/material").SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
};
export declare const MusicNoteIcon: import("@mui/material/OverridableComponent").OverridableComponent<import("@mui/material").SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
};
export declare const FacebookIcon: import("@mui/material/OverridableComponent").OverridableComponent<import("@mui/material").SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
};
export declare const QuizIcon: import("@mui/material/OverridableComponent").OverridableComponent<import("@mui/material").SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
};
export declare const InstagramIcon: import("@mui/material/OverridableComponent").OverridableComponent<import("@mui/material").SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
};
export declare const LanguageIcon: import("@mui/material/OverridableComponent").OverridableComponent<import("@mui/material").SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
};
export declare const MusicOffIcon: import("@mui/material/OverridableComponent").OverridableComponent<import("@mui/material").SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
};
export declare const ButtonBase: import("@mui/material/ButtonBase").ExtendButtonBase<import("@mui/material/ButtonBase").ButtonBaseTypeMap<{}, "button">>;
export declare const PushPinIcon: import("@mui/material/OverridableComponent").OverridableComponent<import("@mui/material").SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
};
export declare const Avatar: import("@mui/material/OverridableComponent").OverridableComponent<import("@mui/material/Avatar").AvatarTypeMap<{}, "div">>;
export declare const LocalActivityIcon: import("@mui/material/OverridableComponent").OverridableComponent<import("@mui/material").SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
};
export declare const CalendarMonthIcon: import("@mui/material/OverridableComponent").OverridableComponent<import("@mui/material").SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
};
export declare const InfoIcon: import("@mui/material/OverridableComponent").OverridableComponent<import("@mui/material").SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
};
export declare const DescriptionIcon: import("@mui/material/OverridableComponent").OverridableComponent<import("@mui/material").SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
};
export declare const ArrowForwardIosSharpIcon: import("@mui/material/OverridableComponent").OverridableComponent<import("@mui/material").SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
};
export declare const MuiAccordion: typeof muiAccordion;
export declare const MuiAccordionSummary: import("@mui/material/ButtonBase").ExtendButtonBase<import("@mui/material/AccordionSummary").AccordionSummaryTypeMap<{}, "div">>;
export declare const MuiAccordionDetails: typeof muiAccordionDetails;
export declare const ImageList: import("@mui/material/OverridableComponent").OverridableComponent<import("@mui/material/ImageList").ImageListTypeMap<{}, "ul">>;
export declare const ImageListItem: import("@mui/material/OverridableComponent").OverridableComponent<import("@mui/material/ImageListItem").ImageListItemTypeMap<{}, "li">>;
export declare const TextField: typeof textField;
export declare const Dialog: typeof dialog;
export declare const DialogActions: typeof dialogActions;
export declare const DialogContent: typeof dialogContent;
export declare const DialogContentText: import("@mui/material/OverridableComponent").OverridableComponent<import("@mui/material/DialogContentText").DialogContentTextTypeMap<{}, "span">>;
export declare const DialogTitle: import("@mui/material/OverridableComponent").OverridableComponent<import("@mui/material/DialogTitle").DialogTitleTypeMap<{}, "span">>;
export declare const Link: import("@mui/material/OverridableComponent").OverridableComponent<import("@mui/material/Link").LinkTypeMap<{}, "a">>;
export declare const Snackbar: typeof snackbar;
