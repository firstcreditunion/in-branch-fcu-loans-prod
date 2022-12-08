import React from 'react'
import { useMemo } from 'react'

import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles'
import PropTypes from 'prop-types'

import componentsOverride from '../../theme/overrides'

// const firstLoanPurple = '#7D55C7'
// const firstLoanGreen = '#BBBB14'

FirstLoanTheme.propTypes = {
  children: PropTypes.node,
}

export default function FirstLoanTheme({ children }) {
  const defaultTheme = useTheme()

  const themeOptions = useMemo(
    () => ({
      ...defaultTheme,
      palette: {
        ...defaultTheme.palette,
      },
      customShadows: {
        ...defaultTheme.customShadows,
      },
    }),
    [defaultTheme]
  )

  const theme = createTheme(themeOptions)
  theme.components = componentsOverride(theme)

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

// git control 1
