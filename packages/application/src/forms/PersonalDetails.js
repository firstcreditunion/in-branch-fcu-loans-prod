import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { styled } from '@mui/material/styles'
import MainContainer from './MainContainer'

import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

import YourPersonalDetails from './PersonalDetails/YourPersonalDetails'
import Identification from './PersonalDetails/Identification'

const CustGrid = styled(Grid)(({ theme }) => ({
  width: '100%',
}))

const VerticalStepperButton = styled(Button)(({ theme }) => ({
  color: theme.palette.grey[700],
  borderRadius: '49px',
}))

const CustButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginRight: theme.spacing(1),
  borderRadius: '49px',
}))

const CustPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
}))

const steps = [
  {
    label: 'Your Personal Details',
    stepContent: <YourPersonalDetails />,
  },
  {
    label: 'Identification',
    stepContent: <Identification />,
  },
]

function PersonalDetails() {
  const loading = useSelector((state) => state.yourPersonalDetailReducer.loading)
  const [activeStep, setActiveStep] = React.useState(0)

  const isStepFailed = (step) => {}

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  return (
    <Box>
      <Stepper activeStep={activeStep} orientation='vertical'>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>
              <VerticalStepperButton>{step.label}</VerticalStepperButton>
            </StepLabel>
            <StepContent>
              <Stack direction='column'>
                {step.stepContent}
                <Stack direction='row'>
                  <CustButton disabled={index === 0} onClick={handleBack}>
                    Back
                  </CustButton>
                  {index != steps.length - 1 && (
                    <CustButton variant='contained' color='primary' onClick={handleNext}>
                      {index === steps.length - 1 ? 'Finish' : 'Continue'}
                    </CustButton>
                  )}
                </Stack>
              </Stack>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}

export default PersonalDetails
