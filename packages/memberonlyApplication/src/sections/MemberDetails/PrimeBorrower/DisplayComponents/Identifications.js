import React, { useEffect } from 'react'
import { Chip, Divider, Stack, Typography } from '@mui/material'

import isEqual from 'date-fns/isEqual'

//* Redux
import { useDispatch, useSelector } from 'react-redux'
import { getIdentification_FromKey } from '../../../../redux/codes/getKeysOrValues'
import { verifyPrimeDetailsActions } from '../../../../redux/slices/verifyPrimeDetailsSlice'

import FingerprintIcon from '@mui/icons-material/Fingerprint'
import ErrorIcon from '@mui/icons-material/Error'

//* RHF
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import FormProvider, { RHFCheckbox } from '../../../../components/RHF-mui-compoments'

import Loading from './Loading'
import NotFound from './NotFound'

const Identification = () => {
  const dispatch = useDispatch()

  const primeIdentificationDetailsVerified = useSelector((state) => state.loanDetailsReducer.primeIdentificationDetailsVerified)

  //* Loading States
  const identificationloading = useSelector((state) => state.verifyPrimeDetailsReducer.identificationloading)
  const identificationcurrentRequestId = useSelector((state) => state.verifyPrimeDetailsReducer.identificationcurrentRequestId)

  //? Identification
  const identifications = useSelector((state) => state.verifyPrimeDetailsReducer.identifications)

  //* Member Details
  const primeClientNumber = useSelector((state) => state.clientSearchReducer.primeclientNumber)

  const defaultValues = {
    primeIdentificationDetailsVerified: primeIdentificationDetailsVerified,
  }

  // Schema
  const IdentificationVerifySchema = Yup.object().shape({
    primeIdentificationDetailsVerified: Yup.boolean(),
  })

  //UseForm Methods from RHF
  const methods = useForm({
    resolver: yupResolver(IdentificationVerifySchema),
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

  function setPrimeIdentificationDetailsVerified(event) {
    dispatch(verifyPrimeDetailsActions.setPrimeIdentificationDetailsVerified(event.target.checked))
  }

  const validIdentificationType1 = ['DRVLSC', 'FIRELICENS', 'BIRTHCERT', 'PASPRT', 'STDNTID', 'GOLDCARD', 'KIWACCCRD']
  const validIdentificationType2 = ['DLVERSION']

  const mostRecentIds = []

  //? Check if the expiry date id futre date or null
  const activeIdentifications = identifications?.filter((identification) => {
    return new Date(identification?.expiryDate) >= new Date() || identification?.expiryDate === null
  })

  //? Filter Valid IDs from the above array 'validIdentificationType1'
  const validIdentifications = activeIdentifications?.filter((id) => {
    return validIdentificationType1?.includes(id?.idType1)
  })

  //? For each valid Id, find the most recently added ID in G3
  validIdentificationType1?.forEach((idType) => {
    const currentId = validIdentifications?.filter((id) => {
      return id?.idType1 === idType && id?.idType2 === ''
    })

    //? getting all dates for the current type
    const filteredDatesForCurrentType = currentId?.map((id) => {
      return { date: id?.effectiveDate }
    })

    //If empty return
    if (filteredDatesForCurrentType?.length === 0) return

    if (!(filteredDatesForCurrentType == null)) {
      //? get max Date for current type
      const maxDateForCurrentType = new Date(
        Math.max(
          ...filteredDatesForCurrentType?.map((element) => {
            return new Date(element?.date)
          })
        )
      )

      //? Get the current Id Type for the current max date
      const IdForMaxDate = currentId?.filter((id) => {
        if (isEqual(new Date(id?.effectiveDate), new Date(maxDateForCurrentType))) return id
      })

      //? push to the array
      if (!(IdForMaxDate == null)) {
        mostRecentIds.push(...IdForMaxDate)
      }
    }
  })

  //* Array filters for getting the correct Drivers Licence Version

  const mostRecentIdVersion = []

  //? Filter Valid IDs from the above array 'validIdentificationType1'
  const validIdVersion = activeIdentifications?.filter((id) => {
    return validIdentificationType2?.includes(id?.idType2)
  })

  // //? For each valid Id Type Version, find the most recently added ID in G3
  validIdVersion?.forEach((idVersionType) => {
    //? getting all dates for the current type
    const filteredDatesForCurrentVersionType = validIdVersion?.map((id) => {
      return { date: id?.effectiveDate }
    })

    if (filteredDatesForCurrentVersionType?.length === 0) return

    if (!(filteredDatesForCurrentVersionType == null)) {
      //? get max Date for current type
      const maxDateForCurrentVersionType = new Date(
        Math.max(
          ...filteredDatesForCurrentVersionType?.map((element) => {
            return new Date(element?.date)
          })
        )
      )

      //? Get the current Id Type for the current max date
      const IdVersionForMaxDate = validIdVersion?.filter((id) => {
        if (isEqual(new Date(id?.effectiveDate), new Date(maxDateForCurrentVersionType))) return id
      })

      //? push to the array
      if (!(IdVersionForMaxDate == null)) {
        if (mostRecentIdVersion?.length === 0) {
          mostRecentIdVersion.push(...IdVersionForMaxDate)
        }

        if (mostRecentIdVersion?.length != 0) {
          const hasIdVersion = mostRecentIdVersion?.some((id) => {
            return id?.idType2 === IdVersionForMaxDate[0]?.idType2
          })

          if (!hasIdVersion) {
            mostRecentIdVersion.push(...IdVersionForMaxDate)
          }
        }
      }
    }
  })

  const doesNotHaveActiveIds = activeIdentifications?.length === 0

  if (doesNotHaveActiveIds) {
    dispatch(verifyPrimeDetailsActions.setHasIdentifications(false))
  } else {
    dispatch(verifyPrimeDetailsActions.setHasIdentifications(true))
  }

  if (identificationloading === 'PENDING')
    return (
      <Stack direction='column' spacing={3} sx={{ width: '100%', maxWidth: '700px' }}>
        <Loading />
      </Stack>
    )

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={2} sx={{ width: '100%' }}>
        <Divider flexItem>
          <Chip icon={<FingerprintIcon />} label='Identifications' color='primary' sx={{ px: 1 }}></Chip>
        </Divider>
        <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={3} sx={{ width: '100%', py: 3 }}>
          {!doesNotHaveActiveIds && (
            <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={3} sx={{ width: '100%' }}>
              {mostRecentIds?.map((id) => {
                return <IdentificationComponent key={id?.idType1} props={id} mostRecentIdVersion={mostRecentIdVersion} />
              })}
            </Stack>
          )}
          {doesNotHaveActiveIds && identificationcurrentRequestId != null && <NotFound noFoundText='Identification Not Found in G3.' priorityColor='warning' />}
          {!doesNotHaveActiveIds && (
            <Stack direction='row' justifyContent='center' alignItems='center' spacing={2} sx={{ width: '100%', pt: 2 }}>
              <RHFCheckbox name='primeIdentificationDetailsVerified' label='Identifications are correct and relevant?' onCheckboxChange={setPrimeIdentificationDetailsVerified} checked={primeIdentificationDetailsVerified} />
            </Stack>
          )}
        </Stack>
      </Stack>
    </FormProvider>
  )
}

export default Identification

function IdentificationComponent({ props, mostRecentIdVersion }) {
  console.log('IDENTIFICATION PROPS: ', props)

  return (
    <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={1} sx={{ width: '100%' }}>
      <Typography variant='button' color='secondary' sx={{ textTransform: 'uppercase', letterSpacing: 1, fontWeight: 'light' }}>
        {getIdentification_FromKey(props?.idType1)?.value}
      </Typography>
      <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={3} sx={{ width: '100%' }}>
        <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%', maxWidth: 800 }}>
          <Stack direction='column' justifyContent='center' alignItems='flex-start' sx={{ width: '100%' }}>
            <Typography variant='overline' color='text.secondary'>
              Reference
            </Typography>
            <Typography variant='subtitle1'>{props?.reference}</Typography>
          </Stack>
          {props?.idType1 === 'DRVLSC' && (
            <Stack direction='column' justifyContent='center' alignItems='flex-start' sx={{ width: '100%' }}>
              <Typography variant='overline' color='text.secondary'>
                Version
              </Typography>
              <Typography variant='subtitle1'>{mostRecentIdVersion[0]?.reference}</Typography>
            </Stack>
          )}
        </Stack>
        <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%', maxWidth: 800 }}>
          <Stack direction='column' justifyContent='center' alignItems='flex-start' sx={{ width: '100%' }}>
            <Typography variant='overline' color='text.secondary'>
              Effective Date
            </Typography>
            <Typography variant='subtitle1'>{props?.effectiveDate}</Typography>
          </Stack>
          <Stack direction='column' justifyContent='center' alignItems='flex-start' sx={{ width: '100%' }}>
            {getIdentification_FromKey(props?.idType1)?.expiryDateRequired === true && (
              <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={0.5}>
                <Typography variant='overline' color='text.secondary'>
                  Expiry Date
                </Typography>
                {props?.expiryDate == null && getIdentification_FromKey(props?.idType1)?.expiryDateRequired === true && <ErrorIcon color='warning' fontSize='small' />}
              </Stack>
            )}
            <Typography variant={props?.expiryDate == null && getIdentification_FromKey(props?.idType1)?.expiryDateRequired === true ? 'caption' : 'subtitle1'}>{props?.expiryDate == null && getIdentification_FromKey(props?.idType1)?.expiryDateRequired === true ? `Please update expiry date for ${getIdentification_FromKey(props?.idType1)?.value} in G3.` : props?.expiryDate}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}
