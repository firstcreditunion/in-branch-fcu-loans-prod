import React, { useEffect } from 'react'

//* Framer
import { motion, AnimatePresence } from 'framer-motion'
import { varFade } from '../../components/animate'

//* MUI
import { Stack, Typography, MenuItem, Divider, Box, FormControl, FormHelperText, TextField } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'

//* MUI Icons
import WarningIcon from '@mui/icons-material/Warning'
import DoneIcon from '@mui/icons-material/Done'

//* Redux
import { useDispatch, useSelector } from 'react-redux'
import { creditScoreActions } from '../../redux/slices/creditScoreSlice'

import { baseRateTypes, creditHistoryTypes, securityTypes } from '../../redux/codes/LoanDetailsCodes'

//* RHF And Yup
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

//* API Utils
import { BASE_URL_LOCAL_APP, BASE_URL_AWS_APP, processNodeEnv } from '../../redux/utils/apiConstants'

//* RHF Components
import FormProvider, { RHFEditor, RHFSelect, RHFUpload, RHFSwitch, RHFSlider, RHFCheckbox, RHFTextField, RHFRadioGroup, RHFMultiSelect, RHFAutocomplete, RHFMultiCheckbox } from '../../components/RHF-mui-compoments'

import { fCurrency } from '../../utils/formatNumber'

