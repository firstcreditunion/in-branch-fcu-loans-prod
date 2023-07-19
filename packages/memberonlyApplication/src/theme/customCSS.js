import React from 'react'

//* MUI
import { alpha } from '@mui/material/styles'
import { dividerClasses } from '@mui/material/Divider'
import { checkboxClasses } from '@mui/material/Checkbox'
import { menuItemClasses } from '@mui/material/MenuItem'
import { autocompleteClasses } from '@mui/material/Autocomplete'

export function bgBlur(props) {
  const color = props?.color || '#000000'
  const blur = props?.blur || 6
  const opacity = props?.opacity || 0.8
  const imgUrl = props?.imgUrl

  if (imgUrl) {
    return {
      position: 'relative',
      backgroundImage: `url(${imgUrl})`,
      '&:before': {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 9,
        content: '""',
        width: '100%',
        height: '100%',
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        backgroundColor: alpha(color, opacity),
      },
    }
  }

  return {
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    backgroundColor: alpha(color, opacity),
  }
}
