import React from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

import { css } from '@emotion/react'
import HashLoader from 'react-spinners/HashLoader'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`

export default function Loading() {
  return <HashLoader color='#bbbb14' size={50} />
}

// git control 1
