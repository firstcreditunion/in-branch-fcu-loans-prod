import React, { useEffect } from 'react'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'

import { useDispatch, useSelector } from 'react-redux'
import { identificationActions } from '../../../redux/slices/identificationSlice'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import Stack from '@mui/material/Stack'

import Form from '../../../components/Form'
import InputField from '../../../components/rhf-components/Input'
import DatePicker from '../../../components/rhf-components/DatePicker'

import { UploadPhoto } from '../../../components/upload'
import { fData } from '../../../utils/formatNumber'

const driversLicenceNoLength = 8

function Passport() {
  const secureSessionID = useSelector((state) => state.globalReducer.secureSessionID)

  // Selected Identifications
  const checkedIdentificationTypes = useSelector((state) => state.identificationReducer.checkedIdentificationTypes)

  const passportNo = useSelector((state) => state.identificationReducer.identificationTypes.passport.data.passportNo)
  const passportIssueDate = useSelector((state) => state.identificationReducer.identificationTypes.passport.data.passportIssueDate)
  const defPassportIssueDate = useSelector((state) => state.identificationReducer.identificationTypes.passport.data.defPassportIssueDate)
  const passportExpiryDate = useSelector((state) => state.identificationReducer.identificationTypes.passport.data.passportExpiryDate)
  const defPassportExpiryDate = useSelector((state) => state.identificationReducer.identificationTypes.passport.data.defPassportExpiryDate)
  const passportPhotoUrl = useSelector((state) => state.identificationReducer.identificationTypes.passport.data.passportPhotoUrl)

  const onSubmitPassportDetails = useSelector((state) => state.identificationReducer.onSubmitPassportDetails)

  const issueDateLowerLimit = new Date(new Date().setFullYear(new Date().getFullYear() - 10))
  const issueDateUpperLimit = new Date()
  const issueYearLowerLimit = new Date(new Date().setFullYear(new Date().getFullYear() - 10)).getFullYear()

  const expiryDateUpperLimit = passportIssueDate ? new Date(new Date(passportIssueDate).setFullYear(new Date(passportIssueDate).getFullYear() + 10)) : new Date(new Date().setFullYear(new Date().getFullYear() + 10))
  const expiryYearUpperLimit = passportIssueDate ? new Date(new Date(passportIssueDate).setFullYear(new Date(passportIssueDate).getFullYear() + 10)).getFullYear() : new Date(new Date().setFullYear(new Date().getFullYear() + 10)).getFullYear()
  const expiryDateLowerLimit = new Date()
  const schema = yup.object().shape({
    passportNo: yup
      .string()
      .required('Passport Number is required')
      .matches(/^([A-Z]{2}\d{6})$/, 'Invalid Passport Number'),
    passportIssueDate: yup
      .string()
      .required('Issued Date is required')
      .test('Format Check', 'Invalid Date. Date Format: DD/MM/YYYY', function (date) {
        if (date === 'Invalid Date') {
          return false
        }

        return true
      })
      .test('Lower Limit', `Passport must be issued on or after ${issueYearLowerLimit}`, function (date) {
        if (date === 'Invalid Date') {
          return false
        }
        const lowerLimitTest = new Date(date).getFullYear() < issueYearLowerLimit
        if (lowerLimitTest) {
          return false
        }

        return true
      })
      .test('Upper Limit', `Passport must have been issued on or before today`, function (date) {
        if (date === 'Invalid Date') {
          return false
        }
        const upperLimitTest = new Date(date) > issueDateUpperLimit

        if (upperLimitTest) {
          return false
        }

        return true
      })
      .nullable(),
    passportExpiryDate: yup
      .string()
      .required('Expiry Date is required')
      .test('Format Check', 'Invalid Date. Date Format: DD/MM/YYYY', function (date) {
        if (date === 'Invalid Date') {
          return false
        }

        return true
      })
      .test('Upper Limit', `Passport cannot be valid for more than 10 years`, function (date) {
        if (date === 'Invalid Date') {
          return false
        }
        const upperLimitTest = new Date(date).getFullYear() > expiryYearUpperLimit
        if (upperLimitTest) {
          return false
        }

        return true
      })
      .test('Upper limit Integrity', `Expiry Date cannot be less than issued date`, function (date) {
        if (date === 'Invalid Date') {
          return false
        }
        if (new Date(date) < new Date(passportIssueDate)) {
          return false
        }

        return true
      })
      .test('Lower Limit', `Expiry date must be after today's date`, function (date) {
        if (date === 'Invalid Date') {
          return false
        }
        const lowerLimitTest = new Date(date) < expiryDateLowerLimit
        if (lowerLimitTest) {
          return false
        }

        return true
      })
      .nullable(),
  })

  const {
    formState: { errors, isValid },
    control,
    unregister,
    clearErrors,
    handleSubmit,
  } = useForm({
    defaultValues: {
      passportNo: passportNo,
      passportIssueDate: passportIssueDate,
      passportExpiryDate: passportExpiryDate,
      passportPhotoUrl: passportPhotoUrl,
    },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (onSubmitPassportDetails === null && !checkedIdentificationTypes.includes('PASPRT')) return
    dispatch(identificationActions.setIsValidPassportDetails(isValid))

    if (isValid) {
      dispatch(identificationActions.setIsValidPassportCounter(1))
      if (secureSessionID) dispatch(identificationActions.setisValidSovPassport(true))
    } else {
      dispatch(identificationActions.setIsValidPassportCounter(0))
      if (secureSessionID) dispatch(identificationActions.setisValidSovPassport(false))
    }
  }, [isValid])

  useEffect(() => {
    if (onSubmitPassportDetails != null) {
      handleSubmit(onSubmit())()
    }
  }, [onSubmitPassportDetails])

  useEffect(() => {
    if (checkedIdentificationTypes.includes('PASPRT')) {
      return
    }

    // Unregister and clear errors if ID is not selected
    clearErrors('passportNo')
    clearErrors('passportIssueDate')
    clearErrors('passportExpiryDate')

    unregister('passportNo')
    unregister('passportIssueDate')
    unregister('passportExpiryDate')

    dispatch(identificationActions.setPassportNo(''))
    dispatch(identificationActions.setPassportIssueDate(null))
    dispatch(identificationActions.setPassportExpiryDate(null))

    dispatch(identificationActions.setOnSubmitPassportDetails(null))
    dispatch(identificationActions.setIsValidPassportCounter(0))
  }, [checkedIdentificationTypes])

  function onSubmit() {
    console.log('Submitted')
  }

  const dispatch = useDispatch()

  const handlePassportNo = (event) => {
    dispatch(identificationActions.setPassportNo(event.target.value.toUpperCase()))
  }
  const handlePassportIssueDate = (date) => {
    dispatch(identificationActions.setPassportIssueDate(date))
  }
  const handlePassportExpiryDate = (date) => {
    dispatch(identificationActions.setPassportExpiryDate(date))
  }
  const handlePassportPhotoUrl = (file, preview) => {
    dispatch(identificationActions.setPassportPhotoUrl({ file, preview }))
  }

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0]
      if (file) {
        handlePassportPhotoUrl(file, URL.createObjectURL(file))
      }
    },
    [handlePassportPhotoUrl]
  )

  return (
    <Form>
      <Stack direction='column' spacing={3} justifyContent='flex-start' sx={{ pb: 5 }}>
        <InputField name='passportNo' label='Passport Number' type='text' control={control} capitalise={true} errorInput={!!errors.passportNo} helperTextInput={errors?.passportNo?.message} onInputChange={handlePassportNo} hasTooltip={false} placeholder='Passport Number' />
        <DatePicker id='passportIssueDate' name='passportIssueDate' onDateChange={handlePassportIssueDate} label='Issued Date' control={control} variant='outlined' openTo='year' format='DD/MM/YYYY' date={passportIssueDate} maxDate={defPassportIssueDate} minDate={issueDateLowerLimit} isRequired={true} />
        <DatePicker id='passportExpiryDate' name='passportExpiryDate' onDateChange={handlePassportExpiryDate} label='Expiry Date' control={control} variant='outlined' openTo='year' format='DD/MM/YYYY' date={passportExpiryDate} maxDate={expiryDateUpperLimit} minDate={defPassportExpiryDate} isRequired={true} />
        {/* <Box sx={{ mb: 5 }}>
          <UploadPhoto
            accept='image/*'
            file={drLicencePhotoUrl}
            maxSize={3145728}
            onDrop={handleDrop}
            error={false}
            caption={
              <Typography
                variant='caption'
                sx={{
                  mt: 2,
                  mx: 'auto',
                  display: 'block',
                  textAlign: 'center',
                  color: 'text.secondary',
                }}
              >
                Allowed *.jpeg, *.jpg, *.png, *.gif
                <br /> max size of {fData(3145728)}
              </Typography>
            }
          />
        </Box> */}
      </Stack>
    </Form>
  )
}

export default Passport
