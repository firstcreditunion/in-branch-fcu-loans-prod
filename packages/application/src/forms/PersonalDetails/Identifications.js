import React, { useEffect } from 'react'

// React Hook Form
import { useForm } from 'react-hook-form'

// Framer motion
import { motion, AnimatePresence } from 'framer-motion'
import { varFade, varFlip } from '../../components/ui/animate'

// MUI
import { Box, Stack, Grid, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Slide from '@mui/material/Slide'
import useMediaQuery from '@mui/material/useMediaQuery'

import { PRIMARY, SECONDARY } from '../../theme/palette'

// Custom Components
import AutocompleteIDTypes from './IdentificationTypes-Interface/AutocompleteIDTypes'
// import IdentificationComboBox from './IdentificationTypes-Interface/IdentificationComboBox'

//Identification Components
import GoldCard from './IdentificationTypes/GoldCard'
import Passport from './IdentificationTypes/Passport'
import KiwiAccessCard from './IdentificationTypes/KiwiAccessCard'
import DriversLicence from './IdentificationTypes/DriversLicence'
import FirearmsLicence from './IdentificationTypes/FirearmsLicence'
import BirthCertificate from './IdentificationTypes/BirthCertificate'
import CurrentStudentId from './IdentificationTypes/CurrentStudentId'
import CommunityServiceCard from './IdentificationTypes/CommunityServiceCard'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { identificationActions } from '../../redux/slices/identificationSlice'

export default function Identifications() {
  // const downMd = useMediaQuery((theme) => theme.breakpoints.down('md'))
  const downSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  function SlideTransition(props) {
    return <Slide {...props} direction='up' />
  }

  const [openSuccessOneID, setOpenSuccessOneID] = React.useState({
    open: false,
    Transition: SlideTransition,
  })
  const [openSuccessTwoIDs, setOpenSuccessTwoIDs] = React.useState({
    open: false,
    Transition: SlideTransition,
  })
  const [openWarning, setOpenWarning] = React.useState({
    open: false,
    Transition: SlideTransition,
  })
  const [openError, setOpenError] = React.useState({
    open: false,
    Transition: SlideTransition,
  })

  const varFlipAlert = varFlip({
    durationIn: 0.32,
    durationOut: 0.0,
  }).inX

  const checkedIdentificationTypes = useSelector((state) => state.identificationReducer.checkedIdentificationTypes)
  const idSelected = useSelector((state) => state.identificationReducer.idSelected)
  const validIdsRedux = useSelector((state) => state.identificationReducer.validIds)
  const idsRequiredRedux = useSelector((state) => state.identificationReducer.idsRequired)

  const identificationTypes = useSelector((state) => state.identificationReducer.identificationTypes)
  const idTypeValues = Object.values(identificationTypes)
  const selectBoxItems = idTypeValues.map((identification) => {
    return identification.autoComplete
  })

  const drivers_licence = useSelector((state) => state.identificationReducer.identificationTypes.drivers_licence.data.driversLicenceNo)
  const passport = useSelector((state) => state.identificationReducer.identificationTypes.passport.data.passportNo)
  const firearms_licence = useSelector((state) => state.identificationReducer.identificationTypes.firearms_licence.data.firearmsLicenceNo)
  const kiwi_access_card = useSelector((state) => state.identificationReducer.identificationTypes.kiwi_access_card.data.kiwiAccessCardNo)
  const community_service_card = useSelector((state) => state.identificationReducer.identificationTypes.community_service_card.data.commServiceCardNo)
  const birth_certificate = useSelector((state) => state.identificationReducer.identificationTypes.birth_certificate.data.birthCertificateRegNo)
  const current_Student_id = useSelector((state) => state.identificationReducer.identificationTypes.current_Student_id.data.currStudentIdNo)
  const gold_card = useSelector((state) => state.identificationReducer.identificationTypes.gold_card.data.goldCardNo)
  // const marriage_certificate = useSelector((state) => state.identificationReducer.identificationTypes.marriage_certificate.data.marriageCerrificateRegNo)

  const onSubmitDrLicenceDetails = useSelector((state) => state.identificationReducer.onSubmitDrLicenceDetails)
  const onSubmitPassportDetails = useSelector((state) => state.identificationReducer.onSubmitPassportDetails)
  const onSubmitFirearmsLicenceDetails = useSelector((state) => state.identificationReducer.onSubmitFirearmsLicenceDetails)
  const onSubmitKiwiAccessCardDetails = useSelector((state) => state.identificationReducer.onSubmitKiwiAccessCardDetails)
  const onSubmitCommunityServiceCardDetails = useSelector((state) => state.identificationReducer.onSubmitCommunityServiceCardDetails)
  const onSubmitBrithCertificateDetails = useSelector((state) => state.identificationReducer.onSubmitBrithCertificateDetails)
  const onSubmitCurrStudentIDDetails = useSelector((state) => state.identificationReducer.onSubmitCurrStudentIDDetails)
  const onSubmitGoldCardDetails = useSelector((state) => state.identificationReducer.onSubmitGoldCardDetails)

  const validDrLicenceCounter = useSelector((state) => state.identificationReducer.validDrLicenceCounter)
  const validPassportCounter = useSelector((state) => state.identificationReducer.validPassportCounter)
  const validFirearmsLicenceCounter = useSelector((state) => state.identificationReducer.validFirearmsLicenceCounter)
  const validKiwiAccessCardCounter = useSelector((state) => state.identificationReducer.validKiwiAccessCardCounter)
  const validCommunityServiceCardCounter = useSelector((state) => state.identificationReducer.validCommunityServiceCardCounter)
  const validBrithCertificateCounter = useSelector((state) => state.identificationReducer.validBrithCertificateCounter)
  const validCurrStudentIDCounter = useSelector((state) => state.identificationReducer.validCurrStudentIDCounter)
  const validGoldCardCounter = useSelector((state) => state.identificationReducer.validGoldCardCounter)

  const onSubmitIdentificationDetails = useSelector((state) => state.identificationReducer.onSubmitIdentificationDetails)

  const dispatch = useDispatch()

  // *********** Identification Types Disptach ********** //

  // Autocomplete MUI to handle Identificaation Types
  const handleIdentificationTypeChange = (event, newValue) => {
    const checkedIDCodesAutocomplete = newValue.map((Id) => {
      return Id.code
    })
    dispatch(identificationActions.setSelectedIdentificationTypes(checkedIDCodesAutocomplete))
    dispatch(identificationActions.setIdsSelected(checkedIDCodesAutocomplete.length))

    dispatch(identificationActions.setIDsRequired(1))

    // if (checkedIDCodesAutocomplete.includes('PASPRT') || checkedIDCodesAutocomplete.includes('FIRELICENS')) {
    //   dispatch(identificationActions.setIDsRequired(1))
    // } else {
    //   dispatch(identificationActions.setIDsRequired(2))
    // }
  }

  // const handleIdentificationComboTypeChange = (event, newValue) => {
  //   // console.log('EVENT:', event)
  //   // console.log('EVENT TARGET VALUE:', event.target.value)

  //   // console.log('Select Box Items:', selectBoxItems)

  //   const selectedEventTargetValues = event.target.value

  //   // const selectedIds = selectedEventTargetValues?.map((value) => {
  //   //   return selectBoxItems?.map((id) => {
  //   //     console.log('ID from selectedBoxItems VALUE: ', value)
  //   //     console.log('ID from selectedBoxItems TITLE: ', id?.title)
  //   //     id?.title === value
  //   //   })
  //   // })

  //   const SelectedIdsFilter = selectBoxItems?.filter((id) => {
  //     console.log('id?.title: ', id?.title)
  //     console.log('selectedEventTargetValues: ', selectedEventTargetValues)
  //     return selectedEventTargetValues?.includes(id?.title)
  //   })
  //   // console.log('Selected IDS:', selectedIds)
  //   console.log('Selected IDS Filtered:', SelectedIdsFilter)

  //   // const checkedIDCodesAutocomplete = newValue.map((Id) => {
  //   //   return Id.code
  //   // })

  //   // const selectedIdsComboBox = event?.target?.value

  //   dispatch(identificationActions.setSelectedIdentificationTypes(SelectedIdsFilter))
  //   dispatch(identificationActions.setIdsSelected(SelectedIdsFilter.length))

  //   dispatch(identificationActions.setIDsRequired(1))

  //   // if (checkedIDCodesAutocomplete.includes('PASPRT') || checkedIDCodesAutocomplete.includes('FIRELICENS')) {
  //   //   dispatch(identificationActions.setIDsRequired(1))
  //   // } else {
  //   //   dispatch(identificationActions.setIDsRequired(2))
  //   // }
  // }

  // const removeIdentificationFromSelect = (data) => {
  //   console.log('Data from onDELETE Chip:', data)
  // }

  //* React-Hook-Form
  const {
    formState: { isValid },
    control,
    handleSubmit,
  } = useForm({
    defaultValues: {
      drivers_licence: drivers_licence,
      passport: passport,
      firearms_licence: firearms_licence,
      kiwi_access_card: kiwi_access_card,
      community_service_card: community_service_card,
      birth_certificate: birth_certificate,
      current_Student_id: current_Student_id,
      gold_card: gold_card,
    },
    mode: 'onBlur',
  })

  const varTitle = varFade({
    distance: 10,
    durationIn: 0.32,
    durationOut: 0.32,
  }).inDown

  const varSubtitle = varFade({
    distance: 10,
    durationIn: 0.32,
    durationOut: 0.32,
  }).inRight

  const varIdentification = varFade({
    distance: 20,
    durationIn: 0.32,
    durationOut: 0.32,
  }).inLeft

  const handleCloseWarning = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenWarning({
      ...openWarning,
      open: false,
    })
  }

  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenError({
      ...openError,
      open: false,
    })
  }

  const handleCloseSuccessOneID = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSuccessOneID({
      ...openSuccessOneID,
      open: false,
    })
  }

  const handleCloseSuccessTwoIDs = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSuccessTwoIDs({
      ...openSuccessTwoIDs,
      open: false,
    })
  }

  useEffect(() => {
    // Submit Driver Licence
    if (checkedIdentificationTypes.includes('DRVLSC')) {
      if (onSubmitDrLicenceDetails === null) {
        dispatch(identificationActions.setOnSubmitDrLicenceDetails(true))
      } else {
        dispatch(identificationActions.setOnSubmitDrLicenceDetails(!onSubmitDrLicenceDetails))
      }
    }

    // Submit Passport
    if (checkedIdentificationTypes.includes('PASPRT')) {
      if (onSubmitPassportDetails === null) {
        dispatch(identificationActions.setOnSubmitPassportDetails(true))
      } else {
        dispatch(identificationActions.setOnSubmitPassportDetails(!onSubmitPassportDetails))
      }
    }

    // Submit Firearms Licence
    if (checkedIdentificationTypes.includes('FIRELICENS')) {
      if (onSubmitFirearmsLicenceDetails === null) {
        dispatch(identificationActions.setOnSubmitFirearmsLicenceDetails(true))
      } else {
        dispatch(identificationActions.setOnSubmitFirearmsLicenceDetails(!onSubmitFirearmsLicenceDetails))
      }
    }

    // Submit Kiwi Access Card
    if (checkedIdentificationTypes.includes('KIWACCCRD')) {
      if (onSubmitKiwiAccessCardDetails === null) {
        dispatch(identificationActions.setOnSubmitKiwiAccessCardDetails(true))
      } else {
        dispatch(identificationActions.setOnSubmitKiwiAccessCardDetails(!onSubmitKiwiAccessCardDetails))
      }
    }

    // Submit Community Service Card
    if (checkedIdentificationTypes.includes('COMSERVCRD')) {
      if (onSubmitCommunityServiceCardDetails === null) {
        dispatch(identificationActions.setOnSubmitCommunityServiceCardDetails(true))
      } else {
        dispatch(identificationActions.setOnSubmitCommunityServiceCardDetails(!onSubmitCommunityServiceCardDetails))
      }
    }

    // Submit Birth Certificate
    if (checkedIdentificationTypes.includes('BIRTHCERT')) {
      if (onSubmitBrithCertificateDetails === null) {
        dispatch(identificationActions.setOnSubmitBrithCertificateDetails(true))
      } else {
        dispatch(identificationActions.setOnSubmitBrithCertificateDetails(!onSubmitBrithCertificateDetails))
      }
    }

    // Submit Current Student ID
    if (checkedIdentificationTypes.includes('CURSTUDID')) {
      if (onSubmitCurrStudentIDDetails === null) {
        dispatch(identificationActions.setOnSubmitCurrStudentIDDetails(true))
      } else {
        dispatch(identificationActions.setOnSubmitCurrStudentIDDetails(!onSubmitCurrStudentIDDetails))
      }
    }

    // Submit Gold Card
    if (checkedIdentificationTypes.includes('GOLDCARD')) {
      if (onSubmitGoldCardDetails === null) {
        dispatch(identificationActions.setOnSubmitGoldCardDetails(true))
      } else {
        dispatch(identificationActions.setOnSubmitGoldCardDetails(!onSubmitGoldCardDetails))
      }
    }

    if (idSelected > 0 && idSelected < idsRequiredRedux && onSubmitIdentificationDetails !== null) {
      setOpenError({
        ...openError,
        open: true,
      })
      return
    }
  }, [onSubmitIdentificationDetails])

  useEffect(() => {
    // if (checkedIdentificationTypes.includes('PASPRT') || checkedIdentificationTypes.includes('FIRELICENS')) {
    //   dispatch(identificationActions.setIDsRequired(1))
    // } else {
    //   dispatch(identificationActions.setIDsRequired(2))
    // }

    dispatch(identificationActions.setIDsRequired(1))

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [])

  useEffect(() => {
    dispatch(identificationActions.setValidIDs(validDrLicenceCounter + validPassportCounter + validFirearmsLicenceCounter + validKiwiAccessCardCounter + validCommunityServiceCardCounter + validBrithCertificateCounter + validCurrStudentIDCounter + validGoldCardCounter))
  }, [validDrLicenceCounter, validPassportCounter, validFirearmsLicenceCounter, validKiwiAccessCardCounter, validCommunityServiceCardCounter, validBrithCertificateCounter, validCurrStudentIDCounter, validGoldCardCounter])

  useEffect(() => {
    if (validIdsRedux === idSelected && validIdsRedux >= idsRequiredRedux) {
      dispatch(identificationActions.setIsValidIdentificationDetails(true))
    } else {
      dispatch(identificationActions.setIsValidIdentificationDetails(false))
    }
  }, [validIdsRedux])

  useEffect(() => {
    if (idSelected > 0 && idSelected < idsRequiredRedux && onSubmitIdentificationDetails === null) {
      setOpenWarning({
        ...openWarning,
        open: true,
      })
      return
    }
    if (idsRequiredRedux === 1 && idSelected === 1 && (onSubmitIdentificationDetails === null || onSubmitIdentificationDetails !== null)) {
      setOpenSuccessOneID({
        ...openSuccessOneID,
        open: true,
      })
      return
    }
    if (idSelected >= idsRequiredRedux && idSelected >= 1 && (onSubmitIdentificationDetails === null || onSubmitIdentificationDetails !== null)) {
      setOpenSuccessTwoIDs({
        ...openSuccessOneID,
        open: true,
      })
      return
    }
  }, [idsRequiredRedux, idSelected])

  function onSubmit() {
    console.log('Identification Details Submitted')
  }

  return (
    <Box sx={{ px: 0, minHeight: '30vh' }}>
      <AnimatePresence exitBeforeEnter>
        {idsRequiredRedux === 1 && idSelected === 0 && validIdsRedux === 0 && (onSubmitIdentificationDetails === null || onSubmitIdentificationDetails !== null) && (
          <Stack component={motion.div} {...varFlipAlert} direction='row' justifyContent='center' sx={{ pt: 2 }}>
            <Alert severity='info' sx={{ borderRadius: 49 }}>
              <Typography variant='body2'>
                {downSm ? (
                  <>
                    One <strong>photo ID</strong> is required.
                  </>
                ) : (
                  <>
                    One form of <strong>photo ID</strong> is required.
                  </>
                )}
              </Typography>
            </Alert>
          </Stack>
        )}
        {/* {idSelected > 0 && idSelected < idsRequiredRedux && onSubmitIdentificationDetails === null && (
          <Stack component={motion.div} {...varFlipAlert} direction='row' justifyContent='center' sx={{ pt: 2 }}>
            <Alert severity='warning' sx={{ borderRadius: 49 }}>
              <Typography variant='body2'>
                {downSm ? (
                  <>
                    <strong>One</strong>more ID required.
                  </>
                ) : (
                  <>
                    <strong>One</strong> more Identification required.
                  </>
                )}
              </Typography>
            </Alert>
          </Stack>
        )} */}
        {/* {idSelected > 0 && idSelected < idsRequiredRedux && onSubmitIdentificationDetails !== null && (
          <Stack component={motion.div} {...varFlipAlert} direction='row' justifyContent='center' sx={{ pt: 2 }}>
            <Alert severity='error' sx={{ borderRadius: 49 }}>
              <Typography variant='body2'>
                {downSm ? (
                  <>
                    <strong>One</strong> more ID required.
                  </>
                ) : (
                  <>
                    <strong>One</strong> more Identification required.
                  </>
                )}
              </Typography>
            </Alert>
          </Stack>
        )} */}
        {/* {idsRequiredRedux === 1 && idSelected === 1 && (onSubmitIdentificationDetails === null || onSubmitIdentificationDetails !== null) && (
          <Stack component={motion.div} {...varFlipAlert} direction='row' justifyContent='center' sx={{ pt: 2 }}>
            <Alert severity='success' sx={{ borderRadius: 49 }}>
              <Typography variant='body2'>
                {downSm ? (
                  <>
                    Only<strong>one</strong> ID required.
                  </>
                ) : (
                  <>
                    Only <strong>One</strong> form of identification required.
                  </>
                )}
              </Typography>
            </Alert>
          </Stack>
        )} */}
        {idSelected >= idsRequiredRedux && idSelected >= 1 && (onSubmitIdentificationDetails === null || onSubmitIdentificationDetails !== null) && (
          <Stack component={motion.div} {...varFlipAlert} direction='row' justifyContent='center' sx={{ pt: 2 }}>
            <Alert severity='success' sx={{ borderRadius: 49 }}>
              <Typography variant='body2'>
                {downSm ? (
                  <>
                    <strong>One</strong> ID selected.
                  </>
                ) : (
                  <>
                    <strong>One</strong> identification method selected.
                  </>
                )}
              </Typography>
            </Alert>
          </Stack>
        )}
      </AnimatePresence>
      <AnimatePresence exitBeforeEnter>
        <Stack component={motion.div} {...varIdentification} direction='row' justifyContent='center' sx={{ pt: 2 }}>
          <Typography variant={downSm ? 'caption' : 'body2'} sx={{ textAlign: 'center' }}>
            We can accept the following forms of identification. At least one form of ID needs to contain a photo. Choose from the following options.
          </Typography>
        </Stack>
      </AnimatePresence>
      <Box sx={{ pt: 2 }}>
        <AutocompleteIDTypes name='identification-types' control={control} onIdentificationChange={handleIdentificationTypeChange} helperTextInput='' />
        {/* <IdentificationComboBox name='identification-types-combo' control={control} onSelectChange={handleIdentificationComboTypeChange} removeIdentification={removeIdentificationFromSelect} /> */}
      </Box>
      {/* Driver Licence  Card */}
      <AnimatePresence>
        {checkedIdentificationTypes.includes('DRVLSC') && (
          <motion.div {...varTitle}>
            <Stack direction='row'>
              <Typography variant='h6' sx={{ py: 2, color: (theme) => (theme.palette.mode === 'dark' ? SECONDARY.main : PRIMARY.main), fontWeight: 'light', letterSpacing: 3, textTransform: 'uppercase' }}>
                Driver Licence
              </Typography>
            </Stack>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {checkedIdentificationTypes.includes('DRVLSC') && (
          <motion.div {...varIdentification}>
            <DriversLicence />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Passport */}
      <Stack direction='column' spacing={0} sx={{ py: checkedIdentificationTypes.includes('PASPRT') ? 2 : 0 }}>
        <AnimatePresence>
          {checkedIdentificationTypes.includes('PASPRT') && (
            <motion.div {...varTitle}>
              <Stack direction='row'>
                <Typography variant='h6' sx={{ color: (theme) => (theme.palette.mode === 'dark' ? SECONDARY.main : PRIMARY.main), fontWeight: 'light', letterSpacing: 3, textTransform: 'uppercase' }}>
                  Passport
                </Typography>
              </Stack>
            </motion.div>
          )}
        </AnimatePresence>
        {/* <AnimatePresence>
          {checkedIdentificationTypes.includes('PASPRT') && (
            <motion.div {...varSubtitle}>
              <Stack direction='row'>
                <Typography variant='caption' sx={{ fontWeight: 'default' }}>
                  Only one form of Identification required if you provide Passport as your ID.
                </Typography>
              </Stack>
            </motion.div>
          )}
        </AnimatePresence> */}
      </Stack>
      <AnimatePresence>
        {checkedIdentificationTypes.includes('PASPRT') && (
          <motion.div {...varIdentification}>
            <Passport />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Firearms Licence Card */}
      <Stack direction='column' sx={{ py: checkedIdentificationTypes.includes('FIRELICENS') ? 2 : 0 }}>
        <AnimatePresence>
          {checkedIdentificationTypes.includes('FIRELICENS') && (
            <motion.div {...varTitle}>
              <Stack direction='row'>
                <Typography variant='h6' sx={{ py: 2, color: (theme) => (theme.palette.mode === 'dark' ? SECONDARY.main : PRIMARY.main), fontWeight: 'light', letterSpacing: 3, textTransform: 'uppercase' }}>
                  Firearms Licence
                </Typography>
              </Stack>
            </motion.div>
          )}
        </AnimatePresence>
        {/* <AnimatePresence>
          {checkedIdentificationTypes.includes('FIRELICENS') && (
            <motion.div {...varSubtitle}>
              <Stack direction='row'>
                <Typography variant='caption' sx={{ fontWeight: 'default' }}>
                  Only one form of Identification required if you provide Firearms Licence.
                </Typography>
              </Stack>
            </motion.div>
          )}
        </AnimatePresence> */}
      </Stack>

      <AnimatePresence>
        {checkedIdentificationTypes.includes('FIRELICENS') && (
          <motion.div {...varIdentification}>
            <FirearmsLicence />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Kiwi Access Card */}
      <AnimatePresence>
        {checkedIdentificationTypes.includes('KIWACCCRD') && (
          <motion.div {...varTitle}>
            <Stack direction='row'>
              <Typography variant='h6' sx={{ py: 2, color: (theme) => (theme.palette.mode === 'dark' ? SECONDARY.main : PRIMARY.main), fontWeight: 'light', letterSpacing: 3, textTransform: 'uppercase' }}>
                Kiwi Access Card
              </Typography>
            </Stack>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {checkedIdentificationTypes.includes('KIWACCCRD') && (
          <motion.div {...varIdentification}>
            <KiwiAccessCard />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Community Service Card */}
      <AnimatePresence>
        {checkedIdentificationTypes.includes('COMSERVCRD') && (
          <motion.div {...varTitle}>
            <Stack direction='row'>
              <Typography variant='h6' sx={{ py: 2, color: (theme) => (theme.palette.mode === 'dark' ? SECONDARY.main : PRIMARY.main), fontWeight: 'light', letterSpacing: 3, textTransform: 'uppercase' }}>
                Community Service Card
              </Typography>
            </Stack>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {checkedIdentificationTypes.includes('COMSERVCRD') && (
          <motion.div {...varIdentification}>
            <CommunityServiceCard />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Birth Certificate */}
      <Stack direction='column' sx={{ py: checkedIdentificationTypes.includes('BIRTHCERT') ? 2 : 0 }}>
        <AnimatePresence>
          {checkedIdentificationTypes.includes('BIRTHCERT') && (
            <motion.div {...varTitle}>
              <Stack direction='row'>
                <Typography variant='h6' sx={{ color: (theme) => (theme.palette.mode === 'dark' ? SECONDARY.main : PRIMARY.main), fontWeight: 'light', letterSpacing: 3, textTransform: 'uppercase' }}>
                  Birth Certificate
                </Typography>
              </Stack>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {checkedIdentificationTypes.includes('BIRTHCERT') && (
            <motion.div {...varSubtitle}>
              <Stack direction='row'>
                <Typography variant='caption' sx={{ fontWeight: 'default' }}>
                  NZ Birth certificates must be issued after 1 January 1998
                </Typography>
              </Stack>
            </motion.div>
          )}
        </AnimatePresence>
      </Stack>

      <AnimatePresence>
        {checkedIdentificationTypes.includes('BIRTHCERT') && (
          <motion.div {...varIdentification}>
            <BirthCertificate />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Current Student ID */}
      <AnimatePresence>
        {checkedIdentificationTypes.includes('CURSTUDID') && (
          <motion.div {...varTitle}>
            <Stack direction='row'>
              <Typography variant='h6' sx={{ py: 2, color: (theme) => (theme.palette.mode === 'dark' ? SECONDARY.main : PRIMARY.main), fontWeight: 'light', letterSpacing: 3, textTransform: 'uppercase' }}>
                Current Student ID
              </Typography>
            </Stack>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {checkedIdentificationTypes.includes('CURSTUDID') && (
          <motion.div {...varIdentification}>
            <CurrentStudentId />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gold Card */}
      <AnimatePresence>
        {checkedIdentificationTypes.includes('GOLDCARD') && (
          <motion.div {...varTitle}>
            <Stack direction='row'>
              <Typography variant='h6' sx={{ py: 2, color: (theme) => (theme.palette.mode === 'dark' ? SECONDARY.main : PRIMARY.main), fontWeight: 'light', letterSpacing: 3, textTransform: 'uppercase' }}>
                Gold Card
              </Typography>
            </Stack>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {checkedIdentificationTypes.includes('GOLDCARD') && (
          <motion.div {...varIdentification}>
            <GoldCard />
          </motion.div>
        )}
      </AnimatePresence>
      {/* <Snackbar open={openWarning.open} autoHideDuration={5000} onClose={handleCloseWarning} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} TransitionComponent={openWarning.Transition}>
        <Alert elevation={6} variant='filled' onClose={handleCloseWarning} severity='warning' sx={{ width: '100%' }}>
          One more identification required!
        </Alert>
      </Snackbar> */}
      <Snackbar open={openError.open} autoHideDuration={5000} onClose={handleCloseError} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} TransitionComponent={openError.Transition}>
        <Alert elevation={6} variant='filled' onClose={handleCloseError} severity='error' sx={{ width: '100%' }}>
          One more identification required!
        </Alert>
      </Snackbar>
      <Snackbar open={openSuccessOneID.open} autoHideDuration={5000} onClose={handleCloseSuccessOneID} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} TransitionComponent={openSuccessOneID.Transition}>
        <Alert elevation={6} variant='filled' onClose={handleCloseSuccessOneID} severity='success' sx={{ width: '100%' }}>
          Only one Identification required.
        </Alert>
      </Snackbar>
      <Snackbar open={openSuccessTwoIDs.open} autoHideDuration={5000} onClose={handleCloseSuccessTwoIDs} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} TransitionComponent={openSuccessTwoIDs.Transition}>
        <Alert elevation={6} variant='filled' onClose={handleCloseSuccessTwoIDs} severity='success' sx={{ width: '100%' }}>
          One Identification Selected.
        </Alert>
      </Snackbar>
    </Box>
  )
}
