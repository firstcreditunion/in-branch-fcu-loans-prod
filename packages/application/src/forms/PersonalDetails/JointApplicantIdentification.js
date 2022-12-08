import React, { useEffect } from 'react'

// React Hook Form
import { useForm } from 'react-hook-form'

// Framer motion
import { motion, AnimatePresence } from 'framer-motion'
import { varFade, varFlip } from '../../components/ui/animate'

// MUI
import { Box, Stack, Grid, Button, Typography } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Slide from '@mui/material/Slide'

import { PRIMARY, SECONDARY } from '../../theme/palette'

// Custom Components
import AutocompleteIDTypes from './IdentificationTypes-Interface/JointAutoCompleteIDTypes'

//Identification Components
import DriversLicence from './IdentificationTypes/JointDriversLicence'
import Passport from './IdentificationTypes/JointPassport'
import FirearmsLicence from './IdentificationTypes/JointFirearmsLicence'
import KiwiAccessCard from './IdentificationTypes/JointKiwiAccessCard'
import CommunityServiceCard from './IdentificationTypes/JointCommunityServiceCard'
import BirthCertificate from './IdentificationTypes/JointBirthCertificate'
import CurrentStudentId from './IdentificationTypes/JointCurrentStudentId'
import GoldCard from './IdentificationTypes/JointGoldCard'

