import React from 'react'
import TextField_Cust from '../../../components/ui/mui-custom-styled-components/TextField_Custom'
import Autocomplete from '@mui/material/Autocomplete'

import { Controller } from 'react-hook-form'

import { tradingBranch } from '../Codes/PrelimaryQuestionCodes'

export default function ComboBox({ name, value, onTradingBranchChange, AutoCompleteLabel, control, helperText, defualtValue, tradingBranchError }) {
  const tradingBranchId = `${name}-id`
  return (
    <Controller
      rules={{
        required: true,
      }}
      render={({ field: { onChange, onBlur } }) => (
        <Autocomplete
          id={tradingBranchId}
          disablePortal
          autoHighlight
          fullWidth={true}
          sx={{
            maxWidth: 400,
          }}
          id='trading-branch-combobox'
          options={tradingBranch}
          getOptionLabel={(option) => option.value}
          renderInput={(params) => <TextField_Cust {...params} label='Trading Branch' helperText='' />}
          onChange={(event, value) => {
            onTradingBranchChange(event, value)
            onChange(value)
            onBlur(value)
          }}
        />
      )}
      name={name}
      control={control}
      defaultValue={defualtValue}
    />
  )
}
