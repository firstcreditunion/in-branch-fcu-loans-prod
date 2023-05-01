import React, { useEffect } from 'react'

import { motion, AnimatePresence } from 'framer-motion'
import { varFlip } from '../../components/ui/animate'

import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import Form from '../../components/Form'
import InputField from '../../components/rhf-components/Input'
import PhoneNumber from '../../components/CleavePhoneNumber'

import { contactDetailsActions, matchClient } from '../../redux/slices/contactDetailsSlice'

import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import SmartphoneRoundedIcon from '@mui/icons-material/SmartphoneRounded'
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded'
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded'

//* Utils
import { fDateYYYY_MM_DD } from '../../utils/formatDateTime'
import { nfd_NormaliseString } from '../../utils/stringFormat'

const phoneRegExp = /^(((\+?64\s*[-\.\ ]?[3-9]|\(?0[3-9]\)?)\s*[-\.\ ]?\d{3}\s*[-\.\ ]?\d{4})|((\+?64\s*[-\.\(\ ]?2\d{1,2}[-\.\)\ ]?|\(?02\d{1}\)?)\s*[-\.\ ]?\d{3,4}\s*[-\.\ ]?\d{3,5})|((\+?64\s*[-\.\ ]?[-\.\(\ ]?800[-\.\)\ ]?|[-\.\(\ ]?0800[-\.\)\ ]?)\s*[-\.\ ]?\d{3}\s*[-\.\ ]?(\d{2}|\d{5})))|^$$/
const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/

let startTime = null
window.dataLayer = window.dataLayer || []

