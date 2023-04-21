import React, { useEffect, useRef } from 'react'
import { Link as RouterLink, Redirect, useHistory } from 'react-router-dom'

// *  Framer

import { motion, AnimatePresence } from 'framer-motion'
import { varFade } from '../../components/ui/animate'

// *  Redux

import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { lendingCriteriaQnsActions } from '../../redux/slices/lendingCriteriaQnsSlice'
import { get } from '../../redux/slices/lendingCriteriaQnsSlice'
import { vehicleSecurityActions } from '../../redux/slices/vehicleSecuritySlice'
import { globalActions } from '../../redux/slices/globalSlice'

// *  Prequalify Interface Components

import SelectComboBox from './Interface/SelectComboBox'

// *  Custom Components

import ToggleButtons from '../../components/rhf-components/ToggleButtonGroup'
import Countries from '../../components/rhf-components/Countries'
import DatePicker from '../../components/rhf-components/DatePicker'

// * MUI

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import ToggleButton from '@mui/material/ToggleButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

// * MUI Icons

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import NoteAltIcon from '@mui/icons-material/NoteAlt'

import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'

import Input from '../../components/rhf-components/Input'

// * Dictionaries

import { loanPurpose as loanPurposeCodes, tradingBranch as tradingBranchCodes, tradingBranchNew as tradingBranchNewCodes } from './Codes/PrelimaryQuestionCodes'

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
}))

// * Redux useSelectors

