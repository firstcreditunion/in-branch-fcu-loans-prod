import React from 'react'

import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { styled } from '@mui/material/styles'

import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

import YourContactDetails from './ContactDetails/YourContactDetails'
import ResidentialAddress from './ContactDetails/ResidentialAddress'
import PreviousResidentialAddress from './ContactDetails/PreviousResidentialAddress'

const CustButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginRight: theme.spacing(1),
  borderRadius: '49px',
}))

const VerticalStepperButton = styled(Button)(({ theme }) => ({
  color: theme.palette.grey[700],
  borderRadius: '49px',
}))

const steps = [
  {
    label: 'Your Contact Information',
    stepContent: <YourContactDetails />,
  },
  {
    label: 'Residential Address',
    stepContent: <ResidentialAddress />,
  },
  {
    label: 'Previous Residential Address',
    stepContent: <PreviousResidentialAddress />,
  },
]

function getStepContent(step) {
  switch (step) {
    case 0:
      return <YourContactDetails />
    case 1:
      return <ResidentialAddress />
    case 2:
      return <PreviousResidentialAddress />
    default:
      return 'Unknown step'
  }
}

function ContactDetails() {
  const currResYears = useSelector((state) => state.conatctDetailsReducer.currResYears)
  const prevResidence = useSelector((state) => state.conatctDetailsReducer.prevResidence)

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {},
    mode: 'onBlur',
  })

  const [activeStep, setActiveStep] = React.useState(0)

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
              <Stack direction='column' spacing={1}>
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

export default ContactDetails