function YourContactDetails() {
  const downSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const downMd = useMediaQuery((theme) => theme.breakpoints.down('md'))

  const [mobileNumberCount, setMobileNumberCount] = React.useState(0)
  const [emailCount, setEmailCount] = React.useState(0)
  const [homePhoneCount, setHomePhoneCount] = React.useState(0)
  const [workPhoneCount, setWorkPhoneCount] = React.useState(0)

  const secureSessionID = useSelector((state) => state.globalReducer.secureSessionID)

  const emailAddress = useSelector((state) => state.conatctDetailsReducer.emailAddress) //* Also used for Client-Matching
  const mobileNumber = useSelector((state) => state.conatctDetailsReducer.mobileNumber)
  const mobileProviderCode = useSelector((state) => state.conatctDetailsReducer.mobileProviderCode)
  const homePhone = useSelector((state) => state.conatctDetailsReducer.homePhone)
  const homePhoneStdCode = useSelector((state) => state.conatctDetailsReducer.homePhoneStdCode)
  const workPhone = useSelector((state) => state.conatctDetailsReducer.workPhone)
  const workPhoneStdCode = useSelector((state) => state.conatctDetailsReducer.workPhoneStdCode)
  const numberOfContactMethods = useSelector((state) => state.conatctDetailsReducer.numberOfContactMethods)
  const onSubmitYourContactDetails = useSelector((state) => state.conatctDetailsReducer.onSubmitYourContactDetails)
  const isValidYourContactDetails = useSelector((state) => state.conatctDetailsReducer.isValidYourContactDetails)

  const primeAnalyticsEventPushed = useSelector((state) => state.conatctDetailsReducer.primeAnalyticsEventPushed)

  //* Client Matching Slectors
  const forenames = useSelector((state) => state.yourPersonalDetailReducer.forenames)
  const lastName = useSelector((state) => state.yourPersonalDetailReducer.lastName)
  const dob = useSelector((state) => state.yourPersonalDetailReducer.dob)

  const mobileNumberLastDigits = useSelector((state) => state.conatctDetailsReducer.mobileNumberLastDigits)
  const passportNo = useSelector((state) => state.identificationReducer.identificationTypes.passport.data.passportNo)

  const dispatch = useDispatch()

  const varFlipAlert = varFlip({
    durationIn: 0.32,
    durationOut: 0.0,
  }).inX

  const schema = yup.object().shape({
    emailAddress: yup.string().matches(emailRegExp, 'Email address is not valid').email('Email address is not valid').nullable(),
    mobileNumber: yup
      .string()
      .test('Leading Zero Check 1', 'Please remove leading zero from the provider code', function (mobilenumber) {
        let mobileSplit = mobilenumber?.split(' ')

        if (mobileSplit?.length > 0) {
          const providerSplit1 = mobileSplit[1]
          const firstCharOfProvider = providerSplit1?.charAt(0)

          if (firstCharOfProvider === '0') {
            return false
          }
        }

        return true
      })
      .test('Mobile provider check', `Provider code ${mobileProviderCode} is not valid`, function (mobilenumber) {
        let mobileSplit = mobilenumber?.split(' ')

        if (mobileSplit?.length < 4) return true

        if (mobileSplit?.length > 0) {
          const providerSplit1 = mobileSplit[1]
          const providerLength = providerSplit1?.length

          if (providerLength === 1) {
            return false
          }
        }

        return true
      })
      .matches(phoneRegExp, 'Mobile number is not valid')
      .nullable(),
    homePhone: yup
      .string()
      .test('Leading Zero Check Home Phone', 'Please remove leading zero from the area code', function (homePhone) {
        let homePhoneSplit = homePhone?.split(' ')

        if (homePhoneSplit?.length > 0) {
          const areaCodeSplit1 = homePhoneSplit[1]
          const firstCharOfAreaCode = areaCodeSplit1?.charAt(0)

          if (firstCharOfAreaCode === '0') {
            return false
          }
        }
        return true
      })
      .test('Area code check', `Area code ${homePhoneStdCode} is not valid`, function (homePhone) {
        let homePhoneSplit = homePhone?.split(' ')

        if (homePhoneSplit?.length < 3) return true

        if (homePhoneSplit?.length > 0) {
          const areaCodeSplit1 = homePhoneSplit[1]
          const areaCodeLength = areaCodeSplit1?.length

          if (areaCodeLength > 1) {
            return false
          }
        }

        return true
      })
      .matches(phoneRegExp, 'Home Phone number is not valid')
      .nullable(),
    workPhone: yup
      .string()
      .test('Leading Zero Check Home Phone', 'Please remove leading zero from the area code', function (workPhone) {
        let workPhoneSplit = workPhone?.split(' ')

        if (workPhoneSplit?.length > 0) {
          const areaCodeSplit1 = workPhoneSplit[1]
          const firstCharOfAreaCode = areaCodeSplit1?.charAt(0)

          if (firstCharOfAreaCode === '0') {
            return false
          }
        }
        return true
      })
      .test('Area code check', `Area code ${workPhoneStdCode} is not valid`, function (workPhone) {
        let workPhoneSplit = workPhone?.split(' ')

        if (workPhoneSplit?.length < 3) return true

        if (workPhoneSplit?.length > 0) {
          const areaCodeSplit1 = workPhoneSplit[1]
          const areaCodeLength = areaCodeSplit1?.length

          if (areaCodeLength > 1) {
            return false
          }
        }

        return true
      })
      .matches(phoneRegExp, 'Work Phone number is not valid')
      .nullable(),
  })

  const {
    formState: { errors, isValid },
    control,
    watch,
    clearErrors,
  } = useForm({
    defaultValues: {
      emailAddress: emailAddress,
      mobileNumber: mobileNumber,
      homePhone: homePhone,
      workPhone: workPhone,
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  })

  const contactdetails = watch()

  // function onSubmit() {
  //   console.log('Submitted Contact details')
  // }

  useEffect(() => {
    if (!errors.mobileNumber && contactdetails.mobileNumber !== '' && contactdetails.mobileNumber.toString().trim() !== '+64') {
      setMobileNumberCount(1)
    } else {
      setMobileNumberCount(0)
      if (errors.mobileNumber && (contactdetails.mobileNumber === '' || contactdetails.mobileNumber.toString().trim() === '+64')) {
        clearErrors('mobileNumber')
      }
    }
    if (!errors.emailAddress && contactdetails.emailAddress !== '') {
      setEmailCount(1)
    } else {
      setEmailCount(0)
      if (errors.emailAddress && contactdetails.emailAddress === '') {
        clearErrors('emailAddress')
      }
    }
    if (!errors.homePhone && contactdetails.homePhone !== '' && contactdetails.homePhone.toString().trim() !== '+64') {
      setHomePhoneCount(1)
    } else {
      setHomePhoneCount(0)
      if (errors.homePhone && (contactdetails.homePhone === '' || contactdetails.homePhone.toString().trim() === '+64')) {
        clearErrors('homePhone')
      }
    }
    if (!errors.workPhone && contactdetails.workPhone !== '' && contactdetails.workPhone.toString().trim() !== '+64') {
      setWorkPhoneCount(1)
    } else {
      setWorkPhoneCount(0)
      if (errors.workPhone && (contactdetails.workPhone === '' || contactdetails.workPhone.toString().trim() === '+64')) {
        clearErrors('workPhone')
      }
    }

    dispatch(contactDetailsActions.setNumberOfContactMethods(mobileNumberCount + emailCount + homePhoneCount + workPhoneCount))
  }, [contactdetails])

  useEffect(() => {
    if (isValid && secureSessionID) {
      dispatch(contactDetailsActions.setisValidSovEmailAddress(true))
      dispatch(contactDetailsActions.setisValidSovMobileNumber(true))
      dispatch(contactDetailsActions.setisValidSovHomePhoneNumber(true))
      dispatch(contactDetailsActions.setisValidSovWorkPhoneNumber(true))
      dispatch(contactDetailsActions.setIsValidSovContactMethods(true))
    }

    if (numberOfContactMethods >= 2 && !errors.emailAddress && !errors.homePhone && !errors.mobileNumber && !errors.workPhone) {
      dispatch(contactDetailsActions.setIsValidYourContactDetails(true))

      let endTime = new Date()
      let timeSpentMillis = endTime - startTime

      if (!primeAnalyticsEventPushed) {
        window.dataLayer.push({
          event: 'prime_contact_submit',
          time_elapsed: timeSpentMillis,
          form_name: 'Prime Contact Details',
        })

        dispatch(contactDetailsActions.setPrimeAnalyticsEventPushed(true))
      }

      //* Send request for Client-Matching

      return
    }
    if (numberOfContactMethods >= 2 && (errors.emailAddress || errors.homePhone || errors.mobileNumber || errors.workPhone)) {
      dispatch(contactDetailsActions.setIsValidYourContactDetails(false))

      return
    }
    if (numberOfContactMethods < 2) {
      dispatch(contactDetailsActions.setIsValidYourContactDetails(false))
      return
    }
  }, [numberOfContactMethods, isValid, onSubmitYourContactDetails])

  const handleEmailAddress = (event) => {
    dispatch(contactDetailsActions.setEmailAddress(nfd_NormaliseString(event.target.value)))
  }
  const handleMobileNumber = (event) => {
    dispatch(contactDetailsActions.setMobileNumber(event.target.value))
  }
  const handleHomePhone = (event) => {
    dispatch(contactDetailsActions.setHomePhone(event.target.value))
  }
  const handleWorkPhone = (event) => {
    dispatch(contactDetailsActions.setWorkPhone(event.target.value))
  }

  useEffect(() => {
    startTime = new Date()

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [])

  return (
    <>
      <Form>
        <Stack direction='column' spacing={4} justifyContent='flex-start'>
          <Box>
            <AnimatePresence exitBeforeEnter>
              {numberOfContactMethods < 2 && onSubmitYourContactDetails === null && (
                <motion.div {...varFlipAlert}>
                  <Stack direction='row' justifyContent='center'>
                    <Alert severity='info' sx={{ borderRadius: 49 }}>
                      <Typography variant={downSm ? 'caption' : 'body2'} sx={{ textAlign: 'center' }}>
                        <strong>Two</strong> valid contact methods are required
                      </Typography>
                    </Alert>
                  </Stack>
                </motion.div>
              )}
              {numberOfContactMethods < 2 && onSubmitYourContactDetails !== null && (
                <motion.div {...varFlipAlert}>
                  <Stack direction='row' justifyContent='center'>
                    <Alert severity='error' sx={{ borderRadius: 49 }}>
                      <Typography variant='body2'>
                        Please enter <strong>two</strong> valid contact methods
                      </Typography>
                    </Alert>
                  </Stack>
                </motion.div>
              )}
              {numberOfContactMethods >= 2 && (onSubmitYourContactDetails !== null || onSubmitYourContactDetails === null) && isValidYourContactDetails === false && (
                <motion.div {...varFlipAlert}>
                  <Stack direction='row' justifyContent='center'>
                    <Alert severity='warning' sx={{ borderRadius: 49 }}>
                      <Typography variant='body2'>Please check the fields marked in red</Typography>
                    </Alert>
                  </Stack>
                </motion.div>
              )}
              {numberOfContactMethods >= 2 && (onSubmitYourContactDetails !== null || onSubmitYourContactDetails === null) && isValidYourContactDetails && (
                <motion.div {...varFlipAlert}>
                  <Stack direction='row' justifyContent='center'>
                    <Alert severity='success' sx={{ borderRadius: 49 }}>
                      <Typography variant='body2'>Contact details are valid!</Typography>
                    </Alert>
                  </Stack>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
          <Stack direction='column' spacing={5} justifyContent='flex-start'>
            <InputField name='emailAddress' label='Email address' type='email' control={control} errorInput={!!errors.emailAddress} onInputChange={handleEmailAddress} hasTooltip={false} hasStartAdornment={true} StartAdornmentIcon={<AlternateEmailIcon color='primary' />} placeholder='Email Address' />
            <PhoneNumber name='mobileNumber' type='tel' label='Mobile Number' control={control} onNumberChange={handleMobileNumber} errorInput={!!errors.mobileNumber} hasTooltip={false} toolTipText='Mobile number' hasStartAdornment={true} StartAdornmentIcon={<SmartphoneRoundedIcon color='primary' />} placeholder='Mobile Number' />
            <PhoneNumber name='homePhone' type='tel' label='Home Phone Number' control={control} onNumberChange={handleHomePhone} errorInput={!!errors.homePhone} hasTooltip={false} toolTipText='Home Phone Number' hasStartAdornment={true} StartAdornmentIcon={<LocalPhoneRoundedIcon color='primary' />} placeholder='Home Phone Number' />
            <PhoneNumber name='workPhone' type='tel' label='Work Phone Number' control={control} onNumberChange={handleWorkPhone} errorInput={!!errors.workPhone} hasTooltip={false} toolTipText=' Work Phone Number' hasStartAdornment={true} StartAdornmentIcon={<BusinessCenterRoundedIcon color='primary' />} placeholder='Work Phone Number' />
          </Stack>
        </Stack>
      </Form>
    </>
  )
}

export default YourContactDetails
