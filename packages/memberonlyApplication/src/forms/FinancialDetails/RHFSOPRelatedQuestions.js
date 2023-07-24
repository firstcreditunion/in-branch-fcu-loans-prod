import React, { useEffect } from 'react'

//* MUI
import { Stack, Typography, MenuItem, Divider, Box, TextField } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import Tooltip from '@mui/material/Tooltip'
import Chip from '@mui/material/Chip'

//* MUI Icons
import DoneIcon from '@mui/icons-material/Done'
import WarningIcon from '@mui/icons-material/Warning'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'

//* Redux
import { useDispatch, useSelector } from 'react-redux'
import { sopRelatedQuestionActions } from '../../redux/slices/sopRelatedQuestionsSlice'

import { baseRateTypes, creditHistoryTypes, securityTypes } from '../../redux/codes/LoanDetailsCodes'

//* RHF And Yup
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

//* RHF Components
import FormProvider, { RHFEditor, RHFSelect, RHFUpload, RHFSwitch, RHFSlider, RHFCheckbox, RHFTextField, RHFRadioGroup, RHFMultiSelect, RHFAutocomplete, RHFMultiCheckbox } from '../../components/RHF-mui-compoments'

import { getDocumentType_FromValue, getCreditHistory_FromValue, getSecurity_FromKey } from '../../redux/codes/getKeysOrValues'
import { documentTypes } from '../../redux/codes/DocumentType'

