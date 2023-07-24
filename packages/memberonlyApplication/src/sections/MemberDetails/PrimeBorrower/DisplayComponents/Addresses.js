import React, { useEffect } from 'react'
import { Chip, Divider, Stack, Typography } from '@mui/material'

import isEqual from 'date-fns/isEqual'

import PropTypes from 'prop-types'

//* Redux
import { useDispatch, useSelector } from 'react-redux'
import { verifyPrimeDetailsActions } from '../../../../redux/slices/verifyPrimeDetailsSlice'

import CabinIcon from '@mui/icons-material/Cabin'
import ErrorIcon from '@mui/icons-material/Error'

//* RHF And Yup
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import FormProvider, { RHFCheckbox } from '../../../../components/RHF-mui-compoments'

//* Utils
import { getStreetType_FromKey } from '../../../../redux/codes/getKeysOrValues'
import { fDate } from '../../../../utils/formatDateTime'

import Loading from './Loading'
import NotFound from './NotFound'

const Addresses = () => {
  const dispatch = useDispatch()

  const primeAddressesVerified = useSelector((state) => state.loanDetailsReducer.primeAddressesVerified)

  //* Loading States
  const addressloading = useSelector((state) => state.verifyPrimeDetailsReducer.addressloading)
  const addresscurrentRequestId = useSelector((state) => state.verifyPrimeDetailsReducer.addresscurrentRequestId)

  //? Addresses
  const addresses = useSelector((state) => state.verifyPrimeDetailsReducer.addresses)

  //* Member Details
  const primeClientNumber = useSelector((state) => state.clientSearchReducer.primeclientNumber)

  const defaultValues = {
    primeAddressesVerified: primeAddressesVerified,
  }

  // Schema
  const AdddressVerifySchema = Yup.object().shape({
    primeAddressesVerified: Yup.boolean(),
  })

  //UseForm Methods from RHF
  const methods = useForm({
    resolver: yupResolver(AdddressVerifySchema),
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
    // console.log('On Submit Loan Details')
  }

  function setPrimeAddressesVerified(event) {
    dispatch(verifyPrimeDetailsActions.setPrimeAddressesVerified(event.target.checked))
  }

  //? ------------------ Residential Address Filters ------------------
  const residentialAddresses = addresses?.filter((address) => {
    return address?.contactType === 'RS'
  })

  const mostRecentResidentialAddress = getMostRecentResidentialAddress(residentialAddresses)

  //? ------------------ Mailing Address Filters ------------------
  const mailingAddresses = addresses?.filter((address) => {
    return address?.contactType === 'ML'
  })

  const mostRecentMailingAddress = getMostRecentMailingAddress(mailingAddresses)

  const doesNotHaveAddresses = (mostRecentResidentialAddress?.length === 0 || mostRecentResidentialAddress == null) && (mostRecentMailingAddress == null || mostRecentMailingAddress?.length === 0)

  if (doesNotHaveAddresses) {
    dispatch(verifyPrimeDetailsActions.setHasAddresses(false))
  } else {
    dispatch(verifyPrimeDetailsActions.setHasAddresses(true))
  }

  if (addressloading === 'PENDING')
    return (
      <Stack direction='column' spacing={3} sx={{ width: '100%', maxWidth: '700px' }}>
        <Loading />
      </Stack>
    )

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={2} sx={{ width: '100%' }}>
        <Divider flexItem>
          <Chip icon={<CabinIcon />} label='Address' color='primary' sx={{ px: 1 }} />
        </Divider>
        <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={3} sx={{ width: '100%', py: 3 }}>
          {!doesNotHaveAddresses && (
            <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={3} sx={{ width: '100%' }}>
              <AddressComponent mostRecentResidentialAddress={mostRecentResidentialAddress} mostRecentMailingAddress={mostRecentMailingAddress} />
            </Stack>
          )}
          {doesNotHaveAddresses && addresscurrentRequestId != null && <NotFound noFoundText='Address not found in G3.' priorityColor='warning' />}
          {!doesNotHaveAddresses && (
            <Stack direction='row' justifyContent='center' alignItems='center' spacing={2} sx={{ width: '100%', pt: 2 }}>
              <RHFCheckbox name='primeAddressesVerified' label='Addresses are correct and relevant?' onCheckboxChange={setPrimeAddressesVerified} checked={primeAddressesVerified} />
            </Stack>
          )}
        </Stack>
      </Stack>
    </FormProvider>
  )
}

export default Addresses

