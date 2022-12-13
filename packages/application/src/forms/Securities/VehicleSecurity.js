import React, { useEffect } from 'react'

//* Framer
import { motion, AnimatePresence } from 'framer-motion'
import { varFade } from '../../components/ui/animate'

//* Redux
import { useDispatch, useSelector } from 'react-redux'
import { vehicleSecurityActions } from '../../redux/slices/vehicleSecuritySlice'

//* MUI - Styles
import { styled } from '@mui/material/styles'

//* MUI
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import Radio from '@mui/material/Radio'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import FormControlLabel from '@mui/material/FormControlLabel'

//* YUP
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

//* RHF
import { useForm } from 'react-hook-form'

//* Custom Components
import Form from '../../components/Form'
import VerbiageCard from './Interfaces/VerbiageCard'
import VerbiageAlert from './Interfaces/VerbiageAlert'
import Input from '../../components/rhf-components/Input'
import RadioGroups from '../../components/rhf-components/RadioGroups'

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
}))

export default function VehicleSecurity() {
  const dispatch = useDispatch()

  const vehicleRelatedLoanPurpose = useSelector((state) => state.lendingCritetiaQnsReducer.vehicleRelatedLoanPurpose)

  const hasPurchsedVehicle = useSelector((state) => state.vehicleSecurityReducer.hasPurchsedVehicle)
  const vehicleRegistrationNumber = useSelector((state) => state.vehicleSecurityReducer.vehicleRegistrationNumber)
  const regoProvidedInPrelimQuestions = useSelector((state) => state.vehicleSecurityReducer.regoProvidedInPrelimQuestions)
  const wouldYoulikeToProvideVehicleSecurity = useSelector((state) => state.vehicleSecurityReducer.wouldYoulikeToProvideVehicleSecurity)

  const onSubmitVehicleSecurityDetails = useSelector((state) => state.vehicleSecurityReducer.onSubmitVehicleSecurityDetails)
  const isValidVehicleSecurityDetails = useSelector((state) => state.vehicleSecurityReducer.isValidVehicleSecurityDetails)

  const handleVehicleRegistrationNumber = (event) => {
    dispatch(vehicleSecurityActions.setVehicleRegistrationNumber(event.target.value.toUpperCase()))
  }

  const handleHasPurchasedVehicle = (event) => {
    dispatch(vehicleSecurityActions.setHasPurchsedVehicle(event.target.value))
  }
  const handleWouldYouliketoProvideVehicleSucurity = (event) => {
    dispatch(vehicleSecurityActions.setWouldYoulikeToProvideVehicleSecurity(event.target.value))
  }

  const schema = yup.object().shape({
    vehicleRelatedLoanPurpose: yup.boolean(),
    hasPurchsedVehicle: yup.string().nullable(),
    vehicleRegistrationNumber: yup.string().when(['hasPurchsedVehicle', 'vehicleRelatedLoanPurpose'], {
      is: (hasPurchsedVehicle, vehicleRelatedLoanPurpose) => {
        return hasPurchsedVehicle === 'Yes' && vehicleRelatedLoanPurpose
      },
      then: yup.string().required('Reistration Number is required').nullable(),
      otherwise: yup.string().nullable(),
    }),
  })

  const {
    formState: { isValid },
    control,
    handleSubmit,
  } = useForm({
    defaultValues: {
      vehicleRelatedLoanPurpose: vehicleRelatedLoanPurpose,
      hasPurchsedVehicle: hasPurchsedVehicle,
      vehicleRegistrationNumber: vehicleRegistrationNumber,
      wouldYoulikeToProvideVehicleSecurity: wouldYoulikeToProvideVehicleSecurity,
    },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    dispatch(vehicleSecurityActions.setIsValidVehicleSecurityDetails(isValid))
  }, [isValid])

  useEffect(() => {
    if (onSubmitVehicleSecurityDetails != null) {
      handleSubmit(onSubmit())()
      return
    }
  }, [onSubmitVehicleSecurityDetails])

  function onSubmit() {
    console.log('Financial Details Submitted')
  }

  const varWouldyouLiketoProvideVehicleSecurity =
    wouldYoulikeToProvideVehicleSecurity === 'Yes'
      ? varFade({
          distance: 100,
          durationIn: 0.32,
          durationOut: 0.32,
        }).inUp
      : wouldYoulikeToProvideVehicleSecurity === 'No'
      ? ''
      : varFade({
          distance: 100,
          durationIn: 0.32,
          durationOut: 0.32,
        }).outDown

  const varHasPurchasedVehicle =
    hasPurchsedVehicle === 'Yes'
      ? varFade({
          distance: 100,
          durationIn: 0.32,
          durationOut: 0.32,
        }).inUp
      : hasPurchsedVehicle === 'No'
      ? ''
      : varFade({
          distance: 100,
          durationIn: 0.32,
          durationOut: 0.32,
        }).outDown

  return (
    <>
      <Form>
        <Stack direction='column' justifyContent='center' alignItems='center' spacing={4} sx={{ width: '100%', py: 2 }}>
          <Stack component={motion.div} {...varFade({ distance: 25, durationIn: 0.5, durationOut: 0.5 }).inDown}>
            <VerbiageAlert
              alertTitle='Important'
              alertContent={
                <Typography variant='caption'>
                  By providing vehicle as security for your loan, this may <strong>lower your interest rate</strong>.
                </Typography>
              }
            />
          </Stack>
          <Stack direction='column' justifyContent='center' alignItems='center' spacing={4} sx={{ width: '100%', py: 2 }}>
            {vehicleRelatedLoanPurpose && regoProvidedInPrelimQuestions && (
              <Stack direction='column' justifyContent='center' alignItems='center' spacing={3} sx={{ width: '100%' }}>
                <Input name='vehicleRegistrationNumber' label='Registration Number' type='text' control={control} onInputChange={handleVehicleRegistrationNumber} />
                <Stack direction='column'>
                  <LabelStyle sx={{ textAlign: 'center' }}>Have you purchased the vehicle yet?</LabelStyle>
                  <RadioGroups id='hasPurchsedVehicle' name='hasPurchsedVehicle' alignItems='center' onRadioChange={handleHasPurchasedVehicle} control={control} value={hasPurchsedVehicle} defaultValue={hasPurchsedVehicle || ''} row={true}>
                    <FormControlLabel value='Yes' control={<Radio size='small' />} label='Yes' key='Yes' />
                    <FormControlLabel value='No' control={<Radio size='small' />} label='No' key='No' />
                  </RadioGroups>
                </Stack>
              </Stack>
            )}
            {!regoProvidedInPrelimQuestions && (
              <Stack direction='column' justifyContent='center' alignItems='center' spacing={3}>
                <Stack direction='column'>
                  <LabelStyle sx={{ textAlign: 'center' }}>Would you like to provide vehicle as security?</LabelStyle>
                  <RadioGroups id='wouldYoulikeToProvideVehicleSecurity' name='wouldYoulikeToProvideVehicleSecurity' alignItems='center' onRadioChange={handleWouldYouliketoProvideVehicleSucurity} control={control} value={wouldYoulikeToProvideVehicleSecurity} defaultValue={wouldYoulikeToProvideVehicleSecurity || ''} row={true}>
                    <FormControlLabel value='Yes' control={<Radio size='small' />} label='Yes' key='Yes' />
                    <FormControlLabel value='No' control={<Radio size='small' />} label='No' key='No' />
                  </RadioGroups>
                </Stack>
              </Stack>
            )}
            {wouldYoulikeToProvideVehicleSecurity === 'Yes' && (
              <AnimatePresence exitBeforeEnter>
                <Stack component={motion.div} {...varWouldyouLiketoProvideVehicleSecurity} direction='column' justifyContent='center' alignItems='center'>
                  <Stack direction='column'>
                    <LabelStyle sx={{ textAlign: 'center' }}>Have you purchased the vehicle yet?</LabelStyle>
                    <RadioGroups id='hasPurchsedVehicle' name='hasPurchsedVehicle' alignItems='center' onRadioChange={handleHasPurchasedVehicle} control={control} value={hasPurchsedVehicle} defaultValue={hasPurchsedVehicle || ''} row={true}>
                      <FormControlLabel value='Yes' control={<Radio size='small' />} label='Yes' key='Yes' />
                      <FormControlLabel value='No' control={<Radio size='small' />} label='No' key='No' />
                    </RadioGroups>
                  </Stack>
                </Stack>
              </AnimatePresence>
            )}
            {wouldYoulikeToProvideVehicleSecurity === 'Yes' && hasPurchsedVehicle === 'Yes' && !vehicleRelatedLoanPurpose && (
              <AnimatePresence exitBeforeEnter>
                <Stack component={motion.div} {...varHasPurchasedVehicle} direction='column' justifyContent='center' alignItems='center' sx={{ width: '100%' }}>
                  <Input name='vehicleRegistrationNumber' label='Registration Number' type='text' control={control} capitalise={true} onInputChange={handleVehicleRegistrationNumber} hasTooltip={true} toolTipText='Please enter your vehicle registration number.' placeholder='Vehicle Rego' />
                </Stack>
              </AnimatePresence>
            )}
          </Stack>
        </Stack>
      </Form>
    </>
  )
}
