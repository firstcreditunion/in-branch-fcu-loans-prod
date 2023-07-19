import React, { useEffect } from 'react'
import { Chip, Divider, Stack, Typography } from '@mui/material'

import isEqual from 'date-fns/isEqual'

import PropTypes from 'prop-types'

//* Redux
import { useDispatch, useSelector } from 'react-redux'
import { verifyPrimeDetailsActions } from '../../../../redux/slices/verifyPrimeDetailsSlice'

import PhoneIcon from '@mui/icons-material/Phone'
import ErrorIcon from '@mui/icons-material/Error'

//* RHF And Yup
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import FormProvider, { RHFCheckbox } from '../../../../components/RHF-mui-compoments'

//* Utils
import { fDate } from '../../../../utils/formatDateTime'

import Loading from './Loading'
import NotFound from './NotFound'

const ContactDetails = () => {
  const dispatch = useDispatch()

  const primeContactDetailsVerified = useSelector((state) => state.loanDetailsReducer.primeContactDetailsVerified)

  //* Loading States
  const contactloading = useSelector((state) => state.verifyPrimeDetailsReducer.contactloading)
  const contactcurrentRequestId = useSelector((state) => state.verifyPrimeDetailsReducer.contactcurrentRequestId)

  //? Employment Details From Redux
  const clientContact = useSelector((state) => state.verifyPrimeDetailsReducer.clientContact)

  const defaultValues = {
    primeContactDetailsVerified: primeContactDetailsVerified,
  }

  // Schema
  const ContactDetailsVerifySchema = Yup.object().shape({
    primeContactDetailsVerified: Yup.boolean(),
  })

  //UseForm Methods from RHF
  const methods = useForm({
    resolver: yupResolver(ContactDetailsVerifySchema),
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

  function setPrimeContactDetailsVerified(event) {
    dispatch(verifyPrimeDetailsActions.setPrimeContactDetailsVerified(event.target.checked))
  }

  //* Email
  const emailAddresses = clientContact?.email

  //? ------------------ Email Address Filters - Work ------------------
  const workEmailAddresses = emailAddresses?.filter((email) => {
    return email?.contactType === 'WK'
  })

  const mostRecentWorkEmail = getMostRecentWorkEmail(workEmailAddresses)

  //? ------------------ Email Address Filters - Personal ------------------
  const personalEmailAddresses = emailAddresses?.filter((email) => {
    return email?.contactType === 'HM'
  })

  const mostRecentPersonalEmail = getMostRecentPersonalEmail(personalEmailAddresses)

  //? ----------------------- Mobile Number -----------------------

  //* Mobile Number
  const mobileNumber = clientContact?.mobile

  const mostRecentMobileNumber = getMostRecentMobileNumbers(mobileNumber)

  //* Phone Number
  const phoneNumbers = clientContact?.phone

  //? ----------------------- Phone Number Filters - Work -----------------------

  const mostRecentphoneNumbers = getMostRecentPhoneNumbers(phoneNumbers)

  const personalEmailIsPresent = mostRecentPersonalEmail?.length != 0 && !(mostRecentPersonalEmail == null)
  const workEmailIsPresent = mostRecentWorkEmail?.length != 0 && !(mostRecentWorkEmail == null)
  const mobileNumberIsPresent = mobileNumber?.length != 0 && !(mobileNumber == null)
  const phoneNumberIsPresent = phoneNumbers?.length != 0 && !(phoneNumbers == null)

  const doesNotHaveContactDetails = !personalEmailIsPresent && !workEmailIsPresent && !mobileNumberIsPresent && !phoneNumberIsPresent

  if (doesNotHaveContactDetails) {
    dispatch(verifyPrimeDetailsActions.setHasContactDetails(false))
  } else {
    dispatch(verifyPrimeDetailsActions.setHasContactDetails(true))
  }

  if (contactloading === 'PENDING')
    return (
      <Stack direction='column' spacing={3} sx={{ width: '100%', maxWidth: '700px' }}>
        <Loading />
      </Stack>
    )

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={2} sx={{ width: '100%' }}>
        <Divider flexItem>
          <Chip icon={<PhoneIcon />} label='Contact' color='primary' sx={{ px: 1 }} />
        </Divider>
        <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={3} sx={{ width: '100%', py: 3 }}>
          <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={3} sx={{ width: '100%' }}>
            <ContctComponent mostrecentPersonalEmail={mostRecentPersonalEmail} mostRecentWorkEmail={mostRecentWorkEmail} mobileNumbers={mostRecentMobileNumber} phoneNumbers={mostRecentphoneNumbers} contactcurrentRequestId={contactcurrentRequestId} />
          </Stack>
          {!doesNotHaveContactDetails && (
            <Stack direction='row' justifyContent='center' alignItems='center' spacing={2} sx={{ width: '100%', pt: 2 }}>
              <RHFCheckbox name='primeContactDetailsVerified' label='Contact Details are correct and relevant?' onCheckboxChange={setPrimeContactDetailsVerified} checked={primeContactDetailsVerified} />
            </Stack>
          )}
        </Stack>
      </Stack>
    </FormProvider>
  )
}

export default ContactDetails

function ContctComponent({ mostRecentWorkEmail, mostrecentPersonalEmail, mobileNumbers, phoneNumbers, contactcurrentRequestId }) {
  // const personalEmailToDisplay = mostrecentPersonalEmail[0]
  // const workEmailToDisplay = mostRecentWorkEmail[0]
  const personalEmailIsPresent = mostrecentPersonalEmail?.length != 0 && !(mostrecentPersonalEmail == null)
  const workEmailIsPresent = mostRecentWorkEmail?.length != 0 && !(mostRecentWorkEmail == null)
  const mobileNumberIsPresent = mobileNumbers?.length != 0 && !(mobileNumbers == null)
  const phoneNumberIsPresent = phoneNumbers?.length != 0 && !(phoneNumbers == null)

  let mb_countryCode = ''
  let mb_netWorkCode = ''
  let mobileNumber = ''

  let ph_stdCode = ''
  let phoneNumber = ''

  if (mobileNumberIsPresent) {
    mb_countryCode = mobileNumbers[0]?.countryCode
    mb_netWorkCode = mobileNumbers[0]?.networkCode
    mobileNumber = mobileNumbers[0]?.number
  }

  if (phoneNumberIsPresent) {
    ph_stdCode = phoneNumbers[0]?.stdCode
    phoneNumber = phoneNumbers[0]?.number
  }

  const doesNotHaveContactDetails = !personalEmailIsPresent && !workEmailIsPresent && !mobileNumberIsPresent && !phoneNumberIsPresent

  return (
    <>
      {!doesNotHaveContactDetails && (
        <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={3} sx={{ width: '100%' }}>
          <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%', maxWidth: 800 }}>
            {personalEmailIsPresent && (
              <Stack direction='column' justifyContent='center' alignItems='flex-start' sx={{ width: '100%' }}>
                <Typography variant='overline' color='text.secondary'>
                  Personal Email
                </Typography>
                <Typography variant='subtitle1'>{mostrecentPersonalEmail[0]?.address}</Typography>
              </Stack>
            )}
            {workEmailIsPresent && (
              <Stack direction='column' justifyContent='center' alignItems='flex-start' sx={{ width: '100%' }}>
                <Typography variant='overline' color='text.secondary'>
                  Work Email
                </Typography>
                <Typography variant='subtitle1'>{mostRecentWorkEmail[0]?.address}</Typography>
              </Stack>
            )}
          </Stack>
          <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%', maxWidth: 800 }}>
            {mobileNumberIsPresent && (
              <Stack direction='column' justifyContent='center' alignItems='flex-start' sx={{ width: '100%' }}>
                <Typography variant='overline' color='text.secondary'>
                  Mobile Number
                </Typography>
                <Typography variant='subtitle1'>
                  {mb_countryCode}-{mb_netWorkCode}-{mobileNumber}
                </Typography>
              </Stack>
            )}
            {phoneNumberIsPresent && (
              <Stack direction='column' justifyContent='center' alignItems='flex-start' sx={{ width: '100%' }}>
                <Typography variant='overline' color='text.secondary'>
                  Phone Number
                </Typography>
                <Typography variant='subtitle1'>
                  64-{ph_stdCode}-{phoneNumber}
                </Typography>
              </Stack>
            )}
          </Stack>
        </Stack>
      )}
      {doesNotHaveContactDetails && contactcurrentRequestId != null && <NotFound noFoundText='Contact Details not found in G3.' priorityColor='warning' />}
    </>
  )
}

//? -------- Work Email ------------

function getMostRecentWorkEmail(workEmailAddresses) {
  let mostRecentForTheType = []

  if (workEmailAddresses?.length === 0 || workEmailAddresses == null) return

  if (workEmailAddresses?.length != 0 && !(workEmailAddresses == null)) {
    //? getting all dates for the current type
    const filteredDatesForCurrentType = workEmailAddresses?.map((type) => {
      return { date: type?.effectiveDate }
    })

    //? get max Date for current type
    const maxDateForCurrentType = new Date(
      Math.max(
        ...filteredDatesForCurrentType?.map((element) => {
          return new Date(element?.date)
        })
      )
    )

    //? Get the current Id Type for the current max date
    const typeForMaxDate = workEmailAddresses?.filter((type) => {
      if (isEqual(new Date(type?.effectiveDate), new Date(maxDateForCurrentType))) return type
    })

    //? push to the array
    if (!(typeForMaxDate == null)) {
      mostRecentForTheType.push(...typeForMaxDate)
    }
  }

  return mostRecentForTheType
}

//? -------- Personal Email ------------

function getMostRecentPersonalEmail(personalEmail) {
  let mostRecentForTheType = []

  if (personalEmail?.length === 0 || personalEmail == null) return

  if (personalEmail?.length != 0 && !(personalEmail == null)) {
    //? getting all dates for the current type
    const filteredDatesForCurrentType = personalEmail?.map((type) => {
      return { date: type?.effectiveDate }
    })

    //? get max Date for current type
    const maxDateForCurrentType = new Date(
      Math.max(
        ...filteredDatesForCurrentType?.map((element) => {
          return new Date(element?.date)
        })
      )
    )

    //? Get the current Id Type for the current max date
    const typeForMaxDate = personalEmail?.filter((type) => {
      if (isEqual(new Date(type?.effectiveDate), new Date(maxDateForCurrentType))) return type
    })

    //? push to the array
    if (!(typeForMaxDate == null)) {
      mostRecentForTheType.push(...typeForMaxDate)
    }
  }

  return mostRecentForTheType
}

//? -------- Mobile Number ------------

function getMostRecentMobileNumbers(mobileNumbers) {
  let mostRecentForTheType = []

  if (mobileNumbers?.length === 0 || mobileNumbers == null) return

  if (mobileNumbers?.length != 0 && !(mobileNumbers == null)) {
    //? getting all dates for the current type
    const filteredDatesForCurrentType = mobileNumbers?.map((type) => {
      return { date: type?.effectiveDate }
    })

    //? get max Date for current type
    const maxDateForCurrentType = new Date(
      Math.max(
        ...filteredDatesForCurrentType?.map((element) => {
          return new Date(element?.date)
        })
      )
    )

    //? Get the current Id Type for the current max date
    const typeForMaxDate = mobileNumbers?.filter((type) => {
      if (isEqual(new Date(type?.effectiveDate), new Date(maxDateForCurrentType))) return type
    })

    //? push to the array
    if (!(typeForMaxDate == null)) {
      mostRecentForTheType.push(...typeForMaxDate)
    }
  }

  return mostRecentForTheType
}

//? -------- Phone Numbers ------------

function getMostRecentPhoneNumbers(phoneNumbers) {
  let mostRecentForTheType = []

  if (phoneNumbers?.length === 0 || phoneNumbers == null) return

  if (phoneNumbers?.length != 0 && !(phoneNumbers == null)) {
    //? getting all dates for the current type
    const filteredDatesForCurrentType = phoneNumbers?.map((type) => {
      return { date: type?.effectiveDate }
    })

    //? get max Date for current type
    const maxDateForCurrentType = new Date(
      Math.max(
        ...filteredDatesForCurrentType?.map((element) => {
          return new Date(element?.date)
        })
      )
    )

    //? Get the current Id Type for the current max date
    const typeForMaxDate = phoneNumbers?.filter((type) => {
      if (isEqual(new Date(type?.effectiveDate), new Date(maxDateForCurrentType))) return type
    })

    //? push to the array
    if (!(typeForMaxDate == null)) {
      mostRecentForTheType.push(...typeForMaxDate)
    }
  }

  return mostRecentForTheType
}
