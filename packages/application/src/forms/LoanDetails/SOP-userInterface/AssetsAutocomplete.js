import React from 'react'

import { Controller } from 'react-hook-form'

import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Typography from '@mui/material/Typography'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'

import { useDispatch, useSelector } from 'react-redux'
import { sopIncomeExpenditureActions } from '../../../redux/slices/sopIncomeExpenditureSlice'

import TextField_Cust from '../../../components/ui/mui-custom-styled-components/TextField_Custom'
import { closestTo } from 'date-fns'

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />
const checkedIcon = <CheckBoxIcon fontSize='small' />

export default function IncomeAutoComplete({ name, control, helperTextInput, onAssetChange }) {
  const assetTypes = useSelector((state) => state.sopAssetLiabilityReducer.asset)
  const checkedAssetCodes = useSelector((state) => state.sopAssetLiabilityReducer.checkedAssetCodes)
  const assetTypeValues = Object.values(assetTypes)

  const autoCompleteItems = assetTypeValues.map((asset) => {
    return asset.autoComplete
  })

  const selectedAssets = autoCompleteItems.filter((item) => {
    return checkedAssetCodes.includes(item.code)
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
          id='asset-types-checkbox'
          size='small'
          value={selectedAssets}
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
                <Typography variant={checkedAssetCodes.length === 0 ? 'subtitle2' : 'caption'} sx={{ p: 0, m: 0, fontSize: checkedAssetCodes.length === 0 ? 14 : 10 }}>
                  {helperTextInput}
                </Typography>
              }
              fullWidth
              {...params}
              label='Select your Assets'
            />
          )}
          onChange={(event, value) => {
            onAssetChange(event, value)
            onChange(value)
            onBlur(value)
          }}
        />
      )}
    />
  )
}
