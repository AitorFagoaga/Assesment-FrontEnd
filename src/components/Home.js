import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import gymImg from '../img/16631389546589.jpeg';
import {Link, Route, Routes} from 'react-router-dom';
import Socio from './Socios';

export default function MediaCard() {
  return (
    <React.Fragment>
        <Link style={{ textDecoration: 'none' }} to='/Socios'>
    <Card sx={{ maxWidth: 750 }}>
      <CardMedia
        sx={{ height: 240 }}
        image={gymImg}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" >
          Lista de Socios
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    </Link>
    <Routes>
    <Route path="/Socio" element={<Socio />} />
    </Routes>
    </React.Fragment>
  );
}