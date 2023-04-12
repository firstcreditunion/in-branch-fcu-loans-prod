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

// MUI
import Box from '@mui/material/Box'
import Radio from '@mui/material/Radio'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Collapse from '@mui/material/Collapse'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import FormControlLabel from '@mui/material/FormControlLabel'

// MUI - Cards
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

// MUI - Icons
import IconButton from '@mui/material/IconButton'
import CabinRoundedIcon from '@mui/icons-material/CabinRounded'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded'

// Custom Components
import DatePicker from '../../components/rhf-components/DatePicker'

// Utils
import { fDate } from '../../utils/formatDateTime'
import { debounce_fn } from '../../utils/debounceAndThrottle'

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
}))

const Title = styled(Typography)(({ theme }) => ({
  ...theme.typography.overline,
  color: theme.palette.text.secondary,
  fontWeight: 500,
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

function ResidentialAddress() {
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const secureSessionID = useSelector((state) => state.globalReducer.secureSessionID)

  const currentRequestId = useSelector((state) => state.conatctDetailsReducer.currentRequestId)

  const currHomeAddStreet = useSelector((state) => state.conatctDetailsReducer.currHomeAddStreet)
  const residenceType = useSelector((state) => state.conatctDetailsReducer.residenceType)
  const currResYears = useSelector((state) => state.conatctDetailsReducer.currResYears)
  const currResMonths = useSelector((state) => state.conatctDetailsReducer.currResMonths)
  const currResEffectiveDate = useSelector((state) => state.conatctDetailsReducer.currResEffectiveDate)
  const sovcurrResLengthOfStayIsZero = useSelector((state) => state.conatctDetailsReducer.sovcurrResLengthOfStayIsZero)
  const onSubmitResidenceDetails = useSelector((state) => state.conatctDetailsReducer.onSubmitResidenceDetails)
  const isValidSovCurrentResidentialDetails = useSelector((state) => state.conatctDetailsReducer.isValidSovCurrentResidentialDetails)

  const isValidResidenceDetails = useSelector((state) => state.conatctDetailsReducer.isValidResidenceDetails)
  const isValidSovPreviousResidentialDetails = useSelector((state) => state.conatctDetailsReducer.isValidSovPreviousResidentialDetails)
  const isValidPrevResidenceDetails = useSelector((state) => state.conatctDetailsReducer.isValidPrevResidenceDetails)

  const [editValidCurrentResAddress, setEditValidCurrentResAddress] = React.useState(false)

  // Address Finder
  const loading = useSelector((state) => state.conatctDetailsReducer.loading)
  const currResAddressFinderCompletions = useSelector((state) => state.conatctDetailsReducer.currResAddressFinderCompletions)
  const currResAddressFinderSucess = useSelector((state) => state.conatctDetailsReducer.currResAddressFinderSucess)
  const currResAddressFinderConfig = useSelector((state) => state.conatctDetailsReducer.currResAddressFinderConfig)

  const currResAddressSelectedAddress = useSelector((state) => state.conatctDetailsReducer.currResAddressSelectedAddress)
  const currResAddressSelectedPxid = useSelector((state) => state.conatctDetailsReducer.currResAddressSelectedPxid)
  const currResAddressSelectedMetaData = useSelector((state) => state.conatctDetailsReducer.currResAddressSelectedMetaData)
  const loadingMeta = useSelector((state) => state.conatctDetailsReducer.loadingMeta)

  const currResAddressToDisplayLine1 = useSelector((state) => state.conatctDetailsReducer.currResAddressToDisplayLine1)
  const currResAddressToDisplayLine2 = useSelector((state) => state.conatctDetailsReducer.currResAddressToDisplayLine2)
  const currResAddressToDisplayLine3 = useSelector((state) => state.conatctDetailsReducer.currResAddressToDisplayLine3)
  const currResAddressToDisplayLine4 = useSelector((state) => state.conatctDetailsReducer.currResAddressToDisplayLine4)

  const currResidenceEffDate = useSelector((state) => state.conatctDetailsReducer.currResidenceEffDate)

  const sovCurrentAddresseffective = useSelector((state) => state.conatctDetailsReducer.sovCurrentAddresseffective)
  const sovHasCurrentResidentialDetails = useSelector((state) => state.conatctDetailsReducer.sovHasCurrentResidentialDetails)

  const isCurrentAddressEmpty = (currResAddressToDisplayLine1 == null && currResAddressToDisplayLine2 == null && currResAddressToDisplayLine3 == null && currResAddressToDisplayLine4 == null) || currHomeAddStreet === null || currHomeAddStreet === undefined || currHomeAddStreet === ''

  const upperLimitForResidencyStartDate = new Date()

  const schema = yup.object().shape({
    currHomeAddStreet: yup
      .string()
      .test('Conditional requirement', 'Residential address is required', function (currentResAddress) {
        if (isValidSovCurrentResidentialDetails) {
          return true
        }

        if (isValidSovCurrentResidentialDetails == false && (currentResAddress === undefined || currentResAddress == null || currentResAddress === '')) {
          return false
        }
        return true
      })
      .required('Residential address is required')
      .nullable(),
    residenceType: yup.string().required('Residence type is required'),
    currResYears: yup.string().required(''),
    currResMonths: yup.string(),
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

  const varSovCurrentResidential = varFade({
    distance: 10,
    durationIn: 0.32,
    durationOut: 0.32,
  }).inUp

  const varSovCurrentResidentialInvalidInfo = varFade({
    distance: 10,
    durationIn: 0.5,
    durationOut: 0.5,
  }).inLeft

  const varSovCurrentResidentialAutoComplete = varFade({
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
      currHomeAddStreet: currHomeAddStreet,
      residenceType: residenceType,
      currResYears: currResYears,
      currResMonths: currResMonths,
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    dispatch(contactDetailsActions.setRenderingPrime(true))
    dispatch(contactDetailsActions.setRenderingCurrentResidence(true))

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [])

  useEffect(() => {
    console.log('Get Address Request ID: ', currentRequestId)
  }, [currentRequestId])

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
      dispatch(contactDetailsActions.setCurrResAddressFinderConfig(config))
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
      // Data to Display on client-side
      dispatch(contactDetailsActions.setCurrResAddressToDisplayLine1(currResAddressSelectedMetaData?.postal_line_1))
      dispatch(contactDetailsActions.setCurrResAddressToDisplayLine2(currResAddressSelectedMetaData?.postal_line_2))
      dispatch(contactDetailsActions.setCurrResAddressToDisplayLine3(currResAddressSelectedMetaData?.postal_line_3))
      dispatch(contactDetailsActions.setCurrResAddressToDisplayLine4(currResAddressSelectedMetaData?.postal_line_4))

      // >>>>>>>>>>>>>>>>>>>>>>>>>>>  Data to send in submission body <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //

      // 1. Unit Type
      if (currResAddressSelectedMetaData?.unit_type) {
        dispatch(contactDetailsActions.setCurrResAddressSelectedUnitType(currResAddressSelectedMetaData?.unit_type))
      } else {
        dispatch(contactDetailsActions.setCurrResAddressSelectedUnitType(null))
      }
      // 2. Apartment
      if (currResAddressSelectedMetaData?.unit_identifier) {
        dispatch(contactDetailsActions.setCurrResAddressSelectedApartment(currResAddressSelectedMetaData?.unit_identifier))
      } else {
        dispatch(contactDetailsActions.setCurrResAddressSelectedApartment(null))
      }
      // 3. Building
      if (currResAddressSelectedMetaData?.building_name) {
        dispatch(contactDetailsActions.setCurrResAddressSelectedBuilding(currResAddressSelectedMetaData?.building_name))
      } else {
        dispatch(contactDetailsActions.setCurrResAddressSelectedBuilding(null))
      }
      // 4. Street number from
      if (getStreetFromAndToNumber(currResAddressSelectedMetaData?.number)?.from) {
        dispatch(contactDetailsActions.setCurrResAddressSelectedStreetNumberFrom(getStreetFromAndToNumber(currResAddressSelectedMetaData?.number)?.from))
      } else {
        dispatch(contactDetailsActions.setCurrResAddressSelectedStreetNumberFrom(null))
      }
      // 5. Street number to
      if (getStreetFromAndToNumber(currResAddressSelectedMetaData?.number)?.to) {
        dispatch(contactDetailsActions.setCurrResAddressSelectedStreetNumberTo(getStreetFromAndToNumber(currResAddressSelectedMetaData?.number)?.to))
      } else {
        dispatch(contactDetailsActions.setCurrResAddressSelectedStreetNumberTo(null))
      }
      // 6. Street Alpha
      if (currResAddressSelectedMetaData?.alpha) {
        dispatch(contactDetailsActions.setCurrResAddressSelectedAlpha(currResAddressSelectedMetaData?.alpha))
      } else {
        dispatch(contactDetailsActions.setCurrResAddressSelectedAlpha(null))
      }
      // 7. Street or postal Name
      if (currResAddressSelectedMetaData?.street) {
        dispatch(contactDetailsActions.setCurrResAddressSelectedStreetOrPostalName(currResAddressSelectedMetaData?.street))
      } else {
        dispatch(contactDetailsActions.setCurrResAddressSelectedStreetOrPostalName(null))
      }
      // 8. Street Direction
      if (currResAddressSelectedMetaData?.street_suffix) {
        dispatch(contactDetailsActions.setCurrResAddressSelectedStreetDirection(currResAddressSelectedMetaData?.street_suffix))
      } else {
        dispatch(contactDetailsActions.setCurrResAddressSelectedStreetDirection(null))
      }
      // 9. Street Type
      if (currResAddressSelectedMetaData?.street_type) {
        dispatch(contactDetailsActions.setCurrResAddressSelectedStreetType(currResAddressSelectedMetaData?.street_type))
      } else {
        dispatch(contactDetailsActions.setCurrResAddressSelectedStreetType(null))
      }
      // 10. Suburb
      if (currResAddressSelectedMetaData?.suburb) {
        dispatch(contactDetailsActions.setCurrResAddressSelectedSuburb(currResAddressSelectedMetaData?.suburb))
      } else {
        dispatch(contactDetailsActions.setCurrResAddressSelectedSuburb(null))
      }
      // 11. City
      if (currResAddressSelectedMetaData?.city) {
        dispatch(contactDetailsActions.setCurrResAddressSelectedCity(currResAddressSelectedMetaData?.city))
      } else {
        dispatch(contactDetailsActions.setCurrResAddressSelectedCity(null))
      }
      // // 12. State
      // if (currResAddressSelectedMetaData?.city) dispatch(contactDetailsActions.setCurrResAddressSelectedCity(currResAddressSelectedMetaData?.city))
      // 13. Post code
      if (currResAddressSelectedMetaData?.postcode) {
        dispatch(contactDetailsActions.setCurrResAddressSelectedPostCode(currResAddressSelectedMetaData?.postcode))
      } else {
        dispatch(contactDetailsActions.setCurrResAddressSelectedPostCode(null))
      }
      // 14. Country code
      dispatch(contactDetailsActions.setCurrResAddressSelectedCountryCode('NZD'))
      //15. Country description
      dispatch(contactDetailsActions.setCurrResAddressSelectedCountryDesc('New Zealand'))

      // >>>>>>>>>>>>>>>>>>>>>>>>>>> END <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //

      dispatch(contactDetailsActions.setCurrHomeAddStreet(currResAddressSelectedMetaData?.a))

      if (currResAddressSelectedMetaData?.postal_line_1 == null) dispatch(contactDetailsActions.setCurrResAddressToDisplayLine1(null))
      if (currResAddressSelectedMetaData?.postal_line_2 == null) dispatch(contactDetailsActions.setCurrResAddressToDisplayLine2(null))
      if (currResAddressSelectedMetaData?.postal_line_3 == null) dispatch(contactDetailsActions.setCurrResAddressToDisplayLine3(null))
      if (currResAddressSelectedMetaData?.postal_line_4 == null) dispatch(contactDetailsActions.setCurrResAddressToDisplayLine4(null))

      dispatch(contactDetailsActions.setIsValidSovCurrentResidentialDetails(true))
      dispatch(contactDetailsActions.setsovHasCurrentResidentialDetails(true))
      setEditValidCurrentResAddress(false)
    }
  }, [currResAddressSelectedMetaData])

  useEffect(() => {
    dispatch(contactDetailsActions.setIsValidResidenceDetails(isValid))
  }, [isValid])

  useEffect(() => {
    console.log('')
    // console.log('isValidSovCurrentResidentialDetails: ', isValidSovCurrentResidentialDetails)
    // console.log('isValidResidenceDetails: ', isValidResidenceDetails)
    // console.log('isValidSovPreviousResidentialDetails: ', isValidSovPreviousResidentialDetails)
    // console.log('isValidPrevResidenceDetails: ', isValidPrevResidenceDetails)
    // console.log('Card controls Validation: ', !isCurrentAddressEmpty || sovHasCurrentResidentialDetails === true)
    // console.log('isCurrentAddressEmpty validation part 1: ', isCurrentAddressEmpty)
    // console.log('sovHasCurrentResidentialDetails validation part 2: ', sovHasCurrentResidentialDetails)
    // console.log('Current Residential Control: ', control)

    if (onSubmitResidenceDetails != null) {
      handleSubmit(onSubmit())()
      return
    }
  }, [onSubmitResidenceDetails])

  useEffect(() => {
    if (currResYears < 3) {
      dispatch(contactDetailsActions.setSkipPrevResidence(false))
      return
    }
    dispatch(contactDetailsActions.setSkipPrevResidence(true))
    dispatch(contactDetailsActions.setIsValidPrevResidenceDetails(true))
    dispatch(contactDetailsActions.setIsValidSovPreviousResidentialDetails(true))
  }, [currResYears, currResEffectiveDate])

  function onSubmit() {
    console.log('Current Residence Details Submitted')
  }

  const handleCurrHomeAddStreet = (event) => {
    dispatch(contactDetailsActions.setCurrHomeAddStreet(event.target.value))
  }
  const handleCurrResAddressSelected = (event, newValue) => {
    dispatch(contactDetailsActions.setCurrResAddressSelectedAddress(newValue))
    dispatch(contactDetailsActions.setCurrResAddressSelectedPxid(newValue?.pxid))
    dispatch(contactDetailsActions.setIsValidSovCurrentResidentialDetails(true))
  }

  const handleResidenceType = (event) => {
    dispatch(contactDetailsActions.setResidenceType(event.target.value))
  }

  // Bankruptcy Date
  const handleCurrentResidenceEffDate = (date) => {
    dispatch(contactDetailsActions.setCurrResEffDate(date))
  }

  // Stay at current residence
  const incrementCurrResYears = () => {
    dispatch(contactDetailsActions.setCurrResYears(parseInt(currResYears) + 1))
  }

  const decrementCurrResYears = () => {
    dispatch(contactDetailsActions.setCurrResYears(parseInt(currResYears) - 1))
  }

  const incrementCurrResMonths = () => {
    dispatch(contactDetailsActions.setCurrResMonths(parseInt(currResMonths) + 1))
  }

  const decrementCurrResMonths = () => {
    dispatch(contactDetailsActions.setCurrResMonths(parseInt(currResMonths) - 1))
  }

  const handleResYears = (event) => {
    dispatch(contactDetailsActions.setCurrResYears(event.target.value === '' ? 0 : parseInt(event.target.value)))
  }
  const handleResMonths = (event) => {
    dispatch(contactDetailsActions.setCurrResMonths(event.target.value === '' ? 0 : parseInt(event.target.value)))
  }

  return (
    <Form>
      <Stack direction='column'>
        {!secureSessionID && (
          <>
            <Stack sx={{ pb: 5, pt: downSm ? 5 : 3 }}>
              <Stack direction='column' justifyContent='flex-start' spacing={2} sx={{ pl: 2, pb: 2, textAlign: 'center' }}>
                <LabelStyle sx={{ textAlign: 'center' }}>What is your current residential address?</LabelStyle>
                <AddressFinderAutoComplete name='currHomeAddStreet' asynchronousFunc={getAddresses} addressFinderRequestConfig={currResAddressFinderConfig} addressFinderSuccess={currResAddressFinderSucess} addressFinderLabel='Residential Address' addressCompletions={currResAddressFinderCompletions} control={control} onAddressChange={handleCurrHomeAddStreet} onAddressSelectedChange={handleCurrResAddressSelected} loading={loading} defualtValue='' value={currResAddressSelectedAddress} helperText={currResAddressSelectedPxid == null ? 'Start typing your residential address...' : ''} hasStartAdornment={true} StartAdornmentIcon={<CabinRoundedIcon fontSize='small' color='primary' />} size={downSm ? 'small' : 'medium'} placeholder='Residential Address' />
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
                  title='Current Residence'
                  subheader={`Since ${fDate(currResEffectiveDate)}`}
                  titleTypographyProps={{ color: 'grey.700', fontWeight: 500 }}
                  subheaderTypographyProps={{ variant: 'caption' }}
                />
                <CardContent sx={{ width: '100%' }}>
                  {(!isCurrentAddressEmpty || sovHasCurrentResidentialDetails === true) && (
                    <Stack component={motion.div} {...varSovCurrentResidential} direction='column' justifyContent='center' alignItems='flex-start' spacing={0.5} sx={{ width: '100%', px: downSm ? 0 : 2 }}>
                      {currResAddressToDisplayLine1 && (
                        <Stack>
                          <Data variant='subtitle2'>{currResAddressToDisplayLine1}</Data>
                        </Stack>
                      )}
                      {currResAddressToDisplayLine2 && (
                        <Stack>
                          <Data variant='subtitle2'>{currResAddressToDisplayLine2}</Data>
                        </Stack>
                      )}
                      {currResAddressToDisplayLine3 && (
                        <Stack>
                          <Data variant='subtitle2'>{currResAddressToDisplayLine3}</Data>
                        </Stack>
                      )}
                      {currResAddressToDisplayLine4 && (
                        <Stack>
                          <Data variant='subtitle2'>{currResAddressToDisplayLine4}</Data>
                        </Stack>
                      )}
                    </Stack>
                  )}
                  {isCurrentAddressEmpty && sovHasCurrentResidentialDetails === false && currResAddressSelectedMetaData == null && (
                    <Stack component={motion.div} {...varSovCurrentResidential} direction='column' justifyContent='center' alignItems='center' sx={{ width: '100%', minHeight: 70, px: downSm ? 0 : 2 }}>
                      <Data variant='h6' color='text.secondary' sx={{ color: 'text.secondary' }}>
                        Please add your address
                      </Data>
                    </Stack>
                  )}
                </CardContent>
                <CardActions sx={{ px: 2 }} disableSpacing>
                  {isValidSovCurrentResidentialDetails && !editValidCurrentResAddress && (
                    <Button
                      onClick={() => {
                        setEditValidCurrentResAddress(true)
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
            {((editValidCurrentResAddress && isValidSovCurrentResidentialDetails) || sovHasCurrentResidentialDetails === false) && (
              <Stack direction='column' justifyContent='center' alignItems='center' spacing={2} sx={{ width: '100%' }}>
                {/* <Stack component={motion.div} {...varSovCurrentResidentialInvalidInfo} direction='column' justifyContent='center' alignItems='center' sx={{ width: '100%' }}>
                  <Typography variant='overline' color='error'>
                    Your current residential address is invalid in our system.
                  </Typography>
                </Stack> */}
                <Stack component={motion.div} {...varSovCurrentResidentialAutoComplete} direction='row' justifyContent='center' alignItems='center' sx={{ width: '100%' }}>
                  {/* <InputField name='currHomeAddStreet' label='Street Name' type='text' control={control} onInputChange={handleCurrHomeAddStreet} hasTooltip={false} /> */}
                  <AddressFinderAutoComplete name='currHomeAddStreet' asynchronousFunc={getAddresses} addressFinderRequestConfig={currResAddressFinderConfig} addressFinderSuccess={currResAddressFinderSucess} addressFinderLabel='Residential Address' addressCompletions={currResAddressFinderCompletions} control={control} onAddressChange={handleCurrHomeAddStreet} onAddressSelectedChange={handleCurrResAddressSelected} loading={loading} value={currResAddressSelectedAddress} defualtValue='' helperText='Start typing your residential address...' />
                </Stack>
              </Stack>
            )}
            {isValidSovCurrentResidentialDetails === false && (
              <Stack direction='column' justifyContent='center' alignItems='center' spacing={2} sx={{ width: '100%' }}>
                <Stack component={motion.div} {...varSovCurrentResidentialInvalidInfo} direction='column' justifyContent='center' alignItems='center' sx={{ width: '100%' }}>
                  <Typography variant='overline' color='error'>
                    Your current residential address is invalid in our system.
                  </Typography>
                  <Typography variant='caption' color='text.secondary'>
                    Please type you correct residential address below.
                  </Typography>
                </Stack>
                <Stack component={motion.div} {...varSovCurrentResidentialAutoComplete} direction='row' justifyContent='center' alignItems='center' sx={{ width: '100%' }}>
                  {/* <InputField name='currHomeAddStreet' label='Street Name' type='text' control={control} onInputChange={handleCurrHomeAddStreet} hasTooltip={false} /> */}
                  <AddressFinderAutoComplete name='currHomeAddStreet' asynchronousFunc={getAddresses} addressFinderRequestConfig={currResAddressFinderConfig} addressFinderSuccess={currResAddressFinderSucess} addressFinderLabel='Residential Address' addressCompletions={currResAddressFinderCompletions} control={control} onAddressChange={handleCurrHomeAddStreet} onAddressSelectedChange={handleCurrResAddressSelected} loading={loading} value={currResAddressSelectedAddress} defualtValue='' helperText='Start typing your residential address...' />
                </Stack>
              </Stack>
            )}
          </Stack>
        )}
        <Stack direction='column' spacing={5} sx={{ width: '100%' }}>
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
              <LabelStyle sx={{ textAlign: 'center' }}>How long have you been staying at this address?</LabelStyle>
              <Stack direction={downSm ? 'column' : 'row'} spacing={downMd ? (downSm ? 1 : 2) : 0} justifyContent={downMd ? 'center' : 'space-evenly'} alignItems={downSm ? 'center' : 'baseline'}>
                <EditableCounter name='currResYears' control={control} defualtValue={0} label='Years' count={currResYears} maxValue={50} onIncrementCount={incrementCurrResYears} onDecrementCount={decrementCurrResYears} disabled={!(currResAddressSelectedMetaData == null) || sovcurrResLengthOfStayIsZero || secureSessionID == null ? false : true} onTextFieldChange={handleResYears} />
                {!downSm && (
                  <Typography variant='body1' sx={{ color: 'text.secondray' }}>
                    and
                  </Typography>
                )}
                <EditableCounter name='currResMonths' control={control} defualtValue={0} label='Months' count={currResMonths} maxValue={11} onIncrementCount={incrementCurrResMonths} onDecrementCount={decrementCurrResMonths} disabled={!(currResAddressSelectedMetaData == null) || sovcurrResLengthOfStayIsZero || secureSessionID == null ? false : true} onTextFieldChange={handleResMonths} />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        {/* <Stack direction='column' spacing={5} sx={{ width: '100%' }}>
          <Stack direction='column'>
            <LabelStyle sx={{ textAlign: 'center' }}>How would you describe your current residence?</LabelStyle>
            <RadioGroups id='residenceType' name='residenceType' onRadioChange={handleResidenceType} control={control} value={residenceType} defaultValue={''} alignItems='center' row={downSm ? false : true}>
              <FormControlLabel sx={{ alignItems: 'center' }} value='HOME' control={<Radio size='small' />} label='Own Home' key='HOME' />
              <FormControlLabel sx={{ alignItems: 'center' }} value='RENT' control={<Radio size='small' />} label='Renting' key='RENT' />
              <FormControlLabel sx={{ alignItems: 'center' }} value='BOARD' control={<Radio size='small' />} label='Boarding' key='BOARD' />
            </RadioGroups>
          </Stack>
          <Stack direction='column' spacing={3} justifyContent='flex-start' sx={{ width: '100%' }}>
            <Stack direction='column' spacing={2} justifyContent='flex-start' alignItems='center' sx={{ width: '100%' }}>
              <Stack direction='column' spacing={2} justifyContent='flex-start' alignItems='center' sx={{ width: '100%' }}>
                <LabelStyle sx={{ textAlign: 'center' }}>When did you move into this address?</LabelStyle>
                <DatePicker id='currResEffDate' name='currResEffDate' onDateChange={handleCurrentResidenceEffDate} label='Address Effective Date' control={control} variant='outlined' helperText='Month and Year. Eg: June 2020' openTo='year' format='MMMM YYYY' date={currResidenceEffDate} maxDate={upperLimitForResidencyStartDate} isRequired={true} views={['year', 'month']} />
              </Stack>
            </Stack>
          </Stack>
        </Stack> */}
      </Stack>
    </Form>
  )
}

export default ResidentialAddress
