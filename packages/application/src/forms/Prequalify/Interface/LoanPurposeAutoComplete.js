import React from 'react'
import TextField_Cust from '../../../components/ui/mui-custom-styled-components/TextField_Custom'
import Autocomplete from '@mui/material/Autocomplete'

import { Controller } from 'react-hook-form'

import { loanPurpose } from '../Codes/PrelimaryQuestionCodes'

export default function ComboBox({ name, value, onLoanPurposeChange, AutoCompleteLabel, control, helperText, defualtValue, loanPurposeError }) {
  const loanPurposeId = `${name}-id`
  return (
    <Controller
      rules={{
        required: true,
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <Autocomplete
          id={loanPurposeId}
          autoHighlight
          fullWidth={true}
          sx={{
            maxWidth: 400,
          }}
          options={loanPurpose}
          value={value}
          getOptionLabel={(option) => option.value}
          renderInput={(params) => <TextField_Cust {...params} label='Loan Purpose' helperText='' />}
          onChange={(event, value) => {
            onLoanPurposeChange(event, value)
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
