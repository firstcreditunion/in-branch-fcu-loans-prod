import React, { useEffect } from 'react'

//* MUI
import { Stack, Typography, MenuItem, Divider, Box } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import Grid from '@mui/material/Unstable_Grid2'

//* MUI Icons
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'

//* Redux
import { useDispatch, useSelector } from 'react-redux'
import { sopAssetActions } from '../../redux/slices/sopAssetsSlice'

//* RHF And Yup
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

//* API Utils
import { BASE_URL_LOCAL_APP, BASE_URL_AWS_APP, processNodeEnv } from '../../redux/utils/apiConstants'

//* RHF Components
import FormProvider, { RHF_SOP_Input } from '../../components/RHF-mui-compoments'

export default function LoanDetails() {
  const dispatch = useDispatch()

  const homeAmt1 = useSelector((state) => state.sopAssetsReducer.home.amount1)
  const homeAndContents1 = useSelector((state) => state.sopAssetsReducer.homeAndContents.amount1)
  const vehicles1 = useSelector((state) => state.sopAssetsReducer.vehicles.amount1)
  const boat1 = useSelector((state) => state.sopAssetsReducer.boat.amount1)
  const savings1 = useSelector((state) => state.sopAssetsReducer.savings.amount1)
  const kiwisaver1 = useSelector((state) => state.sopAssetsReducer.kiwisaver.amount1)
  const s61 = useSelector((state) => state.sopAssetsReducer.s6.amount1)

  const onSubmitAssetDetails = useSelector((state) => state.sopAssetsReducer.onSubmitAssetDetails)

  const assetItems = [
    {
      id: 1,
      title: 'Home',
      groupBy: 'asset',
      amount1: homeAmt1,
      label: 'Home',
      controlName: '',
      sovereignKey: 'HOME',
      sovereignValue: 'Home',
      callbackfnAmt1: (event) => {
        dispatch(sopAssetActions.sethomeAmount1(parseFloat(event.target.value)))
      },
    },
    {
      id: 2,
      title: 'Home and Contents',
      groupBy: 'asset',
      amount1: homeAndContents1,
      label: 'Home and Contents',
      controlName: '',
      sovereignKey: 'HSHLDCNT',
      sovereignValue: 'Household Contents',
      callbackfnAmt1: (event) => {
        dispatch(sopAssetActions.setHomeAndContentsAmount1(parseFloat(event.target.value)))
      },
    },
    {
      id: 3,
      title: 'Vehicles',
      groupBy: 'asset',
      amount1: vehicles1,
      label: 'Vehicles',
      controlName: '',
      sovereignKey: 'MTRVHCAS',
      sovereignValue: 'Motor Vehicle/s',
      callbackfnAmt1: (event) => {
        dispatch(sopAssetActions.setVehiclesAmount1(parseFloat(event.target.value)))
      },
    },
    {
      id: 4,
      title: 'Boat',
      groupBy: 'asset',
      amount1: boat1,
      label: 'Boat',
      controlName: '',
      sovereignKey: 'BOAT',
      sovereignValue: 'Boat',
      callbackfnAmt1: (event) => {
        dispatch(sopAssetActions.setBoatAmount1(parseFloat(event.target.value)))
      },
    },
    {
      id: 5,
      title: 'Savings',
      groupBy: 'asset',
      amount1: savings1,
      label: 'Savings',
      controlName: '',
      sovereignKey: 'SAVNG',
      sovereignValue: 'Savings',
      callbackfnAmt1: (event) => {
        dispatch(sopAssetActions.setSavingsAmount1(parseFloat(event.target.value)))
      },
    },
    {
      id: 6,
      title: 'Kiwi Saver',
      groupBy: 'asset',
      amount1: kiwisaver1,
      label: 'Kiwi Saver',
      controlName: '',
      sovereignKey: 'KIWISUPER',
      sovereignValue: 'Kiwisaver/Superannuation',
      callbackfnAmt1: (event) => {
        dispatch(sopAssetActions.setKiwisaverAmount1(parseFloat(event.target.value)))
      },
    },
    {
      id: 7,
      title: 'FCU Loan Provider',
      groupBy: 'asset',
      amount1: s61,
      label: 'FCU Loan Provider',
      controlName: '',
      sovereignKey: 'ACCNTS6',
      sovereignValue: 'Bank Account S6',
      callbackfnAmt1: (event) => {
        dispatch(sopAssetActions.setS6Amount1(parseFloat(event.target.value)))
      },
    },
  ]

  const oddAssetItems = assetItems?.filter((asset) => {
    return parseInt(asset?.id) % 2 != 0
  })
  const evenAssetItems = assetItems?.filter((asset) => {
    return parseInt(asset?.id) % 2 === 0
  })

  // Defualt Values for React Hook Form
  const defaultValues = {
    homeAmt1: homeAmt1,
    homeAndContents1: homeAndContents1,
    vehicles1: vehicles1,
    boat1: boat1,
    savings1: savings1,
    kiwisaver1: kiwisaver1,
    s61: s61,
  }

  // Schema
  // const AssetSchema = Yup.object().shape({
  //   homeAmt1: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
  //   homeAndContents1: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
  //   vehicles1: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
  //   boat1: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
  //   savings1: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
  //   kiwisaver1: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
  //   s61: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
  // })

  //UseForm Methods from RHF
  const methods = useForm({
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

  useEffect(() => {
    if (onSubmitAssetDetails == null) return

    handleSubmit(onSubmit())()
  }, [onSubmitAssetDetails])

  useEffect(() => {
    dispatch(sopAssetActions.setIsValidAssetDetails(isValid))
  }, [isValid])

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction='row' alignItems='flex-start' justifyContent='center' spacing={10} sx={{ width: '100%', minHeight: '100%' }}>
          <Grid direction='column' md={6} sx={{ width: '100%', minHeight: '100%' }}>
            <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={2} sx={{ width: '100%', minWidth: 270 }}>
              <Typography variant='overline' color='secondary' sx={{ width: '100%', minWidth: 150 }}>
                Asset Item
              </Typography>
              <Typography variant='overline' color='secondary' sx={{ width: '100%', minWidth: 120 }}>
                Value
              </Typography>
            </Stack>
            {oddAssetItems.map((assetItem) => {
              return (
                <Box key={assetItem?.id} sx={{ flexGrow: 1, py: 0.5 }}>
                  <RHF_SOP_Input key={assetItem?.id} name={assetItem?.sovereignKey} itemNameLength={150} incomeItemName={assetItem?.title} amount1={assetItem?.amount1} onAmount1Change={assetItem?.callbackfnAmt1} hasAmount2={false} hasAmount3={false} />
                </Box>
              )
            })}
          </Grid>
          <Grid direction='column' md={6} sx={{ width: '100%', minHeight: '100%' }}>
            <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={2} sx={{ width: '100%', minWidth: 270 }}>
              <Typography variant='overline' color='secondary' sx={{ width: '100%', minWidth: 150 }}>
                Asset Item
              </Typography>
              <Typography variant='overline' color='secondary' sx={{ width: '100%', minWidth: 120 }}>
                Value
              </Typography>
            </Stack>
            {evenAssetItems.map((assetItem) => {
              return (
                <Box key={assetItem?.id} sx={{ flexGrow: 1, py: 0.5 }}>
                  <RHF_SOP_Input key={assetItem?.id} name={assetItem?.sovereignKey} itemNameLength={150} incomeItemName={assetItem?.title} amount1={assetItem?.amount1} onAmount1Change={assetItem?.callbackfnAmt1} hasAmount2={false} hasAmount3={false} />
                </Box>
              )
            })}
          </Grid>
        </Grid>
      </FormProvider>
    </>
  )
}
