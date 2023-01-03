import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
export default function CartCard({image,alt,title,desc}) {
  return (
    <Card sx={{ maxWidth: 345,marginTop:"2em" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={alt}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
           {desc}
          </Typography>
        </CardContent>
        <CardActions sx={{justifyContent:"space-between"}}>
        <Button size="small">
         
          <AddCircleOutlineIcon/>
        </Button>
        <Button size="small">
          <RemoveCircleIcon/>
        </Button>
      </CardActions>
      </CardActionArea>
    </Card>
  );
}
