import PropTypes from 'prop-types'
import React, { createContext } from 'react'

import useLocalStorage from '../hooks/useLocalStorage'
import { defaultSettings } from '../config'

const initialState = {
  ...defaultSettings,
  onChangeMode: () => {},
  onToggleMode: () => {},
  // onChangeDirection: () => {},
  // onChangeColor: () => {},
  // onToggleStretch: () => {},
  // onChangeLayout: () => {},
  // onResetSetting: () => {},
  // setColor: defaultPreset,
  // colorOption: [],
}

const SettingsContext = createContext(initialState)

SettingsProvider.propTypes = {
  children: PropTypes.node,
}

function SettingsProvider({ children }) {
  const [settings, setSettings] = useLocalStorage('settings', {
    themeMode: initialState.themeMode,
  })

  const onChangeMode = (event) => {
    setSettings({
      ...settings,
      themeMode: event.target.value,
    })
  }

  const onToggleMode = () => {
    setSettings({
      ...settings,
      themeMode: settings.themeMode === 'light' ? 'dark' : 'light',
    })
  }

  const onResetSetting = () => {
    setSettings({
      themeMode: initialState.themeMode,
    })
  }

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        onChangeMode,
        onToggleMode,
        onResetSetting,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export { SettingsProvider, SettingsContext }
