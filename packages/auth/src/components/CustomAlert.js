import React from 'react'

//* MUI
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'

//* MUI - Alert
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

//* MUI - Icons
import InfoIcon from '@mui/icons-material/Info'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

export default function VerbiageAlert({ alertTitle, alertContent, color, variant = 'standard', severity }) {
  return (
    <Stack direction='column' justifyContent='center' alignItems='center' sx={{ width: '100%' }}>
      <Paper
        elevation={8}
        sx={{
          width: '100%',
          maxWidth: '500px',
        }}
      >
        <Alert variant={variant} color={color} severity={severity} icon={<InfoOutlinedIcon fontSize='medium' />}>
          <AlertTitle>{alertTitle}</AlertTitle>
          {alertContent}
        </Alert>
      </Paper>
    </Stack>
  )
}
