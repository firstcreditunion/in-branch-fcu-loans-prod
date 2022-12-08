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

function CommunityServiceCard() {
  const secureSessionID = useSelector((state) => state.globalReducer.secureSessionID)

  // Selected Identifications
  const checkedIdentificationTypes = useSelector((state) => state.identificationReducer.checkedIdentificationTypes)

  const commServiceCardNo = useSelector((state) => state.identificationReducer.identificationTypes.community_service_card.data.commServiceCardNo)
  const commServiceCardIssueDate = useSelector((state) => state.identificationReducer.identificationTypes.community_service_card.data.commServiceCardIssueDate)
  const defCommServiceCardIssueDate = useSelector((state) => state.identificationReducer.identificationTypes.community_service_card.data.defCommServiceCardIssueDate)
  const commServiceCardExpiryDate = useSelector((state) => state.identificationReducer.identificationTypes.community_service_card.data.commServiceCardExpiryDate)
  const defCommServiceCardExpiryDate = useSelector((state) => state.identificationReducer.identificationTypes.community_service_card.data.defCommServiceCardExpiryDate)
  const commServiceCardPhotoUrl = useSelector((state) => state.identificationReducer.identificationTypes.community_service_card.data.commServiceCardPhotoUrl)

  const onSubmitCommunityServiceCardDetails = useSelector((state) => state.identificationReducer.onSubmitCommunityServiceCardDetails)

  //If you're successful when you reapply for a Community Services Card, we'll send you a new 'combo card'.
  //The card will have the initials 'CSC' on the back.
  //The expiry date on the back of your card can range from one to three years, depending on your personal financial circumstances.

  //Source: https://www.workandincome.govt.nz/eligibility/seniors/community-services-card-and-supergold-card.html

  const issueDateLowerLimit = new Date(new Date().setFullYear(new Date().getFullYear() - 3))
  const issueDateUpperLimit = new Date()
  const issueYearLowerLimit = new Date(new Date().setFullYear(new Date().getFullYear() - 3)).getFullYear()
  const expiryDateUpperLimit = commServiceCardIssueDate ? new Date(new Date(commServiceCardIssueDate).setFullYear(new Date(commServiceCardIssueDate).getFullYear() + 3)) : new Date(new Date().setFullYear(new Date().getFullYear() + 3))
  const expiryYearUpperLimit = commServiceCardIssueDate ? new Date(new Date(commServiceCardIssueDate).setFullYear(new Date(commServiceCardIssueDate).getFullYear() + 3)).getFullYear() : new Date(new Date().setFullYear(new Date().getFullYear() + 3)).getFullYear()

  const schema = yup.object().shape({
    commServiceCardNo: yup.string().required('Community Service Card Number is required'),
    commServiceCardIssueDate: yup
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
    commServiceCardExpiryDate: yup
      .string()
      .required('Expiry Date is required')
      .test('Format Check', 'Invalid Date. Date Format: DD/MM/YYYY', function (date) {
        if (date === 'Invalid Date') {
          return false
        }

        return true
      })
      .test('Upper Limit', `Community Service Card is only valid for 3 years`, function (date) {
        if (date === 'Invalid Date') {
          return false
        }
        const upperLimitTest = new Date(date).getFullYear() > expiryYearUpperLimit
        if (upperLimitTest) {
          return false
        }

        return true
      })
      .test('Upper Limit', `Expiry Date cannot be less than issued date`, function (date) {
        if (date === 'Invalid Date') {
          return false
        }
        if (new Date(date) < new Date(commServiceCardIssueDate)) {
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
      commServiceCardNo: commServiceCardNo,
      commServiceCardIssueDate: commServiceCardIssueDate,
      commServiceCardExpiryDate: commServiceCardExpiryDate,
      commServiceCardPhotoUrl: commServiceCardPhotoUrl,
    },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (onSubmitCommunityServiceCardDetails === null && !checkedIdentificationTypes.includes('COMSERVCRD')) return

    dispatch(identificationActions.setIsValidCommunityServiceCardDetails(isValid))

    if (isValid) {
      dispatch(identificationActions.setIsValidCommunityServiceCardCounter(1))
      if (secureSessionID) dispatch(identificationActions.setisValidSovCommunityServiceCard(true))
    } else {
      dispatch(identificationActions.setIsValidCommunityServiceCardCounter(0))
      if (secureSessionID) dispatch(identificationActions.setisValidSovCommunityServiceCard(false))
    }
  }, [isValid])

  useEffect(() => {
    if (onSubmitCommunityServiceCardDetails != null) {
      handleSubmit(onSubmit())()
    }
  }, [onSubmitCommunityServiceCardDetails])

  useEffect(() => {
    if (checkedIdentificationTypes.includes('COMSERVCRD')) {
      return
    }

    // Unregister and clear errors if ID is not selected
    clearErrors('commServiceCardNo')
    clearErrors('commServiceCardIssueDate')
    clearErrors('commServiceCardExpiryDate')

    unregister('commServiceCardNo')
    unregister('commServiceCardIssueDate')
    unregister('commServiceCardExpiryDate')

    dispatch(identificationActions.setCommunityServiceCardNo(''))
    dispatch(identificationActions.setCommunityServiceCardIssueDate(null))
    dispatch(identificationActions.setCommunityServiceCardExpiryDate(null))

    dispatch(identificationActions.setOnSubmitCommunityServiceCardDetails(null))
    dispatch(identificationActions.setIsValidCommunityServiceCardCounter(0))
  }, [checkedIdentificationTypes])

  function onSubmit() {
    console.log('Submitted')
  }

  const dispatch = useDispatch()

  const handleCommunityServiceCardNo = (event) => {
    dispatch(identificationActions.setCommunityServiceCardNo(event.target.value))
  }
  const handleCommunityServiceCardIssueDate = (date) => {
    dispatch(identificationActions.setCommunityServiceCardIssueDate(date))
  }
  const handleCommunityServiceCardExpiryDate = (date) => {
    dispatch(identificationActions.setCommunityServiceCardExpiryDate(date))
  }
  const handleCommunityServiceCardPhotoUrl = (file, preview) => {
    dispatch(identificationActions.setCommunityServiceCardPhotoUrl({ file, preview }))
  }

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0]
      if (file) {
        handleCommunityServiceCardPhotoUrl(file, URL.createObjectURL(file))
      }
    },
    [handleCommunityServiceCardPhotoUrl]
  )

  return (
    <Form>
      <Stack direction='column' spacing={3} justifyContent='flex-start' sx={{ pb: 5 }}>
        <InputField name='commServiceCardNo' label='Card Number' type='text' control={control} errorInput={!!errors.commServiceCardNo} helperTextInput={errors?.commServiceCardNo?.message} onInputChange={handleCommunityServiceCardNo} hasTooltip={false} />
        <DatePicker id='commServiceCardIssueDate' name='commServiceCardIssueDate' onDateChange={handleCommunityServiceCardIssueDate} label='Issued Date' control={control} variant='outlined' openTo='year' format='dd/MM/yyyy' date={commServiceCardIssueDate} maxDate={defCommServiceCardIssueDate} minDate={issueDateLowerLimit} isRequired={true} />
        <DatePicker id='commServiceCardExpiryDate' name='commServiceCardExpiryDate' onDateChange={handleCommunityServiceCardExpiryDate} label='Expiry Date' control={control} variant='outlined' openTo='year' format='dd/MM/yyyy' date={commServiceCardExpiryDate} maxDate={expiryDateUpperLimit} minDate={defCommServiceCardExpiryDate} isRequired={true} />
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

export default CommunityServiceCard
