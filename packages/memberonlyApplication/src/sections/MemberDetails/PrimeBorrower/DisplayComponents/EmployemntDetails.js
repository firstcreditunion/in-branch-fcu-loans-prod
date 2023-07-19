import React, { useEffect } from 'react'
import { Chip, Divider, Stack, Typography } from '@mui/material'

import isEqual from 'date-fns/isEqual'

import PropTypes from 'prop-types'

//* Redux
import { useDispatch, useSelector } from 'react-redux'
import { verifyPrimeDetailsActions } from '../../../../redux/slices/verifyPrimeDetailsSlice'

import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded'
import ErrorIcon from '@mui/icons-material/Error'

//* RHF And Yup
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import FormProvider, { RHFCheckbox } from '../../../../components/RHF-mui-compoments'

//* Utils
import { getEmployment_FromKey } from '../../../../redux/codes/getKeysOrValues'
import { fDate } from '../../../../utils/formatDateTime'

import Loading from './Loading'
import NotFound from './NotFound'

const EmploymentDetails = () => {
  const dispatch = useDispatch()

  const primeEmploymentDetailsVerified = useSelector((state) => state.loanDetailsReducer.primeEmploymentDetailsVerified)

  //* Loading States
  const employmentloading = useSelector((state) => state.verifyPrimeDetailsReducer.employmentloading)
  const employmentcurrentRequestId = useSelector((state) => state.verifyPrimeDetailsReducer.employmentcurrentRequestId)

  //? Employment Details From Redux
  const employmentDetails = useSelector((state) => state.verifyPrimeDetailsReducer.employmentDetails)

  console.log('Employment Details: ', employmentDetails)

  //* Member Details
  const primeClientNumber = useSelector((state) => state.clientSearchReducer.primeclientNumber)

  const defaultValues = {
    primeEmploymentDetailsVerified: primeEmploymentDetailsVerified,
  }

  // Schema
  const EmploymentDetailsSchema = Yup.object().shape({
    primeEmploymentDetailsVerified: Yup.boolean(),
  })

  //UseForm Methods from RHF
  const methods = useForm({
    resolver: yupResolver(EmploymentDetailsSchema),
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

  function setPrimeEmploymentDetailsVerified(event) {
    dispatch(verifyPrimeDetailsActions.setPrimeEmploymentDetailsVerified(event.target.checked))
  }

  const mostRecentEmployment = []

  //? For each Employment, find the most recently added employment in G3
  employmentDetails?.forEach((employmentType) => {
    //? getting all dates for the current type
    const filteredDatesForEmploymentTypes = employmentDetails?.map((employmentType) => {
      return { date: employmentType?.effectiveDate }
    })

    //If empty return
    if (filteredDatesForEmploymentTypes?.length === 0) return

    if (!(filteredDatesForEmploymentTypes == null)) {
      //? get max Date for current type
      const maxDateForCurrentEmploymentType = new Date(
        Math.max(
          ...filteredDatesForEmploymentTypes?.map((element) => {
            return new Date(element?.date)
          })
        )
      )

      //? Get the current Id Type for the current max date
      const employmentForMaxDate = employmentDetails?.filter((employment) => {
        if (isEqual(new Date(employment?.effectiveDate), new Date(maxDateForCurrentEmploymentType))) return employment
      })

      //? push to the array
      if (!(employmentForMaxDate == null)) {
        if (mostRecentEmployment?.length === 0) {
          mostRecentEmployment.push(...employmentForMaxDate)
        }

        if (mostRecentEmployment?.length > 0) {
          const isPresent = mostRecentEmployment?.some((employment) => {
            return employment?.effectiveDate === mostRecentEmployment[0]?.effectiveDate && employment?.employerName === mostRecentEmployment[0]?.employerName && employment?.employmentType === mostRecentEmployment[0]?.employmentType && employment?.employmentTypeDescription === mostRecentEmployment[0]?.employmentTypeDescription && employment?.hoursPerWeek === mostRecentEmployment[0]?.hoursPerWeek && employment?.jobDescription === mostRecentEmployment[0]?.jobDescription && employment?.nbrOfMonths === mostRecentEmployment[0]?.nbrOfMonths
          })

          if (!isPresent) {
            mostRecentEmployment.push(...employmentForMaxDate)
          }
        }
      }
    }
  })

  const doesNotHaveEmploymentDetails = mostRecentEmployment?.length === 0

  if (doesNotHaveEmploymentDetails) {
    dispatch(verifyPrimeDetailsActions.setHasEmploymentDetails(false))
  } else {
    dispatch(verifyPrimeDetailsActions.setHasEmploymentDetails(true))
  }

  if (employmentloading === 'PENDING')
    return (
      <Stack direction='column' spacing={3} sx={{ width: '100%', maxWidth: '700px' }}>
        <Loading />
      </Stack>
    )

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={2} sx={{ width: '100%' }}>
        <Divider flexItem>
          <Chip icon={<BadgeRoundedIcon />} label='Employment' color='primary' sx={{ px: 1 }} />
        </Divider>
        <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={3} sx={{ width: '100%', py: 3 }}>
          {!doesNotHaveEmploymentDetails && (
            <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={3} sx={{ width: '100%' }}>
              {mostRecentEmployment?.map((employment) => {
                return <EmploymentComponent key={employment?.employmentType} props={employment} />
              })}
            </Stack>
          )}
          {doesNotHaveEmploymentDetails && employmentcurrentRequestId != null && <NotFound noFoundText='Employment Details Not Found in G3.' priorityColor='warning' />}
          {!doesNotHaveEmploymentDetails && (
            <Stack direction='row' justifyContent='center' alignItems='center' spacing={2} sx={{ width: '100%', pt: 2 }}>
              <RHFCheckbox name='primeEmploymentDetailsVerified' label='Employment Details are correct and relevant?' onCheckboxChange={setPrimeEmploymentDetailsVerified} checked={primeEmploymentDetailsVerified} />
            </Stack>
          )}
        </Stack>
      </Stack>
    </FormProvider>
  )
}

export default EmploymentDetails

function EmploymentComponent({ props }) {
  return (
    <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={3} sx={{ width: '100%' }}>
      <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%', maxWidth: 800 }}>
        <Stack direction='column' justifyContent='center' alignItems='flex-start' sx={{ width: '100%' }}>
          <Typography variant='overline' color='text.secondary'>
            Employer Name
          </Typography>
          <Typography variant='subtitle1'>{props?.employerName}</Typography>
        </Stack>
        <Stack direction='column' justifyContent='center' alignItems='flex-start' sx={{ width: '100%' }}>
          <Typography variant='overline' color='text.secondary'>
            Employment Description
          </Typography>
          <Typography variant='subtitle1'>{props?.employmentTypeDescription}</Typography>
        </Stack>
      </Stack>
      <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%', maxWidth: 800 }}>
        <Stack direction='column' justifyContent='center' alignItems='flex-start' sx={{ width: '100%' }}>
          <Typography variant='overline' color='text.secondary'>
            Effective Date
          </Typography>
          <Typography variant='subtitle1'>{fDate(props?.effectiveDate)}</Typography>
        </Stack>
        <Stack direction='column' justifyContent='center' alignItems='flex-start' sx={{ width: '100%' }}>
          <Typography variant='overline' color='text.secondary'>
            Job Description
          </Typography>
          <Typography variant='subtitle1'>{props?.jobDescription}</Typography>
        </Stack>
      </Stack>
      <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%', maxWidth: 800 }}>
        <Stack direction='column' justifyContent='center' alignItems='flex-start' sx={{ width: '100%' }}>
          <Typography variant='overline' color='text.secondary'>
            Working Hours Per Week
          </Typography>
          <Typography variant='subtitle1'>{props?.hoursPerWeek} hours</Typography>
        </Stack>
        <Stack direction='column' justifyContent='center' alignItems='flex-start' sx={{ width: '100%' }}>
          <Typography variant='overline' color='text.secondary'>
            Number of Months Since Employed
          </Typography>
          <Typography variant='subtitle1'>{props?.nbrOfMonths} months</Typography>
        </Stack>
      </Stack>
    </Stack>
  )
}
