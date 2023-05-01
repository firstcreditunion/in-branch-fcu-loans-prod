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
import RadioGroups from '../../components/rhf-components/RadioGroups'
import Counter from '../../components/Counter'
import EditableCounter from '../../components/rhf-components/EditableCounter'
import AddressFinderAutoComplete from '../../components/AddressFinderAutoComplete'

//* MUI
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Radio from '@mui/material/Radio'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'
import useMediaQuery from '@mui/material/useMediaQuery'

//* MUI Icons
import IconButton from '@mui/material/IconButton'
import CabinRoundedIcon from '@mui/icons-material/CabinRounded'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'

//* Utils
import { dateDiffereneInMonths } from '../../utils/formatDateTime'
import { nfd_NormaliseString } from '../../utils/stringFormat'

//* Custom Components
import DatePicker from '../../components/rhf-components/DatePicker'

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
}))

let startTime = null
window.dataLayer = window.dataLayer || []

function JointResidentialAddress() {
  const currHomeAddStreet = useSelector((state) => state.conatctDetailsReducer.jointcurrHomeAddStreet)
  const residenceType = useSelector((state) => state.conatctDetailsReducer.jointresidenceType)
  const currResidenceEffDate = useSelector((state) => state.conatctDetailsReducer.jointcurrResidenceEffDate)
  const currResidenceMonths = useSelector((state) => state.conatctDetailsReducer.jointcurrResidenceMonths)
  const onSubmitResidenceDetails = useSelector((state) => state.conatctDetailsReducer.jointonSubmitResidenceDetails)

  // Address Finder
  const loading = useSelector((state) => state.conatctDetailsReducer.loading)
  const currResAddressFinderCompletions = useSelector((state) => state.conatctDetailsReducer.jointcurrResAddressFinderCompletions)
  const currResAddressFinderSucess = useSelector((state) => state.conatctDetailsReducer.jointcurrResAddressFinderSucess)
  const currResAddressFinderConfig = useSelector((state) => state.conatctDetailsReducer.jointcurrResAddressFinderConfig)

  const currResAddressSelectedAddress = useSelector((state) => state.conatctDetailsReducer.jointcurrResAddressSelectedAddress)
  const currResAddressSelectedPxid = useSelector((state) => state.conatctDetailsReducer.jointcurrResAddressSelectedPxid)
  const currResAddressSelectedMetaData = useSelector((state) => state.conatctDetailsReducer.jointcurrResAddressSelectedMetaData)
  const loadingMeta = useSelector((state) => state.conatctDetailsReducer.loadingMeta)

  const currResAddressToDisplayLine1 = useSelector((state) => state.conatctDetailsReducer.jointcurrResAddressToDisplayLine1)
  const currResAddressToDisplayLine2 = useSelector((state) => state.conatctDetailsReducer.jointcurrResAddressToDisplayLine2)
  const currResAddressToDisplayLine3 = useSelector((state) => state.conatctDetailsReducer.jointcurrResAddressToDisplayLine3)

  const upperLimitEffectiveDate = new Date()

  const schema = yup.object().shape({
    currHomeAddStreet: yup
      .string()
      .test('Conditional requirement', 'Residential address is required', function (currentResAddress) {
        if (currentResAddress === undefined || currentResAddress == null || currentResAddress === '') {
          return false
        }
        return true
      })
      .required('Residential address is required')
      .nullable(),
    residenceType: yup.string().required('Residence type is required'),
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

  const varCurrResDetails =
    currResAddressSelectedPxid !== null
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

  const varCurrResLocationIcon =
    currResAddressSelectedPxid !== null
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
      currHomeAddStreet: currHomeAddStreet,
      residenceType: residenceType,
      currResidenceEffDate: currResidenceEffDate,
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    dispatch(contactDetailsActions.setRenderingPrime(false))
    dispatch(contactDetailsActions.setRenderingCurrentResidence(true))

    startTime = new Date()

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [])

  useEffect(() => {
    if (currHomeAddStreet !== null) {
      var addressFinderData = JSON.stringify({
        show_metadata: 'N',
        partial_addr: currHomeAddStreet,
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
      dispatch(contactDetailsActions.setJointCurrResAddressFinderConfig(config))
    }
  }, [currHomeAddStreet])

  useEffect(() => {
    if (currResAddressSelectedPxid !== null) {
      var addressPxidData = JSON.stringify({
        show_metadata: 'Y',
        pxid: currResAddressSelectedPxid,
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
  }, [currResAddressSelectedPxid])

  function getStreetFromAndToNumber(number) {
    const numberFromTo = number?.split('-')
    if (numberFromTo) {
      return { from: numberFromTo[0], to: numberFromTo[1], length: numberFromTo?.length }
    }
  }

  useEffect(() => {
    if (currResAddressSelectedMetaData !== null && currResAddressSelectedMetaData !== undefined) {
      // Data to Display on Front-End
      dispatch(contactDetailsActions.setJointCurrResAddressToDisplayLine1(currResAddressSelectedMetaData.postal_line_1))
      dispatch(contactDetailsActions.setJointCurrResAddressToDisplayLine2(currResAddressSelectedMetaData.postal_line_2))
      dispatch(contactDetailsActions.setJointCurrResAddressToDisplayLine3(currResAddressSelectedMetaData.postal_line_3))
      dispatch(contactDetailsActions.setJointCurrResAddressToDisplayLine4(currResAddressSelectedMetaData.postal_line_4))

      // Data to send in submission body

      // >>>>>>>>>>>>>>>>>>>>>>>>>>>  Data to send in submission body <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //

      // 1. Unit Type
      if (currResAddressSelectedMetaData?.unit_type) {
        dispatch(contactDetailsActions.setJointCurrResAddressSelectedUnitType(currResAddressSelectedMetaData?.unit_type))
      } else {
        dispatch(contactDetailsActions.setJointCurrResAddressSelectedUnitType(null))
      }
      // 2. Apartment
      if (currResAddressSelectedMetaData?.unit_identifier) {
        dispatch(contactDetailsActions.setJointCurrResAddressSelectedApartment(currResAddressSelectedMetaData?.unit_identifier))
      } else {
        dispatch(contactDetailsActions.setJointCurrResAddressSelectedApartment(null))
      }
      // 3. Building
      if (currResAddressSelectedMetaData?.building_name) {
        dispatch(contactDetailsActions.setJointCurrResAddressSelectedBuilding(currResAddressSelectedMetaData?.building_name))
      } else {
        dispatch(contactDetailsActions.setJointCurrResAddressSelectedBuilding(null))
      }
      // 4. Street number from
      if (getStreetFromAndToNumber(currResAddressSelectedMetaData?.number)?.from) {
        dispatch(contactDetailsActions.setJointCurrResAddressSelectedStreetNumberFrom(getStreetFromAndToNumber(currResAddressSelectedMetaData?.number)?.from))
      } else {
        dispatch(contactDetailsActions.setJointCurrResAddressSelectedStreetNumberFrom(null))
      }
      // 5. Street number to
      if (getStreetFromAndToNumber(currResAddressSelectedMetaData?.number)?.to) {
        dispatch(contactDetailsActions.setJointCurrResAddressSelectedStreetNumberTo(getStreetFromAndToNumber(currResAddressSelectedMetaData?.number)?.to))
      } else {
        dispatch(contactDetailsActions.setJointCurrResAddressSelectedStreetNumberTo(null))
      }
      // 6. Street Alpha
      if (currResAddressSelectedMetaData?.alpha) {
        dispatch(contactDetailsActions.setJointCurrResAddressSelectedAlpha(currResAddressSelectedMetaData?.alpha))
      } else {
        dispatch(contactDetailsActions.setJointCurrResAddressSelectedAlpha(null))
      }
      // 7. Street or postal Name
      if (currResAddressSelectedMetaData?.street) {
        dispatch(contactDetailsActions.setJointCurrResAddressSelectedStreetOrPostalName(nfd_NormaliseString(currResAddressSelectedMetaData?.street)))
      } else {
        dispatch(contactDetailsActions.setJointCurrResAddressSelectedStreetOrPostalName(null))
      }
      // 8. Street Direction
      if (currResAddressSelectedMetaData?.street_suffix) {
        dispatch(contactDetailsActions.setJointCurrResAddressSelectedStreetDirection(currResAddressSelectedMetaData?.street_suffix))
      } else {
        dispatch(contactDetailsActions.setJointCurrResAddressSelectedStreetDirection(null))
      }
      // 9. Street Type
      if (currResAddressSelectedMetaData?.street_type) {
        dispatch(contactDetailsActions.setJointCurrResAddressSelectedStreetType(currResAddressSelectedMetaData?.street_type))
      } else {
        dispatch(contactDetailsActions.setJointCurrResAddressSelectedStreetType(null))
      }
      // 10. Suburb
      if (currResAddressSelectedMetaData?.suburb) {
        dispatch(contactDetailsActions.setJointCurrResAddressSelectedSuburb(nfd_NormaliseString(currResAddressSelectedMetaData?.suburb)))
      } else {
        dispatch(contactDetailsActions.setJointCurrResAddressSelectedSuburb(null))
      }
      // 11. City
      if (currResAddressSelectedMetaData?.city) {
        dispatch(contactDetailsActions.setJointCurrResAddressSelectedCity(nfd_NormaliseString(currResAddressSelectedMetaData?.city)))
      } else {
        dispatch(contactDetailsActions.setJointCurrResAddressSelectedCity(null))
      }
      // // 12. State
      // if (currResAddressSelectedMetaData?.city) dispatch(contactDetailsActions.setCurrResAddressSelectedCity(currResAddressSelectedMetaData?.city))
      // 13. Post code
      if (currResAddressSelectedMetaData?.postcode) {
        dispatch(contactDetailsActions.setJointCurrResAddressSelectedPostCode(currResAddressSelectedMetaData?.postcode))
      } else {
        dispatch(contactDetailsActions.setJointCurrResAddressSelectedPostCode(null))
      }
      // 14. Country code
      dispatch(contactDetailsActions.setJointCurrResAddressSelectedCountryCode('NZD'))
      //15. Country description
      dispatch(contactDetailsActions.setJointCurrResAddressSelectedCountryDesc('New Zealand'))

      // >>>>>>>>>>>>>>>>>>>>>>>>>>> END <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //

      dispatch(contactDetailsActions.setJointCurrHomeAddStreet(currResAddressSelectedMetaData?.a))

      if (currResAddressSelectedMetaData?.postal_line_1 == null) dispatch(contactDetailsActions.setJointCurrResAddressToDisplayLine1(null))
      if (currResAddressSelectedMetaData?.postal_line_2 == null) dispatch(contactDetailsActions.setJointCurrResAddressToDisplayLine2(null))
      if (currResAddressSelectedMetaData?.postal_line_3 == null) dispatch(contactDetailsActions.setJointCurrResAddressToDisplayLine3(null))
      if (currResAddressSelectedMetaData?.postal_line_4 == null) dispatch(contactDetailsActions.setJointCurrResAddressToDisplayLine4(null))
    }
  }, [currResAddressSelectedMetaData])

  useEffect(() => {
    dispatch(contactDetailsActions.setJointIsValidResidenceDetails(isValid))
  }, [isValid])

  useEffect(() => {
    if (onSubmitResidenceDetails != null) {
      handleSubmit(onSubmit())()
      return
    }
  }, [onSubmitResidenceDetails])

  useEffect(() => {
    if (currResidenceMonths < 36) {
      dispatch(contactDetailsActions.setJointSkipPrevResidence(false))
      return
    }
    dispatch(contactDetailsActions.setJointSkipPrevResidence(true))
  }, [currResidenceMonths, currResidenceEffDate])

  function onSubmit() {
    let endTime = new Date()
    let timeSpentMillis = endTime - startTime

    if (isValid) {
      window.dataLayer.push({
        event: 'joint_current_residential_submit',
        time_elapsed: timeSpentMillis,
        form_name: 'Joint Current Residential Details',
      })
    }
    console.log('Current Residence Details Submitted')
  }

  const handleCurrHomeAddStreet = (event) => {
    dispatch(contactDetailsActions.setJointCurrHomeAddStreet(event.target.value))
  }
  const handleCurrResAddressSelected = (event, newValue) => {
    dispatch(contactDetailsActions.setJointCurrResAddressSelectedAddress(newValue))
    dispatch(contactDetailsActions.setJointCurrResAddressSelectedPxid(newValue?.pxid))
  }
  const handleResidenceType = (event) => {
    dispatch(contactDetailsActions.setJointResidenceType(event.target.value))
  }

  // Current Residence Eff. Date
  const handleCurrentResidenceEffDate = (date) => {
    dispatch(contactDetailsActions.setJointCurrResEffDate(date))

    const monthsFromToday = dateDiffereneInMonths(new Date(date), new Date())

    dispatch(contactDetailsActions.setJointCurrResidenceMonths(monthsFromToday))
  }

  // Stay at current residence
  // const incrementCurrResYears = () => {
  //   dispatch(contactDetailsActions.setJointCurrResYears(parseInt(currResYears) + 1))
  // }
  // const decrementCurrResYears = () => {
  //   dispatch(contactDetailsActions.setJointCurrResYears(parseInt(currResYears) - 1))
  // }

  // const incrementCurrResMonths = () => {
  //   dispatch(contactDetailsActions.setJointCurrResMonths(parseInt(currResMonths) + 1))
  // }

  // const decrementCurrResMonths = () => {
  //   dispatch(contactDetailsActions.setJointCurrResMonths(parseInt(currResMonths) - 1))
  // }

  // const handleJointResYears = (event) => {
  //   dispatch(contactDetailsActions.setJointCurrResYears(event.target.value === '' ? 0 : parseInt(event.target.value)))
  // }
  // const handleJointResMonths = (event) => {
  //   dispatch(contactDetailsActions.setJointCurrResMonths(event.target.value === '' ? 0 : parseInt(event.target.value)))
  // }

  return (
    <Form>
      <Stack direction='column'>
        <Stack sx={{ pb: 5, pt: downSm ? 5 : 3 }}>
          <Stack direction='column' justifyContent='flex-start' spacing={2} sx={{ pl: 2, pb: 2, textAlign: 'center' }}>
            <LabelStyle sx={{ textAlign: 'center' }}>What is your current residential address?</LabelStyle>
            <AddressFinderAutoComplete name='currHomeAddStreet' asynchronousFunc={getAddresses} addressFinderRequestConfig={currResAddressFinderConfig} addressFinderSuccess={currResAddressFinderSucess} addressFinderLabel='Residential Address' addressCompletions={currResAddressFinderCompletions} control={control} onAddressChange={handleCurrHomeAddStreet} onAddressSelectedChange={handleCurrResAddressSelected} loading={loading} defualtValue='' value={currResAddressSelectedAddress} helperText='Start typing your residential address...' hasStartAdornment={true} StartAdornmentIcon={<CabinRoundedIcon fontSize='small' color='secondary' />} size={downSm ? 'small' : 'medium'} placeholder='Residential Address' />
          </Stack>
          <AnimatePresence>
            <Stack direction='row' justifyContent='center' alignItems='center'>
              {!(currResAddressSelectedPxid == null) && (
                <>
                  <Box key='chipempadd' component={motion.div} {...varCurrResLocationIcon}>
                    <IconButton aria-label='Current Residential Address' color='secondary' variant='filled'>
                      <LocationOnRoundedIcon />
                    </IconButton>
                  </Box>
                  <Box key='chipempadd' component={motion.div} {...varCurrResDetails}>
                    <Typography key='currResAnimate' {...varCurrResLocationIcon} variant='body2' sx={{ fontWeight: 'regular', color: 'text.secondary' }}>
                      {currResAddressToDisplayLine1}
                      {currResAddressToDisplayLine2 ? ', ' : ''}
                      {currResAddressToDisplayLine2}
                      {currResAddressToDisplayLine3 ? ', ' : ''}
                      {currResAddressToDisplayLine3}
                    </Typography>
                  </Box>
                </>
              )}
            </Stack>
          </AnimatePresence>
        </Stack>

        <Stack direction='column' spacing={5}>
          <Stack direction='column'>
            <LabelStyle sx={{ textAlign: 'center' }}>How would you describe your current residence?</LabelStyle>
            <RadioGroups id='residenceType' name='residenceType' onRadioChange={handleResidenceType} control={control} value={residenceType} defaultValue={''} alignItems='center' row={downSm ? false : true}>
              <FormControlLabel sx={{ alignItems: 'center' }} value='HOME' control={<Radio size='small' />} label='Own Home' key='HOME' />
              <FormControlLabel sx={{ alignItems: 'center' }} value='RENT' control={<Radio size='small' />} label='Renting' key='RENT' />
              <FormControlLabel sx={{ alignItems: 'center' }} value='BOARD' control={<Radio size='small' />} label='Boarding' key='BOARD' />
            </RadioGroups>
          </Stack>
          <Stack direction='column' spacing={3} justifyContent='flex-start'>
            <Stack direction='column' spacing={2}>
              <LabelStyle sx={{ textAlign: 'center' }}>When did you move into this address?</LabelStyle>
              <DatePicker id='currResidenceEffDate' name='currResidenceEffDate' onDateChange={handleCurrentResidenceEffDate} label='Address Effective Date' control={control} variant='outlined' helperText='Month and Year. Eg: June 2020' openTo='year' format='MMMM YYYY' date={currResidenceEffDate} maxDate={upperLimitEffectiveDate} isRequired={true} views={['year', 'month']} />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Form>
  )
}

export default JointResidentialAddress
