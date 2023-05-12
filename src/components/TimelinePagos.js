import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import Typography from '@mui/material/Typography';
import PaidIcon from '@mui/icons-material/Paid';
import { green, red } from '@mui/material/colors';

export default function CustomizedTimeline() {
 

  return (
    <div>
    <Timeline position="alternate">
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          align="right"
          variant="body2"
          color="text.secondary"
        >
          01/03/2022
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
         
          <PaidIcon style={{ color: green[600] }}
            fontSize="large"/>
          
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
            Pago Realizado
          </Typography>
          <Typography>Visa: **** ***** 2968</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          variant="body2"
          color="text.secondary"
        >
          01/04/2022
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
         
          <PaidIcon style={{ color: red[600] }}
            fontSize="large"/>
          
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
            Pago Rechazado
          </Typography>
          <Typography>Visa: **** ***** 2968</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          variant="body2"
          color="text.secondary"
        >
          01/05/2022
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          
          <PaidIcon style={{ color: green[600] }}
            fontSize="large"/>
          
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
            Pago Realizado
          </Typography>
          <Typography>Visa: **** ***** 2968</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          variant="body2"
          color="text.secondary"
        >
          01/06/2022
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          
          <PaidIcon fontSize="large"/>
         
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '32px', px: 2 }}>
          <Typography variant="h6" component="span">
            Pago Pendiente
          </Typography>
          <Typography>Visa: **** ***** 2968</Typography>
        </TimelineContent>
      </TimelineItem>
      
    </Timeline>
    
    </div>
  );
}
