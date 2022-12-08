import * as React from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

import { css } from '@emotion/react'
import SyncLoader from 'react-spinners/SyncLoader'

import { PRIMARY, SECONDARY } from '../theme/palette'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`

export default function loadting() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center', flexGrow: 1, minHeight: '80vh' }}>
      {/* <CircularProgress /> */}
      <SyncLoader css={override} size={15} color={PRIMARY.main} loading={true} speedMultiplier={1.5} />
    </Box>
  )
}

// git control 1
