import React from 'react'
import PropTypes from 'prop-types'

//* MUI
import { alpha } from '@mui/material/styles'
import { Box, Paper, Typography } from '@mui/material'

// utils
import { fData } from '../../utils/formatNumber'
import getFileDetails from '../../utils/getFileDetails'

RejectedFiles.propTypes = {
  fileRejections: PropTypes.array.isRequired,
}

export default function RejectedFiles({ fileRejections }) {
  return (
    <Paper
      variant='outlined'
      sx={{
        borderColor: 'grey',
        px: 2,
      }}
    >
      {fileRejections.map(({ file, errors }) => {
        const { name, size, path, key } = getFileDetails(file)

        return (
          <Box key={key} sx={{ my: 1 }}>
            <Typography color='error'>
              {name} - {size ? fData(size) : ''}
            </Typography>

            {errors.map((error) => (
              <Box key={error.code} sx={{ typography: 'caption' }}>
                {error.message}
              </Box>
            ))}
          </Box>
        )
      })}
    </Paper>
  )
}
