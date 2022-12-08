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

function JointDriverLicence() {
  const driversLicenceNo = useSelector((state) => state.identificationReducer.identificationTypes.drivers_licence.jointdata.driversLicenceNo)
  const driversLicenceVersion = useSelector((state) => state.identificationReducer.identificationTypes.drivers_licence.jointdata.driversLicenceVersion)
  const licenceType = useSelector((state) => state.identificationReducer.identificationTypes.drivers_licence.jointdata.licenceType)
  const drLicenceIssueDate = useSelector((state) => state.identificationReducer.identificationTypes.drivers_licence.jointdata.drLicenceIssueDate)
  const defDrLicenceIssueDate = useSelector((state) => state.identificationReducer.identificationTypes.drivers_licence.jointdata.defDrLicenceIssueDate)
  const drLicenceExpiryDate = useSelector((state) => state.identificationReducer.identificationTypes.drivers_licence.jointdata.drLicenceExpiryDate)
  const defDrLicenceExpiryDate = useSelector((state) => state.identificationReducer.identificationTypes.drivers_licence.jointdata.defDrLicenceExpiryDate)
  const drLicencePhotoUrl = useSelector((state) => state.identificationReducer.identificationTypes.drivers_licence.jointdata.drLicencePhotoUrl)
  const checkedIdentificationTypes = useSelector((state) => state.identificationReducer.checkedJointIdentificationTypes)
  const onSubmitDrLicenceDetails = useSelector((state) => state.identificationReducer.jointonSubmitDrLicenceDetails)

  const issueDateUpperLimit = new Date()

  const issueYearLowerLimit = new Date(new Date().setFullYear(new Date().getFullYear() - 10)).getFullYear()
  const expiryYearUpperLimit = drLicenceIssueDate ? new Date(new Date(drLicenceIssueDate).setFullYear(new Date(drLicenceIssueDate).getFullYear() + 10)).getFullYear() : new Date(new Date().setFullYear(new Date().getFullYear() + 10)).getFullYear()

  // *********************** 10 YEAR validation for DR Licence removed. Add to schema if FCU decides to use it *******************

  // Add to issue date

  // .test('Lower Limit', `Licence must be issued on or after ${issueYearLowerLimit}`, function (date) {
  //   if (date === 'Invalid Date') {
  //     return false
  //   }
  //   const lowerLimitTest = new Date(date).getFullYear() < issueYearLowerLimit
  //   if (lowerLimitTest) {
  //     return false
  //   }

  //   return true
  // })

  // Add to expiry date

  // .test('Upper Limit', `Licence cannot be valid for more than 10 years`, function (date) {
  //   if (date === 'Invalid Date') {
  //     return false
  //   }
  //   const upperLimitTest = new Date(date).getFullYear() > expiryYearUpperLimit
  //   if (upperLimitTest) {
  //     return false
  //   }

  //   return true
  // })

  const schema = yup.object().shape({
    driversLicenceNo: yup
      .string()
      .required('Drivers Licence is required')
      .matches(/^([a-zA-Z][a-zA-Z]\d\d\d\d\d\d*)$/, 'Invalid Drivers Licence')
      .length(driversLicenceNoLength, 'Invalid Drivers Licence'),
    driversLicenceVersion: yup
      .string()
      .required('Version is required')
      .matches(/^[0-9]*$/, 'Invalid Version Number'),
    licenceType: yup.string().required(),
    drLicenceIssueDate: yup
      .string()
      .required('Issued Date is required')
      .test('Format Check', 'Invalid Date. Date Format: DD/MM/YYYY', function (date) {
        if (date === 'Invalid Date') {
          return false
        }

        return true
      })
      .test('Upper Limit', `Licence must have been issued on or before today`, function (date) {
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
    drLicenceExpiryDate: yup
      .string()
      .required('Expiry Date is required')
      .test('Format Check', 'Invalid Date. Date Format: DD/MM/YYYY', function (date) {
        if (date === 'Invalid Date') {
          return false
        }

        return true
      })
      .test('Upper limit Integrity', `Expiry Date cannot be less than issued date`, function (date) {
        if (date === 'Invalid Date') {
          return false
        }
        if (new Date(date) < new Date(drLicenceIssueDate)) {
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
      driversLicenceNo: driversLicenceNo,
      driversLicenceVersion: driversLicenceVersion,
      licenceType: licenceType,
      drLicenceIssueDate: drLicenceIssueDate,
      drLicenceExpiryDate: drLicenceExpiryDate,
      drLicencePhotoUrl: drLicencePhotoUrl,
    },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (onSubmitDrLicenceDetails === null && !checkedIdentificationTypes.includes('DRVLSC')) return

    dispatch(identificationActions.setIsValidJointDrLicenceDetails(isValid))

    if (isValid) {
      dispatch(identificationActions.setIsValidJointDrLicenceCounter(1))
    } else {
      dispatch(identificationActions.setIsValidJointDrLicenceCounter(0))
    }
  }, [isValid])

  useEffect(() => {
    if (onSubmitDrLicenceDetails != null) {
      handleSubmit(onSubmit())()
    }
  }, [onSubmitDrLicenceDetails])

  useEffect(() => {
    if (checkedIdentificationTypes.includes('DRVLSC')) {
      return
    }

    // Unregister and clear errors if ID is not selected
    clearErrors('driversLicenceNo')
    clearErrors('driversLicenceVersion')
    clearErrors('licenceType')
    clearErrors('drLicenceIssueDate')
    clearErrors('drLicenceExpiryDate')

    unregister('driversLicenceNo')
    unregister('driversLicenceVersion')
    unregister('licenceType')
    unregister('drLicenceIssueDate')
    unregister('drLicenceExpiryDate')

    dispatch(identificationActions.setJointdriversLicenceNo(''))
    dispatch(identificationActions.setJointdriversLicenceVersion(''))
    dispatch(identificationActions.setJointdrlicenceType(''))
    dispatch(identificationActions.setJointdrLicenceIssueDate(null))
    dispatch(identificationActions.setJointdrLicenceExpiryDate(null))
    dispatch(identificationActions.setJointdrLicencePhotoUrl({}))

    dispatch(identificationActions.setOnSubmitJointDrLicenceDetails(null))
    dispatch(identificationActions.setIsValidJointDrLicenceCounter(0))
  }, [checkedIdentificationTypes])

  function onSubmit() {
    console.log('Submitted')
  }

  const dispatch = useDispatch()

  // Driver Licence data handlers
  const handleDriversLicenceNo = (event) => {
    dispatch(identificationActions.setJointdriversLicenceNo(event.target.value))
  }
  const handleDriversLicenceVersion = (event) => {
    dispatch(identificationActions.setJointdriversLicenceVersion(event.target.value))
  }
  const handleLicenceType = (event) => {
    dispatch(identificationActions.setJointdrlicenceType(event.target.value))
  }
  const handleDrLicenceIssueDate = (date) => {
    dispatch(identificationActions.setJointdrLicenceIssueDate(date))
  }
  const handleDrLicenceExpiryDate = (date) => {
    dispatch(identificationActions.setJointdrLicenceExpiryDate(date))
  }
  const handleDrLicencePhotoUrl = (file, preview) => {
    dispatch(identificationActions.setJointdrLicencePhotoUrl({ file, preview }))
  }

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0]
      if (file) {
        handleDrLicencePhotoUrl(file, URL.createObjectURL(file))
      }
    },
    [handleDrLicencePhotoUrl]
  )

  return (
    <Form>
      <Stack direction='column' spacing={3} justifyContent='flex-start' sx={{ pb: 5 }}>
        <RadioGroups id='licenceType' name='licenceType' onRadioChange={handleLicenceType} label='What type of drivers licence do you hold?' value={licenceType} control={control} variant='' defaultValue={licenceType || ''}>
          <FormControlLabel value='Learners' control={<Radio />} label='Learners' />
          <FormControlLabel value='Restricted' control={<Radio />} label='Restricted' />
          <FormControlLabel value='Full' control={<Radio />} label='Full' />
        </RadioGroups>
        <Grid container direction='row' justifyContent='flex-start' sx={{ m: 0, p: 0 }}>
          <Grid item sm={7} xs={7} sx={{ m: 0, pr: 1 }}>
            <InputField name='driversLicenceNo' label='Drivers Licence Number' type='text' control={control} errorInput={!!errors.driversLicenceNo} helperTextInput={errors?.driversLicenceNo?.message} onInputChange={handleDriversLicenceNo} hasTooltip={false} />
          </Grid>
          <Grid item sm={5} xs={5} sx={{ m: 0, p: 0 }}>
            <InputField name='driversLicenceVersion' label='Version' type='text' control={control} errorInput={!!errors.driversLicenceVersion} helperTextInput={errors?.driversLicenceVersion?.message} onInputChange={handleDriversLicenceVersion} hasTooltip={false} />
          </Grid>
        </Grid>
        <DatePicker id='drLicenceIssueDate' name='drLicenceIssueDate' onDateChange={handleDrLicenceIssueDate} label='Issued Date' control={control} variant='outlined' openTo='year' format='dd/MM/yyyy' date={drLicenceIssueDate} maxDate={defDrLicenceIssueDate} isRequired={true} />
        <DatePicker id='drLicenceExpiryDate' name='drLicenceExpiryDate' onDateChange={handleDrLicenceExpiryDate} label='Expiry Date' control={control} variant='outlined' openTo='year' format='dd/MM/yyyy' date={drLicenceExpiryDate} minDate={defDrLicenceExpiryDate} isRequired={true} />
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

export default JointDriverLicence
