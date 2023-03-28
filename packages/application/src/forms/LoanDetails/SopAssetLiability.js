import React, { useEffect } from 'react'

// Framer motion
import { motion, AnimatePresence } from 'framer-motion'
import { varFade } from '../../components/ui/animate'

// Yup
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { sopAssetLiabilityActions } from '../../redux/slices/sopAssetsLiabilitiesSlice'

// Custom componenets for SOP
import SopTextFieldAssetLiability from './SOP-userInterface/SopTextFieldAssetLiability'
import AssetsAutocomplete from './SOP-userInterface/AssetsAutocomplete'
import LiabilitiesAutocomplete from './SOP-userInterface/LiabilitiesAutocomplete'

// MUI
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Chip, Divider } from '@mui/material'

// schema passed to React Hook Form
const schema = yup.object().shape({
  // Assets
  asset_home: yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
  asset_Home_and_Contents: yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
  asset_vehicles: yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
  asset_boat: yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
  asset_savings: yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
  asset_kiwisaver: yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
  asset_nzsuper: yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
  asset_s6: yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),

  // Liabilities
  liability_mortgage: yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Amount should be greater than $0.00').nullable(),
  liability_storecard: yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Amount should be greater than $0.00').nullable(),
  liability_Mastercard: yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Amount should be greater than $0.00').nullable(),
  liability_Visa: yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Amount should be greater than $0.00').nullable(),
  liability_studentloan: yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Amount should be greater than $0.00').nullable(),
  liability_otherloan1: yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Amount should be greater than $0.00').nullable(),
})

