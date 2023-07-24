import React, { useEffect, useState } from 'react'

//* Redux
import { useDispatch, useSelector } from 'react-redux'

//* MUI
import { Typography, Stack, Divider, Chip, Switch, MenuItem, Button, IconButton, Tooltip } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { paymentInstructionActions } from '../redux/slices/paymentInstructionSlice'

//* RHF And Yup
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

import FormProvider from '../components/RHF-mui-compoments/FormProvider'
import { RHFSelect } from '../components/RHF-mui-compoments'

import DeleteIcon from '@mui/icons-material/Delete'

const InstalmentDebit = () => {
  const dispatch = useDispatch()

  const primeclientNumber = useSelector((state) => state.clientSearchReducer.primeclientNumber)
  const primeBankAccountNumbers = useSelector((state) => state.clientSearchReducer.primeBankAccountNumbers)
  const backAccountForInstalmentDebit = useSelector((state) => state.paymentInstructionReducer.backAccountForInstalmentDebit)

  const zeroConcatClientNumber = '0000000000' + primeclientNumber.toString()
  const zeroPaddedClientNumber = zeroConcatClientNumber.substring(zeroConcatClientNumber.length - 10, zeroConcatClientNumber.length)

  const selectedBankAccountTitle = primeBankAccountNumbers?.filter((bankAccountNumber) => {
    return bankAccountNumber?.accountNumber === backAccountForInstalmentDebit
  })[0]?.title

  let primeBankAccountNumbersLength = 0
  primeBankAccountNumbersLength = primeBankAccountNumbers?.length

  // Defualt Values for React Hook Form
  const defaultValues = {
    backAccountForInstalmentDebit: backAccountForInstalmentDebit,
  }
  const paymentInstructSchema = Yup.object().shape({
    backAccountForInstalmentDebit: Yup.string(),
  })

  //UseForm Methods from RHF
  const methods = useForm({
    resolver: yupResolver(paymentInstructSchema),
    defaultValues,
  })

  // Destructure Methods
  const {
    watch,
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods

  const onSubmit = (event) => {
    // console.log('On Submit Loan Details')
  }

  function setBackAccountForInstalmentDebit(event) {
    dispatch(paymentInstructionActions.setBackAccountForInstalmentDebit(event.target.value))
  }

  function deleteBankAccount(event) {
    dispatch(paymentInstructionActions.setBackAccountForInstalmentDebit(null))
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [])

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction='column' justifyContent='flex-start' alignItems='center' spacing={5} sx={{ pb: 2 }}>
          <Stack direction='column' justifyContent='center' alignItems='center' spacing={0} sx={{ width: '100%' }}>
            <Typography
              variant='h4'
              color='primary'
              sx={{
                textAlign: 'center',
                textTransform: 'uppercase',
                fontWeight: 'light',
                letterSpacing: 3,
              }}
            >
              Instalment Debit
            </Typography>
            <Typography
              variant='body2'
              color='secondary'
              sx={{
                textAlign: 'center',
                textTransform: 'uppercase',
                fontWeight: 'light',
                pb: 3,
                letterSpacing: 1,
              }}
            >
              Create a Payment Instruction for Repayment
            </Typography>
          </Stack>

          <Grid container sx={{ width: '100%' }}>
            <Grid direction='column' justifyContent='flex-start' alignItems='center' md={12}>
              {primeBankAccountNumbersLength > 0 && (
                <Stack direction='column' justifyContent='center' alignItems='center' spacing={0} sx={{ width: '100%', pb: 10 }}>
                  <Typography variant='overline' color='primary'>
                    Choose an account
                  </Typography>
                  <Typography variant='caption' sx={{ color: 'common.black' }}>
                    Click the dropdown to view all the active funding accounts assosiated member number - <strong>#{zeroPaddedClientNumber}</strong>
                  </Typography>
                  <Stack direction='column' justifyContent='center' alignItems='center' spacing={5} sx={{ width: '100%', py: 2, maxWidth: 500 }}>
                    <Stack direction='row' justifyContent='center' alignItems='center' spacing={2} sx={{ width: '100%' }}>
                      <RHFSelect name='backAccountForInstalmentDebit' label='Bank Accounts' value={backAccountForInstalmentDebit} onSelectChange={setBackAccountForInstalmentDebit}>
                        <MenuItem value='' disabled>
                          Select Bank Account
                        </MenuItem>
                        <Divider sx={{ borderStyle: 'dashed' }} />
                        {primeBankAccountNumbers.map((account) => (
                          <MenuItem key={account?.accountNumber} value={account?.accountNumber}>
                            {account?.accountNumber} - {account?.title}
                          </MenuItem>
                        ))}
                      </RHFSelect>
                    </Stack>

                    {backAccountForInstalmentDebit != null && backAccountForInstalmentDebit != '' && (
                      <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={2} sx={{ py: 3 }}>
                        <Divider flexItem>
                          <Chip label='Selected Bank Account' color='secondary' />
                        </Divider>
                        <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={1} sx={{ py: 3 }}>
                          <Typography variant='overline' color='primary'>
                            100% of the instalment amount will be debited from:
                          </Typography>
                          <Typography>Account Title: {selectedBankAccountTitle}</Typography>
                          <Typography>Bank Account Number: {backAccountForInstalmentDebit}</Typography>
                        </Stack>
                        <Stack direction='row' justifyContent='center' alignItems='center' spacing={1} sx={{ width: '100%' }}>
                          <Button onClick={deleteBankAccount} startIcon={<DeleteIcon color='primary' />}>
                            Remove Payment Instruction
                          </Button>
                        </Stack>
                      </Stack>
                    )}
                  </Stack>
                </Stack>
              )}

              {primeBankAccountNumbersLength === 0 && (
                <Stack direction='column' justifyContent='center' alignItems='center' spacing={1} sx={{ width: '100%', minHeight: '50vh' }}>
                  <Typography variant='h6' color='primary'>
                    Member does not have a funding account in G3.
                  </Typography>
                  <Typography variant='h6' color='secondary'>
                    Please click <strong>continue</strong> to submit loan application.
                  </Typography>
                </Stack>
              )}
            </Grid>
          </Grid>
        </Stack>
      </FormProvider>
    </>
  )
}

export default InstalmentDebit
