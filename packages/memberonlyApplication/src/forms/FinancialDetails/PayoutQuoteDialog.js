import React, { useEffect, useState } from 'react'

//* MUI
import { Stack, Typography, MenuItem, Divider, Box, Button, Paper } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import Tooltip from '@mui/material/Tooltip'
import Chip from '@mui/material/Chip'
import LoadingButton from '@mui/lab/LoadingButton'

//* Custom Components
import ComponentBlock from '../../layouts/ComponentBlock'

//* MUI Icons
import DoneIcon from '@mui/icons-material/Done'
import SearchIcon from '@mui/icons-material/Search'
import WarningIcon from '@mui/icons-material/Warning'
import ErrorIcon from '@mui/icons-material/Error'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'

//* MUI - Dialog
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

//* Redux
import { useDispatch, useSelector } from 'react-redux'
import { loanDetailsActions, getPayoutQuote, createPayoutQuote } from '../../redux/slices/loanDetailsSlice'
import { clientSearchActions, getPrimeClientGeneralDetails } from '../../redux/slices/clientSearchSlice'
import { additionalInfoPart2Actions } from '../../redux/slices/additionalInfoPart2Slice'

import { baseRateTypes, creditHistoryTypes, securityTypes } from '../../redux/codes/LoanDetailsCodes'
import { dayOfWeek } from '../../redux/codes/DayOfWeek'

//* date-fnss
import addDays from 'date-fns/addDays'
import { isDate } from 'date-fns'

//* Utils
import { getDateArrayFromStartDateAndEndDate } from '../../utils/dateUtilityFunctions'
import { fCurrency } from '../../utils/formatNumber'
import { fDate } from '../../utils/formatDateTime'

//* RHF And Yup
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

//* API Utils
import { BASE_URL_LOCAL_APP, BASE_URL_AWS_APP, processNodeEnv } from '../../redux/utils/apiConstants'

//* RHF Components
import FormProvider, { RHFEditor, RHFSelect, RHFUpload, RHFSwitch, RHFSlider, RHFCheckbox, RHFTextField, RHFRadioGroup, RHFMultiSelect, RHFAutocomplete, RHFMultiCheckbox, RHFLandscapeDatePicker } from '../../components/RHF-mui-compoments'

import { getDocumentType_FromValue, getCreditHistory_FromValue, getSecurity_FromKey } from '../../redux/codes/getKeysOrValues'
import { documentTypes } from '../../redux/codes/DocumentType'
import { fontWeight } from '@mui/system'

