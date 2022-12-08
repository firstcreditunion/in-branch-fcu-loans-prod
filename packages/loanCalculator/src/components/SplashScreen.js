import React from 'react'
import PropTypes from 'prop-types'

// Framer
import { motion } from 'framer-motion'

// MUI
import { Box, Stack, Link } from '@mui/material'
import { Typography } from '@mui/material'

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
}

const pathVariants = {
  hidden: { pathLength: 0, opacity: 1 },
  visible: (i) => {
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: 0, type: 'spring', duration: 1, bounce: 0 },
        opacity: { delay: 0, duration: 1 },
      },
    }
  },
}

export default function Logo({ disabledLink = true }) {
  const logo = (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center', flexGrow: 1, minHeight: '80vh' }}>
      <Stack direction='column' justifyContent='center' alignItems='center' sx={{ width: 400, height: 140 }}>
        <motion.svg xmlns='http://www.w3.org/2000/svg' width='100%' viewBox='-55 -3 400 140' initial='hidden' animate='visible'>
          <motion.path d='M 89.71,32.8h-16.84c-.02,.09-.05,.17-.06,.25-.42,3.09-3.68,18.73-25.94,21.78v11.18h20.62v52.84h22.23V32.8Z' fill='none' stroke='#b9bb16' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' variants={pathVariants} />
          <motion.path d='M37.76,48.62s22.09-.83,25.97-15.82h-25.93v-5.16c0-7.16,2.66-9.82,8.99-9.82,3,0,5.83,.16,8.66,.5V.66C51.45,.5,47.12,0,42.96,0,23.64,0,14.15,10.99,14.15,26.14v6.66H0v15.82H14.15V118.88h23.65V48.88l-.04-.26Z' fill='none' stroke='#006580' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' variants={pathVariants} />
          <motion.path d='M98.23,32.8h22.48v15.98h.33c4.33-10.82,15.98-18.32,27.47-18.32,1.66,0,3.66,.34,5.16,.83v21.98c-2.16-.5-5.66-.83-8.49-.83-17.32,0-23.31,12.48-23.31,27.64v38.79h-23.64V32.8Z' fill='none' stroke='#006580' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' variants={pathVariants} />
          <motion.path d='M176.82,90.91c.17,10.32,8.82,14.48,18.15,14.48,6.82,0,15.48-2.67,15.49-10.99,0-7.16-9.83-9.66-26.8-13.32-13.65-3-27.31-7.83-27.31-22.98,0-21.98,18.98-27.64,37.46-27.64,18.81,0,36.13,6.33,37.96,27.47h-22.47c-.67-9.16-7.66-11.65-16.15-11.65-5.33,0-13.15,1-13.16,7.99,0,8.49,13.32,9.65,26.81,12.82,13.82,3.16,27.31,8.16,27.3,24.14,0,22.64-19.65,29.97-39.29,29.97-19.98,0-39.46-7.49-40.46-30.3h22.48Z' fill='none' stroke='#006580' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' variants={pathVariants} />
          <motion.path d='M270.05,32.8h17.31v15.82h-17.32v42.63c0,7.99,2,9.99,9.99,9.98,2.5,0,4.83-.17,7.33-.66v18.48c-4,.66-9.16,.83-13.82,.83-14.49,0-27.14-3.33-27.14-20.48V48.62h-14.32v-15.82h14.32V6.99h23.64v25.81Z' fill='none' stroke='#006580' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' variants={pathVariants} />
        </motion.svg>
        {/* <Typography variant='caption' color='primary' sx={{ textAlign: 'center' }}>
          Loading...
        </Typography> */}
      </Stack>
    </Box>
  )

  if (disabledLink) {
    return <>{logo}</>
  }

  return (
    <Link href={PATH_PAGE.fcuhomepage} target='_blank'>
      {logo}
    </Link>
  )
}
