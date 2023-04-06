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

const driversLicenceNoLength = 8

function JointFiramsLicence() {
  const firearmsLicenceNo = useSelector((state) => state.identificationReducer.identificationTypes.firearms_licence.jointdata.firearmsLicenceNo)
  const firearmsLicenceIssueDate = useSelector((state) => state.identificationReducer.identificationTypes.firearms_licence.jointdata.firearmsLicenceIssueDate)
  const defFirearmsLicenceIssueDate = useSelector((state) => state.identificationReducer.identificationTypes.firearms_licence.jointdata.defFirearmsLicenceIssueDate)
  const firearmsLicenceExpiryDate = useSelector((state) => state.identificationReducer.identificationTypes.firearms_licence.jointdata.firearmsLicenceExpiryDate)
  const defFirearmsLicenceExpiryDate = useSelector((state) => state.identificationReducer.identificationTypes.firearms_licence.jointdata.defFirearmsLicenceExpiryDate)
  const firearmsLicencePhotoUrl = useSelector((state) => state.identificationReducer.identificationTypes.firearms_licence.jointdata.firearmsLicencePhotoUrl)
  const checkedIdentificationTypes = useSelector((state) => state.identificationReducer.checkedJointIdentificationTypes)
  const onSubmitFirearmsLicenceDetails = useSelector((state) => state.identificationReducer.jointonSubmitFirearmsLicenceDetails)

  const issueDateLowerLimit = new Date(new Date().setFullYear(new Date().getFullYear() - 10))
  const issueDateUpperLimit = new Date()
  const issueYearLowerLimit = new Date(new Date().setFullYear(new Date().getFullYear() - 10)).getFullYear()

  const expiryDateUpperLimit = firearmsLicenceIssueDate ? new Date(new Date(firearmsLicenceIssueDate).setFullYear(new Date(firearmsLicenceIssueDate).getFullYear() + 10)) : new Date(new Date().setFullYear(new Date().getFullYear() + 10))
  const expiryYearUpperLimit = firearmsLicenceIssueDate ? new Date(new Date(firearmsLicenceIssueDate).setFullYear(new Date(firearmsLicenceIssueDate).getFullYear() + 10)).getFullYear() : new Date(new Date().setFullYear(new Date().getFullYear() + 10)).getFullYear()

  const schema = yup.object().shape({
    firearmsLicenceNo: yup.string().required('Firearms Licence Number is required'),
    firearmsLicenceIssueDate: yup
      .string()
      .required('Issued Date is required')
      .test('Format Check', 'Invalid Date. Date Format: DD/MM/YYYY', function (date) {
        if (date === 'Invalid Date') {
          return false
        }

        return true
      })
      .test('Lower Limit', `Licence must be issued on or after ${issueYearLowerLimit}`, function (date) {
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
    firearmsLicenceExpiryDate: yup
      .string()
      .required('Expiry Date is required')
      .test('Format Check', 'Invalid Date. Date Format: DD/MM/YYYY', function (date) {
        if (date === 'Invalid Date') {
          return false
        }

        return true
      })
      .test('Upper Limit', `Licence cannot be valid for more than 10 years`, function (date) {
        if (date === 'Invalid Date') {
          return false
        }
        const upperLimitTest = new Date(date).getFullYear() > expiryYearUpperLimit
        if (upperLimitTest) {
          return false
        }

        return true
      })
      .test('Upper Limit Integrity', `Expiry Date cannot be less than issued date`, function (date) {
        if (date === 'Invalid Date') {
          return false
        }
        if (new Date(date) < new Date(firearmsLicenceIssueDate)) {
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
      firearmsLicenceNo: firearmsLicenceNo,
      firearmsLicenceIssueDate: firearmsLicenceIssueDate,
      firearmsLicenceExpiryDate: firearmsLicenceExpiryDate,
      firearmsLicencePhotoUrl: firearmsLicencePhotoUrl,
    },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (onSubmitFirearmsLicenceDetails === null && !checkedIdentificationTypes.includes('FIRELICENS')) return
    dispatch(identificationActions.setIsValidJointFirearmsLicenceDetails(isValid))

    if (isValid) {
      dispatch(identificationActions.setIsValidJointFirearmsLicenceCounter(1))
    } else {
      dispatch(identificationActions.setIsValidJointFirearmsLicenceCounter(0))
    }
  }, [isValid])

  useEffect(() => {
    if (onSubmitFirearmsLicenceDetails != null) {
      handleSubmit(onSubmit())()
    }
  }, [onSubmitFirearmsLicenceDetails])

  useEffect(() => {
    if (checkedIdentificationTypes.includes('FIRELICENS')) {
      return
    }

    // Unregister and clear errors if ID is not selected
    clearErrors('firearmsLicenceNo')
    clearErrors('firearmsLicenceIssueDate')
    clearErrors('firearmsLicenceExpiryDate')

    unregister('firearmsLicenceNo')
    unregister('firearmsLicenceIssueDate')
    unregister('firearmsLicenceExpiryDate')

    dispatch(identificationActions.setJointFirearmsLicenceNo(''))
    dispatch(identificationActions.setJointFirearmsLicenceIssueDate(null))
    dispatch(identificationActions.setJointFirearmsLicenceExpiryDate(null))

    dispatch(identificationActions.setOnSubmitJointFirearmsLicenceDetails(null))
    dispatch(identificationActions.setIsValidJointFirearmsLicenceCounter(0))
  }, [checkedIdentificationTypes])

  function onSubmit() {
    console.log('Submitted')
  }

  const dispatch = useDispatch()

  const handleFireamrsLicenceNo = (event) => {
    dispatch(identificationActions.setJointFirearmsLicenceNo(event.target.value))
  }
  const handleFireamrsLicenceIssueDate = (date) => {
    dispatch(identificationActions.setJointFirearmsLicenceIssueDate(date))
  }
  const handleFireamrsLicenceExpiryDate = (date) => {
    dispatch(identificationActions.setJointFirearmsLicenceExpiryDate(date))
  }
  const handleFireamrsLicencePhotoUrl = (file, preview) => {
    dispatch(identificationActions.setJointFirearmsLicencePhotoUrl({ file, preview }))
  }

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0]
      if (file) {
        handleFireamrsLicencePhotoUrl(file, URL.createObjectURL(file))
      }
    },
    [firearmsLicencePhotoUrl]
  )

  return (
    <Form>
      <Stack direction='column' spacing={3} justifyContent='flex-start' sx={{ pb: 5 }}>
        <InputField name='firearmsLicenceNo' label='Firearms Licence Number' type='text' control={control} errorInput={!!errors.firearmsLicenceNo} helperTextInput={errors?.firearmsLicenceNo?.message} onInputChange={handleFireamrsLicenceNo} hasTooltip={false} />
        <DatePicker id='firearmsLicenceIssueDate' name='firearmsLicenceIssueDate' onDateChange={handleFireamrsLicenceIssueDate} label='Issued Date' control={control} variant='outlined' openTo='year' format='DD/MM/YYYY' date={firearmsLicenceIssueDate} maxDate={defFirearmsLicenceIssueDate} minDate={issueDateLowerLimit} isRequired={true} />
        <DatePicker id='firearmsLicenceExpiryDate' name='firearmsLicenceExpiryDate' onDateChange={handleFireamrsLicenceExpiryDate} label='Expiry Date' control={control} variant='outlined' openTo='year' format='DD/MM/YYYY' date={firearmsLicenceExpiryDate} maxDate={expiryDateUpperLimit} minDate={defFirearmsLicenceExpiryDate} isRequired={true} />
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

export default JointFiramsLicence
