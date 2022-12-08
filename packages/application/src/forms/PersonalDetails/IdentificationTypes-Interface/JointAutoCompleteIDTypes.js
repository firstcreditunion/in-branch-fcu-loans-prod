import React from 'react'

import { Controller } from 'react-hook-form'

import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Typography from '@mui/material/Typography'

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'

import { useDispatch, useSelector } from 'react-redux'

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />
const checkedIcon = <CheckBoxIcon fontSize='small' />

export default function IncomeAutoComplete({ name, control, helperTextInput, onIdentificationChange }) {
  const identificationTypes = useSelector((state) => state.identificationReducer.identificationTypes)
  const checkedIdentificationCodes = useSelector((state) => state.identificationReducer.checkedJointIdentificationTypes)
  const idTypeValues = Object.values(identificationTypes)

  const autoCompleteItems = idTypeValues.map((identification) => {
    return identification.autoComplete
  })

  const selectedIdentifications = autoCompleteItems.filter((item) => {
    return checkedIdentificationCodes.includes(item.code)
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
          id='id-types-checkbox'
          size='small'
          value={selectedIdentifications}
          options={autoCompleteItems}
          ChipProps={{ color: 'secondary', size: 'medium' }}
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
                <Typography variant={checkedIdentificationCodes.length === 0 ? 'subtitle2' : 'caption'} sx={{ p: 0, m: 0, fontSize: checkedIdentificationCodes.length === 0 ? 14 : 10 }}>
                  {helperTextInput}
                </Typography>
              }
              fullWidth
              {...params}
              label='Choose Identification'
            />
          )}
          onChange={(event, value) => {
            onIdentificationChange(event, value)
            onChange(value)
            onBlur(value)
          }}
        />
      )}
    />
  )
}
