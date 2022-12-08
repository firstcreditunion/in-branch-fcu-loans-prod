import React, { useState } from 'react'

import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Switch from '@mui/material/Switch'

const Progress = () => {
  const [darkMode, setDarkMode] = useState(false)

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
    },
  })

  const themeTypography = 'Dark'

  const handleChange = (event) => {
    setDarkMode(!darkMode)
  }

  return (
    <Grid container direction='row'>
      <Grid item container direction='row' justify='flex-end' alignItems='center'>
        <Grid item>
          <Switch checked={darkMode} onChange={handleChange} />
        </Grid>
      </Grid>
      <Grid></Grid>
    </Grid>
  )
}

export default Progress
