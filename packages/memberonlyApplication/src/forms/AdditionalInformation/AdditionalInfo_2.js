import React, { useEffect } from 'react'

//* MUI
import { Stack, Typography, MenuItem, Divider, Box, FormControl, FormHelperText, TextField } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'

//* MUI Icons
import WarningIcon from '@mui/icons-material/Warning'
import DoneIcon from '@mui/icons-material/Done'

//* Framer
import { motion, AnimatePresence } from 'framer-motion'
import { varFade } from '../../components/animate'

//* Redux imports and Redux reducers
import { useDispatch, useSelector } from 'react-redux'
import { additionalInfoPart2Actions } from '../../redux/slices/additionalInfoPart2Slice'
import { getPrimeIdentification, getPrimeEmploymentDetails, getPrimeContactDetails, getPrimeAddresses } from '../../redux/slices/verifyPrimeDetailsSlice'

import { baseRateTypes, creditHistoryTypes, securityTypes } from '../../redux/codes/LoanDetailsCodes'
import { loanPurpose } from '../../redux/codes/LoanPurpose'
import { tradingBranch } from '../../redux/codes/TradingBranches'

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
  const loanPurposeCode = useSelector((state) => state.additionalInfoPart2Reducer.loanPurposeCode)
  const tradingBranchCode = useSelector((state) => state.additionalInfoPart2Reducer.tradingBranch)
  const inquiryMadeToObtainQuotes = useSelector((state) => state.additionalInfoPart2Reducer.inquiryMadeToObtainQuotes)
  const qualifyForMbroAndPern = useSelector((state) => state.additionalInfoPart2Reducer.qualifyForMbroAndPern)
  const didMemberAcceptMbro = useSelector((state) => state.additionalInfoPart2Reducer.didMemberAcceptMbro)
  const whyMemberAcceptedMbro = useSelector((state) => state.additionalInfoPart2Reducer.whyMemberAcceptedMbro)
  const ninetyDayBankStatementObtained = useSelector((state) => state.additionalInfoPart2Reducer.ninetyDayBankStatementObtained)
  const otherInquiries = useSelector((state) => state.additionalInfoPart2Reducer.otherInquiries)
  const otherInquiriesComments = useSelector((state) => state.additionalInfoPart2Reducer.otherInquiriesComments)

  const isCreditUsedForRefinance = useSelector((state) => state.additionalInfoPart2Reducer.isCreditUsedForRefinance)
  const isCreditUsedForRefinanceComments = useSelector((state) => state.additionalInfoPart2Reducer.isCreditUsedForRefinanceComments)
  const isMemberHappyWithQuote = useSelector((state) => state.additionalInfoPart2Reducer.isMemberHappyWithQuote)
  const anyOtherComments = useSelector((state) => state.additionalInfoPart2Reducer.anyOtherComments)

  const onSubmitAddtionInfoPart2 = useSelector((state) => state.additionalInfoPart2Reducer.onSubmitAddtionInfoPart2)

  const primeClientNumber = useSelector((state) => state.clientSearchReducer.primeclientNumber)

  // Defualt Values for React Hook Form
  const defaultValues = {
    loanPurposeCode: loanPurposeCode,
    tradingBranchCode: tradingBranchCode,
    inquiryMadeToObtainQuotes: inquiryMadeToObtainQuotes,
    qualifyForMbroAndPern: qualifyForMbroAndPern,
    didMemberAcceptMbro: didMemberAcceptMbro,
    whyMemberAcceptedMbro: whyMemberAcceptedMbro,
    ninetyDayBankStatementObtained: ninetyDayBankStatementObtained,
    otherInquiries: otherInquiries,
    otherInquiriesComments: otherInquiriesComments,
    isCreditUsedForRefinance: isCreditUsedForRefinance,
    isCreditUsedForRefinanceComments: isCreditUsedForRefinanceComments,
    isMemberHappyWithQuote: isMemberHappyWithQuote,
    anyOtherComments: anyOtherComments,
  }

  // Schema
  const CreditScoreSchema = Yup.object().shape({
    loanPurposeCode: Yup.string().required('Loan Purpose is required.'),
    tradingBranchCode: Yup.string().required('Trading Branch is required.'),
    inquiryMadeToObtainQuotes: Yup.string().required('Please choose an option.'),
    qualifyForMbroAndPern: Yup.string().required('Please choose an option.'),
    didMemberAcceptMbro: Yup.string().when('qualifyForMbroAndPern', {
      is: (qualifyForMbroAndPern) => {
        return qualifyForMbroAndPern === 'Y'
      },
      then: Yup.string().required('Please choose an option.'),
      otherwise: Yup.string().nullable(),
    }),
    whyMemberAcceptedMbro: Yup.string().when('qualifyForMbroAndPern', {
      is: (qualifyForMbroAndPern) => {
        return qualifyForMbroAndPern === 'Y'
      },
      then: Yup.string().required('Please add notes.'),
      otherwise: Yup.string().nullable(),
    }),
    ninetyDayBankStatementObtained: Yup.string().required('Please choose an option.'),
    isCreditUsedForRefinance: Yup.string().required('Please choose an option.'),
    isCreditUsedForRefinanceComments: Yup.string().when('isCreditUsedForRefinance', {
      is: (isCreditUsedForRefinance) => {
        return isCreditUsedForRefinance === 'Y'
      },
      then: Yup.string().required('Please add notes.'),
      otherwise: Yup.string().nullable(),
    }),
    isMemberHappyWithQuote: Yup.string().required('Please choose an option.'),
    anyOtherComments: Yup.string(),
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
  function setLoanPurposeCode(event) {
    dispatch(additionalInfoPart2Actions.setLoanPurposeCode(event.target.value))
  }
  function setTradingBranch(event) {
    dispatch(additionalInfoPart2Actions.setTradingBranch(event.target.value))
  }

  function setInquiryMadeToObtainQuotes(event) {
    dispatch(additionalInfoPart2Actions.setInquiryMadeToObtainQuotes(event.target.value))
  }

  function setQualifyForMbroAndPern(event) {
    dispatch(additionalInfoPart2Actions.setQualifyForMbroAndPern(event.target.value))

    if (event.target.value == 'N') {
      dispatch(additionalInfoPart2Actions.setDidMemberAcceptMbro(''))
      dispatch(additionalInfoPart2Actions.setWhyMemberAcceptedMbro(''))
    }
  }
  function setDidMemberAcceptMbro(event) {
    dispatch(additionalInfoPart2Actions.setDidMemberAcceptMbro(event.target.value))

    if (event.target.value === 'N') {
      dispatch(additionalInfoPart2Actions.setWhyMemberAcceptedMbro(''))
    }
  }
  function setWhyMemberAcceptedMbro(event) {
    dispatch(additionalInfoPart2Actions.setWhyMemberAcceptedMbro(event.target.value))
  }

  function setIsCreditUsedForRefinance(event) {
    dispatch(additionalInfoPart2Actions.setIsCreditUsedForRefinance(event.target.value))

    if (event.target.value) {
      dispatch(additionalInfoPart2Actions.setIsCreditUsedForRefinanceComments(''))
    }
  }

  function setIsCreditUsedForRefinanceComments(event) {
    dispatch(additionalInfoPart2Actions.setIsCreditUsedForRefinanceComments(event.target.value))
  }
  function setNinetyDayBankStatementObtained(event) {
    dispatch(additionalInfoPart2Actions.setNinetyDayBankStatementObtained(event.target.value))
  }
  function setIsMemberHappyWithQuote(event) {
    dispatch(additionalInfoPart2Actions.setIsMemberHappyWithQuote(event.target.value))
  }
  function setAnyOtherComments(event) {
    dispatch(additionalInfoPart2Actions.setAnyOtherComments(event.target.value))
  }

  useEffect(() => {
    if (onSubmitAddtionInfoPart2 == null) return

    handleSubmit(onSubmit())()
  }, [onSubmitAddtionInfoPart2])

  useEffect(() => {
    dispatch(additionalInfoPart2Actions.setIsValidAdditionalInfoPart2(isValid))
  }, [isValid])

  const varCreditUsedForRef =
    isCreditUsedForRefinance === 'Y'
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

  // const varInquiryMadeToOtherLoanProductsThatMayMeetNeed =
  //   inquiryMadeToOtherLoanProductsThatMayMeetNeed === 'Y' || inquiryMadeToOtherLoanProductsThatMayMeetNeed === 'N'
  //     ? varFade({
  //         distance: 50,
  //         durationIn: 0.32,
  //         durationOut: 0.32,
  //       }).inUp
  //     : varFade({
  //         distance: 50,
  //         durationIn: 0.32,
  //         durationOut: 0.32,
  //       }).outDown

  const varQualifyForMbroAndPern =
    qualifyForMbroAndPern === 'Y'
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

  const varDidMemberAcceptMbro =
    qualifyForMbroAndPern === 'Y'
      ? varFade({
          distance: 50,
          durationIn: 0.7,
          durationOut: 0.7,
        }).inUp
      : varFade({
          distance: 50,
          durationIn: 0.7,
          durationOut: 0.7,
        }).outDown

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack direction='column' alignItems='center' justifyContent='center' spacing={2} sx={{ flexGrow: 1, minWidth: '100%', pb: 7 }}>
        <Stack direction='column' justifyContent='flex-start' spacing={7} sx={{ width: '100%', pb: 3 }}>
          <Stack direction='column' justifyContent='center' alignItems='center' spacing={5} sx={{ width: '100%', p: 0, m: 0 }}>
            <Stack direction='column' justifyContent='center' alignItems='center' spacing={0} sx={{ width: '100%', maxWidth: 400 }}>
              <RHFSelect name='tradingBranchCode' label='Trading Branch' value={tradingBranchCode} onSelectChange={setTradingBranch} helperText='Which branch is convinient for the member to trade?'>
                <MenuItem value='' disabled>
                  Select Trading Branch
                </MenuItem>
                <Divider sx={{ borderStyle: 'dashed' }} />
                {tradingBranch.map((type) => (
                  <MenuItem key={type?.key} value={type?.value}>
                    {type?.value}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Stack>
            <Stack direction='column' justifyContent='center' alignItems='center' spacing={0} sx={{ width: '100%', maxWidth: 400 }}>
              <RHFSelect name='loanPurposeCode' label='Loan Purpose' value={loanPurposeCode} onSelectChange={setLoanPurposeCode} helperText='What will the borrower use the credit for?'>
                <MenuItem value='' disabled>
                  Select Loan Purpose
                </MenuItem>
                <Divider sx={{ borderStyle: 'dashed' }} />
                {loanPurpose.map((type) => (
                  <MenuItem key={type?.key} value={type?.value}>
                    {type?.value}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Stack>
          </Stack>
          {/* //! Removed On Richards request  */}
          {/* <RHFCheckbox name='inquiryMadeToAmtRequested' label='Was inquiry made to the amount requested?' onCheckboxChange={setInquiryMadeToAmtRequested} checked={inquiryMadeToAmtRequested} /> */}
          <Stack direction='column' justifyContent='center' alignItems='center' spacing={0} sx={{ width: '100%', p: 0, m: 0 }}>
            <Typography variant='overline' color='primary'>
              Inquiry made to obtain quotes?
            </Typography>
            <RHFRadioGroup
              row
              name='inquiryMadeToObtainQuotes'
              spacing={4}
              onRadioChange={setInquiryMadeToObtainQuotes}
              value={inquiryMadeToObtainQuotes}
              options={[
                { value: 'Y', label: 'Yes' },
                { value: 'N', label: 'No' },
              ]}
            />
          </Stack>
          {/* //? Removed */}
          {/* <Stack direction='column' justifyContent='center' alignItems='center' spacing={0.5} sx={{ width: '100%', p: 0, m: 0 }}>
            <Typography variant='overline' color='primary'>
              Inquiry made to offer other loan products that may meet their need?
            </Typography>
            <RHFRadioGroup
              row
              name='inquiryMadeToOtherLoanProductsThatMayMeetNeed'
              spacing={4}
              onRadioChange={setInquiryMadeToOtherLoanProductsThatMayMeetNeed}
              value={inquiryMadeToOtherLoanProductsThatMayMeetNeed}
              options={[
                { value: 'Y', label: 'Yes' },
                { value: 'N', label: 'No' },
              ]}
            />

            {inquiryMadeToOtherLoanProductsThatMayMeetNeed === 'Y' || (inquiryMadeToOtherLoanProductsThatMayMeetNeed === 'N' && <RHFTextField component={motion.div} {...varInquiryMadeToOtherLoanProductsThatMayMeetNeed} name='inquiryMadeToOtherLoanProductsThatMayMeetNeedComment' label='Comments about the other products offered.' multiline rows={3} variant='filled' onInputChange={setInquiryMadeToOtherLoanProductsThatMayMeetNeedComment} value={inquiryMadeToOtherLoanProductsThatMayMeetNeedComment} />)}
          </Stack> */}

          {/* // Qualify for both personal loan and member only loan */}
          <Stack direction='column' justifyContent='flex-start' spacing={5} sx={{ width: '100%', pb: 3 }}>
            <Stack direction='column' justifyContent='center' alignItems='center' spacing={0} sx={{ width: '100%', p: 0, m: 0 }}>
              <Typography variant='overline' color='primary'>
                Does the member qualify for both Member-Only loan and Personal Loan?
              </Typography>
              <RHFRadioGroup
                row
                name='qualifyForMbroAndPern'
                onRadioChange={setQualifyForMbroAndPern}
                value={qualifyForMbroAndPern}
                spacing={10}
                options={[
                  { value: 'Y', label: 'Yes' },
                  { value: 'N', label: 'No' },
                ]}
              />
            </Stack>

            {qualifyForMbroAndPern === 'Y' && (
              <Stack key='qulaifyForMemberOnly' component={motion.div} {...varQualifyForMbroAndPern} direction='column' justifyContent='center' alignItems='center' spacing={1} sx={{ width: '100%', p: 0, m: 0 }}>
                <Typography variant='overline' color='primary'>
                  Did the member accept member-only Loan?
                </Typography>
                <RHFRadioGroup
                  row
                  name='didMemberAcceptMbro'
                  onRadioChange={setDidMemberAcceptMbro}
                  value={didMemberAcceptMbro}
                  spacing={10}
                  options={[
                    { value: 'Y', label: 'Yes' },
                    { value: 'N', label: 'No' },
                  ]}
                />
                <RHFTextField key='qulaifyForMemberOnlyComment' component={motion.div} {...varDidMemberAcceptMbro} name='whyMemberAcceptedMbro' label='Briefly explain why member choose Member-Only Loan over Personal Loan' multiline rows={3} variant='filled' onInputChange={setWhyMemberAcceptedMbro} value={whyMemberAcceptedMbro} />
              </Stack>
            )}
          </Stack>
          <Stack direction='column' justifyContent='center' alignItems='center' spacing={0} sx={{ width: '100%', p: 0, m: 0 }}>
            {/* label='Refinance - Is the credit used to refinance another lender and/or refinance an existing FCU loan? If so, is the member aware of the additional cost and accepts this cost?' */}
            <Typography variant='overline' color='primary'>
              Is the credit used to refinance another lender and/or an exisiting FCU Loan?
            </Typography>
            <Typography variant='caption' sx={{ color: (theme) => theme.palette.common.black }}>
              If so, is the member aware of the additional costs?
            </Typography>
            <Stack direction='column' justifyContent='center' alignItems='center' spacing={0} sx={{ width: '100%', p: 0, m: 0 }}>
              <RHFRadioGroup
                row
                name='isCreditUsedForRefinance'
                spacing={4}
                onRadioChange={setIsCreditUsedForRefinance}
                value={isCreditUsedForRefinance}
                options={[
                  { value: 'Y', label: 'Yes' },
                  { value: 'N', label: 'No' },
                ]}
              />
              {isCreditUsedForRefinance === 'Y' && <RHFTextField component={motion.div} {...varCreditUsedForRef} name='isCreditUsedForRefinanceComments' label='Add notes about the loan refinance' multiline rows={3} variant='filled' onInputChange={setIsCreditUsedForRefinanceComments} value={isCreditUsedForRefinanceComments} />}
            </Stack>
          </Stack>
          <Stack direction='column' justifyContent='center' alignItems='center' spacing={0} sx={{ width: '100%', p: 0, m: 0 }}>
            <Typography variant='overline' color='primary'>
              90 days bank statement obtained?
            </Typography>
            <RHFRadioGroup
              row
              name='ninetyDayBankStatementObtained'
              spacing={4}
              onRadioChange={setNinetyDayBankStatementObtained}
              value={ninetyDayBankStatementObtained}
              options={[
                { value: 'Y', label: 'Yes' },
                { value: 'N', label: 'No' },
              ]}
            />
          </Stack>
          <Stack direction='column' justifyContent='center' alignItems='center' spacing={0} sx={{ width: '100%', p: 0, m: 0 }}>
            <Typography variant='overline' color='primary'>
              Is the Quote/Proposed Loan suitable to the member?
            </Typography>
            <RHFRadioGroup
              row
              name='isMemberHappyWithQuote'
              spacing={4}
              onRadioChange={setIsMemberHappyWithQuote}
              value={isMemberHappyWithQuote}
              options={[
                { value: 'Y', label: 'Yes' },
                { value: 'N', label: 'No' },
              ]}
            />
          </Stack>

          <RHFTextField name='anyOtherComments' label='Is there any other comments to add?' multiline rows={3} variant='filled' onInputChange={setAnyOtherComments} value={anyOtherComments} />
        </Stack>
      </Stack>
    </FormProvider>
  )
}

export default RFHCreditScore