function PreliminaryQuestions() {
  const jointApplication = useSelector((state) => state.lendingCritetiaQnsReducer.jointApplication)
  const jointApplicationState = useSelector((state) => state.lendingCritetiaQnsReducer.jointApplicationState)

  const existingMember = useSelector((state) => state.lendingCritetiaQnsReducer.existingMember)
  const existingMemberState = useSelector((state) => state.lendingCritetiaQnsReducer.existingMemberState)

  const loanPurpose = useSelector((state) => state.lendingCritetiaQnsReducer.loanPurpose)
  const loanPurposeState = useSelector((state) => state.lendingCritetiaQnsReducer.loanPurposeState)

  const vehicleRelatedLoanPurpose = useSelector((state) => state.lendingCritetiaQnsReducer.vehicleRelatedLoanPurpose)
  const vehicleRegistrationNumber = useSelector((state) => state.vehicleSecurityReducer.vehicleRegistrationNumber)

  const tradingBranch = useSelector((state) => state.lendingCritetiaQnsReducer.tradingBranch)
  const tradingBranchState = useSelector((state) => state.lendingCritetiaQnsReducer.tradingBranchState)

  // const age = useSelector((state) => state.lendingCritetiaQnsReducer.age)
  // const ageState = useSelector((state) => state.lendingCritetiaQnsReducer.ageState)

  const downSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const downMd = useMediaQuery((theme) => theme.breakpoints.down('md'))

  const { control, watch } = useForm({
    defaultValues: {
      // age: age,
      jointApplication: jointApplication,
      existingMember: existingMember,
      loanPurpose: loanPurpose,
      tradingBranch: tradingBranch,
    },
    mode: 'onChange',
  })

  const dispatch = useDispatch()

  function onsubmit() {
    console.log('Prelim Qns Submitted')
  }

  const varRegistrationNumberInput = vehicleRelatedLoanPurpose
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

  const varTradingBranch =
    tradingBranch != 'VIR' && existingMemberState != 'initial'
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

  const watchExistingMember = watch('existingMember')
  const watchJointLoan = watch('jointApplication')
  const watchLoanPurpose = watch('loanpurpose')
  const watchTradingBranch = watch('tradingbranch')
  // const watchAge = watch('age')

  useEffect(() => {
    if (jointApplicationState === 'initial' && existingMemberState === 'initial' && loanPurposeState === 'initial' && loanPurposeState === 'initial' && tradingBranchState === 'initial') return

    if (watchJointLoan !== null && jointApplicationState !== 'initial' && watchExistingMember !== null && existingMemberState !== 'initial' && watchLoanPurpose !== null && loanPurposeState !== 'initial' && (watchExistingMember === 'No' || (watchExistingMember === 'Yes' && !(watchTradingBranch == null) && !(tradingBranch == null) && tradingBranchState !== 'initial'))) {
      dispatch(lendingCriteriaQnsActions.setProceed(true))
      dispatch(lendingCriteriaQnsActions.setIsValidJointApplication(true))
      dispatch(lendingCriteriaQnsActions.setIsValidExistingMember(true))
      dispatch(lendingCriteriaQnsActions.setIsValidLoanPurpose(true))
      dispatch(lendingCriteriaQnsActions.setIsValidTradingBranch(true))

      // dispatch(lendingCriteriaQnsActions.setIsValidAge(true))

      return
    }
    dispatch(lendingCriteriaQnsActions.setProceed(false))
    dispatch(lendingCriteriaQnsActions.setIsValidJointApplication(false))
    dispatch(lendingCriteriaQnsActions.setIsValidExistingMember(false))
    dispatch(lendingCriteriaQnsActions.setIsValidLoanPurpose(false))
    dispatch(lendingCriteriaQnsActions.setIsValidTradingBranch(false))
  }, [watchLoanPurpose, watchJointLoan, watchTradingBranch, watchExistingMember, tradingBranch])

  const handleJointApplicantToggle = (event) => {
    if (event.target.value === 'No') {
      dispatch(lendingCriteriaQnsActions.setJointApplication({ key: event.target.value, value: false }))
      dispatch(lendingCriteriaQnsActions.setJointApplicationState('onChange'))

      return
    }
    dispatch(lendingCriteriaQnsActions.setJointApplication({ key: event.target.value, value: true }))
    dispatch(lendingCriteriaQnsActions.setJointApplicationState('onChange'))
  }

  const handleExistingMemberToggle = (event) => {
    if (event.target.value === 'No') {
      dispatch(lendingCriteriaQnsActions.setExistingMember({ key: event.target.value, value: false }))
      dispatch(lendingCriteriaQnsActions.setExistingMemberState('onChange'))
      dispatch(lendingCriteriaQnsActions.setTradingBranch('VIR'))
      dispatch(lendingCriteriaQnsActions.setTradingBranchState('onChange'))
      return
    }
    dispatch(lendingCriteriaQnsActions.setExistingMember({ key: event.target.value, value: true }))
    dispatch(lendingCriteriaQnsActions.setExistingMemberState('onChange'))
    dispatch(lendingCriteriaQnsActions.setTradingBranch(null))
    dispatch(lendingCriteriaQnsActions.setTradingBranchState('onChange'))
  }

  const handleLoanPurpose = (event) => {
    let selectedLoanPurpose = loanPurposeCodes.filter((loanPurposeMenu) => {
      return loanPurposeMenu?.value === event.target.value
    })[0]?.key

    let isVehicleRelatedLoanPurpose = loanPurposeCodes.filter((loanPurposeMenu) => {
      return loanPurposeMenu?.value === event.target.value
    })[0]?.vehicleRelatedPurpose

    dispatch(lendingCriteriaQnsActions.setLoanPurpose(selectedLoanPurpose))
    dispatch(lendingCriteriaQnsActions.setLoanPurposeState('onChange'))
    dispatch(lendingCriteriaQnsActions.setVehicleRelatedLoanPurpose(isVehicleRelatedLoanPurpose))
  }

  const handleVehicleRegistrationNumber = (event) => {
    dispatch(vehicleSecurityActions.setVehicleRegistrationNumber(event.target.value.toUpperCase()))

    if (event.target.value === '' || event.target.value == null) {
      dispatch(vehicleSecurityActions.setRegoProvidedInPrelimQuestions(false))
    } else {
      dispatch(vehicleSecurityActions.setRegoProvidedInPrelimQuestions(true))
    }
  }

  const handleTradingBranch = (event) => {
    let selectedTradingBranch = tradingBranchNewCodes.filter((tradingBranchMenu) => {
      return tradingBranchMenu?.value === event.target.value
    })[0]?.key

    dispatch(lendingCriteriaQnsActions.setTradingBranch(selectedTradingBranch))
    dispatch(lendingCriteriaQnsActions.setTradingBranchState('onChange'))
  }

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
      <Stack direction={downMd ? 'column' : 'column'} justifyContent='center' alignItems='center' sx={{ width: '100%' }} spacing={2}>
        <LabelStyle sx={{ textAlign: 'center' }}>Are you an existing member?</LabelStyle>
        <ToggleButtons id='existingMember' name='existingMember' onToggleButtonChange={handleExistingMemberToggle} control={control} defaultValue={''} value={jointApplicationState === 'initial' ? '' : jointApplication.key} label='Are you an existing member?'>
          <ToggleButton size='small' value='Yes' sx={{ width: '50%' }}>
            Yes
          </ToggleButton>
          <ToggleButton size='small' value='No' sx={{ width: '50%' }}>
            No
          </ToggleButton>
        </ToggleButtons>
      </Stack>
      <Stack direction={downMd ? 'column' : 'column'} justifyContent='center' alignItems='center' sx={{ width: '100%' }} spacing={2}>
        <LabelStyle sx={{ textAlign: 'center' }}>What is the purpose of this loan?</LabelStyle>
        <SelectComboBox id='loanpurpose' name='loanpurpose' label='Loan Purpose' placeholder='Select Loan Purpose' menu={loanPurposeCodes} onSelectChange={handleLoanPurpose} control={control} />
        <AnimatePresence>
          {vehicleRelatedLoanPurpose && (
            <Stack component={motion.div} {...varRegistrationNumberInput} direction={downMd ? 'column' : 'column'} justifyContent='center' alignItems='center' sx={{ width: '100%', maxWidth: 400 }} spacing={2}>
              <Input name='vehicleRegistrationNumber' label='Registration Number' type='text' control={control} capitalise={true} onInputChange={handleVehicleRegistrationNumber} hasTooltip={true} toolTipText='Please enter your vehicle registration number.' />
            </Stack>
          )}
        </AnimatePresence>
      </Stack>
      <AnimatePresence>
        {tradingBranch != 'VIR' && existingMemberState != 'initial' && (
          <Stack component={motion.div} {...varTradingBranch} direction={downMd ? 'column' : 'column'} justifyContent='center' alignItems='center' sx={{ width: '100%' }} spacing={2}>
            <LabelStyle sx={{ textAlign: 'center' }}>Select your preferred trading branch</LabelStyle>
            <SelectComboBox id='tradingbranch' name='tradingbranch' label='Trading Branch' placeholder='Select Trading Branch' menu={tradingBranchNewCodes} onSelectChange={handleTradingBranch} control={control} useSelectedValue={true} selectedValue={tradingBranch} />
          </Stack>
        )}
      </AnimatePresence>
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
      bankruptcyDate: bankruptcyDate,
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
              <DatePicker id='bankruptcyDate' name='bankruptcyDate' onDateChange={handleBankruptcyDate} label='Insolvency Date' control={control} variant='outlined' helperText='Month and Year. Eg: June 2020' openTo='year' format='MMMM YYYY' date={bankruptcyDate} maxDate={upperLimitForInsovencyDate} isRequired={true} views={['year', 'month']} />
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

export default function PrequalifyQuestions() {
  const dispatch = useDispatch()
  const preliminaryQnsStepHeaderRef = useRef(new Array())

  const guestSessionID = useSelector((state) => state.globalReducer.guestSessionID)

  const proceed = useSelector((state) => state.lendingCritetiaQnsReducer.proceed)

  const isValidExistingMember = useSelector((state) => state.lendingCritetiaQnsReducer.isValidExistingMember)
  const isValidJointApplication = useSelector((state) => state.lendingCritetiaQnsReducer.isValidJointApplication)
  const isValidLoanPurpose = useSelector((state) => state.lendingCritetiaQnsReducer.isValidLoanPurpose)
  const isValidTradingBranch = useSelector((state) => state.lendingCritetiaQnsReducer.isValidTradingBranch)

  const isValidResidency = useSelector((state) => state.lendingCritetiaQnsReducer.isValidResidency)
  const isValidIncome = useSelector((state) => state.lendingCritetiaQnsReducer.isValidIncome)
  const isValidWasDeclaredBankrupt = useSelector((state) => state.lendingCritetiaQnsReducer.isValidWasDeclaredBankrupt)
  const isValidIncomeCreditedToFCU = useSelector((state) => state.lendingCritetiaQnsReducer.isValidIncomeCreditedToFCU)

  const isNzCitizen = useSelector((state) => state.lendingCritetiaQnsReducer.isNzCitizen.value)
  const isNzResident = useSelector((state) => state.lendingCritetiaQnsReducer.isNzResident.value)
  const hasWorkPermit = useSelector((state) => state.lendingCritetiaQnsReducer.hasWorkPermit.value)
  const hasRegularIncome = useSelector((state) => state.lendingCritetiaQnsReducer.hasRegularIncome.value)

  const wasDeclaredBankrupt = useSelector((state) => state.lendingCritetiaQnsReducer.wasDeclaredBankrupt)

  const loanPurpose = useSelector((state) => state.lendingCritetiaQnsReducer.loanPurpose)
  const tradingBranch = useSelector((state) => state.lendingCritetiaQnsReducer.tradingBranch)

  const [activeStep, setActiveStep] = React.useState(0)
  const downMd = useMediaQuery((theme) => theme.breakpoints.down('md'))
  const downSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  useEffect(() => {
    if (activeStep === 0 && isValidJointApplication && isValidExistingMember && isValidLoanPurpose && isValidTradingBranch) dispatch(lendingCriteriaQnsActions.setProceed(true))
    if (activeStep === 0 && (!isValidJointApplication || !isValidExistingMember || !isValidLoanPurpose || !isValidTradingBranch)) {
      dispatch(lendingCriteriaQnsActions.setProceed(false))
    }

    if (activeStep === 1 && isValidResidency) dispatch(lendingCriteriaQnsActions.setProceed(true))
    if (activeStep === 1 && !isValidResidency) {
      dispatch(lendingCriteriaQnsActions.setProceed(false))
    }
    if (activeStep === 2 && isValidIncome && isValidWasDeclaredBankrupt && isValidIncomeCreditedToFCU) dispatch(lendingCriteriaQnsActions.setProceed(true))
    if (activeStep === 2 && (!isValidIncome || !isValidWasDeclaredBankrupt || !isValidIncomeCreditedToFCU)) {
      dispatch(lendingCriteriaQnsActions.setProceed(false))
      dispatch(lendingCriteriaQnsActions.setPreQualifyCompleted(true))
    }

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
                      variant='contained'
                      disabled={!proceed}
                      onClick={handleNext}
                      sx={{
                        borderRadius: '49px',
                        width: 120,
                        maxWidth: 200,
                      }}
                      endIcon={<ArrowForwardIosIcon />}
                    >
                      Continue
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
                      to={(isNzCitizen || isNzResident || hasWorkPermit) && hasRegularIncome ? '/application/personal_loan' : '/application/eligibility'}
                      sx={{
                        borderRadius: '49px',
                        width: 150,
                        maxWidth: 200,
                      }}
                      endIcon={<NoteAltIcon />}
                    >
                      Continue
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
