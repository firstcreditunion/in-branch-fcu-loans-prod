import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { employmentActions } from '../redux/slices/employmentSlice'

import { useForm } from 'react-hook-form'

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
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'

import RadioGroups from '../components/rhf-components/RadioGroups'

import EmploymentStatus from './EmploymentDetails/EmploymentStatus'
import EmployerDetails from './EmploymentDetails/EmployerDetails'
import EmploymentHistory from './EmploymentDetails/EmploymentHistory'

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
    label: 'Employment Status',
    stepContent: <EmploymentStatus />,
  },
  {
    label: 'Employer Details',
    stepContent: <EmployerDetails />,
  },
  {
    label: 'Employment History',
    stepContent: <EmploymentHistory />,
  },
]

function EmploymentDetails() {
  const isEmployed = useSelector((state) => state.employmentReducer.isEmployed)
  const showEmploymentDetails = useSelector((state) => state.employmentReducer.showEmploymentDetails)

  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: { isEmployed: isEmployed },
    mode: 'onBlur',
  })

  const toggleEmploymentDetails = (event) => {
    dispatch(employmentActions.toggleEmploymentDetails(event.target.value))
  }

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
    <Stack direction='column'>
      <Grid item container direction='row' justifyContent='center' alignItems='center'>
        <RadioGroups id='isEmployed' name='isEmployed' onRadioChange={toggleEmploymentDetails} label='Do you receive a regular income?' control={control} variant='' defaultValue={''}>
          <Grid item container direction='row' justifyContent='center' alignItems='center'>
            <FormControlLabel value='Y' control={<Radio />} label='Yes' />
            <FormControlLabel value='N' control={<Radio />} label='No' />
          </Grid>
        </RadioGroups>
      </Grid>
      <CustGrid container direction='column'>
        {showEmploymentDetails && (
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
        )}
      </CustGrid>
    </Stack>
  )
}

export default EmploymentDetails
