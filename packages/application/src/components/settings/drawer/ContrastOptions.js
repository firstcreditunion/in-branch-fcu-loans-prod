import React from 'react'

// @mui
import { RadioGroup } from '@mui/material'
//
import SvgColor from '../../svg-color'
import { useSettingsContext } from '../SettingContext'
import { StyledCard, StyledWrap, MaskControl } from '../styles'

import ContrastIcon from '@mui/icons-material/Contrast'

const OPTIONS = ['default', 'bold']

export default function ContrastOptions() {
  const { themeContrast, onChangeContrast } = useSettingsContext()

  return (
    <RadioGroup name='themeContrast' value={themeContrast} onChange={onChangeContrast}>
      <StyledWrap>
        {OPTIONS.map((contrast) => (
          <StyledCard key={contrast} selected={themeContrast === contrast}>
            <ContrastIcon color={contrast === 'bold' ? 'primary' : 'disabled'} />

            <MaskControl value={contrast} />
          </StyledCard>
        ))}
      </StyledWrap>
    </RadioGroup>
  )
}
