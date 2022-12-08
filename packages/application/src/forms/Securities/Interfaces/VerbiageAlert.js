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

export default function VerbiageAlert({ alertTitle, alertContent, variant = 'standard' }) {
  return (
    <Stack sx={{ width: '100%' }}>
      <Paper elevation={8}>
        <Alert variant={variant} color='info' icon={<InfoOutlinedIcon fontSize='medium' />}>
          {/* <AlertTitle>{alertTitle}</AlertTitle> */}
          {alertContent}
        </Alert>
      </Paper>
    </Stack>
  )
}