export default function LoanDetails() {
  const dispatch = useDispatch()

  // Redux Selectors
  const isIncomeExpensetestComplete = useSelector((state) => state.sopRelatedQuestionsReducer.isIncomeExpensetestComplete)
  const incomeOverEstimatedComment = useSelector((state) => state.sopRelatedQuestionsReducer.incomeOverEstimatedComment)
  const expenseUnderEstimatedComment = useSelector((state) => state.sopRelatedQuestionsReducer.expenseUnderEstimatedComment)
  const otherExpenses = useSelector((state) => state.sopRelatedQuestionsReducer.otherExpenses)
  const canPayWithoutSufferingHardship = useSelector((state) => state.sopRelatedQuestionsReducer.canPayWithoutSufferingHardship)
  const onSubmitResponsibleLending = useSelector((state) => state.sopRelatedQuestionsReducer.onSubmitResponsibleLending)
  const isValidResponsibleLending = useSelector((state) => state.sopRelatedQuestionsReducer.isValidResponsibleLending)

  // Defualt Values for React Hook Form
  const defaultValues = {
    isIncomeExpensetestComplete: isIncomeExpensetestComplete,
    incomeOverEstimatedComment: incomeOverEstimatedComment,
    expenseUnderEstimatedComment: expenseUnderEstimatedComment,
    otherExpenses: otherExpenses,
    canPayWithoutSufferingHardship: canPayWithoutSufferingHardship,
  }

  // Schema
  const ResponsibleLendingSchema = Yup.object().shape({
    isIncomeExpensetestComplete: Yup.string().required('Please choose an option.'),
    incomeOverEstimatedComment: Yup.string().required('Please add notes.'),
    expenseUnderEstimatedComment: Yup.string().required('Please add notes.'),
    otherExpenses: Yup.string().required('Please add notes.'),
    canPayWithoutSufferingHardship: Yup.string().required('Please choose an option.'),
  })

  //UseForm Methods from RHF
  const methods = useForm({
    resolver: yupResolver(ResponsibleLendingSchema),
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

  // Redux dispatch functions
  function setIsIncomeExpensetestComplete(event) {
    dispatch(sopRelatedQuestionActions.setIsIncomeExpensetestComplete(event.target.value))
  }

  function setIncomeOverEstimatedComment(event) {
    dispatch(sopRelatedQuestionActions.setIncomeOverEstimatedComment(event.target.value))
  }
  function setExpenseUnderEstimatedComment(event) {
    dispatch(sopRelatedQuestionActions.setExpenseUnderEstimatedComment(event.target.value))
  }
  function setOtherExpenses(event) {
    dispatch(sopRelatedQuestionActions.setOtherExpenses(event.target.value))
  }

  function setCanPayWithoutSufferingHardship(event) {
    dispatch(sopRelatedQuestionActions.setCanPayWithoutSufferingHardship(event.target.value))
  }

  useEffect(() => {
    if (onSubmitResponsibleLending == null) return

    handleSubmit(onSubmit())()
  }, [onSubmitResponsibleLending])

  useEffect(() => {
    dispatch(sopRelatedQuestionActions.setIsValidResponsibleLending(isValid))
  }, [isValid])

  const incomeExpenseTests = [
    { key: 'Y', value: '', loanDecision: 'submit' },
    { key: 'N', value: '', loanDecision: 'submit' },
  ]

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction='column' justifyContent='flex-start' alignItems='center' spacing={2} sx={{ flexGrow: 1, minWidth: '100%', pb: 7 }}>
          <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={2} sx={{ width: '100%', py: 3, m: 0 }}>
            <Divider flexItem>
              <Chip label='Income vs Expense Test' color='primary' />
            </Divider>
          </Stack>
          <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={2} sx={{ width: '100%', p: 0, m: 0 }}>
            <Typography variant='body1' color='primary' sx={{ fontWeight: 'bold' }}>
              1. Full Income and Expense Estimate Test (Reg 4AF) Completed?
            </Typography>
            <RHFRadioGroup
              row
              name='isIncomeExpensetestComplete'
              spacing={4}
              onRadioChange={setIsIncomeExpensetestComplete}
              value={isIncomeExpensetestComplete}
              sx={{ px: 3 }}
              options={[
                { value: 'Y', label: 'Yes - The full income vs expense test completed with sufficient Surplus evident.' },
                { value: 'N', label: 'No - The full income vs expense test is not complete. The loan will be withdrawn or declined' },
              ]}
            />
          </Stack>

          <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={2} sx={{ width: '100%', py: 3, m: 0 }}>
            <Divider flexItem>
              <Chip label='Financial Hardship' color='primary' />
            </Divider>
          </Stack>
          <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={2} sx={{ width: '100%', p: 0, m: 0 }}>
            <Typography variant='body1' color='primary' sx={{ fontWeight: 'bold' }}>
              2. Is there is a reasonable surplus OR reasonable buffers/adjustments to adequately address the risk that either:
            </Typography>
            <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={5} sx={{ width: '100%', p: 0, m: 0 }}>
              <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={1} sx={{ width: '100%', p: 0, m: 0 }}>
                <Typography variant='body2' sx={{ fontWeight: 'light', color: 'text.secondary' }}>
                  - Likely income may be overestimated
                </Typography>
                <RHFTextField name='incomeOverEstimatedComment' label='Likely income overestimation notes' multiline rows={3} variant='filled' onInputChange={setIncomeOverEstimatedComment} value={incomeOverEstimatedComment} />
              </Stack>
              <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={1} sx={{ width: '100%', p: 0, m: 0 }}>
                <Typography variant='body2' sx={{ fontWeight: 'light', color: 'text.secondary' }}>
                  - Likely relevant expenses may be underestimated
                </Typography>
                <RHFTextField name='expenseUnderEstimatedComment' label='Likely expense underestimation notes' multiline rows={3} variant='filled' onInputChange={setExpenseUnderEstimatedComment} value={expenseUnderEstimatedComment} />
              </Stack>
              <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={1} sx={{ width: '100%', p: 0, m: 0 }}>
                <Typography variant='body2' sx={{ fontWeight: 'light', color: 'text.secondary' }}>
                  - Or borrower may incur other expenses that cause them to suffer substantial hardship?
                </Typography>
                <RHFRadioGroup
                  row
                  name='otherExpenses'
                  spacing={4}
                  onRadioChange={setOtherExpenses}
                  value={otherExpenses}
                  sx={{ px: 3 }}
                  options={[
                    { value: 'Y', label: 'No other expenses identified or likely that may cause the member to suffer financial hardship.' },
                    { value: 'N', label: 'Other expenses identified which may lead to financial hardship. The loan will be withdrawn/declined.' },
                  ]}
                />
              </Stack>
            </Stack>
          </Stack>
          <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={2} sx={{ width: '100%', py: 3, m: 0 }}>
            <Divider flexItem>
              <Chip label='Final Assesment' color='primary' />
            </Divider>
          </Stack>
          <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={2} sx={{ width: '100%', p: 0, m: 0 }}>
            <Typography variant='body1' color='primary' sx={{ fontWeight: 'bold' }}>
              3. Based on the above answers, are you satisfied on reasonable grounds that the borrower will be able to make payments without suffering substantial hardship
            </Typography>
            <RHFRadioGroup
              row
              name='canPayWithoutSufferingHardship'
              spacing={4}
              onRadioChange={setCanPayWithoutSufferingHardship}
              value={canPayWithoutSufferingHardship}
              sx={{ px: 3 }}
              options={[
                {
                  value: 'Y',
                  label: 'Yes, the borrower will be able to make repayments without suffering substantial hardship.',
                },
                {
                  value: 'N',
                  label: 'No, the borrower may suffer financial hardship. The loan will be withdrawn/ declined.',
                },
              ]}
            />
          </Stack>
        </Stack>
      </FormProvider>
    </>
  )
}