function AddressComponent({ mostRecentResidentialAddress, mostRecentMailingAddress }) {
  const residentialAddressIsPresent = mostRecentResidentialAddress?.length != 0 && !(mostRecentResidentialAddress == null)
  const mailingAddressIsPresent = mostRecentMailingAddress?.length != 0 && !(mostRecentMailingAddress == null)

  let res_streetNumberFrom = ''
  let res_streetNumberTo = ''
  let res_alpha = ''
  let res_streetName = ''
  let res_streetType = ''
  let res_suburb = ''
  let res_city = ''
  let res_postCode = ''
  let res_country = ''

  let res_isFromPresent = false
  let res_isToPresent = false
  let res_res_alpha = false

  if (residentialAddressIsPresent) {
    res_streetNumberFrom = mostRecentResidentialAddress[0]?.streetNumberFro
    res_streetNumberTo = mostRecentResidentialAddress[0]?.streetNumberTo
    res_alpha = mostRecentResidentialAddress[0]?.alpha
    res_streetName = mostRecentResidentialAddress[0]?.streetName
    res_streetType = mostRecentResidentialAddress[0]?.streetType
    res_suburb = mostRecentResidentialAddress[0]?.suburb
    res_city = mostRecentResidentialAddress[0]?.city
    res_postCode = mostRecentResidentialAddress[0]?.postCode
    res_country = mostRecentResidentialAddress[0]?.country

    res_isFromPresent = res_streetNumberFrom != '0' && res_streetNumberFrom != ''
    res_isToPresent = res_streetNumberTo != '0' && res_streetNumberTo != ''
    res_res_alpha = res_streetNumberTo === ''
  }

  let mail_streetNumberFrom = ''
  let mail_streetNumberTo = ''
  let mail_alpha = ''
  let mail_streetName = ''
  let mail_streetType = ''
  let mail_suburb = ''
  let mail_city = ''
  let mail_postCode = ''
  let mail_country = ''

  let mail_isFromPresent = false
  let mail_isToPresent = false
  let mail_res_alpha = false

  if (mailingAddressIsPresent) {
    mail_streetNumberFrom = mostRecentMailingAddress[0]?.streetNumberFro
    mail_streetNumberTo = mostRecentMailingAddress[0]?.streetNumberTo
    mail_alpha = mostRecentMailingAddress[0]?.alpha
    mail_streetName = mostRecentMailingAddress[0]?.streetName
    mail_streetType = mostRecentMailingAddress[0]?.streetType
    mail_suburb = mostRecentMailingAddress[0]?.suburb
    mail_city = mostRecentMailingAddress[0]?.city
    mail_postCode = mostRecentMailingAddress[0]?.postCode
    mail_country = mostRecentMailingAddress[0]?.country

    mail_isFromPresent = mail_streetNumberFrom != '0' && mail_streetNumberFrom != ''
    mail_isToPresent = mail_streetNumberTo != '0' && mail_streetNumberTo != ''
    mail_res_alpha = mail_alpha === ''
  }

  return (
    <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={3} sx={{ width: '100%' }}>
      <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%', maxWidth: 800 }}>
        {residentialAddressIsPresent && (
          <Stack direction='column' justifyContent='center' alignItems='flex-start' sx={{ width: '100%' }}>
            <Typography variant='overline' color='text.secondary'>
              Residential Address
            </Typography>
            {res_isFromPresent && res_isToPresent && (
              <Typography variant='subtitle1'>
                {res_streetNumberFrom} to {res_streetNumberTo}
                {res_alpha} {res_streetName} {res_streetType != '' ? getStreetType_FromKey(res_streetType)?.value : ''}
              </Typography>
            )}
            {!res_isToPresent && (
              <Typography variant='subtitle1'>
                {res_streetNumberFrom === '0' ? '' : res_streetNumberFrom}
                {res_alpha === '' ? '' : res_alpha} {res_streetName === '' ? '' : res_streetName} {res_streetType != '' ? getStreetType_FromKey(res_streetType)?.value : ''}
              </Typography>
            )}
            <Typography variant='subtitle1'>{res_suburb}</Typography>
            <Typography variant='subtitle1'>{res_city}</Typography>
            <Typography variant='subtitle1'>{res_country}</Typography>
          </Stack>
        )}
        {mailingAddressIsPresent && (
          <Stack direction='column' justifyContent='center' alignItems='flex-start' sx={{ width: '100%' }}>
            <Typography variant='overline' color='text.secondary'>
              Mailing Address
            </Typography>
            {mail_isFromPresent && mail_isToPresent && (
              <Typography variant='subtitle1'>
                {mail_streetNumberFrom} to {mail_streetNumberTo}
                {mail_alpha} {mail_streetName} {mail_streetType != '' ? getStreetType_FromKey(mail_streetType)?.value : ''}
              </Typography>
            )}
            {!mail_isToPresent && (
              <Typography variant='subtitle1'>
                {mail_streetNumberFrom === '0' ? '' : mail_streetNumberFrom}
                {mail_alpha === '' ? '' : mail_alpha} {mail_streetName === '' ? '' : mail_streetName} {mail_streetType != '' ? getStreetType_FromKey(mail_streetType)?.value : ''}
              </Typography>
            )}
            <Typography variant='subtitle1'>{mail_suburb}</Typography>
            <Typography variant='subtitle1'>{mail_city}</Typography>
            <Typography variant='subtitle1'>{mail_country}</Typography>
          </Stack>
        )}
      </Stack>
    </Stack>
  )
}

function getMostRecentResidentialAddress(residentialAddress) {
  let mostRecentForTheType = []

  if (residentialAddress?.length === 0 || residentialAddress == null) return

  if (residentialAddress?.length != 0 && !(residentialAddress == null)) {
    //? getting all dates for the current type
    const filteredDatesForCurrentType = residentialAddress?.map((type) => {
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
    const typeForMaxDate = residentialAddress?.filter((type) => {
      if (isEqual(new Date(type?.effectiveDate), new Date(maxDateForCurrentType))) return type
    })

    //? push to the array
    if (!(typeForMaxDate == null)) {
      mostRecentForTheType.push(...typeForMaxDate)
    }
  }

  return mostRecentForTheType
}

function getMostRecentMailingAddress(mailingAddresses) {
  let mostRecentForTheType = []

  if (mailingAddresses?.length === 0 || mailingAddresses == null) return

  if (mailingAddresses?.length != 0 && !(mailingAddresses == null)) {
    //? getting all dates for the current type
    const filteredDatesForCurrentType = mailingAddresses?.map((type) => {
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
    const typeForMaxDate = mailingAddresses?.filter((type) => {
      if (isEqual(new Date(type?.effectiveDate), new Date(maxDateForCurrentType))) return type
    })

    //? push to the array
    if (!(typeForMaxDate == null)) {
      mostRecentForTheType.push(...typeForMaxDate)
    }
  }

  return mostRecentForTheType
}
