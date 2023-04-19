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

//* Yup
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

//* Custom Components
import Form from '../../components/Form'
import Counter from '../../components/Counter'
import DatePicker from '../../components/rhf-components/DatePicker'
import EditableCounter from '../../components/rhf-components/EditableCounter'
import AddressFinderAutoComplete from '../../components/AddressFinderAutoComplete'

//* MUI
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import AlertTitle from '@mui/material/AlertTitle'
import useMediaQuery from '@mui/material/useMediaQuery'

//* MUI - Icons
import IconButton from '@mui/material/IconButton'
import CabinRoundedIcon from '@mui/icons-material/CabinRounded'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'

//* Utils
import { fDate, dateDiffereneInMonths } from '../../utils/formatDateTime'

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
}))

let startTime = null
window.dataLayer = window.dataLayer || []

function JointPreviousResidentialAddress() {
  const prevHomeAddStreet = useSelector((state) => state.conatctDetailsReducer.jointprevHomeAddStreet)
  const currResidenceEffDate = useSelector((state) => state.conatctDetailsReducer.jointprevResidenceEffDate)
  const currResidenceMonths = useSelector((state) => state.conatctDetailsReducer.jointprevResidenceMonths)
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
    currResidenceEffDate: yup
      .string()
      .required('Address Effective Date is required.')
      .test('cannot be lower than 1900', 'Invalid Date of Birth. Date Format: MMMM YYYY', function (effectiveDate) {
        if (effectiveDate === 'Invalid Date') {
          return false
        }

        return true
      })
      .nullable(),
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
      currResidenceEffDate: currResidenceEffDate,
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    dispatch(contactDetailsActions.setRenderingPrime(false))
    dispatch(contactDetailsActions.setRenderingCurrentResidence(false))

    startTime = new Date()

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

  const handleCurrentResidenceEffDate = (date) => {
    dispatch(contactDetailsActions.setJointPrevResidenceEffDate(date))
    const monthsFromToday = dateDiffereneInMonths(new Date(date), new Date())
    dispatch(contactDetailsActions.setJointPrevResidenceMonths(monthsFromToday))
  }

  function onSubmit() {
    console.log('Current Residence Details Submitted')
    let endTime = new Date()
    let timeSpentMillis = endTime - startTime

    if (isValid) {
      window.dataLayer.push({
        event: 'joint_previous_residential_submit',
        time_elapsed: timeSpentMillis,
        form_name: 'Joint Previous Residential Details',
      })
    }
  }

  const handlePrevHomeAddStreet = (event) => {
    dispatch(contactDetailsActions.setJointPrevHomeAddStreet(event.target.value))
  }

  const handlePrevResAddressSelected = (event, newValue) => {
    dispatch(contactDetailsActions.setJointPrevResAddressSelectedAddress(newValue))
    dispatch(contactDetailsActions.setJointPrevResAddressSelectedPxid(newValue?.pxid))
  }

  // Stay at previous residence
  // const incrementPrevResYears = () => {
  //   dispatch(contactDetailsActions.setJointPrevResYears(parseInt(prevResYears) + 1))
  // }
  // const decrementPrevResYears = () => {
  //   dispatch(contactDetailsActions.setJointPrevResYears(parseInt(prevResYears) - 1))
  // }

  // const incrementPrevResMonths = () => {
  //   dispatch(contactDetailsActions.setJointPrevResMonths(parseInt(prevResMonths) + 1))
  // }

  // const decrementPrevResMonths = () => {
  //   dispatch(contactDetailsActions.setJointPrevResMonths(parseInt(prevResMonths) - 1))
  // }

  // const handleJointPrevResYears = (event) => {
  //   dispatch(contactDetailsActions.setJointPrevResYears(event.target.value === '' ? 0 : parseInt(event.target.value)))
  // }
  // const handleJointPrevResMonths = (event) => {
  //   dispatch(contactDetailsActions.setJointPrevResMonths(event.target.value === '' ? 0 : parseInt(event.target.value)))
  // }

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
            <LabelStyle sx={{ textAlign: 'center' }}>When did you move into this address?</LabelStyle>
            <DatePicker id='currResidenceEffDate' name='currResidenceEffDate' onDateChange={handleCurrentResidenceEffDate} label='Address Effective Date' control={control} variant='outlined' helperText='Month and Year. Eg: June 2020' openTo='year' format='MMMM YYYY' date={currResidenceEffDate} maxDate={upperLimitEffectiveDate} isRequired={true} views={['year', 'month']} />
          </Stack>
        </Stack>
      </Stack>
    </Form>
  )
}

export default JointPreviousResidentialAddress
