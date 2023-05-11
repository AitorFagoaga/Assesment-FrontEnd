import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import HistoryIcon from '@mui/icons-material/History';



const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function InteractiveList() {
  

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
     
      <Grid container spacing={2}>
        <Grid item xs={12} md={10}>
          <Typography sx={{ mt: 1, mb: 2 }} variant="h4" component="div">
            Historial de edicion 
          </Typography>
          <Demo>
            <List>
              
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <HistoryIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="El recepcionista Juan Pablo modificó categoría de plan Simple a plan Full"
                  />
                  
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <HistoryIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="El recepcionista Rodriguez aprobo apto medico"
                    />
                  
                </ListItem>
            </List>
          </Demo>
        </Grid>
        
      </Grid>
    </Box>
  );
}
