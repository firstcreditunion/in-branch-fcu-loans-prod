import React from 'react'

import PropTypes from 'prop-types';

//* MUI
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';

//* Hooks
import { useCountdownDate } from '../hooks/use-countdown';

export default function Timer({ date }) {

 // console.log('TIMER Date: ', date)

 const { days, hours, minutes, seconds } = useCountdownDate(new Date(date));

 return (
  <>
   <Typography variant="h3" paragraph>
    Seesion Expiring Soon!
   </Typography>

   <Typography sx={{ color: 'text.secondary' }}>
    You are about to be logged out. Click <strong>continue</strong> to keep you session open.
   </Typography>

   <Stack
    direction="row"
    justifyContent="center"
    divider={<Box sx={{ mx: { xs: 1, sm: 2.5 } }}>:</Box>}
    sx={{ typography: 'h2' }}
   >
    <TimeBlock label="Days" value={days} />
    <TimeBlock label="Hours" value={hours} />
    <TimeBlock label="Minutes" value={minutes} />
    <TimeBlock label="Seconds" value={seconds} />


   </Stack>
  </>
 );
}

// ----------------------------------------------------------------------

function TimeBlock({ label, value }) {
 return (
  <div>
   <Box> {value} </Box>
   <Box sx={{ color: 'text.secondary', typography: 'body1' }}>{label}</Box>
  </div>
 );
}

TimeBlock.propTypes = {
 label: PropTypes.string,
 value: PropTypes.string,
};
