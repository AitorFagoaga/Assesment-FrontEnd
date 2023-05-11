import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import HistoryIcon from '@mui/icons-material/History';
import LoginIcon from '@mui/icons-material/Login';


const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function InteractiveList() {

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
     
      <Grid container spacing={2}>
        <Grid item xs={12} md={10}>
          <Typography sx={{ mt: 1, mb: 2 }} variant="h4" component="div">
            Informacion de Socio
          </Typography>
          <Demo>
            <List>
            <Typography sx={{ mt: 1, mb: 2 }} variant="h6" component="div">
            Accesos a sedes
          </Typography>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <LoginIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Accedio a sede de Belgrano"
                  />
                  
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <LoginIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Accedio a sede de Belgrano"
                  /> 
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <LoginIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Accedio a sede de Pilar"
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <LoginIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Accedio a sede de Palermo"
                  />
                </ListItem>
                <Typography sx={{ mt: 1, mb: 2 }} variant="h6" component="div">
            Asociaciones pasadas
          </Typography>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <HistoryIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Fue socia entre: 01/2019-01/2020, 01/2017-02/2018, y 05/2021-"
                  />
                </ListItem>
                
            </List>
          </Demo>
        </Grid>
        
      </Grid>
    </Box>
  );
}
