import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet-async'
import { Box } from '@mui/material'

const Page = forwardRef(({ children, title = '', ...other }, ref) => {
  return (
    <Box ref={ref} {...other}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </Box>
  )
})

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
}

export default Page
