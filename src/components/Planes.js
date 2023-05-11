import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import plan1 from '../img/1661543989225.webp'
import { Box } from '@mui/system';
import { Stack } from '@mui/system';



export default function RecipeReviewCard() {
  

  

  return (
    <React.Fragment>
   <Stack direction="row" spacing={20}  >
        <Box sx={{ paddingLeft: 30, paddingTop: 15}}>
        <Card sx={{ maxWidth: 345 }}>
          
          <CardMedia
            component="img"
            width="350"
            height="350"
            image={plan1}
            alt="Paella dish"
          />
          <CardContent>
            <Typography variant="h3" color="black">
              PLAN 1
            </Typography>
            <Typography paragraph>
                Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                occasionally until lightly browned, 6 to 8 minutes. 
              </Typography>
          </CardContent>
        </Card>
        </Box>
        <Box sx={{paddingTop: 15}}>
        <Card sx={{ maxWidth: 345 }}>
          
          <CardMedia
            component="img"
            width="350"
            height="350"
            image={plan1}
            alt="Paella dish"
          />
          <CardContent>
          <Typography variant="h3" color="black">
              PLAN 2
            </Typography>
            <Typography paragraph>
                Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                occasionally until lightly browned, 6 to 8 minutes. 
              </Typography>
          </CardContent>
        </Card>
        </Box>
        <Box sx={{paddingTop: 15}}>
        <Card sx={{ maxWidth: 345 }}>
          
          <CardMedia
            component="img"
            width="350"
            height="350"
            image={plan1}
            alt="Paella dish"
          />
          <CardContent>
          <Typography variant="h3" color="black">
              PLAN 3
            </Typography>
            <Typography paragraph>
                Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                occasionally until lightly browned, 6 to 8 minutes. 
              </Typography>
          </CardContent>
        </Card>
        </Box>
        </Stack>
  </React.Fragment>

  );
}