export default function SopIncomeExpenditure() {
  //***************** Asset Selectors *********************/

  // Asset and liabilities Selected by user
  const checkedAssetCodes = useSelector((state) => state.sopAssetLiabilityReducer.checkedAssetCodes)
  const checkedLiabilityCodes = useSelector((state) => state.sopAssetLiabilityReducer.checkedLiabilityCodes)

  //Asset objects from redux
  const asset_home = useSelector((state) => state.sopAssetLiabilityReducer.asset.asset_home)
  const asset_Home_and_Contents = useSelector((state) => state.sopAssetLiabilityReducer.asset.asset_Home_and_Contents)
  const asset_vehicles = useSelector((state) => state.sopAssetLiabilityReducer.asset.asset_vehicles)
  const asset_boat = useSelector((state) => state.sopAssetLiabilityReducer.asset.asset_boat)
  const asset_savings = useSelector((state) => state.sopAssetLiabilityReducer.asset.asset_savings)
  const asset_kiwisaver = useSelector((state) => state.sopAssetLiabilityReducer.asset.asset_kiwisaver)
  const asset_nzsuper = useSelector((state) => state.sopAssetLiabilityReducer.asset.asset_nzsuper)
  const asset_s6 = useSelector((state) => state.sopAssetLiabilityReducer.asset.asset_s6)
  // const asset_other1 = useSelector((state) => state.sopAssetLiabilityReducer.asset.asset_other1)
  // const asset_other2 = useSelector((state) => state.sopAssetLiabilityReducer.asset.asset_other2)

  //***************** Liability Selectors *********************/

  // liability objects from redux
  const liability_mortgage = useSelector((state) => state.sopAssetLiabilityReducer.liability.liability_mortgage)
  const liability_storecard = useSelector((state) => state.sopAssetLiabilityReducer.liability.liability_storecard)
  const liability_Mastercard = useSelector((state) => state.sopAssetLiabilityReducer.liability.liability_Mastercard)
  const liability_Visa = useSelector((state) => state.sopAssetLiabilityReducer.liability.liability_Visa)
  const liability_studentloan = useSelector((state) => state.sopAssetLiabilityReducer.liability.liability_studentloan)
  const liability_otherloan1 = useSelector((state) => state.sopAssetLiabilityReducer.liability.liability_otherloan1)
  // const liability_otherliability1 = useSelector((state) => state.sopAssetLiabilityReducer.liability.liability_otherliability1)
  // const liability_otherliability2 = useSelector((state) => state.sopAssetLiabilityReducer.liability.liability_otherliability2)

  // Form Submission
  const onSubmitSopAssetLiability = useSelector((state) => state.sopAssetLiabilityReducer.onSubmitSopAssetLiability)

  //---------------- state to control dialog box for frequency

  const dispatch = useDispatch()

  // *********** Asset asn Liability dispatch ********** //

  // Autocomplete MUI to handle Asset and Libility Types
  const handleAssetTypeChange = (event, newValue) => {
    //Get Asset Codes from autocomplete component
    const checkedAssetCodesAutocomplete = newValue.map((asset) => {
      return asset.code
    })

    dispatch(sopAssetLiabilityActions.setSelectedAssetTypes(checkedAssetCodesAutocomplete))
  }

  const handleLiabilityTypeChange = (event, newValue) => {
    //Get Libility Codes from autocomplete component
    const checkedLiabilityCodesAutocomplete = newValue.map((liability) => {
      return liability.code
    })

    dispatch(sopAssetLiabilityActions.setSelectedLiabilityTypes(checkedLiabilityCodesAutocomplete))
  }

  //--------------------------- Functions to handle SOP Asset Textfield ----------------------------------- //

  // Home 1
  const handleAssetHomeAmount = (event) => {
    dispatch(sopAssetLiabilityActions.setAssetHomeAmount(parseInt(event.target.value) - 0))
  }
  // Home and Content 2
  const handleAssetHomeAndContentsAmount = (event) => {
    dispatch(sopAssetLiabilityActions.setAssetHomeAndContentsAmount(parseInt(event.target.value) - 0))
  }

  // Vehicles
  const handleAssetVehiclesAmount = (event) => {
    dispatch(sopAssetLiabilityActions.setAssetVehiclesAmount(parseInt(event.target.value) - 0))
  }

  //Boat
  const handleAssetBoatAmount = (event) => {
    dispatch(sopAssetLiabilityActions.setAssetBoatAmount(parseInt(event.target.value) - 0))
  }

  //Savings
  const handleAssetSavingsAmount = (event) => {
    dispatch(sopAssetLiabilityActions.setAssetSavingsAmount(parseInt(event.target.value) - 0))
  }

  //Kiwisaver
  const handleAssetKiwisaverAmount = (event) => {
    dispatch(sopAssetLiabilityActions.setAssetKiwisaverAmount(parseInt(event.target.value) - 0))
  }

  //NZ Super
  const handleAssetNzSuperAmount = (event) => {
    dispatch(sopAssetLiabilityActions.setAssetNzSuperAmount(parseInt(event.target.value) - 0))
  }

  //S6
  const handleAssetFcuLoanProviderAmount = (event) => {
    dispatch(sopAssetLiabilityActions.setAssetFcuLoanProviderAmount(parseInt(event.target.value) - 0))
  }

  // //Other Asset1
  // const handleAssetOtherAssset1Amount = (event) => {
  //   dispatch(sopAssetLiabilityActions.setAssetOtherAsset1Amount(parseInt(event.target.value) - 0))
  // }
  // //Other Asset2
  // const handleAssetOtherAsset2Amount = (event) => {
  //   dispatch(sopAssetLiabilityActions.setAssetOtherAsset2Amount(parseInt(event.target.value) - 0))
  // }

  // -------------- End of Asset dispatch ----------------- //

  //***************** Liability Disptach *********************/

  //--------------------------- Functions to handle SOP Liability Textfield ----------------------------------- //

  // Mortgage
  const handleLiabilityMortgageAmount = (event) => {
    dispatch(sopAssetLiabilityActions.setLiabilityMortgageAmount(parseInt(event.target.value) - 0))
  }

  // Storecard
  const handleLiabilityStoreCardAmount = (event) => {
    dispatch(sopAssetLiabilityActions.setLiabilityStorecardAmount(parseInt(event.target.value) - 0))
  }

  // Mastercard
  const handleLiabilityMastercardAmount = (event) => {
    dispatch(sopAssetLiabilityActions.setLiabilityMastercardAmount(parseInt(event.target.value) - 0))
  }
  // Visa
  const handleLiabilityVisaAmount = (event) => {
    dispatch(sopAssetLiabilityActions.setLiabilityVisaAmount(parseInt(event.target.value) - 0))
  }

  // StudentLoan
  const handleLiabilityStudentLoanAmount = (event) => {
    dispatch(sopAssetLiabilityActions.setLiabilityStudentLoanAmount(parseInt(event.target.value) - 0))
  }

  const handleLiabilityOtherLoan1Amount = (event) => {
    dispatch(sopAssetLiabilityActions.setLiabilityOtherLoan1Amount(parseInt(event.target.value) - 0))
  }

  // //OtherLiability1
  // const handleLiabilityOtherLiability1Amount = (event) => {
  //   dispatch(sopAssetLiabilityActions.setLiabilityOtherLiability1Amount(parseInt(event.target.value) - 0))
  // }

  // //OtherLiability1
  // const handleLiabilityOtherLiability2Amount = (event) => {
  //   dispatch(sopAssetLiabilityActions.setLiabilityOtherLiability1Amount(parseInt(event.target.value) - 0))
  // }

  // -------------- End of Liability dispatch ----------------- //

  // Media Queries
  const downlg = useMediaQuery((theme) => theme.breakpoints.down('lg'))
  const downMd = useMediaQuery((theme) => theme.breakpoints.down('md'))
  const downSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  // React-Hook-Form
  const {
    formState: { isValid },
    control,
    handleSubmit,
  } = useForm({
    defaultValues: {
      asset_home: asset_home.amount,
      asset_Home_and_Contents: asset_Home_and_Contents.amount,
      asset_vehicles: asset_vehicles.amount,
      asset_boat: asset_boat.amount,
      asset_savings: asset_savings.amount,
      asset_kiwisaver: asset_kiwisaver.amount,
      asset_nzsuper: asset_nzsuper.amount,
      asset_s6: asset_s6.amount,

      liability_mortgage: liability_mortgage.amount,
      liability_storecard: liability_storecard.amount,
      liability_Mastercard: liability_Mastercard.amount,
      liability_Visa: liability_Visa.amount,
      liability_studentloan: liability_studentloan.amount,
      liability_otherloan1: liability_otherloan1.amouont,
    },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    dispatch(sopAssetLiabilityActions.setIsValidSopAssetLiabilityDetails(isValid))
  }, [isValid])

  useEffect(() => {
    if (onSubmitSopAssetLiability != null) {
      handleSubmit(onSubmit())()
      return
    }
  }, [onSubmitSopAssetLiability])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [])

  function onSubmit() {
    console.log('Asset and Liability Submitted')
  }

  // Framer Motion for Asset SOP text fields
  const varHome1 = checkedAssetCodes.includes('AHME')
    ? varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).inRight
    : varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).outRight

  const varHomeContents2 = checkedAssetCodes.includes('AHCTS')
    ? varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).inRight
    : varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).outRight

  const varVehicles = checkedAssetCodes.includes('AVEH')
    ? varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).inRight
    : varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).outRight

  const varBoat = checkedAssetCodes.includes('ABOT')
    ? varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).inRight
    : varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).outRight

  const varASavings = checkedAssetCodes.includes('ASVS')
    ? varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).inRight
    : varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).outRight

  const varKiwisaver = checkedAssetCodes.includes('AKWS')
    ? varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).inRight
    : varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).outRight

  const varNzsuper = checkedAssetCodes.includes('ANZPR')
    ? varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).inRight
    : varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).outRight

  const varLoanProvider = checkedAssetCodes.includes('ALNPR')
    ? varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).inRight
    : varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).outRight

  // Framaer Motion for Liability SOP text fields

  const varMortgage = checkedLiabilityCodes.includes('LMRG')
    ? varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).inRight
    : varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).outRight
  const varStorecard = checkedLiabilityCodes.includes('LSCRD')
    ? varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).inRight
    : varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).outRight
  const varMastercard = checkedLiabilityCodes.includes('LMCRD')
    ? varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).inRight
    : varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).outRight
  const varVisacard = checkedLiabilityCodes.includes('LVCRD')
    ? varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).inRight
    : varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).outRight
  const varStudentloan = checkedLiabilityCodes.includes('LSLN')
    ? varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).inRight
    : varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).outRight

  const varOtherloan1 = checkedLiabilityCodes.includes('LOTHLOAN1')
    ? varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).inRight
    : varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).outRight

  //JSX
  return (
    <Box sx={{ px: 0, height: '100%' }}>
      {/* <LabelStyle>Please fill in the table below and select the appropriate option to show how often you are paid/pay each item.</LabelStyle> */}
      <Stack direction={downMd ? 'column' : 'row'} justifyContent='space-evenly' alignItems='center' spacing={4} sx={{ height: '100%' }}>
        <Card sx={{ width: downMd ? '100%' : '50%', height: '100%', px: downSm ? 0 : 5, pb: 3, boxShadow: (theme) => theme.customShadows.dropdwon }}>
          <CardHeader title='Your Assets' subheader='' />
          <CardContent sx={{ p: downSm ? 1 : 2 }}>
            <Stack direction='column' spacing={2} justifyContent='flex-start' alignItems='stretch'>
              <AssetsAutocomplete name='assettypes' control={control} onAssetChange={handleAssetTypeChange} helperTextInput='Choose all your assets' />
              {checkedAssetCodes.length > 0 && (
                <Divider sx={{ pb: 2 }}>
                  <Chip label={<Typography sx={{ fontSize: 11 }}>How much do you own?</Typography>} />
                </Divider>
              )}
              <AnimatePresence>
                {checkedAssetCodes.includes('AHME') && (
                  <motion.div {...varHome1}>
                    <SopTextFieldAssetLiability name='asset_home' control={control} label={asset_home.label} onSopTextFieldChange={handleAssetHomeAmount} />
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {checkedAssetCodes.includes('AHCTS') && (
                  <motion.div {...varHomeContents2}>
                    <SopTextFieldAssetLiability name='asset_Home_and_Contents' control={control} label={asset_Home_and_Contents.label} onSopTextFieldChange={handleAssetHomeAndContentsAmount} />
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {checkedAssetCodes.includes('AVEH') && (
                  <motion.div {...varVehicles}>
                    <SopTextFieldAssetLiability name='asset_vehicles' control={control} label={asset_vehicles.label} onSopTextFieldChange={handleAssetVehiclesAmount} />
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {checkedAssetCodes.includes('ABOT') && (
                  <motion.div {...varBoat}>
                    <SopTextFieldAssetLiability name='asset_boat' control={control} label={asset_boat.label} onSopTextFieldChange={handleAssetBoatAmount} />
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {checkedAssetCodes.includes('ASVS') && (
                  <motion.div {...varASavings}>
                    <SopTextFieldAssetLiability name='asset_savings' control={control} label={asset_savings.label} onSopTextFieldChange={handleAssetSavingsAmount} />
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {checkedAssetCodes.includes('AKWS') && (
                  <motion.div {...varKiwisaver}>
                    <SopTextFieldAssetLiability name='asset_kiwisaver' control={control} label={asset_kiwisaver.label} onSopTextFieldChange={handleAssetKiwisaverAmount} />
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {checkedAssetCodes.includes('ANZPR') && (
                  <motion.div {...varNzsuper}>
                    <SopTextFieldAssetLiability name='asset_nzsuper' control={control} label={asset_nzsuper.label} onSopTextFieldChange={handleAssetNzSuperAmount} />
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {checkedAssetCodes.includes('ALNPR') && (
                  <motion.div {...varLoanProvider}>
                    <SopTextFieldAssetLiability name='asset_s6' control={control} label={asset_s6.label} onSopTextFieldChange={handleAssetFcuLoanProviderAmount} />
                  </motion.div>
                )}
              </AnimatePresence>
              {/* <AnimatePresence>
                {checkedAssetCodes.includes('AOTH1') && (
                  <motion.div {...varotherasset1}>
                    <SopTextFieldAssetLiability name='asset_other1' control={control} label={asset_other1.label} onSopTextFieldChange={handleAssetOtherAssset1Amount} />
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {checkedAssetCodes.includes('AOTH2') && (
                  <motion.div {...varotherasset2}>
                    <SopTextFieldAssetLiability name='asset_other2' control={control} label={asset_other2.label} onSopTextFieldChange={handleAssetOtherAsset2Amount} />
                  </motion.div>
                )}
              </AnimatePresence> */}
            </Stack>
          </CardContent>
        </Card>
        <Card sx={{ width: downMd ? '100%' : '50%', height: '100%', px: downSm ? 0 : 5, pb: 3, boxShadow: (theme) => theme.customShadows.dropdwon }}>
          <CardHeader title='Your Liabilities' subheader='' />
          <CardContent sx={{ p: downSm ? 1 : 2 }}>
            <Stack direction='column' spacing={2} justifyContent='flex-start' alignItems='stretch'>
              <LiabilitiesAutocomplete name='liabilitytypes' control={control} onLiabilityChange={handleLiabilityTypeChange} helperTextInput='Choose all your Liabilities' />
              {checkedLiabilityCodes.length > 0 && (
                <Divider sx={{ pb: 2 }}>
                  <Chip label={<Typography sx={{ fontSize: 11 }}>How much do you owe?</Typography>} />
                </Divider>
              )}
              <AnimatePresence>
                {checkedLiabilityCodes.includes('LMRG') && (
                  <motion.div {...varMortgage}>
                    <SopTextFieldAssetLiability name='liability_mortgage' control={control} label={liability_mortgage.label} onSopTextFieldChange={handleLiabilityMortgageAmount} />
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {checkedLiabilityCodes.includes('LSCRD') && (
                  <motion.div {...varStorecard}>
                    <SopTextFieldAssetLiability name='liability_storecard' control={control} label={liability_storecard.label} onSopTextFieldChange={handleLiabilityStoreCardAmount} />
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {checkedLiabilityCodes.includes('LMCRD') && (
                  <motion.div {...varMastercard}>
                    <SopTextFieldAssetLiability name='liability_Mastercard' control={control} label={liability_Mastercard.label} onSopTextFieldChange={handleLiabilityMastercardAmount} f />
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {checkedLiabilityCodes.includes('LVCRD') && (
                  <motion.div {...varVisacard}>
                    <SopTextFieldAssetLiability name='liability_Visa' control={control} label={liability_Visa.label} onSopTextFieldChange={handleLiabilityVisaAmount} />
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {checkedLiabilityCodes.includes('LSLN') && (
                  <motion.div {...varStudentloan}>
                    <SopTextFieldAssetLiability name='liability_studentloan' control={control} label={liability_studentloan.label} onSopTextFieldChange={handleLiabilityStudentLoanAmount} />
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {checkedLiabilityCodes.includes('LOTHLOAN1') && (
                  <motion.div {...varOtherloan1}>
                    <SopTextFieldAssetLiability name='liability_otherloan1' control={control} label={liability_otherloan1.label} onSopTextFieldChange={handleLiabilityOtherLoan1Amount} />
                  </motion.div>
                )}
              </AnimatePresence>
              {/* <AnimatePresence>
                {checkedLiabilityCodes.includes('LOTH1') && (
                  <motion.div {...varOtherliability1}>
                    <SopTextFieldAssetLiability name='liability_otherliability1' control={control} label={liability_otherliability1.label} onSopTextFieldChange={handleLiabilityOtherLiability1Amount} />
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {checkedLiabilityCodes.includes('LOTH2') && (
                  <motion.div {...varOtherliability2}>
                    <SopTextFieldAssetLiability name='liability_otherliability2' control={control} label={liability_otherliability2.label} onSopTextFieldChange={handleLiabilityOtherLiability2Amount} />
                  </motion.div>
                )}
              </AnimatePresence> */}
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  )
}