// Redux
import { identificationActions } from '../../redux/slices/identificationSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function Identifications() {
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

  const checkedIdentificationTypes = useSelector((state) => state.identificationReducer.checkedJointIdentificationTypes)
  const idSelected = useSelector((state) => state.identificationReducer.jointidSelected)
  const validIdsRedux = useSelector((state) => state.identificationReducer.jointValidIds)
  const idsRequiredRedux = useSelector((state) => state.identificationReducer.jointIdsRequired)

  const drivers_licence = useSelector((state) => state.identificationReducer.identificationTypes.drivers_licence.jointdata.driversLicenceNo)
  const passport = useSelector((state) => state.identificationReducer.identificationTypes.passport.jointdata.passportNo)
  const firearms_licence = useSelector((state) => state.identificationReducer.identificationTypes.firearms_licence.jointdata.firearmsLicenceNo)
  const kiwi_access_card = useSelector((state) => state.identificationReducer.identificationTypes.kiwi_access_card.jointdata.kiwiAccessCardNo)
  const community_service_card = useSelector((state) => state.identificationReducer.identificationTypes.community_service_card.jointdata.commServiceCardNo)
  const birth_certificate = useSelector((state) => state.identificationReducer.identificationTypes.birth_certificate.jointdata.birthCertificateRegNo)
  const current_Student_id = useSelector((state) => state.identificationReducer.identificationTypes.current_Student_id.jointdata.currStudentIdNo)
  const gold_card = useSelector((state) => state.identificationReducer.identificationTypes.gold_card.jointdata.goldCardNo)
  // const marriage_certificate = useSelector((state) => state.identificationReducer.identificationTypes.marriage_certificate.jointdata.marriageCerrificateRegNo)

  const onSubmitDrLicenceDetails = useSelector((state) => state.identificationReducer.jointonSubmitDrLicenceDetails)
  const onSubmitPassportDetails = useSelector((state) => state.identificationReducer.jointonSubmitPassportDetails)
  const onSubmitFirearmsLicenceDetails = useSelector((state) => state.identificationReducer.jointonSubmitFirearmsLicenceDetails)
  const onSubmitKiwiAccessCardDetails = useSelector((state) => state.identificationReducer.jointonSubmitKiwiAccessCardDetails)
  const onSubmitCommunityServiceCardDetails = useSelector((state) => state.identificationReducer.jointonSubmitCommunityServiceCardDetails)
  const onSubmitBrithCertificateDetails = useSelector((state) => state.identificationReducer.jointonSubmitBrithCertificateDetails)
  const onSubmitCurrStudentIDDetails = useSelector((state) => state.identificationReducer.jointonSubmitCurrStudentIDDetails)
  const onSubmitGoldCardDetails = useSelector((state) => state.identificationReducer.jointonSubmitGoldCardDetails)

  const validDrLicenceCounter = useSelector((state) => state.identificationReducer.jointvalidDrLicenceCounter)
  const validPassportCounter = useSelector((state) => state.identificationReducer.jointvalidPassportCounter)
  const validFirearmsLicenceCounter = useSelector((state) => state.identificationReducer.jointvalidFirearmsLicenceCounter)
  const validKiwiAccessCardCounter = useSelector((state) => state.identificationReducer.jointvalidKiwiAccessCardCounter)
  const validCommunityServiceCardCounter = useSelector((state) => state.identificationReducer.jointvalidCommunityServiceCardCounter)
  const validBrithCertificateCounter = useSelector((state) => state.identificationReducer.jointvalidBrithCertificateCounter)
  const validCurrStudentIDCounter = useSelector((state) => state.identificationReducer.jointvalidCurrStudentIDCounter)
  const validGoldCardCounter = useSelector((state) => state.identificationReducer.jointvalidGoldCardCounter)

  const onSubmitIdentificationDetails = useSelector((state) => state.identificationReducer.jointonSubmitIdentificationDetails)

  const dispatch = useDispatch()

  // *********** Identification Types Disptach ********** //

  // Autocomplete MUI to handle Identificaation Types
  const handleIdentificationTypeChange = (event, newValue) => {
    const checkedIDCodesAutocomplete = newValue.map((Id) => {
      return Id.code
    })

    dispatch(identificationActions.setSelectedJointIdentificationTypes(checkedIDCodesAutocomplete))
    dispatch(identificationActions.setJointIdsSelected(checkedIDCodesAutocomplete.length))

    // if (checkedIDCodesAutocomplete.includes('PASPRT') || checkedIDCodesAutocomplete.includes('FIRELICENS')) {
    //   dispatch(identificationActions.setJointIDsRequired(1))
    // } else {
    //   dispatch(identificationActions.setJointIDsRequired(2))
    // }

    dispatch(identificationActions.setJointIDsRequired(1))
  }

  // React-Hook-Form
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
      ...setOpenSuccessTwoIDs,
      open: false,
    })
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [])

  useEffect(() => {
    // Submit Driver Licence
    if (checkedIdentificationTypes.includes('DRVLSC')) {
      if (onSubmitDrLicenceDetails === null) {
        dispatch(identificationActions.setOnSubmitJointDrLicenceDetails(true))
      } else {
        dispatch(identificationActions.setOnSubmitJointDrLicenceDetails(!onSubmitDrLicenceDetails))
      }
    }

    // Submit Passport
    if (checkedIdentificationTypes.includes('PASPRT')) {
      if (onSubmitPassportDetails === null) {
        dispatch(identificationActions.setOnSubmitJointPassportDetails(true))
      } else {
        dispatch(identificationActions.setOnSubmitJointPassportDetails(!onSubmitPassportDetails))
      }
    }

    // Submit Firearms Licence
    if (checkedIdentificationTypes.includes('FIRELICENS')) {
      if (onSubmitFirearmsLicenceDetails === null) {
        dispatch(identificationActions.setOnSubmitJointFirearmsLicenceDetails(true))
      } else {
        dispatch(identificationActions.setOnSubmitJointFirearmsLicenceDetails(!onSubmitFirearmsLicenceDetails))
      }
    }

    // Submit Kiwi Access Card
    if (checkedIdentificationTypes.includes('KIWACCCRD')) {
      if (onSubmitKiwiAccessCardDetails === null) {
        dispatch(identificationActions.setOnSubmitJointKiwiAccessCardDetails(true))
      } else {
        dispatch(identificationActions.setOnSubmitJointKiwiAccessCardDetails(!onSubmitKiwiAccessCardDetails))
      }
    }

    // Submit Community Service Card
    if (checkedIdentificationTypes.includes('COMSERVCRD')) {
      if (onSubmitCommunityServiceCardDetails === null) {
        dispatch(identificationActions.setOnSubmitJointCommunityServiceCardDetails(true))
      } else {
        dispatch(identificationActions.setOnSubmitJointCommunityServiceCardDetails(!onSubmitCommunityServiceCardDetails))
      }
    }

    // Submit Birth Certificate
    if (checkedIdentificationTypes.includes('BIRTHCERT')) {
      if (onSubmitBrithCertificateDetails === null) {
        dispatch(identificationActions.setOnSubmitJointBrithCertificateDetails(true))
      } else {
        dispatch(identificationActions.setOnSubmitJointBrithCertificateDetails(!onSubmitBrithCertificateDetails))
      }
    }

    // Submit Current Student ID
    if (checkedIdentificationTypes.includes('CURSTUDID')) {
      if (onSubmitCurrStudentIDDetails === null) {
        dispatch(identificationActions.setOnSubmitJointCurrStudentIDDetails(true))
      } else {
        dispatch(identificationActions.setOnSubmitJointCurrStudentIDDetails(!onSubmitCurrStudentIDDetails))
      }
    }

    // Submit Gold Card
    if (checkedIdentificationTypes.includes('GOLDCARD')) {
      if (onSubmitGoldCardDetails === null) {
        dispatch(identificationActions.setOnSubmitJointGoldCardDetails(true))
      } else {
        dispatch(identificationActions.setOnSubmitJointGoldCardDetails(!onSubmitGoldCardDetails))
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
    dispatch(identificationActions.setJointValidIDs(validDrLicenceCounter + validPassportCounter + validFirearmsLicenceCounter + validKiwiAccessCardCounter + validCommunityServiceCardCounter + validBrithCertificateCounter + validCurrStudentIDCounter + validGoldCardCounter))
  }, [validDrLicenceCounter, validPassportCounter, validFirearmsLicenceCounter, validKiwiAccessCardCounter, validCommunityServiceCardCounter, validBrithCertificateCounter, validCurrStudentIDCounter, validGoldCardCounter])

  useEffect(() => {
    if (validIdsRedux === idSelected && validIdsRedux >= idsRequiredRedux) {
      dispatch(identificationActions.setIsValidJointIdentificationDetails(true))
    } else {
      dispatch(identificationActions.setIsValidJointIdentificationDetails(false))
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
    <Box sx={{ px: 0, height: '100%' }}>
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
                <strong>One</strong> more Identification required
              </Typography>
            </Alert>
          </Stack>
        )}
        {idSelected > 0 && idSelected < idsRequiredRedux && onSubmitIdentificationDetails !== null && (
          <Stack component={motion.div} {...varFlipAlert} direction='row' justifyContent='center' sx={{ pt: 2 }}>
            <Alert severity='error' sx={{ borderRadius: 49 }}>
              <Typography variant='body2'>
                <strong>One</strong> more Identification required
              </Typography>
            </Alert>
          </Stack>
        )} */}
        {/* {idsRequiredRedux === 1 && idSelected === 1 && checkedIdentificationTypes.includes('PASPRT', 'FIRELICENS') && (onSubmitIdentificationDetails === null || onSubmitIdentificationDetails !== null) && (
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
          <Typography variant='body2' sx={{ textAlign: 'center' }}>
            We can accept the following forms of identification. At least one form of ID needs to contain a photo. Choose from one of the following options.
          </Typography>
        </Stack>
      </AnimatePresence>
      <Box sx={{ pt: 2 }}>
        <AutocompleteIDTypes name='identification-types' control={control} onIdentificationChange={handleIdentificationTypeChange} helperTextInput='' />
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