const RFHCreditScore = () => {
  const dispatch = useDispatch()

  // Redux Selectors
  const isCreditScoreComplete = useSelector((state) => state.creditScoreReducer.isCreditScoreComplete)
  const isScoreExceedsThreshold = useSelector((state) => state.creditScoreReducer.isScoreExceedsThreshold)
  const creditScoreThreshold = useSelector((state) => state.creditScoreReducer.creditScoreThreshold)
  const hasUnpaidDefualtCollections = useSelector((state) => state.creditScoreReducer.hasUnpaidDefualtCollections)
  const detailsUnpaidDefualt = useSelector((state) => state.creditScoreReducer.detailsUnpaidDefualt)

  const isMemberUnderHardship = useSelector((state) => state.creditScoreReducer.isMemberUnderHardship)
  const hasMemberBeenBankrupt = useSelector((state) => state.creditScoreReducer.hasMemberBeenBankrupt)
  const isMemberInArrearsWithFCU = useSelector((state) => state.creditScoreReducer.isMemberInArrearsWithFCU)

  const fcuArrearsBalance = useSelector((state) => state.clientSearchReducer.primeLending.totalArrears)
  const fcuActiveRecvAccounts = useSelector((state) => state.clientSearchReducer.primeRecovery.activeAccountCount)

  const creditBeingSought = useSelector((state) => state.creditScoreReducer.creditBeingSought)
  const termForCreditBeingSought = useSelector((state) => state.creditScoreReducer.termForCreditBeingSought)

  const onSubmitCreditScoreDetails = useSelector((state) => state.creditScoreReducer.onSubmitCreditScoreDetails)

  // Defualt Values for React Hook Form
  const defaultValues = {
    isCreditScoreComplete: isCreditScoreComplete,
    isScoreExceedsThreshold: isScoreExceedsThreshold,
    hasUnpaidDefualtCollections: hasUnpaidDefualtCollections,
    detailsUnpaidDefualt: detailsUnpaidDefualt,
    isMemberUnderHardship: isMemberUnderHardship,
    hasMemberBeenBankrupt: hasMemberBeenBankrupt,
    isMemberInArrearsWithFCU: isMemberInArrearsWithFCU,
    creditBeingSought: creditBeingSought,
    termForCreditBeingSought: termForCreditBeingSought,
  }

  // Schema
  const CreditScoreSchema = Yup.object().shape({
    isCreditScoreComplete: Yup.string().required('Please choose an option.'),
    isScoreExceedsThreshold: Yup.string().when('isCreditScoreComplete', {
      is: (isCreditScoreComplete) => {
        return isCreditScoreComplete === 'Y'
      },
      then: Yup.string().required('Please choose an option.'),
      otherwise: Yup.string().nullable(),
    }),
    hasUnpaidDefualtCollections: Yup.string().when('isCreditScoreComplete', {
      is: (isCreditScoreComplete) => {
        return isCreditScoreComplete === 'Y'
      },
      then: Yup.string().required('Please choose an option.'),
      otherwise: Yup.string().nullable(),
    }),
    detailsUnpaidDefualt: Yup.string(),
    isMemberUnderHardship: Yup.string().required('Please choose an option.'),
    hasMemberBeenBankrupt: Yup.string().required('Please choose an option.'),
    isMemberInArrearsWithFCU: Yup.string(),
    creditBeingSought: Yup.string().required('Please add notes.'),
    termForCreditBeingSought: Yup.string().required('Please add notes.'),
  })

  //UseForm Methods from RHF
  const methods = useForm({
    resolver: yupResolver(CreditScoreSchema),
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
    console.log('On Submit Loan Details')
  }

  // Redux dispatch functions
  function setIsCreditScoreComplete(event) {
    dispatch(creditScoreActions.setIsCreditScoreComplete(event.target.value))

    console.log('Is Credit Check Complete? - ', event.target.value)

    if (event.target.value === 'N') {
      dispatch(creditScoreActions.setCreditScoreExceedsThreshold(''))
      dispatch(creditScoreActions.setHasUnpaidDefaultCollections(''))
      dispatch(creditScoreActions.setDetailsUnpaidDefault(''))
    }
  }
  function setCreditScoreExceedsThreshold(event) {
    dispatch(creditScoreActions.setCreditScoreExceedsThreshold(event.target.value))
  }
  function setHasUnpaidDefaultCollections(event) {
    dispatch(creditScoreActions.setHasUnpaidDefaultCollections(event.target.value))

    if (event.target.value === 'N') {
      dispatch(creditScoreActions.setDetailsUnpaidDefault(''))
    }
  }
  function setDetailsUnpaidDefault(event) {
    dispatch(creditScoreActions.setDetailsUnpaidDefault(event.target.value))
  }

  function setIsMemberUnderHardship(event) {
    dispatch(creditScoreActions.setIsMemberUnderHardship(event.target.value))
  }
  function setHasMemberBeenBankrupt(event) {
    dispatch(creditScoreActions.setHasMemberBeenBankrupt(event.target.value))
  }
  function setIsMemberInArrearsWithFCU(event) {
    dispatch(creditScoreActions.setIsMemberInArrearsWithFCU(event.target.value))
  }

  function setCreditBeingSought(event) {
    dispatch(creditScoreActions.setCreditBeingSought(event.target.value))
  }
  function setTermForCreditBeingSought(event) {
    dispatch(creditScoreActions.setTermForCreditBeingSought(event.target.value))
  }
  useEffect(() => {
    if (onSubmitCreditScoreDetails == null) return

    handleSubmit(onSubmit())()
  }, [onSubmitCreditScoreDetails])

  useEffect(() => {
    dispatch(creditScoreActions.setIsValidCreditScoreDetails(isValid))
  }, [isValid])

  const varCreditScoreThreshold = isCreditScoreComplete
    ? varFade({
        distance: 50,
        durationIn: 0.32,
        durationOut: 0.32,
      }).inUp
    : varFade({
        distance: 50,
        durationIn: 0.32,
        durationOut: 0.32,
      }).outDown

  const varCreditScoreUnpaidDef = isCreditScoreComplete
    ? varFade({
        distance: 50,
        durationIn: 0.5,
        durationOut: 0.32,
      }).inUp
    : varFade({
        distance: 50,
        durationIn: 0.32,
        durationOut: 0.32,
      }).outDown

  const varCreditScoreUnpaidDefNotes =
    hasUnpaidDefualtCollections === 'Y'
      ? varFade({
          distance: 50,
          durationIn: 0.5,
          durationOut: 0.32,
        }).inUp
      : varFade({
          distance: 50,
          durationIn: 0.32,
          durationOut: 0.32,
        }).outDown

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack direction='column' alignItems='center' justifyContent='center' spacing={5} sx={{ flexGrow: 1, minWidth: '100%', pb: 7 }}>
        <Stack direction='column' justifyContent='flex-start' spacing={5} sx={{ width: '100%', pb: 3 }}>
          <Stack direction='column' justifyContent='center' alignItems='center' spacing={0} sx={{ width: '100%', p: 0, m: 0 }}>
            <Typography variant='overline' color='primary'>
              Is Credit Report Complete?
            </Typography>
            <RHFRadioGroup
              row
              name='isCreditScoreComplete'
              onRadioChange={setIsCreditScoreComplete}
              value={isCreditScoreComplete}
              spacing={10}
              options={[
                { value: 'Y', label: 'Yes' },
                { value: 'N', label: 'No' },
              ]}
            />
          </Stack>

          {isCreditScoreComplete === 'Y' && (
            <Stack key='isCreditScorecomp' component={motion.div} {...varCreditScoreThreshold} direction='column' justifyContent='center' alignItems='center' spacing={0} sx={{ width: '100%', p: 0, m: 0 }}>
              <Typography variant='overline' color='primary'>
                Did credit score exceed {creditScoreThreshold}?
              </Typography>
              <RHFRadioGroup
                row
                name='isScoreExceedsThreshold'
                onRadioChange={setCreditScoreExceedsThreshold}
                value={isScoreExceedsThreshold}
                spacing={10}
                options={[
                  { value: 'Y', label: 'Yes' },
                  { value: 'N', label: 'No' },
                ]}
              />
            </Stack>
          )}
          {isCreditScoreComplete === 'Y' && (
            <Stack key='unpDef' component={motion.div} {...varCreditScoreUnpaidDef} direction='column' justifyContent='center' alignItems='center' spacing={0} sx={{ width: '100%', p: 0, m: 0 }}>
              <Typography variant='overline' color='primary'>
                Does the member have any unpaid defaults?
              </Typography>
              <RHFRadioGroup
                row
                name='hasUnpaidDefualtCollections'
                onRadioChange={setHasUnpaidDefaultCollections}
                value={hasUnpaidDefualtCollections}
                spacing={10}
                options={[
                  { value: 'Y', label: 'Yes' },
                  { value: 'N', label: 'No' },
                ]}
              />
            </Stack>
          )}
          {hasUnpaidDefualtCollections === 'Y' && <RHFTextField component={motion.div} {...varCreditScoreUnpaidDefNotes} name='detailsUnpaidDefualt' label='Enter details about the unpaid default' multiline rows={4} variant='filled' onInputChange={setDetailsUnpaidDefault} value={detailsUnpaidDefualt} />}
        </Stack>

        <Stack direction='column' justifyContent='flex-start' spacing={5} sx={{ width: '100%', pb: 3 }}>
          <Stack direction='column' justifyContent='flex-start' spacing={1} sx={{ width: '100%' }}>
            <Stack direction='column' justifyContent='center' alignItems='center' spacing={0} sx={{ width: '100%', p: 0, m: 0 }}>
              <Typography variant='overline' color='primary'>
                Is the member under any hardship arrangement?
              </Typography>
              <RHFRadioGroup
                row
                name='isMemberUnderHardship'
                onRadioChange={setIsMemberUnderHardship}
                value={isMemberUnderHardship}
                spacing={10}
                options={[
                  { value: 'Y', label: 'Yes' },
                  { value: 'N', label: 'No' },
                ]}
              />
            </Stack>

            {/* {isMemberUnderHardship === 'Y' && (
              <Stack direction='row' justifyContent='center' alignItems='center' spacing={0.5}>
                <WarningIcon color='warning' fontSize='small' />
                <Typography variant='body2' color='text.secondary'>
                  Please complete extra checks to ensure member affordability and suitability for loan.
                </Typography>
              </Stack>
            )} */}
          </Stack>

          <Stack direction='column' justifyContent='center' alignItems='center' spacing={0} sx={{ width: '100%', p: 0, m: 0 }}>
            <Typography variant='overline' color='primary'>
              Has the member been bankrupt?
            </Typography>
            <RHFRadioGroup
              row
              name='hasMemberBeenBankrupt'
              onRadioChange={setHasMemberBeenBankrupt}
              value={hasMemberBeenBankrupt}
              spacing={10}
              options={[
                { value: 'Y', label: 'Yes' },
                { value: 'N', label: 'No' },
              ]}
            />
          </Stack>

          <Stack direction='column' justifyContent='flex-start' spacing={1} sx={{ width: '100%' }}>
            <Stack direction='column' justifyContent='center' alignItems='center' spacing={0} sx={{ width: '100%', p: 0, m: 0 }}>
              <Typography variant='overline' color='primary'>
                Is member in arrears with First Credit Union?
              </Typography>
              <RHFRadioGroup
                disabled={true}
                row
                name='hasUnpaidDefualtCollections'
                onRadioChange={setIsMemberInArrearsWithFCU}
                value={isMemberInArrearsWithFCU}
                spacing={10}
                options={[
                  { value: 'Y', label: 'Yes' },
                  { value: 'N', label: 'No' },
                ]}
              />
            </Stack>

            <Stack direction='row' justifyContent='center' alignItems='center' spacing={0.5}>
              {isMemberInArrearsWithFCU === 'Y' ? <WarningIcon color='warning' fontSize='small' /> : <DoneIcon color='success' fontSize='small' />}
              <Typography variant='body2' color='text.secondary'>
                {isMemberInArrearsWithFCU === 'Y' ? `Member is ${fCurrency(fcuArrearsBalance)} in arrears with First Credit Union. Application will be referred to supervisor.` : 'Member is not in arrears with First Credit Union.'}
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        <Stack direction='column' justifyContent='flex-start' spacing={0} sx={{ width: '100%', p: 0, m: 0 }}>
          <Typography variant='overline' color='secondary'>
            Repayments
          </Typography>
        </Stack>

        <Stack direction='column' justifyContent='flex-start' spacing={5} sx={{ width: '100%', pb: 3 }}>
          <Stack direction='column' justifyContent='flex-start' spacing={1} sx={{ width: '100%' }}>
            <RHFTextField name='creditBeingSought' label='Credit Limit - How much credit is being sought?' multiline rows={3} variant='filled' onInputChange={setCreditBeingSought} value={creditBeingSought} />
          </Stack>

          <Stack direction='column' justifyContent='flex-start' spacing={1} sx={{ width: '100%' }}>
            <RHFTextField name='termForCreditBeingSought' label='How long is the credit being sought for?' multiline rows={3} variant='filled' onInputChange={setTermForCreditBeingSought} value={termForCreditBeingSought} />
          </Stack>
        </Stack>
      </Stack>
    </FormProvider>
  )
}

export default RFHCreditScore
