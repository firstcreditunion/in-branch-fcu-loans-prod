import React, { useEffect } from 'react'

// MUI
import { styled } from '@mui/material/styles'

import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import useMediaQuery from '@mui/material/useMediaQuery'

import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'

import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'

// Custom Components
import Page from '../components/Page'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { loanCalculatorActions } from '../redux/slices/loanCalculatorSlice'

//Uitils
import { fCurrency, fNumber } from '../utils/formatNumber'
import { Box, Divider, Typography } from '@mui/material'

const RootStyle = styled(Page)(({ theme }) => ({
  paddingBottom: theme.spacing(15),
}))

export default function LoanProtectionInsurance({ sethasLpiPrimeDeath, sethasLpiPrimeDisability, sethasLpiPrimeCriticalIllness, sethasLpiPrimeBankruptcy, setLPIUpfrontFee }) {
  const dispatch = useDispatch()

  const downSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  //* LPI Component Controls

  //* Component Codes
  const lpiDeathCode = useSelector((state) => state.loanCalculatorReducer.lpiDeathCode)
  const lpiDisabilityCode = useSelector((state) => state.loanCalculatorReducer.lpiDisabilityCode)
  const lpiBankruptcyCode = useSelector((state) => state.loanCalculatorReducer.lpiBankruptcyCode)
  const lpiCriticalIllnessCode = useSelector((state) => state.loanCalculatorReducer.lpiCriticalIllnessCode)

  //* Components for Prime
  const hasLpiPrimeDeath = useSelector((state) => state.loanCalculatorReducer.hasLpiPrimeDeath)
  const hasLpiPrimeDisability = useSelector((state) => state.loanCalculatorReducer.hasLpiPrimeDisability)
  const hasLpiPrimeBankruptcy = useSelector((state) => state.loanCalculatorReducer.hasLpiPrimeBankruptcy)
  const hasLpiPrimeCriticalIllness = useSelector((state) => state.loanCalculatorReducer.hasLpiPrimeCriticalIllness)

  const doYouNeedCoverForJoint = useSelector((state) => state.loanCalculatorReducer.doYouNeedCoverForJoint)

  //* Components for Joint
  const hasLpiJointDeath = useSelector((state) => state.loanCalculatorReducer.hasLpiJointDeath)
  const hasLpiJointDisability = useSelector((state) => state.loanCalculatorReducer.hasLpiJointDisability)
  const hasLpiJointBankruptcy = useSelector((state) => state.loanCalculatorReducer.hasLpiJointBankruptcy)
  const hasLpiJointCriticalIllness = useSelector((state) => state.loanCalculatorReducer.hasLpiJointCriticalIllness)

  const awsCalculatedLpiAmount = useSelector((state) => state.loanCalculatorReducer.awsCalculatedLpiAmount)

  //* Setters for Prime LPI Components
  const handlePrimeDeathCover = (event) => {
    dispatch(loanCalculatorActions.sethasLpiPrimeDeath(event.target.checked))
  }
  const handlePrimeDisabilityCover = (event) => {
    dispatch(loanCalculatorActions.sethasLpiPrimeDisability(event.target.checked))
  }
  const handlePrimeBankruptcyCover = (event) => {
    dispatch(loanCalculatorActions.sethasLpiPrimeBankruptcy(event.target.checked))
  }
  const handlePrimeCriticalIllnessCover = (event) => {
    dispatch(loanCalculatorActions.sethasLpiPrimeCriticalIllness(event.target.checked))
  }

  //* Setter to show/hide Joint components
  const handleDoYouNeedJointCovers = (event) => {
    dispatch(loanCalculatorActions.setdoYouNeedCoverForJoint(event.target.value === 'Yes' ? true : false))
  }

  //* Setters for Joint LPI Components
  const handleJointDeathCover = (event) => {
    dispatch(loanCalculatorActions.sethasLpiJointDeath(event.target.checked))
  }
  const handleJointDisabilityCover = (event) => {
    dispatch(loanCalculatorActions.sethasLpiJointDisability(event.target.checked))
  }
  const handleJointBankruptcyCover = (event) => {
    dispatch(loanCalculatorActions.sethasLpiJointBankruptcy(event.target.checked))
  }
  const handleJointCriticalIllnessCover = (event) => {
    dispatch(loanCalculatorActions.sethasLpiJointCriticalIllness(event.target.checked))
  }

  useEffect(() => {
    //* LPI Components Chosen being set to the useState declared in container/routes/index
    sethasLpiPrimeDeath(hasLpiPrimeDeath)
    sethasLpiPrimeDisability(hasLpiPrimeDisability)
    sethasLpiPrimeCriticalIllness(hasLpiPrimeCriticalIllness)
    sethasLpiPrimeBankruptcy(hasLpiPrimeBankruptcy)

    //* LPI Fee Calculated by an external program in AES set to the useState declared in container/routes/index
    setLPIUpfrontFee(awsCalculatedLpiAmount)
  }, [awsCalculatedLpiAmount, hasLpiPrimeDeath, hasLpiPrimeDisability, hasLpiPrimeCriticalIllness, hasLpiPrimeBankruptcy])

  return (
    <div>
      <FormGroup row={downSm ? false : true}>
        <FormControlLabel control={<Checkbox checked={hasLpiPrimeDeath} onChange={handlePrimeDeathCover} />} label='Death' />
        <FormControlLabel control={<Checkbox checked={hasLpiPrimeDisability} onChange={handlePrimeDisabilityCover} />} label='Disability' />
        <FormControlLabel control={<Checkbox checked={hasLpiPrimeCriticalIllness} onChange={handlePrimeCriticalIllnessCover} />} label='Critical Illness' />
        <FormControlLabel control={<Checkbox checked={hasLpiPrimeBankruptcy} onChange={handlePrimeBankruptcyCover} />} label='Bankruptcy' />
      </FormGroup>
      //? Team decision not to ask for joint cover in financial calculator in the landing page
      {/* <Divider sx={{ width: '100%', py: 2  }} /> */}
      {/* 
      <Box sx={{ py: 2 }}>
        <FormControl>
          <Typography variant='caption'>Do you require insurance for joint applicant?</Typography>
          <RadioGroup row={true} aria-labelledby='joint-covers' name='joint-covers' value={doYouNeedCoverForJoint ? 'Yes' : 'No'} onChange={handleDoYouNeedJointCovers} sx={{ width: '100%' }}>
            <FormControlLabel value='Yes' control={<Radio size='small' />} label='Yes' />
            <FormControlLabel value='No' control={<Radio size='small' />} label='No' />
          </RadioGroup>
        </FormControl>
      </Box> */}
      {doYouNeedCoverForJoint && (
        <Box sx={{ width: '100%' }}>
          <Divider sx={{ width: '100%', py: 2 }} />
          <FormGroup row={downSm ? false : true}>
            <FormControlLabel control={<Checkbox checked={hasLpiJointDeath} onChange={handleJointDeathCover} />} label='Death' />
            <FormControlLabel control={<Checkbox checked={hasLpiJointDisability} onChange={handleJointDisabilityCover} />} label='Disability' />
            <FormControlLabel control={<Checkbox checked={hasLpiJointCriticalIllness} onChange={handleJointCriticalIllnessCover} />} label='Critical Illness' />
            <FormControlLabel control={<Checkbox checked={hasLpiJointBankruptcy} onChange={handleJointBankruptcyCover} />} label='Bankruptcy' />
          </FormGroup>
        </Box>
      )}
    </div>
  )
}
