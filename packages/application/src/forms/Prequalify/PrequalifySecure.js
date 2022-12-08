import React, { useEffect, useRef } from 'react'
import { Link as RouterLink, Redirect, useHistory } from 'react-router-dom'

import { motion, AnimatePresence } from 'framer-motion'
import { varFade } from '../../components/ui/animate'

import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { lendingCriteriaQnsActions } from '../../redux/slices/lendingCriteriaQnsSlice'
import { globalActions } from '../../redux/slices/globalSlice'

import LoanPurposeAutoComplete from './Interface/LoanPurposeAutoComplete'
import TradingBranchAutoComplete from './Interface/TradingBranchAutoComplete'

import ToggleButtons from '../../components/rhf-components/ToggleButtonGroup'
import Countries from '../../components/rhf-components/Countries'
import SelectMenu from '../../components/rhf-components/SelectMenu'
import DatePicker from '../../components/rhf-components/DatePicker'
import InputField from '../../components/rhf-components/Input'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import ToggleButton from '@mui/material/ToggleButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { styled } from '@mui/material/styles'

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import NoteAltIcon from '@mui/icons-material/NoteAlt'

import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
}))

function PreliminaryQuestions() {
  const varTitle = varFade({
    distance: 20,
    durationIn: 0.32,
    durationOut: 0.32,
  }).inDown

  const varSubtitle = varFade({
    distance: 20,
    durationIn: 0.32,
    durationOut: 0.32,
  }).inLeft

  const loanPurpose = useSelector((state) => state.lendingCritetiaQnsReducer.loanPurpose)
  const loanPurposeState = useSelector((state) => state.lendingCritetiaQnsReducer.loanPurposeState)

  const tradingBranch = useSelector((state) => state.lendingCritetiaQnsReducer.tradingBranch)
  const tradingBranchState = useSelector((state) => state.lendingCritetiaQnsReducer.tradingBranchState)

  const jointApplication = useSelector((state) => state.lendingCritetiaQnsReducer.jointApplication)
  const jointApplicationState = useSelector((state) => state.lendingCritetiaQnsReducer.jointApplicationState)

  const jointApplicantClientNo = useSelector((state) => state.lendingCritetiaQnsReducer.jointApplicantClientNo)
  const jointApplicantClientNoState = useSelector((state) => state.lendingCritetiaQnsReducer.jointApplicantClientNoState)

  const downSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const downMd = useMediaQuery((theme) => theme.breakpoints.down('md'))

  const { control, watch } = useForm({
    defaultValues: {
      jointApplication: jointApplication,
      jointApplicantClientNo: jointApplicantClientNo,
      loanPurpose: loanPurpose,
      tradingBranch: tradingBranch,
    },
    mode: 'onChange',
  })

  const dispatch = useDispatch()

  function onsubmit() {
    console.log('Prelim Qns Submitted')
  }

  const watchLoanPurpose = watch('loanpurpose')
  const watchTradingBranch = watch('tradingbranch')
  const watchJointLoan = watch('jointApplication')
  const watchjointApplicantClientNo = watch('jointApplicantClientNo')
  // const watchAge = watch('age')

  useEffect(() => {
    if (loanPurposeState === 'initial' && jointApplicationState === 'initial' && loanPurposeState === 'initial' && jointApplicantClientNoState === 'inital') return

    if (watchJointLoan !== null && jointApplicationState !== 'initial' && watchLoanPurpose !== null && loanPurposeState !== 'initial' && watchTradingBranch !== null && tradingBranchState !== 'initial') {
      dispatch(lendingCriteriaQnsActions.setProceed(true))
      dispatch(lendingCriteriaQnsActions.setIsValidLoanPurpose(true))
      dispatch(lendingCriteriaQnsActions.setIsValidTradingBranch(true))
      dispatch(lendingCriteriaQnsActions.setIsValidJointApplication(true))

      return
    }
    dispatch(lendingCriteriaQnsActions.setProceed(false))
    dispatch(lendingCriteriaQnsActions.setIsValidLoanPurpose(false))
    dispatch(lendingCriteriaQnsActions.setIsValidTradingBranch(false))
    dispatch(lendingCriteriaQnsActions.setIsValidJointApplication(false))
  }, [watchLoanPurpose, watchJointLoan, watchjointApplicantClientNo, watchTradingBranch])

  useEffect(() => {}, [jointApplication])

  const handleJointApplicantToggle = (event) => {
    if (event.target.value === 'No') {
      dispatch(lendingCriteriaQnsActions.setJointApplication({ key: event.target.value, value: false }))
      dispatch(lendingCriteriaQnsActions.setJointApplicantClientNo(''))
      dispatch(lendingCriteriaQnsActions.setJointApplicationState('onChange'))

      return
    }
    dispatch(lendingCriteriaQnsActions.setJointApplication({ key: event.target.value, value: true }))
    dispatch(lendingCriteriaQnsActions.setJointApplicationState('onChange'))
  }

  const handleJointApplicantClientNo = (event) => {
    dispatch(lendingCriteriaQnsActions.setJointApplicantClientNo(event.target.value))
    dispatch(lendingCriteriaQnsActions.setJointApplicantClientNoState('onChange'))
  }

  const handleLoanPurpose = (event, newValue) => {
    dispatch(lendingCriteriaQnsActions.setLoanPurpose(newValue?.key))
    dispatch(lendingCriteriaQnsActions.setLoanPurposeState('onChange'))
  }

  const handleTradingBranch = (event, newValue) => {
    dispatch(lendingCriteriaQnsActions.setTradingBranch(newValue?.key))
    dispatch(lendingCriteriaQnsActions.setTradingBranchState('onChange'))
  }

  const membernumberTooltipText = "Member Number - If the joint applicant has an account with First Credit Union, please provide the applicant's member number"

  return (
    <Stack direction={downMd ? 'column' : 'column'} spacing={7} justifyContent='center' alignItems='center' sx={{ py: 5, height: '100%' }}>
      <Stack direction={downMd ? 'column' : 'column'} justifyContent='center' alignItems='center' sx={{ width: '100%' }} spacing={2}>
        <LabelStyle sx={{ textAlign: 'center' }}>Are you applying for a joint loan?</LabelStyle>
        <ToggleButtons id='jointApplication' name='jointApplication' onToggleButtonChange={handleJointApplicantToggle} control={control} defaultValue={''} value={jointApplicationState === 'initial' ? '' : jointApplication.key} label='Are you applying for a joint loan?'>
          <ToggleButton size='small' value='Yes' sx={{ width: '50%' }}>
            Yes
          </ToggleButton>
          <ToggleButton size='small' value='No' sx={{ width: '50%' }}>
            No
          </ToggleButton>
        </ToggleButtons>
      </Stack>

      {jointApplication?.value === true && (
        <Stack direction={downMd ? 'column' : 'column'} justifyContent='center' alignItems='center' sx={{ width: '100%', flexGrow: 1 }} spacing={2}>
          <Box component={motion.div} {...varTitle}>
            <LabelStyle componen sx={{ textAlign: 'center' }}>
              Please provide the joint applicant's member number
            </LabelStyle>
          </Box>
          <Box component={motion.div} {...varSubtitle}>
            <InputField name='jointApplicantClientNo' label='Member Number' type='number' control={control} onInputChange={handleJointApplicantClientNo} hasTooltip={true} toolTipText={membernumberTooltipText} stretch={true} />
          </Box>
        </Stack>
      )}

      <Stack direction={downMd ? 'column' : 'column'} justifyContent='center' alignItems='center' sx={{ width: '100%' }} spacing={2}>
        <LabelStyle sx={{ textAlign: 'center' }}>What is the purpose of this loan?</LabelStyle>
        <LoanPurposeAutoComplete id='loanpurpose' name='loanpurpose' value={loanPurpose} onLoanPurposeChange={handleLoanPurpose} control={control} />
      </Stack>
      <Stack direction={downMd ? 'column' : 'column'} justifyContent='center' alignItems='center' sx={{ width: '100%' }} spacing={2}>
        <LabelStyle sx={{ textAlign: 'center' }}>Select your preferred trading branch</LabelStyle>
        <TradingBranchAutoComplete id='tradingbranch' name='tradingbranch' value={tradingBranch} onTradingBranchChange={handleTradingBranch} control={control} />
      </Stack>
    </Stack>
  )
}
function QualifyForResidency() {
  const isNzCitizen = useSelector((state) => state.lendingCritetiaQnsReducer.isNzCitizen)
  const citizenship = useSelector((state) => state.lendingCritetiaQnsReducer.citizenship)
  const isNzResident = useSelector((state) => state.lendingCritetiaQnsReducer.isNzResident)
  const residency = useSelector((state) => state.lendingCritetiaQnsReducer.residency)
  const residencyState = useSelector((state) => state.lendingCritetiaQnsReducer.residencyState)
  const hasWorkPermit = useSelector((state) => state.lendingCritetiaQnsReducer.hasWorkPermit)
  const workPermitState = useSelector((state) => state.lendingCritetiaQnsReducer.workPermitState)

  const varCitizenshipCountry =
    isNzCitizen.key === 'No'
      ? varFade({
          distance: 100,
          durationIn: 0.32,
          durationOut: 0.32,
        }).inRight
      : varFade({
          distance: 100,
          durationIn: 0.32,
          durationOut: 0.32,
        }).outRight

  const varResidencyBox =
    isNzCitizen.key === 'No'
      ? varFade({
          distance: 100,
          durationIn: 0.5,
          durationOut: 0.32,
        }).inRight
      : varFade({
          distance: 100,
          durationIn: 0.5,
          durationOut: 0.32,
        }).outRight

  const varResidencyCountry =
    isNzResident.key === 'No'
      ? varFade({
          distance: 100,
          durationIn: 0.32,
          durationOut: 0.32,
        }).inRight
      : varFade({
          distance: 100,
          durationIn: 0.32,
          durationOut: 0.32,
        }).outRight

  const varWorkpermit =
    isNzCitizen.key === 'No'
      ? varFade({
          distance: 100,
          durationIn: 0.5,
          durationOut: 0.32,
        }).inRight
      : varFade({
          distance: 100,
          durationIn: 0.5,
          durationOut: 0.32,
        }).outRight

  const varResidencyAlert = varFade({
    distance: 20,
    durationIn: 0.32,
    durationOut: 0.32,
  }).inLeft

  const { control, watch } = useForm({
    defaultValues: {
      isNzCitizen: '',
      citizenship: '',
      isNzResident: '',
      residency: '',
    },
    mode: 'onChange',
  })

  const watchIsNzCitizen = watch('isNzCitizen')
  const watchIsNzResident = watch('isNzResident')
  const watchHasWorkPermit = watch('hasWorkPermit')

  function onsubmit() {
    console.log('Residency Submitted')
  }

  const dispatch = useDispatch()
  const downSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const downMd = useMediaQuery((theme) => theme.breakpoints.down('md'))

  useEffect(() => {
    if (watchIsNzCitizen === 'Yes' && residencyState !== 'initial') {
      dispatch(lendingCriteriaQnsActions.setProceed(true))
      dispatch(lendingCriteriaQnsActions.setIsValidResidency(true))
      return
    }

    if (watchIsNzCitizen === 'No' && citizenship === null && residencyState !== 'initial') {
      dispatch(lendingCriteriaQnsActions.setProceed(false))
      dispatch(lendingCriteriaQnsActions.setIsValidResidency(false))
      return
    }
    if (watchIsNzCitizen === 'No' && citizenship !== null && watchIsNzResident === 'Yes' && residencyState !== 'initial') {
      dispatch(lendingCriteriaQnsActions.setProceed(true))
      dispatch(lendingCriteriaQnsActions.setIsValidResidency(true))
      return
    }
    if (watchIsNzCitizen === 'No' && citizenship !== null && watchIsNzResident === 'No' && residency === null && residencyState !== 'initial') {
      dispatch(lendingCriteriaQnsActions.setProceed(false))
      dispatch(lendingCriteriaQnsActions.setIsValidResidency(false))
      return
    }

    if (watchIsNzCitizen === 'No' && citizenship !== null && watchIsNzResident === 'No' && residency !== null && residencyState !== 'initial' && watchHasWorkPermit == null && workPermitState !== 'initial') {
      dispatch(lendingCriteriaQnsActions.setProceed(false))
      dispatch(lendingCriteriaQnsActions.setIsValidResidency(false))
      return
    }
    if (watchIsNzCitizen === 'No' && citizenship !== null && watchIsNzResident === 'No' && residency !== null && residencyState !== 'initial' && watchHasWorkPermit !== null && workPermitState !== 'initial') {
      dispatch(lendingCriteriaQnsActions.setProceed(true))
      dispatch(lendingCriteriaQnsActions.setIsValidResidency(true))
      return
    }
  }, [watchIsNzCitizen, citizenship, watchIsNzResident, residency, watchHasWorkPermit])

  const handleIsNzCitizen = (event) => {
    if (event.target.value === 'No') {
      dispatch(lendingCriteriaQnsActions.setIsNzCitizen({ key: event.target.value, value: false }))
      dispatch(lendingCriteriaQnsActions.setCitizenship(null))
      dispatch(lendingCriteriaQnsActions.setResidencyState('onChange'))
      return
    }
    dispatch(lendingCriteriaQnsActions.setIsNzCitizen({ key: event.target.value, value: true }))
    dispatch(lendingCriteriaQnsActions.setCitizenship('NZ'))
    dispatch(lendingCriteriaQnsActions.setResidencyState('onChange'))
  }

  const handleCitizenshipCountry = (event, newValue) => {
    dispatch(lendingCriteriaQnsActions.setCitizenship(newValue?.code))
    dispatch(lendingCriteriaQnsActions.setResidencyState('onChange'))
  }
  const handleIsNzResident = (event) => {
    if (event.target.value === 'No') {
      dispatch(lendingCriteriaQnsActions.setResidency(null))
      dispatch(lendingCriteriaQnsActions.setIsNzResident({ key: event.target.value, value: false }))
      dispatch(lendingCriteriaQnsActions.setResidencyState('onChange'))
      return
    }
    dispatch(lendingCriteriaQnsActions.setResidencyState('onChange'))
    dispatch(lendingCriteriaQnsActions.setIsNzResident({ key: event.target.value, value: true }))
  }
  const handleHasWorkPermit = (event) => {
    if (event.target.value === 'No') {
      dispatch(lendingCriteriaQnsActions.setHasWorkPermit({ key: event.target.value, value: false }))
      dispatch(lendingCriteriaQnsActions.setWorkPermitState('onChange'))
      return
    }
    dispatch(lendingCriteriaQnsActions.setWorkPermitState('onChange'))
    dispatch(lendingCriteriaQnsActions.setHasWorkPermit({ key: event.target.value, value: true }))
  }
  const handleResidencyCountry = (event, newValue) => {
    dispatch(lendingCriteriaQnsActions.setResidency(newValue?.code))
    dispatch(lendingCriteriaQnsActions.setResidencyState('onChange'))
  }

  return (
    <Stack direction='column' spacing={7} justifyContent='center' alignItems='center' sx={{ width: '100%', height: '100%' }}>
      <Stack direction='column' justifyContent='center' alignItems='center' sx={{ pt: 2, width: '100%' }} spacing={3}>
        <Stack direction='column' justifyContent='center' alignItems='center' sx={{ pt: 2, width: '100%' }} spacing={2}>
          <LabelStyle sx={{ textAlign: 'center' }}>Are you a citizen of New Zealand?</LabelStyle>
          <ToggleButtons id='isNzCitizen' name='isNzCitizen' onToggleButtonChange={handleIsNzCitizen} defaultValue={residencyState === 'initial' ? null : isNzCitizen.key} value={residencyState === 'initial' ? '' : isNzCitizen.key} control={control}>
            <ToggleButton size='small' value='Yes' sx={{ width: '50%' }} disabled={!isNzResident.value}>
              Yes
            </ToggleButton>
            <ToggleButton size='small' value='No' sx={{ width: '50%' }}>
              No
            </ToggleButton>
          </ToggleButtons>
        </Stack>
        <AnimatePresence>
          {!isNzCitizen.value && (
            <Stack component={motion.div} {...varCitizenshipCountry} direction={downMd ? 'column' : 'column'} justifyContent='center' alignItems='center' sx={{ width: '100%' }} spacing={2}>
              <Countries sx={{ width: '100%' }} name='citizenship' value={citizenship} onCountryChange={handleCitizenshipCountry} control={control} AutoCompleteLabel='Citizenship' helperText='Please enter your country of citizenship' />
            </Stack>
          )}
        </AnimatePresence>
      </Stack>
      <AnimatePresence>
        {!isNzCitizen.value && (
          <Stack component={motion.div} {...varResidencyBox} direction={downMd ? 'column' : 'column'} justifyContent='center' alignItems='center' sx={{ width: '100%' }} spacing={2}>
            <Stack direction='column' justifyContent='center' alignItems='center' sx={{ pt: 2, width: '100%' }} spacing={2}>
              <LabelStyle sx={{ textAlign: 'center' }}>Are you a Permanent Resident of New Zealand?</LabelStyle>
              <ToggleButtons id='isNzResident' name='isNzResident' onToggleButtonChange={handleIsNzResident} defaultValue={residencyState === 'initial' ? null : isNzResident.key} value={residencyState === 'initial' ? '' : isNzResident.key} control={control}>
                <ToggleButton size='small' value='Yes' sx={{ width: '50%' }}>
                  Yes
                </ToggleButton>
                <ToggleButton size='small' value='No' sx={{ width: '50%' }}>
                  No
                </ToggleButton>
              </ToggleButtons>
            </Stack>
            <AnimatePresence>
              {!isNzResident.value && (
                <Stack component={motion.div} {...varResidencyCountry} direction={downMd ? 'column' : 'column'} justifyContent='center' alignItems='center' sx={{ width: '100%' }} spacing={2}>
                  <Countries name='residency' value={residency} onCountryChange={handleResidencyCountry} control={control} AutoCompleteLabel='Residency' helperText='Please enter your country of residency' />
                </Stack>
              )}
            </AnimatePresence>
          </Stack>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!isNzCitizen.value && !isNzResident.value && (
          <Stack component={motion.div} {...varWorkpermit} direction={downMd ? 'column' : 'column'} justifyContent='center' alignItems='center' sx={{ width: '100%' }} spacing={2}>
            <Stack direction='column' justifyContent='center' alignItems='center' sx={{ pt: 2, width: '100%' }} spacing={2}>
              <LabelStyle sx={{ textAlign: 'center' }}>Do you have New Zealand work permit?</LabelStyle>
              <ToggleButtons id='hasWorkPermit' name='hasWorkPermit' onToggleButtonChange={handleHasWorkPermit} defaultValue={workPermitState === 'initial' ? null : hasWorkPermit.key} value={workPermitState === 'initial' ? '' : hasWorkPermit.key} control={control}>
                <ToggleButton size='small' value='Yes' sx={{ width: '50%' }}>
                  Yes
                </ToggleButton>
                <ToggleButton size='small' value='No' sx={{ width: '50%' }}>
                  No
                </ToggleButton>
              </ToggleButtons>
            </Stack>
          </Stack>
        )}
      </AnimatePresence>
    </Stack>
  )
}

function QualifyForIncome() {
  const hasRegularIncome = useSelector((state) => state.lendingCritetiaQnsReducer.hasRegularIncome)
  const incomeState = useSelector((state) => state.lendingCritetiaQnsReducer.incomeState)

  const wasDeclaredBankrupt = useSelector((state) => state.lendingCritetiaQnsReducer.wasDeclaredBankrupt)
  const wasDeclaredBankruptState = useSelector((state) => state.lendingCritetiaQnsReducer.wasDeclaredBankruptState)

  const bankruptcyDate = useSelector((state) => state.lendingCritetiaQnsReducer.bankruptcyDate)

  const incomeCreditedToFCU = useSelector((state) => state.lendingCritetiaQnsReducer.incomeCreditedToFCU)
  const incomeCreditedToFCUState = useSelector((state) => state.lendingCritetiaQnsReducer.incomeCreditedToFCUState)

  const proceed = useSelector((state) => state.lendingCritetiaQnsReducer.proceed)

  const upperLimitForInsovencyDate = new Date()

  const { control, watch } = useForm({
    defaultValues: {
      hasRegularIncome: hasRegularIncome,
      wasDeclaredBankrupt: wasDeclaredBankrupt,
      incomeCreditedToFCU: incomeCreditedToFCU,
    },
    mode: 'onChange',
  })

  const dispatch = useDispatch()

  const watchRegularIncome = watch('regIncome')
  const watchWasBankrupt = watch('wasBankrupt')
  const watchIncomeToFCU = watch('incomeToFcu')

  const downSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const downMd = useMediaQuery((theme) => theme.breakpoints.down('md'))

  const varBankruptcyDate =
    wasDeclaredBankrupt?.key === 'Yes'
      ? varFade({
          distance: 100,
          durationIn: 0.32,
          durationOut: 0.32,
        }).inRight
      : varFade({
          distance: 100,
          durationIn: 0.32,
          durationOut: 0.32,
        }).outRight

  // useEffect to check validity and set proceed if valid
  useEffect(() => {
    if (incomeState === 'initial' && wasDeclaredBankruptState === 'initial' && incomeCreditedToFCUState === 'initial') {
      return
    }

    if (watchRegularIncome !== null && incomeState !== 'initial') {
      dispatch(lendingCriteriaQnsActions.setIsValidIncome(true))
      if (hasRegularIncome.value !== null && wasDeclaredBankrupt.value !== null && incomeCreditedToFCU.value !== null) {
        dispatch(lendingCriteriaQnsActions.setProceed(true))
        return
      }
      return
    }

    if (watchWasBankrupt !== null && wasDeclaredBankruptState !== 'initial') {
      dispatch(lendingCriteriaQnsActions.setIsValidBankruptyDeclaration(true))
      if (hasRegularIncome.value !== null && wasDeclaredBankrupt.value !== null && incomeCreditedToFCU.value !== null) {
        dispatch(lendingCriteriaQnsActions.setProceed(true))
        return
      }
      return
    }
    if (watchIncomeToFCU !== null && incomeCreditedToFCUState !== 'initial') {
      dispatch(lendingCriteriaQnsActions.setIsValidIncomeCreditedToFCU(true))
      if (hasRegularIncome.value !== null && wasDeclaredBankrupt.value !== null && incomeCreditedToFCU.value !== null) {
        dispatch(lendingCriteriaQnsActions.setProceed(true))
        return
      }
      return
    }
  }, [watchRegularIncome, watchWasBankrupt, watchIncomeToFCU])

  // Dipatch to changes to state

  // regular Income
  const handleHasRegularIncome = (event) => {
    if (event.target.value === 'No') {
      dispatch(lendingCriteriaQnsActions.setRegularIncome({ key: event.target.value, value: false }))
      dispatch(lendingCriteriaQnsActions.setIncomeState('onChange'))
      return
    }
    dispatch(lendingCriteriaQnsActions.setIncomeState('onChange'))
    dispatch(lendingCriteriaQnsActions.setRegularIncome({ key: event.target.value, value: true }))
  }

  // Was bankrupt
  const handleWasBankrupt = (event) => {
    if (event.target.value === 'No') {
      dispatch(lendingCriteriaQnsActions.setWasBankrput({ key: event.target.value, value: false }))
      dispatch(lendingCriteriaQnsActions.setWasBankruptState('onChange'))
      return
    }
    dispatch(lendingCriteriaQnsActions.setWasBankrput('onChange'))
    dispatch(lendingCriteriaQnsActions.setWasBankrput({ key: event.target.value, value: true }))
  }

  // Bankruptcy Date
  const handleBankruptcyDate = (date) => {
    dispatch(lendingCriteriaQnsActions.setBankruptcyDate(date))
  }

  // Income to FCU
  const handleIncomeCreditToFCU = (event) => {
    if (event.target.value === 'No') {
      dispatch(lendingCriteriaQnsActions.setIncomeCreditedToFCU({ key: event.target.value, value: false }))
      dispatch(lendingCriteriaQnsActions.setIncomeCreditedToFCUState('onChange'))
      return
    }
    dispatch(lendingCriteriaQnsActions.setIncomeCreditedToFCUState('onChange'))
    dispatch(lendingCriteriaQnsActions.setIncomeCreditedToFCU({ key: event.target.value, value: true }))
  }

  return (
    <Stack direction='column' justifyContent='center' alignItems='center' sx={{ width: '100%', height: '100%' }} spacing={7}>
      {/* Regular Income */}
      <Stack direction='column' justifyContent='center' alignItems='center' sx={{ pt: 2, width: 'inherit' }} spacing={1}>
        <LabelStyle sx={{ textAlign: 'center' }}>Do you have a regular income?</LabelStyle>
        <ToggleButtons id='regIncome' name='regIncome' onToggleButtonChange={handleHasRegularIncome} control={control} defaultValue={incomeState === 'initial' ? null : hasRegularIncome.key} value={incomeState === 'initial' ? '' : hasRegularIncome.key}>
          <ToggleButton size='small' value='Yes' sx={{ width: '50%' }}>
            Yes
          </ToggleButton>
          <ToggleButton size='small' value='No' sx={{ width: '50%' }}>
            No
          </ToggleButton>
        </ToggleButtons>
      </Stack>

      {/* Income Credit to FCU */}
      <Stack direction='column' justifyContent='center' alignItems='center' sx={{ pt: 2, width: 'inherit' }} spacing={1}>
        <LabelStyle sx={{ textAlign: 'center' }}>Is your income credited to your First Credit Union Account?</LabelStyle>
        <ToggleButtons id='incomeToFcu' name='incomeToFcu' onToggleButtonChange={handleIncomeCreditToFCU} control={control} defaultValue={incomeCreditedToFCUState === 'initial' ? null : incomeCreditedToFCU.key} value={incomeCreditedToFCUState === 'initial' ? '' : incomeCreditedToFCU.key}>
          <ToggleButton size='small' value='Yes' sx={{ width: '50%' }}>
            Yes
          </ToggleButton>
          <ToggleButton size='small' value='No' sx={{ width: '50%' }}>
            No
          </ToggleButton>
        </ToggleButtons>
      </Stack>

      {/* Was Bankrupt */}
      <Stack direction='column' justifyContent='center' alignItems='center' sx={{ pt: 2, width: 'inherit' }} spacing={1}>
        <LabelStyle sx={{ textAlign: 'center' }}>Have you or your joint applicant been adjudicated bankrupt under the Insolvency Act 2006?</LabelStyle>
        <ToggleButtons id='wasBankrupt' name='wasBankrupt' onToggleButtonChange={handleWasBankrupt} control={control} defaultValue={wasDeclaredBankruptState === 'initial' ? null : wasDeclaredBankrupt.key} value={wasDeclaredBankruptState === 'initial' ? '' : wasDeclaredBankrupt.key}>
          <ToggleButton size='small' value='Yes' sx={{ width: '50%' }}>
            Yes
          </ToggleButton>
          <ToggleButton size='small' value='No' sx={{ width: '50%' }}>
            No
          </ToggleButton>
        </ToggleButtons>
      </Stack>
      <AnimatePresence>
        {wasDeclaredBankrupt?.value === true && (
          <Stack component={motion.div} {...varBankruptcyDate} direction={downMd ? 'column' : 'column'} justifyContent='center' alignItems='center' sx={{ width: '100%' }} spacing={2}>
            <Stack direction='column' justifyContent='center' alignItems='center' sx={{ maxWidth: 400 }} spacing={2}>
              <LabelStyle sx={{ textAlign: 'center' }}>When were you insolvent?</LabelStyle>
              <DatePicker id='bankruptcyDate' name='bankruptcyDate' onDateChange={handleBankruptcyDate} label='Insolvency Date' control={control} variant='outlined' openTo='year' format='MMMM yyyy' date={bankruptcyDate} maxDate={upperLimitForInsovencyDate} helperText='Month and Year. Eg: June 2020' isRequired={true} views={['year', 'month']} />
            </Stack>
          </Stack>
        )}
      </AnimatePresence>
    </Stack>
  )
}

const steps = [
  {
    label: 'Preliminary Questions',
    render: <PreliminaryQuestions />,
  },
  {
    label: 'Citizenship and Residency',
    render: <QualifyForResidency />,
  },
  {
    label: 'Income',
    render: <QualifyForIncome />,
  },
]

export default function PrequalifySecure() {
  const dispatch = useDispatch()
  const preliminaryQnsStepHeaderRef = useRef(new Array())

  const guestSessionID = useSelector((state) => state.globalReducer.guestSessionID)

  const proceed = useSelector((state) => state.lendingCritetiaQnsReducer.proceed)

  const isValidLoanPurpose = useSelector((state) => state.lendingCritetiaQnsReducer.isValidLoanPurpose)
  const isValidTradingBranch = useSelector((state) => state.lendingCritetiaQnsReducer.isValidTradingBranch)
  const isValidJointApplication = useSelector((state) => state.lendingCritetiaQnsReducer.isValidJointApplication)
  // const isValidAge = useSelector((state) => state.lendingCritetiaQnsReducer.isValidAge)
  const isValidResidency = useSelector((state) => state.lendingCritetiaQnsReducer.isValidResidency)
  const isValidIncome = useSelector((state) => state.lendingCritetiaQnsReducer.isValidIncome)
  const isValidWasDeclaredBankrupt = useSelector((state) => state.lendingCritetiaQnsReducer.isValidWasDeclaredBankrupt)
  const isValidIncomeCreditedToFCU = useSelector((state) => state.lendingCritetiaQnsReducer.isValidIncomeCreditedToFCU)

  const isNzCitizen = useSelector((state) => state.lendingCritetiaQnsReducer.isNzCitizen.value)
  const isNzResident = useSelector((state) => state.lendingCritetiaQnsReducer.isNzResident.value)
  const hasWorkPermit = useSelector((state) => state.lendingCritetiaQnsReducer.hasWorkPermit.value)
  const hasRegularIncome = useSelector((state) => state.lendingCritetiaQnsReducer.hasRegularIncome.value)

  const wasDeclaredBankrupt = useSelector((state) => state.lendingCritetiaQnsReducer.wasDeclaredBankrupt)

  const [activeStep, setActiveStep] = React.useState(0)
  const downMd = useMediaQuery((theme) => theme.breakpoints.down('md'))
  const downSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  useEffect(() => {
    if (activeStep === 0 && isValidLoanPurpose && isValidJointApplication) dispatch(lendingCriteriaQnsActions.setProceed(true))
    if (activeStep === 0 && (!isValidLoanPurpose || !isValidJointApplication)) dispatch(lendingCriteriaQnsActions.setProceed(false))

    if (activeStep === 1 && isValidResidency) dispatch(lendingCriteriaQnsActions.setProceed(true))
    if (activeStep === 1 && !isValidResidency) dispatch(lendingCriteriaQnsActions.setProceed(false))

    if (activeStep === 2 && isValidIncome && isValidWasDeclaredBankrupt && isValidIncomeCreditedToFCU) dispatch(lendingCriteriaQnsActions.setProceed(true))
    if (activeStep === 2 && (!isValidIncome || !isValidWasDeclaredBankrupt || !isValidIncomeCreditedToFCU)) dispatch(lendingCriteriaQnsActions.setProceed(false))

    if (activeStep === 0) return

    preliminaryQnsStepHeaderRef?.current[activeStep]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [activeStep])

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        width: downMd ? '100%' : '70%',
        flexDirection: 'column',
        alignItems: 'stretch',
        alignContent: 'center',
        minHeight: '100%',
      }}
    >
      <Stepper activeStep={activeStep} orientation='vertical'>
        {steps.map((step, index) => (
          <Step key={step.label} ref={(element) => preliminaryQnsStepHeaderRef?.current?.push(element)}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent TransitionProps={{ unmountOnExit: false }}>
              <Box sx={{ pb: 5 }}>{step.render}</Box>
              <Box sx={{ pb: 0 }}>
                {index < steps.length - 1 && (
                  <Stack direction='row' justifyContent='space-between' alignItems='center'>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{
                        borderRadius: '49px',
                        width: 120,
                        maxWidth: 200,
                      }}
                    >
                      Back
                    </Button>
                    <Button
                      variant='outlined'
                      disabled={!proceed}
                      onClick={handleNext}
                      sx={{
                        borderRadius: '49px',
                        width: 120,
                        maxWidth: 200,
                      }}
                      endIcon={<ArrowForwardIosIcon />}
                    >
                      Next
                    </Button>
                  </Stack>
                )}
                {index === steps.length - 1 && (
                  <Stack direction='row' justifyContent='center' alignItems='center'>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{
                        borderRadius: '49px',
                        width: 120,
                        maxWidth: 200,
                      }}
                    >
                      Back
                    </Button>
                    <Button
                      variant='contained'
                      disabled={!proceed}
                      component={RouterLink}
                      to={(isNzCitizen || isNzResident || hasWorkPermit) && hasRegularIncome ? '/application/verify' : '/application/eligibility'}
                      sx={{
                        borderRadius: '49px',
                        width: 150,
                        maxWidth: 200,
                      }}
                      endIcon={<NoteAltIcon />}
                    >
                      Proceed
                    </Button>
                  </Stack>
                )}
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}
