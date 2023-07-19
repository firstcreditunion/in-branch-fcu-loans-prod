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

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />
const checkedIcon = <CheckBoxIcon fontSize='small' />

export default function IncomeAutoComplete({ name, control, helperTextInput, onExpenseChange }) {
  const expenseTypes = useSelector((state) => state.sopIncomeExpenditureReducer.expense)
  const checkedExpenseCodes = useSelector((state) => state.sopIncomeExpenditureReducer.checkedExpenseCodes)
  const expenseTypeValues = Object.values(expenseTypes)

  const autoCompleteItems = expenseTypeValues.map((expense) => {
    return expense.autoComplete
  })

  const selectedExpenses = autoCompleteItems.filter((item) => {
    return checkedExpenseCodes.includes(item.code)
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
          id='expense-types-checkbox'
          size='small'
          value={selectedExpenses}
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
                <Typography variant={checkedExpenseCodes.length === 0 ? 'subtitle2' : 'caption'} sx={{ p: 0, m: 0, fontSize: checkedExpenseCodes.length === 0 ? 14 : 10 }}>
                  {helperTextInput}
                </Typography>
              }
              fullWidth
              {...params}
              label='Select your Expenses'
            />
          )}
          onChange={(event, value) => {
            onExpenseChange(event, value)
            onChange(value)
            onBlur(value)
          }}
        />
      )}
    />
  )
}
