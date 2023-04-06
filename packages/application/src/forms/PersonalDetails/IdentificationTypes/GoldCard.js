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

function GoldCard() {
  const secureSessionID = useSelector((state) => state.globalReducer.secureSessionID)

  // Selected Identifications
  const checkedIdentificationTypes = useSelector((state) => state.identificationReducer.checkedIdentificationTypes)

  const goldCardNo = useSelector((state) => state.identificationReducer.identificationTypes.gold_card.data.goldCardNo)
  const goldCardValidFromDate = useSelector((state) => state.identificationReducer.identificationTypes.gold_card.data.goldCardValidFromDate)
  const defGoldCardValidFromDate = useSelector((state) => state.identificationReducer.identificationTypes.gold_card.data.defGoldCardValidFromDate)
  const goldCardPhotoUrl = useSelector((state) => state.identificationReducer.identificationTypes.gold_card.data.goldCardPhotoUrl)

  const onSubmitGoldCardDetails = useSelector((state) => state.identificationReducer.onSubmitGoldCardDetails)

  const schema = yup.object().shape({
    goldCardNo: yup.string().required('Card Number is required'),
    goldCardValidFromDate: yup
      .string()
      .test('cannot be lower than 1900', 'Invalid Date. Date Format: DD/MM/YYYY', function (dob) {
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

    dispatch(identificationActions.setIsValidGoldCardDetails(isValid))

    if (isValid) {
      dispatch(identificationActions.setIsValidGoldCardCounter(1))
      if (secureSessionID) dispatch(identificationActions.setisValidSovGoldCard(true))
    } else {
      dispatch(identificationActions.setIsValidGoldCardCounter(0))
      if (secureSessionID) dispatch(identificationActions.setisValidSovGoldCard(false))
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

    dispatch(identificationActions.setGoldCardNo(''))
    dispatch(identificationActions.setGoldCardValidFromDate(null))

    dispatch(identificationActions.setOnSubmitGoldCardDetails(null))
    dispatch(identificationActions.setIsValidGoldCardCounter(0))
  }, [checkedIdentificationTypes])

  function onSubmit() {
    console.log('Submitted')
  }

  const dispatch = useDispatch()

  const handleGoldCardNo = (event) => {
    dispatch(identificationActions.setGoldCardNo(event.target.value))
  }
  const handleGoldCardVaildFromDate = (date) => {
    dispatch(identificationActions.setGoldCardValidFromDate(date))
  }
  const handleGoldCardPhotoUrl = (file, preview) => {
    dispatch(identificationActions.setGoldCardPhotoUrl({ file, preview }))
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
        <InputField name='goldCardNo' label='Card Number' type='number' control={control} errorInput={!!errors.goldCardNo} helperTextInput={errors?.goldCardNo?.message} onInputChange={handleGoldCardNo} hasTooltip={false} placeholder='Card Number' />
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

export default GoldCard