const PayoutQuoteDialog = ({ openDialog = false, setOpenCostRecoveryModalParent }) => {
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)
  const [openCostRecoveryModal, setOpenCostRecoveryModal] = useState(openDialog)

  const handleOpenCostRecoveryModal = () => setOpenCostRecoveryModal(true)

  function handleCloseCostRecoveryModal(event, reason) {
    setOpenCostRecoveryModal(false)
    setOpenCostRecoveryModalParent(false)
  }

  const payoutquoteloading = useSelector((state) => state.loanDetailsReducer.payoutquoteloading)
  const payoutquoteerror = useSelector((state) => state.loanDetailsReducer.payoutquoteerror)
  const payoutquotecurrentRequestId = useSelector((state) => state.loanDetailsReducer.payoutquotecurrentRequestId)
  const payoutQuote_created = useSelector((state) => state.loanDetailsReducer.payoutQuote_created)

  const primeClientNumber = useSelector((state) => state.clientSearchReducer.primeclientNumber)
  const payoutLendingAccountNumber = useSelector((state) => state.loanDetailsReducer.payoutLendingAccountNumber)
  const requestedLoanAmount = useSelector((state) => state.loanDetailsReducer.requestedLoanAmount)
  const memberOnlyLoanThreshold = useSelector((state) => state.loanDetailsReducer.memberOnlyLoanThreshold)

  const payoutAcc_arrearsBalance = useSelector((state) => state.loanDetailsReducer.payoutAcc_arrearsBalance)
  const payoutAcc_balanceOutstanding = useSelector((state) => state.loanDetailsReducer.payoutAcc_balanceOutstanding)
  const payoutAcc_bankAccountNumber = useSelector((state) => state.loanDetailsReducer.payoutAcc_bankAccountNumber)
  const payoutAcc_client = useSelector((state) => state.loanDetailsReducer.payoutAcc_client)
  const payoutAcc_contractEffectiveDate = useSelector((state) => state.loanDetailsReducer.payoutAcc_contractEffectiveDate)
  const payoutAcc_externalAccountNumber = useSelector((state) => state.loanDetailsReducer.payoutAcc_externalAccountNumber)
  const payoutAcc_productDescription = useSelector((state) => state.loanDetailsReducer.payoutAcc_productDescription)
  const payoutAcc_reportingName = useSelector((state) => state.loanDetailsReducer.payoutAcc_reportingName)
  const payoutAcc_startDate = useSelector((state) => state.loanDetailsReducer.payoutAcc_startDate)
  const payoutAcc_status = useSelector((state) => state.loanDetailsReducer.payoutAcc_status)
  const payoutAcc_statusCode = useSelector((state) => state.loanDetailsReducer.payoutAcc_statusCode)

  let startDateConverted = ''

  const startDateIsDate = isDate(payoutAcc_startDate)

  if (startDateIsDate) {
    startDateConverted = fDate(startDateIsDate)
  }

  useEffect(() => {
    if (openDialog) {
      handleOpenCostRecoveryModal()
      return
    }

    return
  }, [openDialog])

  console.log('payoutAcc_arrearsBalance: ', payoutAcc_arrearsBalance)
  console.log('payoutAcc_balanceOutstanding: ', payoutAcc_balanceOutstanding)

  // Defualt Values for React Hook Form
  const defaultValues = {
    payoutLendingAccountNumber: payoutLendingAccountNumber,
  }

  // Schema
  const PyaoutQuoteSchema = Yup.object().shape({
    payoutLendingAccountNumber: Yup.string().required('Lending account number is required').nullable(),
  })

  //UseForm Methods from RHF
  const methods = useForm({
    resolver: yupResolver(PyaoutQuoteSchema),
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

  async function getPayoutQuoteDetails() {
    //? Data before searching for a new client number

    if (payoutLendingAccountNumber === '' || payoutLendingAccountNumber === null || payoutLendingAccountNumber === undefined) return

    var accountData = JSON.stringify({
      clientNumber: primeClientNumber,
      lendingNumber: payoutLendingAccountNumber,
    })

    const payoutConfig = {
      url: `/lending-details?lendingNumber=${payoutLendingAccountNumber}`,
      method: 'GET',
      baseURL: `${processNodeEnv() === 'development' ? BASE_URL_LOCAL_APP : BASE_URL_AWS_APP}`,
      headers: { 'Content-Type': 'application/json' },
      timeout: 5000,
    }

    await dispatch(getPayoutQuote(payoutConfig))
  }

  async function createPayoutQuoteDetails() {
    //? Data before searching for a new client number

    var accountData = JSON.stringify({
      externalNumber: payoutLendingAccountNumber,
    })

    const payoutConfig = {
      url: '/payout-quotation',
      method: 'POST',
      baseURL: `${processNodeEnv() === 'development' ? BASE_URL_LOCAL_APP : BASE_URL_AWS_APP}`,
      headers: { 'Content-Type': 'application/json' },
      timeout: 5000,
      data: accountData,
    }

    await dispatch(getPayoutQuote(payoutConfig))
  }

  function setPayoutLendingAccountNumber(event) {
    dispatch(loanDetailsActions.setPayoutLendingAccountNumber(event.target.value))
  }

  function setPayoutQuote_created(event) {
    dispatch(loanDetailsActions.setPayoutQuote_created(true))
  }

  async function handleCloseAndCreatePayoutQuote() {
    await createPayoutQuoteDetails()

    setPayoutQuote_created()
  }

  const onSubmit = (event) => {
    console.log('On Submit')
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Dialog open={openCostRecoveryModal} onClose={handleCloseCostRecoveryModal} fullWidth={true} maxWidth='md'>
        <DialogTitle>
          <Stack direction='column'>
            <Typography variant='h6' color='primary' sx={{ fontWeight: 'bold' }}>
              Payout Quotation
            </Typography>
            <Divider sx={{ width: '100%', my: 2 }} />
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Paper sx={{ width: '100%' }}>
            <Stack direction='column' spacing={2} sx={{ width: '100%' }}>
              <Stack direction='column' justifyContent='space-between' alignItems='center' sx={{ py: 3 }}>
                <RHFTextField
                  name='payoutLendingAccountNumber'
                  placeholder='Search Lending Account'
                  label=''
                  autoFocus={true}
                  onInputChange={setPayoutLendingAccountNumber}
                  value={payoutLendingAccountNumber}
                  sx={{ maxWidth: 400 }}
                  InputProps={{
                    type: 'number',
                    startAdornment: (
                      <InputAdornment position='start'>
                        <SearchIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position='end'>
                        <LoadingButton onClick={getPayoutQuoteDetails} loading={payoutquoteloading === 'PENDING'} type='submit' variant='contained' color='secondary' sx={{ borderRadius: 20 }}>
                          Search
                        </LoadingButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
              {payoutquotecurrentRequestId != null && (
                <>
                  <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
                    <Typography variant='body1' sx={{ fontWeight: 'light' }}>
                      Account Name
                    </Typography>
                    <Typography variant='subtitle2'>{payoutAcc_reportingName}</Typography>
                  </Stack>
                  <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
                    <Typography variant='body1' sx={{ fontWeight: 'light' }}>
                      Account Start Date
                    </Typography>
                    <Typography variant='subtitle2'>{startDateConverted}</Typography>
                  </Stack>
                  <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
                    <Typography variant='body1' sx={{ fontWeight: 'light' }}>
                      Account Status
                    </Typography>
                    <Typography variant='subtitle2'>{payoutAcc_status}</Typography>
                  </Stack>
                  <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
                    <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={1}>
                      <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={1}>
                        <Typography variant='body1' sx={{ fontWeight: 'light' }}>
                          Outstanding Balance
                        </Typography>
                        {payoutAcc_balanceOutstanding + requestedLoanAmount > memberOnlyLoanThreshold && (
                          <Tooltip title={`Total aggregate balance is above the threshold - ${fCurrency(memberOnlyLoanThreshold)}`}>
                            <ErrorIcon fontSize='small' color='error' />
                          </Tooltip>
                        )}
                      </Stack>
                      <Typography variant='caption' sx={{ color: 'error.main' }}>
                        Total aggregate balance is above the threshold - {fCurrency(memberOnlyLoanThreshold)}
                      </Typography>
                    </Stack>

                    <Typography variant='subtitle2'>{fCurrency(payoutAcc_balanceOutstanding)}</Typography>
                  </Stack>
                  <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
                    <Typography variant='body1' sx={{ fontWeight: 'light' }}>
                      Arrears Balance
                    </Typography>
                    <Typography variant='subtitle2'>{fCurrency(payoutAcc_arrearsBalance)}</Typography>
                  </Stack>
                  <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
                    <Typography variant='body1' sx={{ fontWeight: 'light' }}>
                      Bank Account Number
                    </Typography>
                    <Typography variant='subtitle2'>{payoutAcc_bankAccountNumber}</Typography>
                  </Stack>
                </>
              )}
            </Stack>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCostRecoveryModal} autoFocus>
            Cancel
          </Button>
          {/* //! Add Disabled prop for ampunts above the thresold */}
          <Button onClick={handleCloseAndCreatePayoutQuote} variant='contained' sx={{ borderRadius: 10 }}>
            Create Quote
          </Button>
        </DialogActions>
      </Dialog>
    </FormProvider>
  )
}

export default PayoutQuoteDialog

// disabled={payoutAcc_balanceOutstanding + requestedLoanAmount > memberOnlyLoanThreshold}
