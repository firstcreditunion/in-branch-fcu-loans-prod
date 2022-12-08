import PropTypes from 'prop-types'
import React from 'react'
import { useMemo } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles'

import useSettings from '../hooks/useSettings'

import palette from './palette'
import typography from './typography'
import breakpoints from './breakpoints'
import componentsOverride from './overrides'
import shadows, { customShadows } from './shadows'

ThemeConfig.propTypes = {
  children: PropTypes.node,
}

export default function ThemeConfig({ children }) {
  const themeMode = useSelector((state) => state.globalReducer.themeMode)

  const isLight = themeMode === 'light'

  const themeOptions = useMemo(
    () => ({
      palette: isLight ? palette.light : palette.dark,
      shape: { borderRadius: 8 },
      typography,
      breakpoints,
      shadows: isLight ? shadows.light : shadows.dark,
      customShadows: isLight ? customShadows.light : customShadows.dark,
    }),
    [isLight]
  )

  const theme = createTheme(themeOptions)
  theme.components = componentsOverride(theme)

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  )
}
