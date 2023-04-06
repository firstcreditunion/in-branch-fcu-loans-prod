import React, { useEffect } from 'react'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'

import { useDispatch, useSelector } from 'react-redux'
import { identificationActions } from '../../../redux/slices/identificationSlice'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Box, Stack, Grid, Button, Typography } from '@mui/material'

import Radio from '@mui/material/Radio'
import FormControlLabel from '@mui/material/FormControlLabel'

import Form from '../../../components/Form'
import InputField from '../../../components/rhf-components/Input'
import RadioGroups from '../../../components/rhf-components/RadioGroups'
import DatePicker from '../../../components/rhf-components/DatePicker'

import { UploadPhoto } from '../../../components/upload'
import { fData } from '../../../utils/formatNumber'

function KiwiAccessCard() {
  const secureSessionID = useSelector((state) => state.globalReducer.secureSessionID)

  // Selected Identifications
  const checkedIdentificationTypes = useSelector((state) => state.identificationReducer.checkedIdentificationTypes)

  const kiwiAccessCardNo = useSelector((state) => state.identificationReducer.identificationTypes.kiwi_access_card.data.kiwiAccessCardNo)
  const kiwiAccessCardIssueDate = useSelector((state) => state.identificationReducer.identificationTypes.kiwi_access_card.data.kiwiAccessCardIssueDate)
  const defKiwiAccessCardIssueDate = useSelector((state) => state.identificationReducer.identificationTypes.kiwi_access_card.data.defKiwiAccessCardIssueDate)
  const kiwiAccessCardExpiryDate = useSelector((state) => state.identificationReducer.identificationTypes.kiwi_access_card.data.kiwiAccessCardExpiryDate)
  const defKiwiAccessCardExpiryDate = useSelector((state) => state.identificationReducer.identificationTypes.kiwi_access_card.data.defKiwiAccessCardExpiryDate)
  const kiwiAccessCardPhotoUrl = useSelector((state) => state.identificationReducer.identificationTypes.kiwi_access_card.data.kiwiAccessCardPhotoUrl)

  const onSubmitKiwiAccessCardDetails = useSelector((state) => state.identificationReducer.onSubmitKiwiAccessCardDetails)

  const issueDateLowerLimit = new Date(new Date().setFullYear(new Date().getFullYear() - 10))
  const issueDateUpperLimit = new Date()
  const issueYearLowerLimit = new Date(new Date().setFullYear(new Date().getFullYear() - 10)).getFullYear()

  const expiryDateUpperLimit = kiwiAccessCardIssueDate ? new Date(new Date(kiwiAccessCardIssueDate).setFullYear(new Date(kiwiAccessCardIssueDate).getFullYear() + 10)) : new Date(new Date().setFullYear(new Date().getFullYear() + 10))
  const expiryYearUpperLimit = kiwiAccessCardIssueDate ? new Date(new Date(kiwiAccessCardIssueDate).setFullYear(new Date(kiwiAccessCardIssueDate).getFullYear() + 10)).getFullYear() : new Date(new Date().setFullYear(new Date().getFullYear() + 10)).getFullYear()

  const schema = yup.object().shape({
    kiwiAccessCardNo: yup
      .string()
      .required('Kiwi Access Card Number is required')
      .matches(/^([a-zA-Z0-9]{1,32})$/, 'Invalid Card number'),
    kiwiAccessCardIssueDate: yup
      .string()
      .required('Issued Date is required')
      .test('Format Check', 'Invalid Date. Date Format: DD/MM/YYYY', function (date) {
        if (date === 'Invalid Date') {
          return false
        }

        return true
      })
      .test('Lower Limit', `Card must be issued on or after ${issueYearLowerLimit}`, function (date) {
        if (date === 'Invalid Date') {
          return false
        }
        const lowerLimitTest = new Date(date).getFullYear() < issueYearLowerLimit
        if (lowerLimitTest) {
          return false
        }

        return true
      })
      .test('Upper Limit', `Card must have been issued on or before today`, function (date) {
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
    kiwiAccessCardExpiryDate: yup
      .string()
      .required('Expiry Date is required')
      .test('Format Check', 'Invalid Date. Date Format: DD/MM/YYYY', function (date) {
        if (date === 'Invalid Date') {
          return false
        }

        return true
      })
      .test('Upper Limit', `Card cannot be valid for more than 10 years`, function (date) {
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
        if (new Date(date) < new Date(kiwiAccessCardIssueDate)) {
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
      kiwiAccessCardNo: kiwiAccessCardNo,
      kiwiAccessCardIssueDate: kiwiAccessCardIssueDate,
      kiwiAccessCardExpiryDate: kiwiAccessCardExpiryDate,
      kiwiAccessCardPhotoUrl: kiwiAccessCardPhotoUrl,
    },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (onSubmitKiwiAccessCardDetails === null && !checkedIdentificationTypes.includes('KIWACCCRD')) return
    dispatch(identificationActions.setIsValidKiwiAccessCardDetails(isValid))

    if (isValid) {
      dispatch(identificationActions.setIsValidKiwiAccessCardCounter(1))
      if (secureSessionID) dispatch(identificationActions.setisValidSovKiwiAccessCard(true))
    } else {
      dispatch(identificationActions.setIsValidKiwiAccessCardCounter(0))
      if (secureSessionID) dispatch(identificationActions.setisValidSovKiwiAccessCard(false))
    }
  }, [isValid])

  useEffect(() => {
    if (onSubmitKiwiAccessCardDetails != null) {
      handleSubmit(onSubmit())()
    }
  }, [onSubmitKiwiAccessCardDetails])

  useEffect(() => {
    if (checkedIdentificationTypes.includes('KIWACCCRD')) {
      return
    }

    // Unregister and clear errors if ID is not selected
    clearErrors('kiwiAccessCardNo')
    clearErrors('kiwiAccessCardIssueDate')
    clearErrors('kiwiAccessCardExpiryDate')

    unregister('kiwiAccessCardNo')
    unregister('kiwiAccessCardIssueDate')
    unregister('kiwiAccessCardExpiryDate')

    dispatch(identificationActions.setKiwiAccessCardNo(''))
    dispatch(identificationActions.setKiwiAccessCardIssueDate(null))
    dispatch(identificationActions.setKiwiAccessCardExpiryDate(null))

    dispatch(identificationActions.setOnSubmitKiwiAccessCardDetails(null))
    dispatch(identificationActions.setIsValidKiwiAccessCardCounter(0))
  }, [checkedIdentificationTypes])

  function onSubmit() {
    console.log('Submitted')
  }

  const dispatch = useDispatch()

  const handleKiwiAccessCardNo = (event) => {
    dispatch(identificationActions.setKiwiAccessCardNo(event.target.value))
  }
  const handleKiwiAccessCardIssueDate = (date) => {
    dispatch(identificationActions.setKiwiAccessCardIssueDate(date))
  }
  const handleKiwiAccessCardExpiryDate = (date) => {
    dispatch(identificationActions.setKiwiAccessCardExpiryDate(date))
  }
  const handleKiwiAccessCardPhotoUrl = (file, preview) => {
    dispatch(identificationActions.setKiwiAccessCardPhotoUrl({ file, preview }))
  }

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0]
      if (file) {
        handleKiwiAccessCardPhotoUrl(file, URL.createObjectURL(file))
      }
    },
    [handleKiwiAccessCardPhotoUrl]
  )

  return (
    <Form>
      <Stack direction='column' spacing={3} justifyContent='flex-start' sx={{ pb: 5 }}>
        <InputField name='kiwiAccessCardNo' label='Card Number' type='text' control={control} errorInput={!!errors.kiwiAccessCardNo} helperTextInput={errors?.kiwiAccessCardNo?.message} onInputChange={handleKiwiAccessCardNo} hasTooltip={false} placeholder='Card Number' />
        <DatePicker id='kiwiAccessCardIssueDate' name='kiwiAccessCardIssueDate' onDateChange={handleKiwiAccessCardIssueDate} label='Issued Date' control={control} variant='outlined' openTo='year' format='DD/MM/YYYY' date={kiwiAccessCardIssueDate} maxDate={defKiwiAccessCardIssueDate} minDate={issueDateLowerLimit} isRequired={true} />
        <DatePicker id='kiwiAccessCardExpiryDate' name='kiwiAccessCardExpiryDate' onDateChange={handleKiwiAccessCardExpiryDate} label='Expiry Date' control={control} variant='outlined' openTo='year' format='DD/MM/YYYY' date={kiwiAccessCardExpiryDate} maxDate={expiryDateUpperLimit} minDate={defKiwiAccessCardExpiryDate} isRequired={true} />
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

export default KiwiAccessCard
