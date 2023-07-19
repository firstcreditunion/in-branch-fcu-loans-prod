import React from 'react'

import { Controller } from 'react-hook-form'

import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Typography from '@mui/material/Typography'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'

import { useDispatch, useSelector } from 'react-redux'
import { sopAssetLiabilityActions } from '../../../redux/slices/sopAssetsLiabilitiesSlice'

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />
const checkedIcon = <CheckBoxIcon fontSize='small' />

export default function IncomeAutoComplete({ name, control, helperTextInput, onLiabilityChange }) {
  const liabilityTypes = useSelector((state) => state.sopAssetLiabilityReducer.liability)
  const checkedLiabilityCodes = useSelector((state) => state.sopAssetLiabilityReducer.checkedLiabilityCodes)
  const liabilityTypeValues = Object.values(liabilityTypes)

  const autoCompleteItems = liabilityTypeValues.map((liability) => {
    return liability.autoComplete
  })

  const selectedLiabilities = autoCompleteItems.filter((item) => {
    return checkedLiabilityCodes.includes(item.code)
  })

  // Controller
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field: { onChange, onBlur, value, name, ref } }) => (
        <Autocomplete
          multiple
          id='liability-types-checkbox'
          size='small'
          value={selectedLiabilities}
          options={autoCompleteItems}
          disableCloseOnSelect
          getOptionLabel={(option) => option.title}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
              {option.title}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              size='small'
              variant='filled'
              helperText={
                <Typography variant={checkedLiabilityCodes.length === 0 ? 'subtitle2' : 'caption'} sx={{ p: 0, m: 0, fontSize: checkedLiabilityCodes.length === 0 ? 14 : 10 }}>
                  {helperTextInput}
                </Typography>
              }
              fullWidth
              {...params}
              label='Select your Liabilities'
            />
          )}
          onChange={(event, value) => {
            onLiabilityChange(event, value)
            onChange(value)
            onBlur(value)
          }}
        />
      )}
    />
  )
}
