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
import { loanDetailsActions } from '../../redux/slices/loanDetailsSlice'
import { creditScoreActions } from '../../redux/slices/creditScoreSlice'
import { getPrimeClientGeneralDetails } from '../../redux/slices/clientSearchSlice'
import { authorisationActions } from '../../redux/slices/authorisationSlice'
import { additionalInfoPart2Actions } from '../../redux/slices/additionalInfoPart2Slice'
import { verifyPrimeDetailsActions } from '../../redux/slices/verifyPrimeDetailsSlice'
import { sopIncomeGridSliceActions } from '../../redux/slices/sopIncomeSlice'
import { sopExpenseAction } from '../../redux/slices/sopExpenseSlice'
import { sopRelatedQuestionActions } from '../../redux/slices/sopRelatedQuestionsSlice'

//* RHF And Yup
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

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
  const primeclientNumber = useSelector((state) => state.clientSearchReducer.primeclientNumber)
  const clientSearchLoading = useSelector((state) => state.clientSearchReducer.primeloading)
  const primecurrentRequestId = useSelector((state) => state.clientSearchReducer.primecurrentRequestId)
  const primeid = useSelector((state) => state.clientSearchReducer.primeid)

  const defaultValues = {
    primeclientNumber: primeclientNumber,
  }

  // Schema
  const ClientNumberSearchSchema = Yup.object().shape({
    primeclientNumber: Yup.string().required('Member number is required').nullable(),
  })

  //UseForm Methods from RHF
  const methods = useForm({
    resolver: yupResolver(ClientNumberSearchSchema),
    defaultValues,
  })

  // console.log('ClientNumberSearchSchema: ', ClientNumberSearchSchema)

  // Destructure Methods
  const { handleSubmit } = methods

  const onSubmit = (event) => {
    getPrimeClientPersonalDetails()
  }

  function setPrimeClientNumber(event) {
    dispatch(clientSearchActions.setPrimeClientNumber(event.target.value))
  }

  async function getPrimeClientPersonalDetails() {
    //? Data before searching for a new client number
    dispatch(clientSearchActions.clearPrimeMemberDetails())
    dispatch(authorisationActions.clearPrivacyDeclaration(false))
    dispatch(creditScoreActions.clearSustainabilityPart1Details())
    dispatch(additionalInfoPart2Actions.clearSustainabilityPart2Details())
    dispatch(verifyPrimeDetailsActions.clearMemberDetailsVerification())
    dispatch(sopIncomeGridSliceActions.clearIncome())
    dispatch(sopExpenseAction.clearExpense())
    dispatch(sopRelatedQuestionActions.clearAffordabilityTest())

    var clientData = JSON.stringify({
      clientID: primeclientNumber,
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

    const clientDetailsResult = await dispatch(getPrimeClientGeneralDetails(personalDetialsConfig))

    const ire = clientDetailsResult?.payload?.axiosResponse?.IRE_estimate
    const lending = clientDetailsResult?.payload?.axiosResponse?.lending
    const discounts = ire?.Discounts

    const baseRate = ire?.Base
    const loyalty = discounts?.Loyalty
    const products = discounts?.Products

    const estimatedInterestRate = ire?.Estimated_interest_rate

    dispatch(loanDetailsActions.setBaseRateInterest(baseRate))

    if (loyalty < 0) {
      dispatch(loanDetailsActions.setMembershipLoyaltyDiscountCheck(true))
    } else {
      dispatch(loanDetailsActions.setMembershipLoyaltyDiscountCheck(false))
    }

    if (products < 0) {
      dispatch(loanDetailsActions.setThreeOrMoreProductsDiscountCheck(true))
    } else {
      dispatch(loanDetailsActions.setThreeOrMoreProductsDiscountCheck(false))
    }

    dispatch(loanDetailsActions.setEstimatedInterestRate(estimatedInterestRate))

    if (lending?.Total_arrears > 0) {
      dispatch(creditScoreActions.setIsMemberInArrearsWithFCU('Y'))
    } else {
      dispatch(creditScoreActions.setIsMemberInArrearsWithFCU('N'))
    }
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
            color='primary'
            sx={{
              textAlign: 'center',
              textTransform: 'uppercase',
              fontWeight: 'light',
              letterSpacing: 3,
            }}
          >
            Search a Member
          </Typography>
          <RHFTextField
            name='primeclientNumber'
            placeholder='Member Number'
            label=''
            autoFocus={true}
            onInputChange={setPrimeClientNumber}
            value={primeclientNumber}
            InputProps={{
              type: 'number',
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position='end'>
                  <LoadingButton loading={clientSearchLoading === 'PENDING'} type='submit' variant='contained' color='secondary' sx={{ borderRadius: 20 }}>
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
