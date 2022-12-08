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

import { contactDetailsActions } from '../../redux/slices/contactDetailsSlice'

import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import SmartphoneRoundedIcon from '@mui/icons-material/SmartphoneRounded'
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded'
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded'

const phoneRegExp = /^(((\+?64\s*[-\.\ ]?[3-9]|\(?0[3-9]\)?)\s*[-\.\ ]?\d{3}\s*[-\.\ ]?\d{4})|((\+?64\s*[-\.\(\ ]?2\d{1,2}[-\.\)\ ]?|\(?02\d{1}\)?)\s*[-\.\ ]?\d{3,4}\s*[-\.\ ]?\d{3,5})|((\+?64\s*[-\.\ ]?[-\.\(\ ]?800[-\.\)\ ]?|[-\.\(\ ]?0800[-\.\)\ ]?)\s*[-\.\ ]?\d{3}\s*[-\.\ ]?(\d{2}|\d{5})))|^$$/
const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/

function YourContactDetails() {
  const [mobileNumberCount, setMobileNumberCount] = React.useState(0)
  const [emailCount, setEmailCount] = React.useState(0)
  const [homePhoneCount, setHomePhoneCount] = React.useState(0)
  const [workPhoneCount, setWorkPhoneCount] = React.useState(0)

  const emailAddress = useSelector((state) => state.conatctDetailsReducer.jointemailAddress)
  const mobileProviderCode = useSelector((state) => state.conatctDetailsReducer.jointmobileProviderCode)
  const mobileNumber = useSelector((state) => state.conatctDetailsReducer.jointmobileNumber)
  const homePhone = useSelector((state) => state.conatctDetailsReducer.jointhomePhone)
  const homePhoneStdCode = useSelector((state) => state.conatctDetailsReducer.jointhomePhoneStdCode)
  const workPhone = useSelector((state) => state.conatctDetailsReducer.jointworkPhone)
  const workPhoneStdCode = useSelector((state) => state.conatctDetailsReducer.jointworkPhoneStdCode)
  const numberOfContactMethods = useSelector((state) => state.conatctDetailsReducer.jointnumberOfContactMethods)
  const onSubmitYourContactDetails = useSelector((state) => state.conatctDetailsReducer.jointonSubmitYourContactDetails)
  const isValidYourContactDetails = useSelector((state) => state.conatctDetailsReducer.jointisValidYourContactDetails)

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
    handleSubmit,
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
    resolver: yupResolver(schema),
  })

  const contactdetails = watch()

  function onSubmit() {
    console.log('Submitted Contact details')
  }

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

    dispatch(contactDetailsActions.setJointNumberOfContactMethods(mobileNumberCount + emailCount + homePhoneCount + workPhoneCount))
  }, [contactdetails])

  useEffect(() => {
    if (numberOfContactMethods >= 2 && !errors.emailAddress && !errors.homePhone && !errors.mobileNumber && !errors.workPhone) {
      dispatch(contactDetailsActions.setJointIsValidYourContactDetails(true))
      return
    }
    if (numberOfContactMethods >= 2 && (errors.emailAddress || errors.homePhone || errors.mobileNumber || errors.workPhone)) {
      dispatch(contactDetailsActions.setJointIsValidYourContactDetails(false))
      return
    }
    if (numberOfContactMethods < 2) {
      dispatch(contactDetailsActions.setJointIsValidYourContactDetails(false))
      return
    }
  }, [numberOfContactMethods, isValid, onSubmitYourContactDetails])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [])

  // useEffect(() => {
  //   if (onSubmitYourContactDetails != null) {
  //     handleSubmit(onSubmit())()
  //     return
  //   }
  // }, [onSubmitYourContactDetails])

  const handleEmailAddress = (event) => {
    dispatch(contactDetailsActions.setJointEmailAddress(event.target.value))
  }
  const handleMobileNumber = (event) => {
    dispatch(contactDetailsActions.setJointMobileNumber(event.target.value))
  }
  const handleHomePhone = (event) => {
    dispatch(contactDetailsActions.setJointHomePhone(event.target.value))
  }
  const handleWorkPhone = (event) => {
    dispatch(contactDetailsActions.setJointWorkPhone(event.target.value))
  }

  return (
    <>
      <Form>
        <Stack direction='column' spacing={3} justifyContent='flex-start'>
          <Box sx={{ py: 2 }}>
            <AnimatePresence exitBeforeEnter>
              {numberOfContactMethods < 2 && onSubmitYourContactDetails === null && (
                <motion.div {...varFlipAlert}>
                  <Stack direction='row' justifyContent='center'>
                    <Alert severity='info' sx={{ borderRadius: 49 }}>
                      <Typography variant='body2'>
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
              {numberOfContactMethods >= 2 && (onSubmitYourContactDetails !== null || onSubmitYourContactDetails === null) && !isValidYourContactDetails && (
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
                      <Typography variant='body2'>Contact details are valid</Typography>
                    </Alert>
                  </Stack>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
          <InputField name='emailAddress' label='Email address' type='email' control={control} errorInput={!!errors.emailAddress} onInputChange={handleEmailAddress} hasTooltip={false} hasStartAdornment={true} StartAdornmentIcon={<AlternateEmailIcon color='secondary' />} placeholder='Email Address' />
          <PhoneNumber name='mobileNumber' type='tel' label='Mobile Number' control={control} onNumberChange={handleMobileNumber} errorInput={!!errors.mobileNumber} hasTooltip={false} toolTipText='Mobile number format: +64 21 123 4567' hasStartAdornment={true} StartAdornmentIcon={<SmartphoneRoundedIcon color='secondary' />} placeholder='Mobile Number' />
          <PhoneNumber name='homePhone' type='tel' label='Home Phone Number' control={control} onNumberChange={handleHomePhone} errorInput={!!errors.homePhone} hasTooltip={false} toolTipText='Home Phone number format: +64 7 123 4567' hasStartAdornment={true} StartAdornmentIcon={<LocalPhoneRoundedIcon color='secondary' />} placeholder='Home Phone Number' />
          <PhoneNumber name='workPhone' type='tel' label='Work Phone Number' control={control} onNumberChange={handleWorkPhone} errorInput={!!errors.workPhone} hasTooltip={false} toolTipText=' Work Phone number format: +64 7 123 4567' hasStartAdornment={true} StartAdornmentIcon={<BusinessCenterRoundedIcon color='secondary' />} placeholder='Work Phone Number' />
        </Stack>
      </Form>
    </>
  )
}

export default YourContactDetails
