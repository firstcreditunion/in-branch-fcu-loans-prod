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

const schema = yup.object().shape({
  birthCertificateRegNo: yup.string().required('Registration Number is required'),
  datOfBirth: yup
    .string()
    .test('cannot be lower than 1900', 'Invalid Date of Birth. Date Format: DD/MM/YYYY', function (dob) {
      if (dob === 'Invalid Date') {
        return false
      }

      return true
    })
    .test('cannot be lower than 1900', 'Must be born after 1900', function (dob) {
      if (dob === 'Invalid Date') {
        return false
      }
      if (new Date(dob).getFullYear() < 1900) {
        return false
      }

      return true
    })
    .nullable(),
})

function JointBirthCertificate() {
  const birthCertificateRegNo = useSelector((state) => state.identificationReducer.identificationTypes.birth_certificate.jointdata.birthCertificateRegNo)
  const dob = useSelector((state) => state.yourPersonalDetailReducer.jointdob)
  const checkedIdentificationTypes = useSelector((state) => state.identificationReducer.checkedJointIdentificationTypes)

  // const birthCertificatePhotoUrl = useSelector((state) => state.identificationReducer.identificationTypes.birth_certificate.jointdata.birthCertificatePhotoUrl)

  const onSubmitBrithCertificateDetails = useSelector((state) => state.identificationReducer.jointonSubmitBrithCertificateDetails)

  const {
    formState: { errors, isValid },
    control,
    unregister,
    clearErrors,
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (onSubmitBrithCertificateDetails === null && !checkedIdentificationTypes.includes('BIRTHCERT')) return
    dispatch(identificationActions.setIsValidJointBrithCertificateDetails(isValid))
    if (isValid) {
      dispatch(identificationActions.setIsValidJointBirthCertificateCounter(1))
    } else {
      dispatch(identificationActions.setIsValidJointBirthCertificateCounter(0))
    }
  }, [isValid])

  useEffect(() => {
    if (onSubmitBrithCertificateDetails != null) {
      handleSubmit(onSubmit())()
    }
  }, [onSubmitBrithCertificateDetails])

  useEffect(() => {
    if (checkedIdentificationTypes.includes('BIRTHCERT')) {
      return
    }

    // Unregister and clear errors if ID is not selected
    clearErrors('birthCertificateRegNo')
    clearErrors('datOfBirth')

    unregister('birthCertificateRegNo')
    unregister('datOfBirth')

    dispatch(identificationActions.setJointBirthCertificateRegNo(''))
    dispatch(identificationActions.setJointDateOfBirth(null))

    dispatch(identificationActions.setOnSubmitJointBrithCertificateDetails(null))
    dispatch(identificationActions.setIsValidJointBirthCertificateCounter(0))
  }, [checkedIdentificationTypes])

  function onSubmit() {
    console.log('Submitted')
  }

  const dispatch = useDispatch()

  const handleBrithCertificateRegNo = (event) => {
    dispatch(identificationActions.setJointBirthCertificateRegNo(event.target.value))
  }
  const handleBrithCertificateDateofBirth = (date) => {
    dispatch(identificationActions.setJointDateOfBirth(date))
  }
  // const handleBrithCertificatePhotoUrl = (file, preview) => {
  //   dispatch(identificationActions.setJointBirthCertificatePhotoUrl({ file, preview }))
  // }

  // const handleDrop = useCallback(
  //   (acceptedFiles) => {
  //     const file = acceptedFiles[0]
  //     if (file) {
  //       handleBrithCertificatePhotoUrl(file, URL.createObjectURL(file))
  //     }
  //   },
  //   [handleBrithCertificatePhotoUrl]
  // )

  return (
    <Form>
      <Stack direction='column' spacing={3} justifyContent='flex-start' sx={{ pb: 5 }}>
        <InputField name='birthCertificateRegNo' label='Registration Number' type='text' control={control} errorInput={!!errors.birthCertificateRegNo} helperTextInput={errors?.birthCertificateRegNo?.message} onInputChange={handleBrithCertificateRegNo} hasTooltip={false} defaultValue={birthCertificateRegNo ? birthCertificateRegNo : ''} />
        <DatePicker id='datOfBirth' name='datOfBirth' onDateChange={handleBrithCertificateDateofBirth} label='Registration Date' control={control} variant='outlined' openTo='year' format='dd/MM/yyyy' date={dob} isRequired={true} />
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

export default JointBirthCertificate
