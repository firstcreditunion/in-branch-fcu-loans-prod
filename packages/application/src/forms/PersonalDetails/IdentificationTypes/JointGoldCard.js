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
  goldCardNo: yup
    .string()
    .required('Card Number is required')
    .test('Format Check', 'Invalid format. Please remove spaces', function (number) {
      if (number.indexOf(' ') >= 0) {
        return false
      }

      return true
    })
    .matches(/^([a-zA-Z0-9]{1,32})$/, 'Remove any spaces or special characters'),
  goldCardValidFromDate: yup
    .string()
    .test('cannot be lower than 1900', 'Invalid Date of Birth. Date Format: DD/MM/YYYY', function (dob) {
      if (dob === 'Invalid Date') {
        return false
      }

      return true
    })
    .test('cannot be lower than 1900', 'Date must be after 1900', function (date) {
      if (date === 'Invalid Date') {
        return false
      }
      if (new Date(date).getFullYear() < 1900) {
        return false
      }

      return true
    })
    .nullable(),
})
function JointGoldCard() {
  const goldCardNo = useSelector((state) => state.identificationReducer.identificationTypes.gold_card.jointdata.goldCardNo)
  const goldCardValidFromDate = useSelector((state) => state.identificationReducer.identificationTypes.gold_card.jointdata.goldCardValidFromDate)
  const defGoldCardValidFromDate = useSelector((state) => state.identificationReducer.identificationTypes.gold_card.jointdata.defGoldCardValidFromDate)
  const goldCardPhotoUrl = useSelector((state) => state.identificationReducer.identificationTypes.gold_card.jointdata.goldCardPhotoUrl)
  const checkedIdentificationTypes = useSelector((state) => state.identificationReducer.checkedJointIdentificationTypes)
  const onSubmitGoldCardDetails = useSelector((state) => state.identificationReducer.jointonSubmitGoldCardDetails)

  const {
    formState: { errors, isValid },
    control,
    unregister,
    clearErrors,
    handleSubmit,
  } = useForm({
    defaultValues: {
      goldCardNo: goldCardNo,
      goldCardValidFromDate: goldCardValidFromDate,
      goldCardPhotoUrl: goldCardPhotoUrl,
    },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (onSubmitGoldCardDetails === null && !checkedIdentificationTypes.includes('GOLDCARD')) return
    dispatch(identificationActions.setIsValidJointGoldCardDetails(isValid))

    if (isValid) {
      dispatch(identificationActions.setIsValidJointGoldCardCounter(1))
    } else {
      dispatch(identificationActions.setIsValidJointGoldCardCounter(0))
    }
  }, [isValid])

  useEffect(() => {
    if (onSubmitGoldCardDetails != null) {
      handleSubmit(onSubmit())()
    }
  }, [onSubmitGoldCardDetails])

  useEffect(() => {
    if (checkedIdentificationTypes.includes('GOLDCARD')) {
      return
    }

    // Unregister and clear errors if ID is not selected
    clearErrors('goldCardNo')
    clearErrors('goldCardValidFromDate')

    unregister('goldCardNo')
    unregister('goldCardValidFromDate')

    dispatch(identificationActions.setJointGoldCardNo(''))
    dispatch(identificationActions.setJointGoldCardValidFromDate(null))

    dispatch(identificationActions.setOnSubmitJointGoldCardDetails(null))
    dispatch(identificationActions.setIsValidJointGoldCardCounter(0))
  }, [checkedIdentificationTypes])

  function onSubmit() {
    console.log('Submitted')
  }

  const dispatch = useDispatch()

  const handleGoldCardNo = (event) => {
    dispatch(identificationActions.setJointGoldCardNo(event.target.value))
  }
  const handleGoldCardVaildFromDate = (date) => {
    dispatch(identificationActions.setJointGoldCardValidFromDate(date))
  }
  const handleGoldCardPhotoUrl = (file, preview) => {
    dispatch(identificationActions.setJointGoldCardPhotoUrl({ file, preview }))
  }

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0]
      if (file) {
        handleGoldCardPhotoUrl(file, URL.createObjectURL(file))
      }
    },
    [handleGoldCardPhotoUrl]
  )

  return (
    <Form>
      <Stack direction='column' spacing={3} justifyContent='flex-start' sx={{ pb: 5 }}>
        <InputField name='goldCardNo' label='Card Number' type='number' control={control} errorInput={!!errors.goldCardNo} helperTextInput={errors?.goldCardNo?.message} onInputChange={handleGoldCardNo} hasTooltip={false} />
        <DatePicker id='goldCardValidFromDate' name='goldCardValidFromDate' onDateChange={handleGoldCardVaildFromDate} label='Valid From Date' control={control} variant='outlined' openTo='year' format='DD/MM/YYYY' date={goldCardValidFromDate} maxDate={defGoldCardValidFromDate} isRequired={true} />
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

export default JointGoldCard
