import React from 'react'

//* MUI
import { Button, Stack, Typography } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import useMediaQuery from '@mui/material/useMediaQuery'
import LoadingButton from '@mui/lab/LoadingButton'

//* MUI Icons
import SearchIcon from '@mui/icons-material/Search'

//* Redux
import { useDispatch, useSelector } from 'react-redux'
import { clientSearchActions } from '../../redux/slices/clientSearchSlice'
import { getJointClientGeneralDetails } from '../../redux/slices/clientSearchSlice'

//* RHF And Yup
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

//* RHF Components
import FormProvider, { RHFTextField } from '../../components/RHF-mui-compoments'

//* API Utils
import { BASE_URL_LOCAL_APP, BASE_URL_AWS_APP, processNodeEnv } from '../../redux/utils/apiConstants'

//* Custom Components
import CompomentWrapper from '../../layouts/CompomentWrapper'
import LoadingSkeleton from '../../components/LoadingSkeleton'

export default function SearhClientNumber() {
  const downMd = useMediaQuery((theme) => theme.breakpoints.down('md'))
  const downSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  const dispatch = useDispatch()

  // Redux Selectors
  const jointclientNumber = useSelector((state) => state.clientSearchReducer.jointclientNumber)
  const clientSearchLoading = useSelector((state) => state.clientSearchReducer.jointloading)
  const isJointLoan = useSelector((state) => state.clientSearchReducer.isJointLoan)
  const jointid = useSelector((state) => state.clientSearchReducer.jointid)
  const primeid = useSelector((state) => state.clientSearchReducer.primeid)

  const defaultValues = {
    isJointLoan: isJointLoan,
    jointclientNumber: jointclientNumber,
  }

  // Schema
  const ClientNumberSearchSchema = Yup.object().shape({
    isJointLoan: Yup.string(),
    jointclientNumber: Yup.string().when('isJointLoan', {
      is: (jointApplicant) => {
        return jointApplicant === 'N'
      },
      then: Yup.string().nullable(),
      otherwise: Yup.string().required('Joint member number is required.').nullable(),
    }),
  })

  //UseForm Methods from RHF
  const methods = useForm({
    resolver: yupResolver(ClientNumberSearchSchema),
    defaultValues,
  })

  // Destructure Methods
  const {
    watch,
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods

  const onSubmit = (event) => {
    getJointClientPersonalDetails()
  }

  function setJointClientNumber(event) {
    dispatch(clientSearchActions.setJointClientNumber(event.target.value))
  }

  async function getJointClientPersonalDetails() {
    dispatch(clientSearchActions.clearJointMemberDetails())
    var clientData = JSON.stringify({
      clientID: jointclientNumber,
      include: '',
    })

    const personalDetialsConfig = {
      url: '/client-details',
      method: 'POST',
      baseURL: `${processNodeEnv() === 'development' ? BASE_URL_LOCAL_APP : BASE_URL_AWS_APP}`,
      headers: { 'Content-Type': 'application/json' },
      timeout: 5000,
      data: clientData,
    }

    const clientDetailsResult = await dispatch(getJointClientGeneralDetails(personalDetialsConfig))
    // const clientIdentificationResult = await dispatch(getClientIdentificationDetails(identificationDetialsConfig))

    // console.log('clientDetailsResult: ', clientDetailsResult)
    // console.log('clientIDResult: ', clientIdentificationResult)
  }

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack
          direction='column'
          justifyContent='flex-start'
          spacing={3}
          sx={{
            px: downMd ? 0 : 20,
          }}
        >
          <Typography
            variant='h4'
            color='secondary'
            sx={{
              textAlign: 'center',
              textTransform: 'uppercase',
              fontWeight: 'light',
              letterSpacing: 3,
            }}
          >
            Search Co-Borrower
          </Typography>
          <RHFTextField
            name='jointclientNumber'
            placeholder='Member Number'
            label=''
            autoFocus={true}
            onInputChange={setJointClientNumber}
            value={jointclientNumber}
            InputProps={{
              type: 'number',
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position='end'>
                  <LoadingButton loading={clientSearchLoading === 'PENDING'} type='submit' variant='contained' color='primary' sx={{ borderRadius: 20 }}>
                    Search
                  </LoadingButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </FormProvider>
    </>
  )
}
