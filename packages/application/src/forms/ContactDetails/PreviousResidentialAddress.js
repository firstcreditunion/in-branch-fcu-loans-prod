import React, { useEffect } from 'react'
import { styled } from '@mui/material/styles'

//* Framer
import { motion, AnimatePresence } from 'framer-motion'
import { varFade, varBounce } from '../../components/ui/animate'

import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { contactDetailsActions } from '../../redux/slices/contactDetailsSlice'
import { getAddresses } from '../../redux/slices/contactDetailsSlice'
import { getAddressMetaData } from '../../redux/slices/contactDetailsSlice'

//* API constants
import { BASE_URL_LOCAL_APP, BASE_URL_AWS_APP, processNodeEnv } from '../../redux/utils/apiConstants'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import Form from '../../components/Form'
import Counter from '../../components/Counter'
import EditableCounter from '../../components/rhf-components/EditableCounter'
import AddressFinderAutoComplete from '../../components/AddressFinderAutoComplete'

//* MUI
import Box from '@mui/material/Box'
import Radio from '@mui/material/Radio'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Collapse from '@mui/material/Collapse'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import FormControlLabel from '@mui/material/FormControlLabel'

//* MUI - Alert
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

//* MUI - Cards
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

//* MUI - Icons
import IconButton from '@mui/material/IconButton'
import CabinRoundedIcon from '@mui/icons-material/CabinRounded'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded'

//* Custom Components
import DatePicker from '../../components/rhf-components/DatePicker'

//* Utils
import { fDate, dateDiffereneInMonths } from '../../utils/formatDateTime'
import { nfd_NormaliseString } from '../../utils/stringFormat'

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
}))

const Data = styled(Typography)(({ theme }) => ({
  color: '#2F4858',
  fontWeight: 500,
}))

const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

let startTime = null
window.dataLayer = window.dataLayer || []

