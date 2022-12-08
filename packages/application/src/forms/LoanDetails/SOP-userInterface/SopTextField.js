import React from 'react'
import TextField_Cust from '../../../components/ui/mui-custom-styled-components/TextField_Custom'

import { Controller } from 'react-hook-form'

//* Third-party
import { NumericFormat } from 'react-number-format'

import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import { Divider, FormControl, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

const AmountFormat = React.forwardRef(function AmountFormat(props, ref) {
  const { onChange, ...other } = props

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        })
      }}
      thousandSeparator={true}
    />
  )
})

export default function SOPTextField({ control, label, name, onSopTextFieldChange, helperTextInput, frequencyUnit, dialogContentText, defaultValue, type, frequencyChange, radioValue, ...props }) {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const nameradio = `sop${label}radio`
  const namebutton = `sop${label}button`
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <Stack direction='column' justifyContent='flex-start' alignItems='flex-start'>
          <TextField_Cust
            size='small'
            fullWidth
            type={type}
            label={label}
            value={parseInt(value)}
            error={error}
            placeholder='0.00'
            helperText={
              <Typography variant='caption' sx={{ p: 0, m: 0, fontSize: 10 }}>
                {helperTextInput}
              </Typography>
            }
            InputProps={{
              startAdornment: <InputAdornment position='start'>$</InputAdornment>,
              inputComponent: AmountFormat,
              endAdornment: (
                <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={1}>
                  <Divider orientation='vertical' flexItem />
                  <Button key={namebutton} size='small' onClick={handleClickOpen} endIcon={<ArrowDropDownRoundedIcon />}>
                    {frequencyUnit === 'M' ? 'Monthly' : frequencyUnit === 'F' ? 'Fortnightly' : 'Weekly'}
                  </Button>
                  <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                    <DialogTitle id='sop-frequency-title'>
                      <Stack direction='column' sx={{ mb: 2 }}>
                        <Typography variant='h6'>Income Frequency</Typography>
                        <Typography variant='subtitle1' sx={{ fontSize: 10 }}>
                          {dialogContentText}
                        </Typography>
                      </Stack>
                    </DialogTitle>
                    <DialogContent>
                      <FormControl component='fieldset' margin='none' fullWidth variant='outlined'>
                        <RadioGroup aria-label={nameradio} name={nameradio} value={radioValue} onChange={frequencyChange}>
                          <FormControlLabel value='W' control={<Radio />} label='Weekly' />
                          <FormControlLabel value='F' control={<Radio />} label='Fortnightly' />
                          <FormControlLabel value='M' control={<Radio />} label='Monthly' />
                        </RadioGroup>
                      </FormControl>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button onClick={handleClose}>Ok</Button>
                    </DialogActions>
                  </Dialog>
                </Stack>
              ),
            }}
            {...props}
            onChange={(value) => {
              onSopTextFieldChange(value)
              onChange(value)
              onBlur(value)
            }}
          />
          {!!error && (
            <FormHelperText margin='dense' error sx={{ px: 2 }}>
              {error.message}
            </FormHelperText>
          )}
        </Stack>
      )}
    />
  )
}
