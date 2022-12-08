import React, { useEffect } from 'react'

// MUI - Styled
import { styled } from '@mui/material/styles'

//* Framer
import { motion, AnimatePresence } from 'framer-motion'
import { varFade } from '../../../components/ui/animate'

//* MUI
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

//* MUI Icons
import PersonIcon from '@mui/icons-material/Person'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'

//* MUI - Radio
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'

//* MUI - Form Control
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'

// Custom Components
import Page from '../../../components/Page'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { financialDetailsActions } from '../../../redux/slices/financialDetailsSlice'

//Uitils
import { fCurrency, fNumber } from '../../../utils/formatNumber'

import { PATH_PAGE } from '../../../links/externalLinks'

const RootStyle = styled(Page)(({ theme }) => ({
  paddingBottom: theme.spacing(15),
}))

export default function LoanProtectionInsurance() {
  const dispatch = useDispatch()

  const downSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  //* LPI Component Controls

  //* Component Codes
  const lpiDeathCode = useSelector((state) => state.financialDetailsReducer.lpiDeathCode)
  const lpiDisabilityCode = useSelector((state) => state.financialDetailsReducer.lpiDisabilityCode)
  const lpiBankruptcyCode = useSelector((state) => state.financialDetailsReducer.lpiBankruptcyCode)
  const lpiCriticalIllnessCode = useSelector((state) => state.financialDetailsReducer.lpiCriticalIllnessCode)

  //* LPI Components for Prime (optional)
  const hasLpiPrimeDeath = useSelector((state) => state.financialDetailsReducer.hasLpiPrimeDeath)
  const hasLpiPrimeDisability = useSelector((state) => state.financialDetailsReducer.hasLpiPrimeDisability)
  const hasLpiPrimeBankruptcy = useSelector((state) => state.financialDetailsReducer.hasLpiPrimeBankruptcy)
  const hasLpiPrimeCriticalIllness = useSelector((state) => state.financialDetailsReducer.hasLpiPrimeCriticalIllness)

  //* Listener for Joint Application
  const jointApplication = useSelector((state) => state.lendingCritetiaQnsReducer.jointApplication.value)

  const doYouNeedCoverForJoint = useSelector((state) => state.financialDetailsReducer.doYouNeedCoverForJoint)

  //* LPI Components for Joint (optional)
  const hasLpiJointDeath = useSelector((state) => state.financialDetailsReducer.hasLpiJointDeath)
  const hasLpiJointDisability = useSelector((state) => state.financialDetailsReducer.hasLpiJointDisability)
  const hasLpiJointBankruptcy = useSelector((state) => state.financialDetailsReducer.hasLpiJointBankruptcy)
  const hasLpiJointCriticalIllness = useSelector((state) => state.financialDetailsReducer.hasLpiJointCriticalIllness)

  const awsCalculatedLpiAmount = useSelector((state) => state.financialDetailsReducer.awsCalculatedLpiAmount)

  //* Animation for Prime LPI Componenets

  const varPrimeLpiTitle = varFade({
    distance: 10,
    durationIn: 0.5,
    durationOut: 0.32,
  }).inDown

  const varPrimeLpiChip = varFade({
    distance: 10,
    durationIn: 0.5,
    durationOut: 0.32,
  }).inRight

  //* Animation for Joint LPI Componenets
  const varJointLpiTitle = doYouNeedCoverForJoint
    ? varFade({
        distance: 10,
        durationIn: 0.5,
        durationOut: 0.32,
      }).inLeft
    : varFade({
        distance: 10,
        durationIn: 0.32,
        durationOut: 0.32,
      }).outLeft

  const varJointLpiChip = doYouNeedCoverForJoint
    ? varFade({
        distance: 10,
        durationIn: 0.5,
        durationOut: 0.32,
      }).inRight
    : varFade({
        distance: 10,
        durationIn: 0.32,
        durationOut: 0.32,
      }).outRight

  //* Setters for Prime LPI Components
  const handlePrimeDeathCover = (event) => {
    dispatch(financialDetailsActions.sethasLpiPrimeDeath(event.target.checked))
  }
  const handlePrimeDisabilityCover = (event) => {
    dispatch(financialDetailsActions.sethasLpiPrimeDisability(event.target.checked))
  }
  const handlePrimeBankruptcyCover = (event) => {
    dispatch(financialDetailsActions.sethasLpiPrimeBankruptcy(event.target.checked))
  }
  const handlePrimeCriticalIllnessCover = (event) => {
    dispatch(financialDetailsActions.sethasLpiPrimeCriticalIllness(event.target.checked))
  }

  //* Setter to show/hide Joint components
  const handleDoYouNeedJointCovers = (event) => {
    if (event.target.value === 'No') {
      dispatch(financialDetailsActions.sethasLpiJointDeath(false))
      dispatch(financialDetailsActions.sethasLpiJointDisability(false))
      dispatch(financialDetailsActions.sethasLpiJointBankruptcy(false))
      dispatch(financialDetailsActions.sethasLpiJointCriticalIllness(false))
    }

    dispatch(financialDetailsActions.setdoYouNeedCoverForJoint(event.target.value === 'Yes' ? true : false))
  }

  //* Setters for Joint LPI Components
  const handleJointDeathCover = (event) => {
    dispatch(financialDetailsActions.sethasLpiJointDeath(event.target.checked))
  }
  const handleJointDisabilityCover = (event) => {
    dispatch(financialDetailsActions.sethasLpiJointDisability(event.target.checked))
  }
  const handleJointBankruptcyCover = (event) => {
    dispatch(financialDetailsActions.sethasLpiJointBankruptcy(event.target.checked))
  }
  const handleJointCriticalIllnessCover = (event) => {
    dispatch(financialDetailsActions.sethasLpiJointCriticalIllness(event.target.checked))
  }

  return (
    <div>
      <FormGroup row={downSm ? false : true}>
        <Stack direction='column' sx={{ width: '100%' }} spacing={1}>
          <Stack direction='column' sx={{ width: '100%' }} justifyContent='space-between' alignItems='center' spacing={2}>
            <Typography component={motion.div} {...varPrimeLpiTitle} variant={downSm ? 'caption' : 'subtitle2'} sx={{ fontWeight: 'bold' }}>
              Loan Protection Insurance (optional)
            </Typography>
            <Chip component={motion.div} sx={{ px: 0.25 }} {...varPrimeLpiChip} color='primary' variant='filled' size='small' icon={<PersonIcon />} label='Prime Applicant' />
          </Stack>
          <Box>
            <Stack direction={downSm ? 'column' : 'row'} justifyContent='center' alignItems='center'>
              <FormControlLabel control={<Checkbox size='small' checked={hasLpiPrimeDeath} onChange={handlePrimeDeathCover} />} label='Death' />
              <FormControlLabel control={<Checkbox size='small' checked={hasLpiPrimeDisability} onChange={handlePrimeDisabilityCover} />} label='Disability' />
            </Stack>
            <Stack direction={downSm ? 'column' : 'row'} justifyContent='center' alignItems='center'>
              <FormControlLabel control={<Checkbox size='small' checked={hasLpiPrimeBankruptcy} onChange={handlePrimeBankruptcyCover} />} label='Bankruptcy' />
              <FormControlLabel control={<Checkbox size='small' checked={hasLpiPrimeCriticalIllness} onChange={handlePrimeCriticalIllnessCover} />} label='Critical Illness' />
            </Stack>
          </Box>
          <Typography variant='caption' sx={{ textAlign: 'center' }}>
            To learn more about Loan Protection Insurance,
            <Link color='secondary.main' href={PATH_PAGE.loanprotectioninsurance} target='_blank'>
              {' '}
              click here
            </Link>
            {'. '}
          </Typography>
        </Stack>
      </FormGroup>

      {jointApplication && (
        <Box sx={{ width: '100%', pt: 2 }}>
          <Divider sx={{ width: '100%' }} />
          <FormControl sx={{ width: '100%', pt: 2 }}>
            <Stack direction='column' justifyContent='center' alignItems='center' sx={{ width: '100%' }}>
              <Typography variant='caption'>Do you require insurance for joint applicant?</Typography>
              <RadioGroup row={true} aria-labelledby='joint-covers' name='joint-covers' value={doYouNeedCoverForJoint ? 'Yes' : 'No'} onChange={handleDoYouNeedJointCovers} sx={{ width: '100%', alignItems: 'center' }}>
                <Stack direction='row' justifyContent='center' alignItems='center' sx={{ width: '100%' }}>
                  <FormControlLabel value='Yes' control={<Radio size='small' />} label='Yes' />
                  <FormControlLabel value='No' control={<Radio size='small' />} label='No' />
                </Stack>
              </RadioGroup>
            </Stack>
          </FormControl>
        </Box>
      )}

      <AnimatePresence exitBeforeEnter>
        {jointApplication && doYouNeedCoverForJoint && (
          <Box sx={{ width: '100%' }}>
            <FormGroup row={downSm ? false : true}>
              <Stack direction='column' sx={{ width: '100%' }} spacing={1}>
                <Stack direction='column' sx={{ width: '100%' }} justifyContent='center' alignItems='center'>
                  <Chip component={motion.div} sx={{ px: 0.25 }} {...varJointLpiChip} color='secondary' variant='filled' size='small' icon={<PeopleAltIcon />} label='Joint Applicant' />
                </Stack>
                <Box>
                  <Stack direction={downSm ? 'column' : 'row'} justifyContent='center' alignItems='center'>
                    <FormControlLabel control={<Checkbox size='small' checked={hasLpiJointDeath} onChange={handleJointDeathCover} />} label='Death' />
                    <FormControlLabel control={<Checkbox size='small' checked={hasLpiJointDisability} onChange={handleJointDisabilityCover} />} label='Disability' />
                  </Stack>
                  <Stack direction={downSm ? 'column' : 'row'} justifyContent='center' alignItems='center'>
                    <FormControlLabel control={<Checkbox size='small' checked={hasLpiJointBankruptcy} onChange={handleJointBankruptcyCover} />} label='Bankruptcy' />
                    <FormControlLabel control={<Checkbox size='small' checked={hasLpiJointCriticalIllness} onChange={handleJointCriticalIllnessCover} />} label='Critical Illness' />
                  </Stack>
                </Box>
              </Stack>
            </FormGroup>
          </Box>
        )}
      </AnimatePresence>
    </div>
  )
}