function PreviousResidentialAddress() {
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const secureSessionID = useSelector((state) => state.globalReducer.secureSessionID)

  const prevHomeAddStreet = useSelector((state) => state.conatctDetailsReducer.prevHomeAddStreet)
  const currResidenceEffDate = useSelector((state) => state.conatctDetailsReducer.prevResidenceEffDate)
  const currResidenceMonths = useSelector((state) => state.conatctDetailsReducer.prevResidenceMonths)
  const sovprevResLengthOfStayIsZero = useSelector((state) => state.conatctDetailsReducer.sovprevResLengthOfStayIsZero)
  const onSubmitPrevResidenceDetails = useSelector((state) => state.conatctDetailsReducer.onSubmitPrevResidenceDetails)
  const isValidSovPreviousResidentialDetails = useSelector((state) => state.conatctDetailsReducer.isValidSovPreviousResidentialDetails)

  const [editValidPreviousResAddress, setEditValidPreviousResAddress] = React.useState(false)

  // Address Finder
  const loading = useSelector((state) => state.conatctDetailsReducer.loading)
  const prevResAddressFinderCompletions = useSelector((state) => state.conatctDetailsReducer.prevResAddressFinderCompletions)
  const prevResAddressFinderSucess = useSelector((state) => state.conatctDetailsReducer.prevResAddressFinderSucess)
  const prevResAddressFinderConfig = useSelector((state) => state.conatctDetailsReducer.prevResAddressFinderConfig)

  const prevResAddressSelectedAddress = useSelector((state) => state.conatctDetailsReducer.prevResAddressSelectedAddress)
  const prevResAddressSelectedPxid = useSelector((state) => state.conatctDetailsReducer.prevResAddressSelectedPxid)
  const prevResAddressSelectedMetaData = useSelector((state) => state.conatctDetailsReducer.prevResAddressSelectedMetaData)
  const loadingMeta = useSelector((state) => state.conatctDetailsReducer.loadingMeta)

  const prevResAddressToDisplayLine1 = useSelector((state) => state.conatctDetailsReducer.prevResAddressToDisplayLine1)
  const prevResAddressToDisplayLine2 = useSelector((state) => state.conatctDetailsReducer.prevResAddressToDisplayLine2)
  const prevResAddressToDisplayLine3 = useSelector((state) => state.conatctDetailsReducer.prevResAddressToDisplayLine3)
  const prevResAddressToDisplayLine4 = useSelector((state) => state.conatctDetailsReducer.prevResAddressToDisplayLine4)
  const sovPreviousAddresseffective = useSelector((state) => state.conatctDetailsReducer.sovPreviousAddresseffective)

  const isPreviousAddressEmpty = prevResAddressToDisplayLine1 == null && prevResAddressToDisplayLine2 == null && prevResAddressToDisplayLine3 == null && prevResAddressToDisplayLine4 == null

  const upperLimitEffectiveDate = new Date()

  const schema = yup.object().shape({
    prevHomeAddStreet: yup
      .string()
      .test('Conditional requirement', 'Previous residential address is required', function (previousResAddress) {
        if (isValidSovPreviousResidentialDetails) {
          return true
        }

        if (isValidSovPreviousResidentialDetails == false && (previousResAddress === undefined || previousResAddress == null || previousResAddress === '')) {
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

  const varSovPreviousResidential = varFade({
    distance: 10,
    durationIn: 0.32,
    durationOut: 0.32,
  }).inUp

  const varSovPreviousResidentialInvalidInfo = varFade({
    distance: 10,
    durationIn: 0.5,
    durationOut: 0.5,
  }).inLeft

  const varSovPreviousResidentialAutoComplete = varFade({
    distance: 10,
    durationIn: 0.5,
    durationOut: 0.5,
  }).inUp

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
    dispatch(contactDetailsActions.setRenderingPrime(true))
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
      dispatch(contactDetailsActions.setPrevResAddressFinderConfig(config))
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
      dispatch(contactDetailsActions.setPrevResAddressToDisplayLine1(prevResAddressSelectedMetaData?.postal_line_1))
      dispatch(contactDetailsActions.setPrevResAddressToDisplayLine2(prevResAddressSelectedMetaData?.postal_line_2))
      dispatch(contactDetailsActions.setPrevResAddressToDisplayLine3(prevResAddressSelectedMetaData?.postal_line_3))
      dispatch(contactDetailsActions.setPrevResAddressToDisplayLine4(prevResAddressSelectedMetaData?.postal_line_4))

      // *>>>>>>>>>>>>>>>>>>>>>>>>>>>  Data to send in submission body <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //

      //* 1. Unit Type
      if (prevResAddressSelectedMetaData?.unit_type) {
        dispatch(contactDetailsActions.setPrevResAddressSelectedUnitType(prevResAddressSelectedMetaData?.unit_type))
      } else {
        dispatch(contactDetailsActions.setPrevResAddressSelectedUnitType(null))
      }
      //* 2. Apartment
      if (prevResAddressSelectedMetaData?.unit_identifier) {
        dispatch(contactDetailsActions.setPrevResAddressSelectedApartment(prevResAddressSelectedMetaData?.unit_identifier))
      } else {
        dispatch(contactDetailsActions.setPrevResAddressSelectedApartment(null))
      }
      //* 3. Building
      if (prevResAddressSelectedMetaData?.building_name) {
        dispatch(contactDetailsActions.setPrevResAddressSelectedBuilding(prevResAddressSelectedMetaData?.building_name))
      } else {
        dispatch(contactDetailsActions.setPrevResAddressSelectedBuilding(null))
      }
      //* 4. Street number from
      if (getStreetFromAndToNumber(prevResAddressSelectedMetaData?.number)?.from) {
        dispatch(contactDetailsActions.setPrevResAddressSelectedStreetNumberFrom(getStreetFromAndToNumber(prevResAddressSelectedMetaData?.number)?.from))
      } else {
        dispatch(contactDetailsActions.setPrevResAddressSelectedStreetNumberFrom(null))
      }
      //* 5. Street number to
      if (getStreetFromAndToNumber(prevResAddressSelectedMetaData?.number)?.to) {
        dispatch(contactDetailsActions.setPrevResAddressSelectedStreetNumberTo(getStreetFromAndToNumber(prevResAddressSelectedMetaData?.number)?.to))
      } else {
        dispatch(contactDetailsActions.setPrevResAddressSelectedStreetNumberTo(null))
      }
      //* 6. Street Alpha
      if (prevResAddressSelectedMetaData?.alpha) {
        dispatch(contactDetailsActions.setPrevResAddressSelectedAlpha(prevResAddressSelectedMetaData?.alpha))
      } else {
        dispatch(contactDetailsActions.setPrevResAddressSelectedAlpha(null))
      }
      //* 7. Street or postal Name
      if (prevResAddressSelectedMetaData?.street) {
        dispatch(contactDetailsActions.setPrevResAddressSelectedStreetOrPostalName(nfd_NormaliseString(prevResAddressSelectedMetaData?.street)))
      } else {
        dispatch(contactDetailsActions.setPrevResAddressSelectedStreetOrPostalName(null))
      }
      //* 8. Street Direction
      if (prevResAddressSelectedMetaData?.street_suffix) {
        dispatch(contactDetailsActions.setPrevResAddressSelectedStreetDirection(prevResAddressSelectedMetaData?.street_suffix))
      } else {
        dispatch(contactDetailsActions.setPrevResAddressSelectedStreetDirection(null))
      }
      //* 9. Street Type
      if (prevResAddressSelectedMetaData?.street_type) {
        dispatch(contactDetailsActions.setPrevResAddressSelectedStreetType(prevResAddressSelectedMetaData?.street_type))
      } else {
        dispatch(contactDetailsActions.setPrevResAddressSelectedStreetType(null))
      }
      //* 10. Suburb
      if (prevResAddressSelectedMetaData?.suburb) {
        dispatch(contactDetailsActions.setPrevResAddressSelectedSuburb(nfd_NormaliseString(prevResAddressSelectedMetaData?.suburb)))
      } else {
        dispatch(contactDetailsActions.setPrevResAddressSelectedSuburb(null))
      }
      //* 11. City
      if (prevResAddressSelectedMetaData?.city) {
        dispatch(contactDetailsActions.setPrevResAddressSelectedCity(nfd_NormaliseString(prevResAddressSelectedMetaData?.city)))
      } else {
        dispatch(contactDetailsActions.setPrevResAddressSelectedCity(null))
      }
      if (prevResAddressSelectedMetaData?.postcode) {
        dispatch(contactDetailsActions.setPrevResAddressSelectedPostCode(prevResAddressSelectedMetaData?.postcode))
      } else {
        dispatch(contactDetailsActions.setPrevResAddressSelectedPostCode(null))
      }
      //* 14. Country code
      dispatch(contactDetailsActions.setPrevResAddressSelectedCountryCode('NZD'))
      //* 15. Country description
      dispatch(contactDetailsActions.setPrevResAddressSelectedCountryDesc('New Zealand'))

      if (prevResAddressSelectedMetaData?.postal_line_1 == null) dispatch(contactDetailsActions.setPrevResAddressToDisplayLine1(null))
      if (prevResAddressSelectedMetaData?.postal_line_2 == null) dispatch(contactDetailsActions.setPrevResAddressToDisplayLine2(null))
      if (prevResAddressSelectedMetaData?.postal_line_3 == null) dispatch(contactDetailsActions.setPrevResAddressToDisplayLine3(null))
      if (prevResAddressSelectedMetaData?.postal_line_4 == null) dispatch(contactDetailsActions.setPrevResAddressToDisplayLine4(null))

      //* >>>>>>>>>>>>>>>>>>>>>>>>>>> END <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //

      dispatch(contactDetailsActions.setPrevHomeAddStreet(prevResAddressSelectedMetaData?.a))

      dispatch(contactDetailsActions.setIsValidSovPreviousResidentialDetails(true))
      setEditValidPreviousResAddress(false)
    }
  }, [prevResAddressSelectedMetaData])

  useEffect(() => {
    dispatch(contactDetailsActions.setIsValidPrevResidenceDetails(isValid))

    if (secureSessionID) {
      dispatch(contactDetailsActions.setIsValidPrevResidenceDetails(true))
      dispatch(contactDetailsActions.setsovHasPreviousResidentialDetails(true))
      dispatch(contactDetailsActions.setIsValidSovPreviousResidentialDetails(true))
    }
  }, [isValid])

  useEffect(() => {
    if (onSubmitPrevResidenceDetails != null) {
      handleSubmit(onSubmit())()
      return
    }
  }, [onSubmitPrevResidenceDetails])

  function onSubmit() {
    let endTime = new Date()
    let timeSpentMillis = endTime - startTime

    if (isValid) {
      window.dataLayer.push({
        event: 'prime_previous_residential_submit',
        time_elapsed: timeSpentMillis,
        form_name: 'Prime Previous Residential Details',
      })
    }
    console.log('Current Residence Details Submitted')
  }

  const handlePrevHomeAddStreet = (event) => {
    dispatch(contactDetailsActions.setPrevHomeAddStreet(event.target.value))
  }

  const handlePrevResAddressSelected = (event, newValue) => {
    dispatch(contactDetailsActions.setPrevResAddressSelectedAddress(newValue))
    dispatch(contactDetailsActions.setPrevResAddressSelectedPxid(newValue?.pxid))
    dispatch(contactDetailsActions.setIsValidSovPreviousResidentialDetails(true))
  }

  const handleCurrentResidenceEffDate = (date) => {
    dispatch(contactDetailsActions.setPrevResidenceEffDate(date))

    const monthsFromToday = dateDiffereneInMonths(new Date(date), new Date())

    dispatch(contactDetailsActions.setPrevResidenceMonths(monthsFromToday))
  }

  //* Stay at previous residence
  // const incrementPrevResYears = () => {
  //   dispatch(contactDetailsActions.setPrevResYears(parseInt(prevResYears) + 1))
  // }
  // const decrementPrevResYears = () => {
  //   dispatch(contactDetailsActions.setPrevResYears(parseInt(prevResYears) - 1))
  // }

  // const incrementPrevResMonths = () => {
  //   dispatch(contactDetailsActions.setPrevResMonths(parseInt(prevResMonths) + 1))
  // }

  // const decrementPrevResMonths = () => {
  //   dispatch(contactDetailsActions.setPrevResMonths(parseInt(prevResMonths) - 1))
  // }

  // const handlePrevResYears = (event) => {
  //   dispatch(contactDetailsActions.setPrevResYears(event.target.value === '' ? 0 : parseInt(event.target.value)))
  // }
  // const handlePrevResMonths = (event) => {
  //   dispatch(contactDetailsActions.setPrevResMonths(event.target.value === '' ? 0 : parseInt(event.target.value)))
  // }

  const previousAddressLabel = prevHomeAddStreet === null || prevHomeAddStreet === '' ? 'your previous residence' : prevHomeAddStreet

  return (
    <Form>
      <Stack direction='column' spacing={3}>
        {!secureSessionID && (
          <>
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
                  <LabelStyle>Please provide your previous residential address.</LabelStyle>
                  <AddressFinderAutoComplete name='prevHomeAddStreet' asynchronousFunc={getAddresses} addressFinderRequestConfig={prevResAddressFinderConfig} addressFinderSuccess={prevResAddressFinderSucess} addressFinderLabel='Residential Address' addressCompletions={prevResAddressFinderCompletions} control={control} onAddressChange={handlePrevHomeAddStreet} onAddressSelectedChange={handlePrevResAddressSelected} loading={loading} defualtValue='' value={prevResAddressSelectedAddress} helperText='Start typing your previous residential address...' size={downSm ? 'small' : 'medium'} hasStartAdornment={true} StartAdornmentIcon={<CabinRoundedIcon color='primary' fontSize='small' />} placeholder='Previous Residential address' />
                </Stack>
              </Stack>

              <AnimatePresence>
                <Stack direction='column' justifyContent='flex-start'>
                  {!(prevResAddressSelectedPxid == null) && (
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
                </Stack>
              </AnimatePresence>
            </Stack>
          </>
        )}
        {secureSessionID && (
          <Stack direction='column' justifyContent='center' alignItems='center' spacing={5} sx={{ width: '100%' }}>
            <Stack direction='column' justifyContent='center' alignItems='center' spacing={2} sx={{ width: '100%', maxWidth: 500 }}>
              <Card
                elevation={downSm ? 0 : 8}
                sx={{
                  width: '100%',
                  maxWidth: 400,
                  boxShadow: (theme) => theme.shadows[5],
                }}
              >
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primary.main' : 'common.white'), color: 'secondary.main' }} aria-label='current residence'>
                      <LocationOnRoundedIcon />
                    </Avatar>
                  }
                  title='Previous Residence'
                  subheader={`Since ${fDate(sovPreviousAddresseffective)}`}
                  titleTypographyProps={{ color: 'grey.700', fontWeight: 500 }}
                  subheaderTypographyProps={{ variant: 'caption' }}
                />
                <CardContent sx={{ width: '100%' }}>
                  {!isPreviousAddressEmpty && (
                    <Stack
                      component={motion.div}
                      {...varSovPreviousResidential}
                      direction='column'
                      justifyContent='center'
                      alignItems='flex-start'
                      spacing={0.5}
                      sx={{
                        width: '100%',
                        px: downSm ? 0 : 2,
                      }}
                    >
                      {prevResAddressToDisplayLine1 && (
                        <Stack>
                          <Data variant='subtitle2'>{prevResAddressToDisplayLine1}</Data>
                        </Stack>
                      )}
                      {prevResAddressToDisplayLine2 && (
                        <Stack>
                          <Data variant='subtitle2'>{prevResAddressToDisplayLine2}</Data>
                        </Stack>
                      )}
                      {prevResAddressToDisplayLine3 && (
                        <Stack>
                          <Data variant='subtitle2'>{prevResAddressToDisplayLine3}</Data>
                        </Stack>
                      )}
                      {prevResAddressToDisplayLine4 && (
                        <Stack>
                          <Data variant='subtitle2'>{prevResAddressToDisplayLine4}</Data>
                        </Stack>
                      )}
                    </Stack>
                  )}
                  {isPreviousAddressEmpty && (
                    <Stack component={motion.div} {...varSovPreviousResidential} direction='column' justifyContent='center' alignItems='center' sx={{ width: '100%', minHeight: 70, px: downSm ? 0 : 2 }}>
                      <Data variant='h6' color='text.secondary' sx={{ color: 'text.secondary' }}>
                        No Address found!
                      </Data>
                    </Stack>
                  )}
                </CardContent>
                <CardActions sx={{ px: 2 }} disableSpacing>
                  {isValidSovPreviousResidentialDetails && !editValidPreviousResAddress && (
                    <Button
                      onClick={() => {
                        setEditValidPreviousResAddress(true)
                      }}
                      startIcon={<ModeEditOutlineRoundedIcon />}
                    >
                      Edit
                    </Button>
                  )}
                  <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label='full address details'>
                    <ExpandMoreOutlinedIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout='auto' unmountOnExit>
                  <CardContent>
                    <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={2}></Stack>
                  </CardContent>
                </Collapse>
              </Card>
            </Stack>
            {editValidPreviousResAddress && isValidSovPreviousResidentialDetails && (
              <Stack direction='column' justifyContent='center' alignItems='center' spacing={2} sx={{ width: '100%' }}>
                {/* <Stack component={motion.div} {...varSovCurrentResidentialInvalidInfo} direction='column' justifyContent='center' alignItems='center' sx={{ width: '100%' }}>
                  <Typography variant='overline' color='error'>
                    Your current residential address is invalid in our system.
                  </Typography>
                </Stack> */}
                <Stack component={motion.div} {...varSovPreviousResidentialAutoComplete} direction='row' justifyContent='center' alignItems='center' sx={{ width: '100%' }}>
                  {/* <InputField name='currHomeAddStreet' label='Street Name' type='text' control={control} onInputChange={handleCurrHomeAddStreet} hasTooltip={false} /> */}
                  <AddressFinderAutoComplete name='currHomeAddStreet' asynchronousFunc={getAddresses} addressFinderRequestConfig={prevResAddressFinderConfig} addressFinderSuccess={prevResAddressFinderSucess} addressFinderLabel='Residential Address' addressCompletions={prevResAddressFinderCompletions} control={control} onAddressChange={handlePrevHomeAddStreet} onAddressSelectedChange={handlePrevResAddressSelected} loading={loading} value={prevResAddressSelectedAddress} defualtValue='' helperText='Start typing...' />
                </Stack>
              </Stack>
            )}
            {isValidSovPreviousResidentialDetails === false && (
              <Stack direction='column' justifyContent='center' alignItems='center' spacing={2} sx={{ width: '100%' }}>
                <Stack component={motion.div} {...varSovPreviousResidentialInvalidInfo} direction='column' justifyContent='center' alignItems='center' sx={{ width: '100%' }}>
                  <Typography variant='overline' color='error'>
                    Your previous residential address is invalid in our system.
                  </Typography>
                  <Typography variant='caption' color='text.secondary'>
                    Please update your previous residential address below.
                  </Typography>
                </Stack>
                <Stack component={motion.div} {...varSovPreviousResidentialAutoComplete} direction='row' justifyContent='center' alignItems='center' sx={{ width: '100%' }}>
                  {/* <InputField name='currHomeAddStreet' label='Street Name' type='text' control={control} onInputChange={handleCurrHomeAddStreet} hasTooltip={false} /> */}
                  <AddressFinderAutoComplete name='currHomeAddStreet' asynchronousFunc={getAddresses} addressFinderRequestConfig={prevResAddressFinderConfig} addressFinderSuccess={prevResAddressFinderSucess} addressFinderLabel='Residential Address' addressCompletions={prevResAddressFinderCompletions} control={control} onAddressChange={handlePrevHomeAddStreet} onAddressSelectedChange={handlePrevResAddressSelected} loading={loading} value={prevResAddressSelectedAddress} defualtValue='' helperText='Start typing...' />
                </Stack>
              </Stack>
            )}
          </Stack>
        )}
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

export default PreviousResidentialAddress
