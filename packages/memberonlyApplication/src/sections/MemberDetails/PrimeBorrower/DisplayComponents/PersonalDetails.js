import React, { useEffect } from 'react'
import { Chip, Divider, Stack, Typography } from '@mui/material'

import isEqual from 'date-fns/isEqual'
import { isDate } from 'date-fns'

import PropTypes from 'prop-types'

//* Redux
import { useDispatch, useSelector } from 'react-redux'
import { verifyPrimeDetailsActions } from '../../../../redux/slices/verifyPrimeDetailsSlice'

import PersonIcon from '@mui/icons-material/Person'
import ErrorIcon from '@mui/icons-material/Error'

//* RHF
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import FormProvider, { RHFCheckbox } from '../../../../components/RHF-mui-compoments'

//* Utils
import { fDate } from '../../../../utils/formatDateTime'
import { getGender_Key, getMaritalStatus_Key } from '../../../../redux/codes/getKeysOrValues'

import Loading from './Loading'
import NotFound from './NotFound'

const PersonalDetails = () => {
  const dispatch = useDispatch()

  const primePersonalDetailsVerified = useSelector((state) => state.loanDetailsReducer.primePersonalDetailsVerified)

  //* Loading States
  const primetitle = useSelector((state) => state.clientSearchReducer.primetitle)
  const primeforenames = useSelector((state) => state.clientSearchReducer.primeforenames)
  const primesurname = useSelector((state) => state.clientSearchReducer.primesurname)

  const primedateOfBirth = useSelector((state) => state.clientSearchReducer.primedateOfBirth)
  const primegender = useSelector((state) => state.clientSearchReducer.primegender)
  const primemaritalStatus = useSelector((state) => state.clientSearchReducer.primemaritalStatus)
  const primerecordStatus = useSelector((state) => state.clientSearchReducer.primerecordStatus)

  let isDateOfBirthInG3 = false
  let dateOfBirthInWords = ''

  if (!(primedateOfBirth == null) && primedateOfBirth != '') {
    isDateOfBirthInG3 = isDate(new Date(primedateOfBirth))
  }

  if (isDateOfBirthInG3) {
    dateOfBirthInWords = fDate(new Date(primedateOfBirth))
  }

  const isGenderUpdatedOnG3 = !(primegender == null) && primegender != ''
  const isMartialStatusUpdatedOnG3 = !(primemaritalStatus == null) && primemaritalStatus != ''

  console.log('isDateOfBirthInG3: ', isDateOfBirthInG3, !(primedateOfBirth == null), isDate(new Date(primedateOfBirth)))

  //* Member Details
  const primeClientNumber = useSelector((state) => state.clientSearchReducer.primeclientNumber)

  const defaultValues = {
    primePersonalDetailsVerified: primePersonalDetailsVerified,
  }

  // Schema
  const PersonalDetailsVerifySchema = Yup.object().shape({
    primePersonalDetailsVerified: Yup.boolean().required(),
  })

  //UseForm Methods from RHF
  const methods = useForm({
    resolver: yupResolver(PersonalDetailsVerifySchema),
    defaultValues,
  })

  // Destructure Methods
  const {
    watch,
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods

  const onSubmit = (event) => {
    console.log('On Submit Loan Details')
  }

  function setPrimePersonalDetailsVerified(event) {
    dispatch(verifyPrimeDetailsActions.setPrimePersonalDetailsVerified(event.target.checked))
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={2} sx={{ width: '100%' }}>
        <Divider flexItem>
          <Chip icon={<PersonIcon />} label='Personal' color='primary' sx={{ px: 1 }} />
        </Divider>
        <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={3} sx={{ width: '100%', py: 3 }}>
          <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={3} sx={{ width: '100%' }}>
            <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%', maxWidth: 800 }}>
              <Stack direction='column' justifyContent='center' alignItems='flex-start' sx={{ width: '100%' }}>
                <Typography variant='overline' color='text.secondary'>
                  Full Name
                </Typography>
                <Typography variant='subtitle1'>
                  {primetitle} {primeforenames} {primesurname}
                </Typography>
              </Stack>
              <Stack
                direction='column'
                justifyContent='center'
                alignItems='flex-start'
                sx={{
                  width: '100%',
                }}
              >
                <Typography variant='overline' color='text.secondary'>
                  Date of Birth
                </Typography>
                {isDateOfBirthInG3 && <Typography variant='subtitle1'>{dateOfBirthInWords}</Typography>}
                {isDateOfBirthInG3 === false && (
                  <Stack direction='row' justifyContent='flex-start' alignItems='flex-start' spacing={1}>
                    <ErrorIcon fontSize='small' color='error' />
                    <Typography variant='caption'>Date of Birth has not been updated in G3.</Typography>
                  </Stack>
                )}
              </Stack>
            </Stack>
            <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%', maxWidth: 800 }}>
              <Stack direction='column' justifyContent='center' alignItems='flex-start' sx={{ width: '100%' }}>
                <Typography variant='overline' color='text.secondary'>
                  Gender
                </Typography>
                {isGenderUpdatedOnG3 && <Typography variant='subtitle1'>{getGender_Key(primegender)?.value}</Typography>}
                {isGenderUpdatedOnG3 === false && (
                  <Stack direction='row' justifyContent='flex-start' alignItems='flex-start' spacing={1}>
                    <ErrorIcon fontSize='small' color='warning' />
                    <Typography variant='caption'>Gender has not been updatd in G3.</Typography>
                  </Stack>
                )}
              </Stack>
              <Stack direction='column' justifyContent='center' alignItems='flex-start' sx={{ width: '100%' }}>
                <Typography variant='overline' color='text.secondary'>
                  Marital Status
                </Typography>
                {isMartialStatusUpdatedOnG3 && <Typography variant='subtitle1'>{getMaritalStatus_Key(primemaritalStatus)?.value}</Typography>}
                {isMartialStatusUpdatedOnG3 === false && (
                  <Stack direction='row' justifyContent='flex-start' alignItems='flex-start' spacing={1}>
                    <ErrorIcon fontSize='small' color='warning' />
                    <Typography variant='caption'>Martial Status has not been updatd in G3.</Typography>
                  </Stack>
                )}
              </Stack>
            </Stack>
          </Stack>
          <Stack direction='row' justifyContent='center' alignItems='center' spacing={2} sx={{ width: '100%', pt: 2 }}>
            <RHFCheckbox name='primePersonalDetailsVerified' label='Personal Details are correct and relevant?' onCheckboxChange={setPrimePersonalDetailsVerified} checked={primePersonalDetailsVerified} />
          </Stack>
        </Stack>
      </Stack>
    </FormProvider>
  )
}

export default PersonalDetails
