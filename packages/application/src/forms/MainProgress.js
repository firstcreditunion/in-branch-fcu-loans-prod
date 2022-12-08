import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import { styled } from '@mui/material/styles'
import clsx from 'clsx'
import MainContainer from './MainContainer'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'

import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'

import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import WorkRoundedIcon from '@mui/icons-material/WorkRounded'
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded'
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded'

import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import PersonalDetails from '../forms/PersonalDetails'
import EmploymentDetails from '../forms/EmploymentDetails'
import ContactDetails from '../forms/ContactDetails'
import LoanDetails from '../forms/LoanDetails/LoanDetails'
import PrivacyActDeclaration from './PrivacyDeclaration'

import Page from '../components/Page'

const steps = [
  { index: 0, label: 'Personal', render: <PersonalDetails /> },
  { index: 1, label: 'Employment', render: <EmploymentDetails /> },
  { index: 2, label: 'Contact', render: <ContactDetails /> },
  { index: 3, label: 'Financial', render: <LoanDetails /> },
]

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 20,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: `linear-gradient( 95deg,${theme.palette.primary.main} 0%,${theme.palette.secondary.main} 100%)`,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: `linear-gradient( 95deg,${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 2,
    border: 0,
    backgroundColor: theme.palette.divider,
    borderRadius: 1,
  },
}))

const RootStyle = styled(Page)({
  height: '100%',
})

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
  zIndex: 1,
  color: theme.palette.common.white,
  width: 40,
  height: 40,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: `linear-gradient( 136deg, ${theme.palette.secondary.main} 0%, rgb(184, 184, 66) 100%)`,
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage: `linear-gradient( 136deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.main}  100%)`,
  }),
}))

const CustPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 12,
}))

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node,
}

function ColorlibStepIcon(props) {
  const { active, completed, className } = props

  const icons = {
    1: <PersonRoundedIcon />,
    2: <WorkRoundedIcon />,
    3: <PhoneRoundedIcon />,
    4: <AttachMoneyRoundedIcon />,
  }

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  )
}

function MainProgress() {
  const [activeStep, setActiveStep] = React.useState(0)

  const history = useHistory()

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      history.push('/PrivacyActDeclaration')
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  function getCurrentStep() {
    return steps.find(({ index }) => index === activeStep)
  }

  return (
    <RootStyle>
      <CustPaper variant='elevation' elevation={16}>
        <Stack direction='column' spacing={3}>
          <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>{step.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getCurrentStep().render}
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button color='inherit' disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button
                  sx={{
                    bgcolor: 'common.green',
                    color: 'common.white',
                    borderRadius: '49px',
                    width: '100px',
                    border: 'none',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    transition: '.5s',
                    '&:hover': {
                      bgcolor: 'primary.light',
                    },
                  }}
                  variant='contained'
                  onClick={handleNext}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Stack>
      </CustPaper>
    </RootStyle>
  )
}

export default MainProgress
