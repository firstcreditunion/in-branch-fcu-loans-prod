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

function JointCurrentStudentId() {
  const currStudentIdNo = useSelector((state) => state.identificationReducer.identificationTypes.current_Student_id.jointdata.currStudentIdNo)
  const currStudentIdIssueDate = useSelector((state) => state.identificationReducer.identificationTypes.current_Student_id.jointdata.currStudentIdIssueDate)
  const defCurrStudentIdIssueDate = useSelector((state) => state.identificationReducer.identificationTypes.current_Student_id.jointdata.defCurrStudentIdIssueDate)
  const currStudentIdExpiryDate = useSelector((state) => state.identificationReducer.identificationTypes.current_Student_id.jointdata.currStudentIdExpiryDate)
  const defCurrStudentIdExpiryDate = useSelector((state) => state.identificationReducer.identificationTypes.current_Student_id.jointdata.defCurrStudentIdExpiryDate)
  const currStudentIdPhotoUrl = useSelector((state) => state.identificationReducer.identificationTypes.current_Student_id.jointdata.currStudentIdPhotoUrl)
  const checkedIdentificationTypes = useSelector((state) => state.identificationReducer.checkedJointIdentificationTypes)
  const onSubmitCurrStudentIDDetails = useSelector((state) => state.identificationReducer.jointonSubmitCurrStudentIDDetails)

  const issueDateLowerLimit = new Date(new Date().setFullYear(new Date().getFullYear() - 10))
  const issueDateUpperLimit = new Date()
  const issueYearLowerLimit = new Date(new Date().setFullYear(new Date().getFullYear() - 10)).getFullYear()
  const expiryDateUpperLimit = currStudentIdIssueDate ? new Date(new Date(currStudentIdIssueDate).setFullYear(new Date(currStudentIdIssueDate).getFullYear() + 10)) : new Date(new Date().setFullYear(new Date().getFullYear() + 10))
  const expiryYearUpperLimit = currStudentIdIssueDate ? new Date(new Date(currStudentIdIssueDate).setFullYear(new Date(currStudentIdIssueDate).getFullYear() + 10)).getFullYear() : new Date(new Date().setFullYear(new Date().getFullYear() + 10)).getFullYear()

  const schema = yup.object().shape({
    currStudentIdNo: yup.string().required('Identification number is required'),
    currStudentIdIssueDate: yup
      .string()
      .required('Issued Date is required')
      .test('Format Check', 'Invalid Date. Date Format: DD/MM/YYYY', function (date) {
        if (date === 'Invalid Date') {
          return false
        }

        return true
      })
      .test('Lower Limit', `ID must be issued on or after ${issueYearLowerLimit}`, function (date) {
        if (date === 'Invalid Date') {
          return false
        }
        const lowerLimitTest = new Date(date).getFullYear() < issueYearLowerLimit
        if (lowerLimitTest) {
          return false
        }

        return true
      })
      .test('Upper Limit', `ID must have been issued on or before today`, function (date) {
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
    currStudentIdExpiryDate: yup
      .string()
      .required('Expiry Date is required')
      .test('Format Check', 'Invalid Date. Date Format: DD/MM/YYYY', function (date) {
        if (date === 'Invalid Date') {
          return false
        }

        return true
      })
      .test('Upper Limit', `Expiry Date cannot be less than issued date`, function (date) {
        if (date === 'Invalid Date') {
          return false
        }
        if (new Date(date) < new Date(currStudentIdIssueDate)) {
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
      currStudentIdNo: currStudentIdNo,
      currStudentIdIssueDate: currStudentIdIssueDate,
      currStudentIdExpiryDate: currStudentIdExpiryDate,
      currStudentIdPhotoUrl: currStudentIdPhotoUrl,
    },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (onSubmitCurrStudentIDDetails === null && !checkedIdentificationTypes.includes('CURSTUDID')) return
    dispatch(identificationActions.setIsValidJointCurrStudentIDDetails(isValid))

    if (isValid) {
      dispatch(identificationActions.setIsValidJointCurrStudentIDCounter(1))
    } else {
      dispatch(identificationActions.setIsValidJointCurrStudentIDCounter(0))
    }
  }, [isValid])

  useEffect(() => {
    if (onSubmitCurrStudentIDDetails != null) {
      handleSubmit(onSubmit())()
    }
  }, [onSubmitCurrStudentIDDetails])

  useEffect(() => {
    if (checkedIdentificationTypes.includes('CURSTUDID')) {
      return
    }

    // Unregister and clear errors if ID is not selected
    clearErrors('currStudentIdNo')
    clearErrors('currStudentIdIssueDate')
    clearErrors('currStudentIdExpiryDate')

    unregister('currStudentIdNo')
    unregister('currStudentIdIssueDate')
    unregister('currStudentIdExpiryDate')

    dispatch(identificationActions.setJointCurrentStudentIdNo(''))
    dispatch(identificationActions.setJointCurrentStudentIdIssueDate(null))
    dispatch(identificationActions.setJointCurrentStudentIdExpiryDate(null))

    dispatch(identificationActions.setOnSubmitJointCurrStudentIDDetails(null))
    dispatch(identificationActions.setIsValidJointCurrStudentIDCounter(0))
  }, [checkedIdentificationTypes])

  function onSubmit() {
    console.log('Submitted')
  }

  const dispatch = useDispatch()

  const handleCurrentStudentIdNo = (event) => {
    dispatch(identificationActions.setJointCurrentStudentIdNo(event.target.value))
  }
  const handleCurrentStudentIdIssueDate = (date) => {
    dispatch(identificationActions.setJointCurrentStudentIdIssueDate(date))
  }
  const handleCurrentStudentIdExpiryDate = (date) => {
    dispatch(identificationActions.setJointCurrentStudentIdExpiryDate(date))
  }
  const handleCurrentStudentIdPhotoUrl = (file, preview) => {
    dispatch(identificationActions.setJointCurrentStudentIdPhotoUrl({ file, preview }))
  }

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0]
      if (file) {
        handleCurrentStudentIdPhotoUrl(file, URL.createObjectURL(file))
      }
    },
    [handleCurrentStudentIdPhotoUrl]
  )

  return (
    <Form>
      <Stack direction='column' spacing={3} justifyContent='flex-start' sx={{ pb: 5 }}>
        <InputField name='currStudentIdNo' label='Identification Number' type='text' control={control} errorInput={!!errors.currStudentIdNo} helperTextInput={errors?.currStudentIdNo?.message} onInputChange={handleCurrentStudentIdNo} hasTooltip={true} toolTipText='ID must be from a NZ institution' />
        <DatePicker id='currStudentIdIssueDate' name='currStudentIdIssueDate' onDateChange={handleCurrentStudentIdIssueDate} label='Issued Date' control={control} variant='outlined' openTo='year' format='dd/MM/yyyy' date={currStudentIdIssueDate} maxDate={defCurrStudentIdIssueDate} minDate={issueDateLowerLimit} isRequired={true} />
        <DatePicker id='currStudentIdExpiryDate' name='currStudentIdExpiryDate' onDateChange={handleCurrentStudentIdExpiryDate} label='Expiry Date' control={control} variant='outlined' openTo='year' format='dd/MM/yyyy' date={currStudentIdExpiryDate} maxDate={expiryDateUpperLimit} minDate={defCurrStudentIdExpiryDate} isRequired={true} />
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

export default JointCurrentStudentId
