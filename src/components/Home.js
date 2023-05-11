import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import gymImg from '../img/16631389546589.jpeg';
import {Link, Route, Routes} from 'react-router-dom';
import Socio from './Socios';
import Box from '@mui/material/Box';
import PlanesImg from '../img/planes.png';
import { Stack } from '@mui/system';
import Planes from './Planes';
import Divider from '@mui/material/Divider';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
export default function MediaCard() {
    const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <React.Fragment>
         <Stack direction="row" spacing={20}>
                <Box sx={{ paddingLeft: 10, paddingTop: 5}}>
                <Link style={{ textDecoration: 'none'}} to='/Socios'>
                    <Card sx={{ maxWidth: 750}}>
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
                        Visualización de campos: Nombre/Apellido/Plan activo/Dni/Telefono/Alta/Email/Nacimiento
                        </Typography>
                    </CardContent>
                    </Card>
                    </Link>
            </Box>
            <Box sx={{paddingTop: 5}}>
            <Link style={{ textDecoration: 'none'}} to='/Planes'>
                <Card sx={{ maxWidth: 600 }}>
                
                <CardMedia
                    component="img"
                    width="200"
                    height="500"
                    image={PlanesImg}
                    alt="Paella dish"
                />
                
                </Card>
                </Link>
                </Box>
                <Divider orientation="vertical" sx={{height: "100vh"}} flexItem></Divider>
                <Box sx={{width: "20vw", paddingTop:5, paddingRight:5}}>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{backgroundColor: "grey"}}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    sx={{color: "white"}}
                    >
                    <Typography >
                        General settings
                    </Typography>
                    
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                        Aliquam eget maximus est, id dignissim quam.
                    </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} sx={{backgroundColor: "grey"}}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                    sx={{color: "white"}}
                    >
                    <Typography >Users</Typography>
                    
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
                        varius pulvinar diam eros in elit. Pellentesque convallis laoreet
                        laoreet.
                    </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} sx={{backgroundColor: "grey"}}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                    sx={{color: "white"}}
                    >
                    <Typography >
                        Advanced settings
                    </Typography>
                    
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
                        amet egestas eros, vitae egestas augue. Duis vel est augue.
                    </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')} sx={{backgroundColor: "grey"}}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                    sx={{color: "white"}}
                    >
                    <Typography >Personal data</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
                        amet egestas eros, vitae egestas augue. Duis vel est augue.
                    </Typography>
                    </AccordionDetails>
                </Accordion>
                </Box>
                </Stack>
            
                
    <Routes>
    <Route path="/Socio" element={<Socio />} />
    <Route path="/Planes" element={<Planes />} />
    </Routes>
    </React.Fragment>
  );
}