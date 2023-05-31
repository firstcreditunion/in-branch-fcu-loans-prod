import PropTypes from 'prop-types'
import merge from 'lodash/merge'
import React, { useMemo } from 'react'

//* MUI
import { alpha, ThemeProvider, createTheme, useTheme } from '@mui/material/styles'

//* Settings
import { useSettingsContext } from './SettingsContext'

ThemeColorPresets.propTypes = {
  children: PropTypes.node,
}

export default function ThemeColorPresets({ children }) {
  const outerTheme = useTheme()

  const { presetsColor } = useSettingsContext()

  const themeOptions = useMemo(
    () => ({
      palette: {
        primary: presetsColor,
      },
      customShadows: {
        primary: `0 8px 16px 0 ${alpha(presetsColor.main, 0.24)}`,
      },
    }),
    [presetsColor]
  )

  const theme = createTheme(merge(outerTheme, themeOptions))

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
