import React, { useEffect } from 'react'
import { styled } from '@mui/material/styles'

// Framer
import { motion, AnimatePresence } from 'framer-motion'
import { varFade, varBounce } from '../../components/ui/animate'

import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { contactDetailsActions } from '../../redux/slices/contactDetailsSlice'
import { getAddresses } from '../../redux/slices/contactDetailsSlice'
import { getAddressMetaData } from '../../redux/slices/contactDetailsSlice'

// API constants
import { BASE_URL_LOCAL_APP, BASE_URL_AWS_APP, processNodeEnv } from '../../redux/utils/apiConstants'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import Form from '../../components/Form'
import Counter from '../../components/Counter'
import EditableCounter from '../../components/rhf-components/EditableCounter'
import AddressFinderAutoComplete from '../../components/AddressFinderAutoComplete'

import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import AlertTitle from '@mui/material/AlertTitle'
import useMediaQuery from '@mui/material/useMediaQuery'

import IconButton from '@mui/material/IconButton'
import CabinRoundedIcon from '@mui/icons-material/CabinRounded'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
}))

function JointPreviousResidentialAddress() {
  const prevHomeAddStreet = useSelector((state) => state.conatctDetailsReducer.jointprevHomeAddStreet)
  const prevResYears = useSelector((state) => state.conatctDetailsReducer.jointprevResYears)
  const prevResMonths = useSelector((state) => state.conatctDetailsReducer.jointprevResMonths)
  const onSubmitPrevResidenceDetails = useSelector((state) => state.conatctDetailsReducer.jointonSubmitPrevResidenceDetails)

  // Address Finder
  const loading = useSelector((state) => state.conatctDetailsReducer.loading)
  const prevResAddressFinderCompletions = useSelector((state) => state.conatctDetailsReducer.jointprevResAddressFinderCompletions)
  const prevResAddressFinderSucess = useSelector((state) => state.conatctDetailsReducer.jointprevResAddressFinderSucess)
  const prevResAddressFinderConfig = useSelector((state) => state.conatctDetailsReducer.jointprevResAddressFinderConfig)

  const prevResAddressSelectedAddress = useSelector((state) => state.conatctDetailsReducer.jointprevResAddressSelectedAddress)
  const prevResAddressSelectedPxid = useSelector((state) => state.conatctDetailsReducer.jointprevResAddressSelectedPxid)
  const prevResAddressSelectedMetaData = useSelector((state) => state.conatctDetailsReducer.jointprevResAddressSelectedMetaData)
  const loadingMeta = useSelector((state) => state.conatctDetailsReducer.loadingMeta)

  const prevResAddressToDisplayLine1 = useSelector((state) => state.conatctDetailsReducer.jointprevResAddressToDisplayLine1)
  const prevResAddressToDisplayLine2 = useSelector((state) => state.conatctDetailsReducer.jointprevResAddressToDisplayLine2)
  const prevResAddressToDisplayLine3 = useSelector((state) => state.conatctDetailsReducer.jointprevResAddressToDisplayLine3)

  const schema = yup.object().shape({
    prevHomeAddStreet: yup
      .string()
      .test('Conditional requirement', 'Residential address is required', function (prevResAddress) {
        if (prevResAddress === undefined || prevResAddress == null || prevResAddress === '') {
          return false
        }
        return true
      })
      .required('Residential address is required')
      .nullable(),
    prevResYears: yup.string(),
    prevResMonths: yup.string(),
  })

  const varPrevResDetails =
    prevResAddressSelectedPxid !== null
      ? varFade({
          distance: 100,
          durationIn: 0.32,
          durationOut: 0.32,
        }).inRight
      : varFade({
          distance: 100,
          durationIn: 0.32,
          durationOut: 0.32,
        }).outLeft

  const varLocationIcon =
    prevResAddressSelectedPxid !== null
      ? varBounce({
          durationIn: 0.5,
          durationOut: 0.5,
          delay: 0.5,
          inY: 1,
        }).inDown
      : varBounce({
          durationIn: 0.5,
          durationOut: 0.5,
          inY: 1,
        }).out

  const dispatch = useDispatch()

  const downSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const downMd = useMediaQuery((theme) => theme.breakpoints.down('md'))

  const {
    formState: { isValid },
    control,
    handleSubmit,
  } = useForm({
    defaultValues: {
      prevHomeAddStreet: prevHomeAddStreet,
      prevResYears: prevResYears,
      prevResMonths: prevResMonths,
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    dispatch(contactDetailsActions.setRenderingPrime(false))
    dispatch(contactDetailsActions.setRenderingCurrentResidence(false))

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [])

  useEffect(() => {
    if (prevHomeAddStreet !== null) {
      var addressFinderData = JSON.stringify({
        show_metadata: 'N',
        partial_addr: prevHomeAddStreet,
      })

      const config = {
        url: '/addressfinder',
        method: 'POST',
        baseURL: `${processNodeEnv() === 'development' ? BASE_URL_LOCAL_APP : BASE_URL_AWS_APP}`,
        headers: { 'Content-Type': 'application/json' },
        timeout: 5000,
        data: addressFinderData,
      }
      // Finacial Calculator request
      dispatch(contactDetailsActions.setJointPrevResAddressFinderConfig(config))
    }
  }, [prevHomeAddStreet])

  useEffect(() => {
    if (prevResAddressSelectedPxid !== null) {
      var addressPxidData = JSON.stringify({
        show_metadata: 'Y',
        pxid: prevResAddressSelectedPxid,
      })

      const config = {
        url: '/addressfinder',
        method: 'POST',
        baseURL: `${processNodeEnv() === 'development' ? BASE_URL_LOCAL_APP : BASE_URL_AWS_APP}`,
        headers: { 'Content-Type': 'application/json' },
        timeout: 5000,
        data: addressPxidData,
      }

      dispatch(getAddressMetaData(config))
    }
  }, [prevResAddressSelectedPxid])

  function getStreetFromAndToNumber(number) {
    const numberFromTo = number?.split('-')
    if (numberFromTo) {
      return { from: numberFromTo[0], to: numberFromTo[1], length: numberFromTo?.length }
    }
  }

  useEffect(() => {
    if (prevResAddressSelectedMetaData !== null && prevResAddressSelectedMetaData !== undefined) {
      // Data to Display on Front-End
      dispatch(contactDetailsActions.setJointPrevResAddressToDisplayLine1(prevResAddressSelectedMetaData.postal_line_1))
      dispatch(contactDetailsActions.setJointPrevResAddressToDisplayLine2(prevResAddressSelectedMetaData.postal_line_2))
      dispatch(contactDetailsActions.setJointPrevResAddressToDisplayLine3(prevResAddressSelectedMetaData.postal_line_3))
      dispatch(contactDetailsActions.setJointPrevResAddressToDisplayLine4(prevResAddressSelectedMetaData.postal_line_4))

      // Data to send in submission body
      // >>>>>>>>>>>>>>>>>>>>>>>>>>>  Data to send in submission body <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //

      // 1. Unit Type
      if (prevResAddressSelectedMetaData?.unit_type) {
        dispatch(contactDetailsActions.setJointPrevResAddressSelectedUnitType(prevResAddressSelectedMetaData?.unit_type))
      } else {
        dispatch(contactDetailsActions.setJointPrevResAddressSelectedUnitType(null))
      }
      // 2. Apartment
      if (prevResAddressSelectedMetaData?.unit_identifier) {
        dispatch(contactDetailsActions.setJointPrevResAddressSelectedApartment(prevResAddressSelectedMetaData?.unit_identifier))
      } else {
        dispatch(contactDetailsActions.setJointPrevResAddressSelectedApartment(null))
      }
      // 3. Building
      if (prevResAddressSelectedMetaData?.building_name) {
        dispatch(contactDetailsActions.setJointPrevResAddressSelectedBuilding(prevResAddressSelectedMetaData?.building_name))
      } else {
        dispatch(contactDetailsActions.setJointPrevResAddressSelectedBuilding(null))
      }
      // 4. Street number from
      if (getStreetFromAndToNumber(prevResAddressSelectedMetaData?.number)?.from) {
        dispatch(contactDetailsActions.setJointPrevResAddressSelectedStreetNumberFrom(getStreetFromAndToNumber(prevResAddressSelectedMetaData?.number)?.from))
      } else {
        dispatch(contactDetailsActions.setJointPrevResAddressSelectedStreetNumberFrom(null))
      }
      // 5. Street number to
      if (getStreetFromAndToNumber(prevResAddressSelectedMetaData?.number)?.to) {
        dispatch(contactDetailsActions.setJointPrevResAddressSelectedStreetNumberTo(getStreetFromAndToNumber(prevResAddressSelectedMetaData?.number)?.to))
      } else {
        dispatch(contactDetailsActions.setJointPrevResAddressSelectedStreetNumberTo(null))
      }
      // 6. Street Alpha
      if (prevResAddressSelectedMetaData?.alpha) {
        dispatch(contactDetailsActions.setJointPrevResAddressSelectedAlpha(prevResAddressSelectedMetaData?.alpha))
      } else {
        dispatch(contactDetailsActions.setJointPrevResAddressSelectedAlpha(null))
      }
      // 7. Street or postal Name
      if (prevResAddressSelectedMetaData?.street) {
        dispatch(contactDetailsActions.setJointPrevResAddressSelectedStreetOrPostalName(prevResAddressSelectedMetaData?.street))
      } else {
        dispatch(contactDetailsActions.setJointPrevResAddressSelectedStreetOrPostalName(null))
      }
      // 8. Street Direction
      if (prevResAddressSelectedMetaData?.street_suffix) {
        dispatch(contactDetailsActions.setJointPrevResAddressSelectedStreetDirection(prevResAddressSelectedMetaData?.street_suffix))
      } else {
        dispatch(contactDetailsActions.setJointPrevResAddressSelectedStreetDirection(null))
      }
      // 9. Street Type
      if (prevResAddressSelectedMetaData?.street_type) {
        dispatch(contactDetailsActions.setJointPrevResAddressSelectedStreetType(prevResAddressSelectedMetaData?.street_type))
      } else {
        dispatch(contactDetailsActions.setJointPrevResAddressSelectedStreetType(null))
      }
      // 10. Suburb
      if (prevResAddressSelectedMetaData?.suburb) {
        dispatch(contactDetailsActions.setJointPrevResAddressSelectedSuburb(prevResAddressSelectedMetaData?.suburb))
      } else {
        dispatch(contactDetailsActions.setJointPrevResAddressSelectedSuburb(null))
      }
      // 11. City
      if (prevResAddressSelectedMetaData?.city) {
        dispatch(contactDetailsActions.setJointPrevResAddressSelectedCity(prevResAddressSelectedMetaData?.city))
      } else {
        dispatch(contactDetailsActions.setJointPrevResAddressSelectedCity(null))
      }
      // // 12. State
      // if (prevResAddressSelectedMetaData?.region) dispatch(contactDetailsActions.setPrevResAddressSelectedState(prevResAddressSelectedMetaData?.region))
      // 13. Post code
      if (prevResAddressSelectedMetaData?.postcode) {
        dispatch(contactDetailsActions.setJointPrevResAddressSelectedPostCode(prevResAddressSelectedMetaData?.postcode))
      } else {
        dispatch(contactDetailsActions.setJointPrevResAddressSelectedPostCode(null))
      }
      // 14. Country code
      dispatch(contactDetailsActions.setJointPrevResAddressSelectedCountryCode('NZD'))
      //15. Country description
      dispatch(contactDetailsActions.setJointPrevResAddressSelectedCountryDesc('New Zealand'))

      if (prevResAddressSelectedMetaData?.postal_line_1 == null) dispatch(contactDetailsActions.setJointPrevResAddressToDisplayLine1(null))
      if (prevResAddressSelectedMetaData?.postal_line_2 == null) dispatch(contactDetailsActions.setJointPrevResAddressToDisplayLine2(null))
      if (prevResAddressSelectedMetaData?.postal_line_3 == null) dispatch(contactDetailsActions.setJointPrevResAddressToDisplayLine3(null))
      if (prevResAddressSelectedMetaData?.postal_line_4 == null) dispatch(contactDetailsActions.setJointPrevResAddressToDisplayLine4(null))

      // >>>>>>>>>>>>>>>>>>>>>>>>>>> END <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //

      dispatch(contactDetailsActions.setPrevHomeAddStreet(prevResAddressSelectedMetaData?.a))
    }
  }, [prevResAddressSelectedMetaData])

  useEffect(() => {
    dispatch(contactDetailsActions.setJointIsValidPrevResidenceDetails(isValid))
  }, [isValid])

  useEffect(() => {
    if (onSubmitPrevResidenceDetails != null) {
      handleSubmit(onSubmit())()
      return
    }
  }, [onSubmitPrevResidenceDetails])

  function onSubmit() {
    console.log('Current Residence Details Submitted')
  }

  const handlePrevHomeAddStreet = (event) => {
    dispatch(contactDetailsActions.setJointPrevHomeAddStreet(event.target.value))
  }

  const handlePrevResAddressSelected = (event, newValue) => {
    dispatch(contactDetailsActions.setJointPrevResAddressSelectedAddress(newValue))
    dispatch(contactDetailsActions.setJointPrevResAddressSelectedPxid(newValue?.pxid))
  }

  // Stay at previous residence
  const incrementPrevResYears = () => {
    dispatch(contactDetailsActions.setJointPrevResYears(parseInt(prevResYears) + 1))
  }
  const decrementPrevResYears = () => {
    dispatch(contactDetailsActions.setJointPrevResYears(parseInt(prevResYears) - 1))
  }

  const incrementPrevResMonths = () => {
    dispatch(contactDetailsActions.setJointPrevResMonths(parseInt(prevResMonths) + 1))
  }

  const decrementPrevResMonths = () => {
    dispatch(contactDetailsActions.setJointPrevResMonths(parseInt(prevResMonths) - 1))
  }

  const handleJointPrevResYears = (event) => {
    dispatch(contactDetailsActions.setJointPrevResYears(event.target.value === '' ? 0 : parseInt(event.target.value)))
  }
  const handleJointPrevResMonths = (event) => {
    dispatch(contactDetailsActions.setJointPrevResMonths(event.target.value === '' ? 0 : parseInt(event.target.value)))
  }

  const previousAddressLabel = prevHomeAddStreet === null || prevHomeAddStreet === '' ? 'your previous residence' : prevHomeAddStreet

  return (
    <Form>
      <Stack direction='column' spacing={3}>
        <Stack sx={{ pt: downSm ? 5 : 3 }}>
          <Stack direction='column' spacing={5} sx={{ width: '100%' }}>
            <Stack component={motion.div} {...varFade({ distance: 25, durationIn: 0.5, durationOut: 0.5 }).inDown}>
              <Paper elevation={8}>
                <Alert variant='standard' color='info' icon={<InfoOutlinedIcon fontSize='medium' />}>
                  <AlertTitle>Previous Residence</AlertTitle>
                  Please provide the details of your previous residence as you have been in your current residence for less than 2 years.
                </Alert>
              </Paper>
            </Stack>
            <Stack direction='column' justifyContent='flex-start' spacing={2} sx={{ pl: 2, pb: 2, textAlign: 'center' }}>
              <LabelStyle sx={{ textAlign: 'center' }}>What was your previous residential address?</LabelStyle>
              <AddressFinderAutoComplete name='prevHomeAddStreet' asynchronousFunc={getAddresses} addressFinderRequestConfig={prevResAddressFinderConfig} addressFinderSuccess={prevResAddressFinderSucess} addressFinderLabel='Residential Address' addressCompletions={prevResAddressFinderCompletions} control={control} onAddressChange={handlePrevHomeAddStreet} onAddressSelectedChange={handlePrevResAddressSelected} loading={loading} defualtValue='' value={prevResAddressSelectedAddress} helperText='Start typing your previous residential address...' hasStartAdornment={true} StartAdornmentIcon={<CabinRoundedIcon color='primary' fontSize='small' />} placeholder='Previous Residential address' />
            </Stack>
          </Stack>
          <Stack direction='column' spacing={2} justifyContent='flex-start'>
            <AnimatePresence>
              {prevResAddressSelectedPxid !== null && prevResAddressSelectedAddress !== undefined && (
                <>
                  <Stack direction='row' justifyContent='center' alignItems='center' spacing={0}>
                    <Box key='chipprevRespadd' component={motion.div} {...varLocationIcon}>
                      <IconButton aria-label='Employer Address' color='secondary' variant='filled'>
                        <LocationOnRoundedIcon />
                      </IconButton>
                    </Box>
                    <Box key='typoprevResadd' component={motion.div} {...varPrevResDetails}>
                      <Typography variant='body2' sx={{ fontWeight: 'regular', color: 'text.secondary' }}>
                        {prevResAddressToDisplayLine1}
                        {prevResAddressToDisplayLine2 ? ', ' : ''}
                        {prevResAddressToDisplayLine2}
                        {prevResAddressToDisplayLine3 ? ', ' : ''}
                        {prevResAddressToDisplayLine3}
                      </Typography>
                    </Box>
                  </Stack>
                </>
              )}
            </AnimatePresence>
          </Stack>
        </Stack>
        <Stack direction='column' spacing={3} justifyContent='flex-start'>
          <Stack direction='column' spacing={2}>
            <LabelStyle sx={{ textAlign: 'center' }}>How long have you been staying at {previousAddressLabel}?</LabelStyle>
            <Stack direction={downSm ? 'column' : 'row'} spacing={downMd ? (downSm ? 1 : 2) : 0} justifyContent={downMd ? 'center' : 'space-evenly'} alignItems={downSm ? 'center' : 'baseline'}>
              <EditableCounter name='prevResYears' control={control} defualtValue={0} label='Years' count={prevResYears} maxValue={50} onIncrementCount={incrementPrevResYears} onDecrementCount={decrementPrevResYears} onTextFieldChange={handleJointPrevResYears} />
              <Typography variant='body1' sx={{ color: 'text.secondray' }}>
                and
              </Typography>
              <EditableCounter name='prevResMonths' control={control} defualtValue={0} label='Months' count={prevResMonths} maxValue={11} onIncrementCount={incrementPrevResMonths} onDecrementCount={decrementPrevResMonths} onTextFieldChange={handleJointPrevResMonths} />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Form>
  )
}

export default JointPreviousResidentialAddress
