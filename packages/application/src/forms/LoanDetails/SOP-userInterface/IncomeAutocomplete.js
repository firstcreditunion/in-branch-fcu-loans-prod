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

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />
const checkedIcon = <CheckBoxIcon fontSize='small' />

export default function IncomeAutoComplete({ name, control, helperTextInput, onIncomeChange }) {
  const incomeTypes = useSelector((state) => state.sopIncomeExpenditureReducer.income)
  const checkedIncomeCodes = useSelector((state) => state.sopIncomeExpenditureReducer.checkedIncomeCodes)
  const incomeTypeValues = Object.values(incomeTypes)

  const autoCompleteItems = incomeTypeValues.map((income) => {
    return income.autoComplete
  })

  const selectedIncome = autoCompleteItems.filter((item) => {
    return checkedIncomeCodes.includes(item.code)
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
          id='income-types-checkbox'
          size='small'
          value={selectedIncome}
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
                <Typography variant={checkedIncomeCodes.length === 0 ? 'subtitle2' : 'caption'} sx={{ p: 0, m: 0, fontSize: checkedIncomeCodes.length === 0 ? 14 : 10 }}>
                  {helperTextInput}
                </Typography>
              }
              fullWidth
              {...params}
              label='Select your income sources'
            />
          )}
          onChange={(event, value) => {
            onIncomeChange(event, value)
            onChange(value)
            onBlur(value)
          }}
        />
      )}
    />
  )
}
