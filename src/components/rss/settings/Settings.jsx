import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArchiveIcon from "@mui/icons-material/Archive";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import HomeIcon from "@mui/icons-material/Home";
import PendingIcon from "@mui/icons-material/Pending";
import bookmark from "../../assets/bookmark.png";
import vector from "../../assets/Vector.png";
import { styled } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import toggle from "../../assets/toggleoncircle.png";
import love from "../../assets/love.png";
import { ListItemButton, ListItemIcon, Typography } from "@mui/material";
function refreshMessages() {
  const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

  return Array.from(new Array(50)).map(
    () => messageExamples[getRandomInt(messageExamples.length)]
  );
}

const CustomizedListButton = styled(ListItemButton)`
  color: white;
  cursor:pointer;
  border:1px solid black;
  Background:black;
  width:90%;
font-size:14px;
  margin:auto;
  & .MuiListItemButton-root{
    background:"black";
  }

   & .MuiListItemText-secondary {
                color: rgb(173, 181, 189);
                
              },
`;
const CustomizedListText = styled(ListItemText)`
  color: white;
  cursor:pointer;
font-size:14px;

 & .MuiListItemButton-root{
    font-size:14px;
    text-align:start;
    margin-left:0;

  }
  // :hover {
  //   color: rgb(173, 181, 189);
  // }
   & .MuiListItemText-secondary {
                color: rgb(173, 181, 189);
                
              },
`;
export default function SettingsComponent() {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);
  const [messages, setMessages] = React.useState(() => refreshMessages());

  React.useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
    setMessages(refreshMessages());
  }, [value, setMessages]);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <List>
        {/* {messages.map(({ primary, secondary, person }, index) => (
          <ListItem button key={index + person}>
            <ListItemAvatar>
              <Avatar alt="Profile Picture" src={person} />
            </ListItemAvatar>
            <ListItemText primary={primary} secondary={secondary} />
          </ListItem>
        ))} */}
        {/* <CustomizedListButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
         </ListItemIcon>
          <CustomizedListText primary="Crypto Signals From Crypto Analyst" />
        </CustomizedListButton> */}
        <div
          style={{
            border: "1px solid black",
            display: "flex",
            width: "90%",
            margin: "auto",
            padding: "15px",
            background: "black",
            color: "white",
            height: "51px",
            borderRadius: "5px",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "18px",
          }}
        >
          <div style={{ fontSize: "14px", fontWeight: 600 }}>
            Crypto Signals From Crypto Analyst
          </div>
          <ArrowForwardIcon />
        </div>
        <div
          style={{
            border: "1px solid black",
            display: "flex",
            width: "90%",
            margin: "auto",
            padding: "15px",
            background: "#FAFAFA",
            color: "black",
            height: "51px",
            borderRadius: "5px",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "18px",
          }}
        >
          <div style={{ fontSize: "14px", fontWeight: 600 }}>
            Breaking News Notification
          </div>
          <img src={toggle} alt="toggle" />
        </div>
        <div
          style={{
            border: "1px solid black",
            display: "flex",
            width: "90%",
            margin: "auto",
            padding: "15px",
            background: "#FAFAFA",
            color: "black",
            height: "51px",
            borderRadius: "5px",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "18px",
          }}
        >
          <div style={{ fontSize: "14px", fontWeight: 600 }}>
            Hands Pick Update Notification
          </div>
          <img src={toggle} alt="toggle" />
        </div>
        <div
          style={{
            border: "1px solid black",
            display: "flex",
            width: "90%",
            margin: "auto",
            padding: "15px",
            background: "#FAFAFA",
            color: "black",
            height: "51px",
            borderRadius: "5px",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "18px",
          }}
        >
          <div style={{ fontSize: "14px", fontWeight: 600 }}>
            Widget Settings
          </div>
          {/* <img src={toggle} alt="toggle" /> */}
        </div>
        <div
          style={{
            border: "1px solid black",
            display: "flex",
            width: "90%",
            margin: "auto",
            padding: "15px",
            background: "#FAFAFA",
            color: "black",
            height: "51px",
            borderRadius: "5px",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "18px",
          }}
        >
          <div style={{ fontSize: "14px", fontWeight: 600 }}>
            Advertising/Contact
          </div>
          {/* <img src={toggle} alt="toggle" /> */}
        </div>
        <div
          style={{
            border: "1px solid black",
            display: "flex",
            width: "90%",
            margin: "auto",
            padding: "15px",
            background: "#FAFAFA",
            color: "black",
            height: "51px",
            borderRadius: "5px",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "18px",
          }}
        >
          <div style={{ fontSize: "14px", fontWeight: 600 }}>
            Terms and Conditions
          </div>
          {/* <img src={toggle} alt="toggle" /> */}
        </div>
        <div
          style={{
            border: "1px solid black",
            display: "flex",
            width: "90%",
            margin: "auto",
            padding: "15px",
            background: "#FAFAFA",
            color: "black",
            height: "51px",
            borderRadius: "5px",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "18px",
          }}
        >
          <div style={{ fontSize: "14px", fontWeight: 600 }}>
            Privacy Policy
          </div>
          {/* <img src={toggle} alt="toggle" /> */}
        </div>
      </List>
      <div
        style={{
          // border: "1px solid black",
          display: "flex",
          width: "90%",
          margin: "auto",
          padding: "15px",
          // background: "#FAFAFA",
          color: "black",
          height: "51px",
          borderRadius: "5px",
          display: "flex",
          // justifyContent: "space-between",
          // marginBottom: "18px",
          marginTop: "128px",
        }}
      >
        <div style={{ fontSize: "14px", fontWeight: 500 }}>
          Made with{" "}
          {/* <span>
              <img src={love} />
            </span>
            in India */}
        </div>
        <img
          src={love}
          alt="toggle"
          style={{ marginLeft: "3px", marginRight: "3px" }}
        />
        <div style={{ fontSize: "14px", fontWeight: 500 }}>In India</div>
      </div>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            // label="bookmark"
            icon={<img src={bookmark} />}
          />
          <BottomNavigationAction
            //   label="Home"
            // icon={<HomeIcon />
            icon={<img src={vector} />}
            // }
          />
          <BottomNavigationAction icon={<PendingIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

const messageExamples = [
  {
    primary: "Brunch this week?",
    secondary:
      "I'll be in the neighbourhood this week. Let's grab a bite to eat",
    person: "/static/images/avatar/5.jpg",
  },
  {
    primary: "Birthday Gift",
    secondary: `Do you have a suggestion for a good present for John on his work
      anniversary. I am really confused & would love your thoughts on it.`,
    person: "/static/images/avatar/1.jpg",
  },
  {
    primary: "Recipe to try",
    secondary:
      "I am try out this new BBQ recipe, I think this might be amazing",
    person: "/static/images/avatar/2.jpg",
  },
  {
    primary: "Yes!",
    secondary: "I have the tickets to the ReactConf for this year.",
    person: "/static/images/avatar/3.jpg",
  },
  {
    primary: "Doctor's Appointment",
    secondary:
      "My appointment for the doctor was rescheduled for next Saturday.",
    person: "/static/images/avatar/4.jpg",
  },
  {
    primary: "Discussion",
    secondary: `Menus that are generated by the bottom app bar (such as a bottom
      navigation drawer or overflow menu) open as bottom sheets at a higher elevation
      than the bar.`,
    person: "/static/images/avatar/5.jpg",
  },
  {
    primary: "Summer BBQ",
    secondary: `Who wants to have a cookout this weekend? I just got some furniture
      for my backyard and would love to fire up the grill.`,
    person: "/static/images/avatar/1.jpg",
  },
];
