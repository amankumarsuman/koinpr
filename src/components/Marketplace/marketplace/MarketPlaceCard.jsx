import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import styles from "./marketplaceCard.module.css"

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function MarketPlaceCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={styles.mainContainer}>
      <CardHeader
        avatar={
          <Avatar sx={{
            
            
            }} 
            aria-label="recipe">
            
          </Avatar>
        }
      
        title="Name"
      />
    
      <CardContent disableSpacing>
        <Typography variant="body2" color="text.secondary">
          View Details
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
         
          $10
        </IconButton>
      
     
          <AddCircleOutlineIcon />
        
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Details:</Typography>
          <Typography paragraph>
            details paragraph1
          </Typography>
          <Typography paragraph>
            details paragraph2
          </Typography>
         
       
        </CardContent>
      </Collapse>
    </Card>
  );
}
