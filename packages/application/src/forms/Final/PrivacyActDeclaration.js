import React, { useEffect } from 'react'

import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

// Redux - Actions
import { globalActions } from '../../redux/slices/globalSlice'
import { yourPersonalDetailsActions } from '../../redux/slices/yourPersonalDetailsSlice'
import { identificationActions } from '../../redux/slices/identificationSlice'
import { employmentActions } from '../../redux/slices/employmentSlice'
import { contactDetailsActions } from '../../redux/slices/contactDetailsSlice'
import { financialDetailsActions } from '../../redux/slices/financialDetailsSlice'
import { sopAssetLiabilityActions } from '../../redux/slices/sopAssetsLiabilitiesSlice'
import { sopIncomeExpenditureActions } from '../../redux/slices/sopIncomeExpenditureSlice'
import { privacyActDeclarationActions } from '../../redux/slices/privacyActDeclarationSlice'

// List MUI
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'

//Other MUI
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import CommentIcon from '@mui/icons-material/Comment'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Box, Divider, Stack, Typography } from '@mui/material'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'

import Alert from '@mui/material/Alert'
import Slide from '@mui/material/Slide'
import Snackbar from '@mui/material/Snackbar'

import { fDateYYYY_MM_DD } from '../../utils/formatDateTime'
import { convertToUTCTimestamp } from '../../utils/convertDatetoUTC'

const today = new Date()
const defExpiryDate = today.setDate(today.getDate() - 1)

export default function PrivacyActDeclaration() {
  const downMd = useMediaQuery((theme) => theme.breakpoints.down('md'))
  const downSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  const [openAuthorise, setOpenAuthorise] = React.useState(true)

  const secureSessionID = useSelector((state) => state.globalReducer.secureSessionID)
  const currentStepCode = useSelector((state) => state.globalReducer.currentStepCode)
  const currentChildCode = useSelector((state) => state.globalReducer.currentChildCode)

  const declarationObject = useSelector((state) => state.privacyDeclarationReducer.declarationItems)
  const onSubmitPrivacyActDeclaration = useSelector((state) => state.privacyDeclarationReducer.onSubmitPrivacyActDeclaration)
  const isValidPrivacyActDeclaration = useSelector((state) => state.privacyDeclarationReducer.isValidPrivacyActDeclaration)

  function SlideTransition(props) {
    return <Slide {...props} direction='up' />
  }

  const [openDeclCompletionAlert, setOpenDeclCompletionAlert] = React.useState({
    open: false,
    Transition: SlideTransition,
  })

  const handleDeclCompletionAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenDeclCompletionAlert({
      ...openDeclCompletionAlert,
      open: false,
    })
  }

  const declarationItems = Object.values(declarationObject)

  const dispatch = useDispatch()

  const handleChange = (index, accept) => (event) => {
    if (index === 0) {
      dispatch(privacyActDeclarationActions.setAcceptCreditAssesment(!accept))
      return
    }
    if (index === 1) {
      dispatch(privacyActDeclarationActions.setAcceptAuthoriseFCU(!accept))
      return
    }
    if (index === 2) {
      dispatch(privacyActDeclarationActions.setAcceptTrueInformation(!accept))
      return
    }
    if (index === 3) {
      dispatch(privacyActDeclarationActions.setAcceptAmlCftObligations(!accept))
      return
    }
    if (index === 4) {
      dispatch(privacyActDeclarationActions.setAcceptStorePersonalInfo(!accept))
      return
    }
  }

  const handleChildren = (index, openChildren) => {
    if (index === 0) {
      dispatch(privacyActDeclarationActions.setOpenChildrenCreditAssesment(!openChildren))
      return
    }
    if (index === 1) {
      dispatch(privacyActDeclarationActions.setOpenChildrenAuthoriseFCU(!openChildren))
      return
    }
    if (index === 2) {
      dispatch(privacyActDeclarationActions.setOpenChildrenTrueInformation(!openChildren))
      return
    }
    if (index === 3) {
      dispatch(privacyActDeclarationActions.setOpenChildrenAmlCftObligations(!openChildren))
      return
    }
    if (index === 4) {
      dispatch(privacyActDeclarationActions.setOpenChildrenStorePersonalInfo(!openChildren))
      return
    }
  }

  useEffect(() => {
    if (declarationObject.CreditAssesment.accept && declarationObject.AuthoriseFCU.accept && declarationObject.TrueInformation.accept && declarationObject.AmlCftObligations.accept && declarationObject.StorePersonalInfo.accept) {
      dispatch(privacyActDeclarationActions.setIsValidPrivacyActDeclaration(true))
      return
    }
    dispatch(privacyActDeclarationActions.setIsValidPrivacyActDeclaration(false))
  }, [declarationObject.CreditAssesment.accept, declarationObject.AuthoriseFCU.accept, declarationObject.TrueInformation.accept, declarationObject.AmlCftObligations.accept, declarationObject.StorePersonalInfo.accept])

  useEffect(() => {
    if (isValidPrivacyActDeclaration == false) {
      setOpenDeclCompletionAlert({
        ...openDeclCompletionAlert,
        open: true,
      })

      return
    }

    if (onSubmitPrivacyActDeclaration != null) {
      onSubmit()
      return
    }
  }, [onSubmitPrivacyActDeclaration])

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

  if (secureSessionID) {
    if (!currentStepCode === 11 && !currentChildCode === 0) return

    const secureClientID = useSelector((state) => state.globalReducer.secureClientID)

    // >>>>>>>>>>>>>>>>>>> Data preparation for submission  - Current Residential Address <<<<<<<<<<<<<<<<<<<<<<<<<

    const currResAddressSelectedPxid = useSelector((state) => state.conatctDetailsReducer.currResAddressSelectedPxid)
    const sovCurrentAddressId = useSelector((state) => state.conatctDetailsReducer.sovCurrentAddressId)
    const currResYears = useSelector((state) => state.conatctDetailsReducer.currResYears)
    const currResMonths = useSelector((state) => state.conatctDetailsReducer.currResMonths)
    const sovcurrResYears = useSelector((state) => state.conatctDetailsReducer.sovcurrResYears)
    const sovcurrResMonths = useSelector((state) => state.conatctDetailsReducer.sovcurrResMonths)
    const currResEffectiveDate = useSelector((state) => state.conatctDetailsReducer.currResEffectiveDate)
    const sovcurrResEffectiveDate = useSelector((state) => state.conatctDetailsReducer.sovcurrResEffectiveDate)

    if (fDateYYYY_MM_DD(currResEffectiveDate) <= fDateYYYY_MM_DD(sovcurrResEffectiveDate)) {
      const newCurrResEffectiveDate = new Date(sovcurrResEffectiveDate).setDate(new Date(sovcurrResEffectiveDate).getDate() + 1)

      dispatch(contactDetailsActions.setcurrResEffectiveDate(newCurrResEffectiveDate))
    }

    // Expire current and add new if address has changed
    if (currResAddressSelectedPxid !== null) {
      dispatch(contactDetailsActions.setsovCurrentAddressUpdate(false))
      dispatch(contactDetailsActions.setsovCurrentAddressExpire(true))
    }

    // Expire current and add the same the same address with the new effective date.
    // New effective date cannot overlap current residence date range,. If such case is found, the effective date is set to current residence effective date + 1
    if (currResAddressSelectedPxid == null && (currResYears !== sovcurrResYears || currResMonths !== sovcurrResMonths)) {
      dispatch(contactDetailsActions.setsovCurrentAddressUpdate(null))
      dispatch(contactDetailsActions.setsovCurrentAddressExpire(false))
    }

    // >>>>>>>>>>>>>>>>>>> Data preparation for submission  - Previous Residential Address <<<<<<<<<<<<<<<<<<<<<<<<<

    const prevResAddressSelectedPxid = useSelector((state) => state.conatctDetailsReducer.prevResAddressSelectedPxid)
    const sovPreviousAddressId = useSelector((state) => state.conatctDetailsReducer.sovPreviousAddressId)
    const prevResYears = useSelector((state) => state.conatctDetailsReducer.prevResYears)
    const prevResMonths = useSelector((state) => state.conatctDetailsReducer.prevResMonths)
    const sovprevResYears = useSelector((state) => state.conatctDetailsReducer.sovprevResYears)
    const sovprevResMonths = useSelector((state) => state.conatctDetailsReducer.sovprevResMonths)
    const prevResEffectiveDate = useSelector((state) => state.conatctDetailsReducer.prevResEffectiveDate)
    const sovprevResEffectiveDate = useSelector((state) => state.conatctDetailsReducer.sovprevResEffectiveDate)

    if (fDateYYYY_MM_DD(prevResEffectiveDate) <= fDateYYYY_MM_DD(sovprevResEffectiveDate)) {
      const newPrevResEffectiveDate = new Date(sovprevResEffectiveDate).setDate(new Date(sovprevResEffectiveDate).getDate() + 1)
      dispatch(contactDetailsActions.setprevResEffectiveDate(newPrevResEffectiveDate))
    }

    // Expire current and add (or simply add) the same address with the new effective date
    if (prevResAddressSelectedPxid == null || prevResYears !== sovprevResYears || prevResMonths !== sovprevResMonths) {
      dispatch(contactDetailsActions.setsovPreviousAddressUpdate(true))
      dispatch(contactDetailsActions.setsovPreviousAddressExpire(true))
    }

    // >>>>>>>>>>>>>>>>>>> Data preparation for submission  - Current Employemnt <<<<<<<<<<<<<<<<<<<<<<<<<

    const currEmploymentType = useSelector((state) => state.employmentReducer.employmentType)
    const currEmpOccupation = useSelector((state) => state.employmentReducer.occupation)
    const currEmployerName = useSelector((state) => state.employmentReducer.employerName)
    const currEmpHistYears = useSelector((state) => state.employmentReducer.empHistYears)
    const currEmpHistMonths = useSelector((state) => state.employmentReducer.empHistMonths)

    const sovcurrEmploymentType = useSelector((state) => state.employmentReducer.sovemploymentType)
    const sovcurrEmpOccupation = useSelector((state) => state.employmentReducer.sovoccupation)
    const sovcurrEmployerName = useSelector((state) => state.employmentReducer.sovemployerName)
    const sovcurrEmpHistYears = useSelector((state) => state.employmentReducer.sovempHistYears)
    const sovcurrEmpHistMonths = useSelector((state) => state.employmentReducer.sovempHistMonths)
    const sovcurrEmpID = useSelector((state) => state.employmentReducer.sovcurrEmpID)
    const sovcurrEmpAttributes = useSelector((state) => state.employmentReducer.sovcurrEmpAttributes)

    if (currEmploymentType) {
      // Don't add employemnt to Sovereign
      if (currEmploymentType === sovcurrEmploymentType && currEmpOccupation === sovcurrEmpOccupation && currEmployerName === sovcurrEmployerName && currEmpHistYears === sovcurrEmpHistYears && currEmpHistMonths === sovcurrEmpHistMonths) {
        dispatch(employmentActions.setsovcurrEmpUpdate(false))
        dispatch(employmentActions.setsovcurrEmpExpire(false))
      }

      // Add a new employemnt to sovereign
      if (sovcurrEmpID === null) {
        dispatch(employmentActions.setsovcurrEmpUpdate(null))
        dispatch(employmentActions.setsovcurrEmpExpire(false))
      }

      // If any Change found, expire existing and add new  employemnt
      if (sovcurrEmpID !== null && (currEmploymentType !== sovcurrEmploymentType || currEmpOccupation !== sovcurrEmpOccupation || currEmployerName !== sovcurrEmployerName || currEmpHistYears !== sovcurrEmpHistYears || currEmpHistMonths !== sovcurrEmpHistMonths)) {
        dispatch(employmentActions.setsovcurrEmpUpdate(false))
        dispatch(employmentActions.setsovcurrEmpExpire(true))
      }
    }

    // >>>>>>>>>>>>>>>>>>> Data preparation for submission  - Previous Employemnt <<<<<<<<<<<<<<<<<<<<<<<<<

    const prevEmploymentType = useSelector((state) => state.employmentReducer.prevEmpemploymentType)
    const prevEmpOccupation = useSelector((state) => state.employmentReducer.prevEmpoccupation)
    const prevEmployerName = useSelector((state) => state.employmentReducer.prevEmpemployerName)
    const prevEmpHistYears = useSelector((state) => state.employmentReducer.prevEmpempHistYears)
    const prevEmpHistMonths = useSelector((state) => state.employmentReducer.prevEmpempHistMonths)

    const sovprevEmploymentType = useSelector((state) => state.employmentReducer.sovprevEmpemploymentType)
    const sovprevEmpOccupation = useSelector((state) => state.employmentReducer.sovprevEmpoccupation)
    const sovprevEmployerName = useSelector((state) => state.employmentReducer.sovprevEmpemployerName)
    const sovprevEmpHistYears = useSelector((state) => state.employmentReducer.sovprevEmpempHistYears)
    const sovprevEmpHistMonths = useSelector((state) => state.employmentReducer.sovprevEmpempHistMonths)
    const sovprevEmpID = useSelector((state) => state.employmentReducer.sovprevEmpID)

    if (prevEmploymentType) {
      // Don't add employemnt to Sovereign
      if (prevEmploymentType === sovprevEmploymentType && prevEmpOccupation === sovprevEmpOccupation && prevEmployerName === sovprevEmployerName && prevEmpHistYears === sovprevEmpHistYears && prevEmpHistMonths === sovprevEmpHistMonths) {
        dispatch(employmentActions.setsovprevEmpUpdate(false))
        dispatch(employmentActions.setsovprevEmpExpire(false))
      }

      // Add a new employemnt to sovereign
      if (sovprevEmpID === null) {
        dispatch(employmentActions.setsovprevEmpUpdate(null))
        dispatch(employmentActions.setsovprevEmpExpire(false))
      }

      // If any Change found, expire existing and add new  employemnt
      if (sovprevEmpID !== null && (prevEmploymentType !== sovprevEmploymentType || prevEmpOccupation !== sovprevEmpOccupation || prevEmployerName !== sovprevEmployerName || prevEmpHistYears !== sovprevEmpHistYears || prevEmpHistMonths !== sovprevEmpHistMonths)) {
        dispatch(employmentActions.setsovprevEmpUpdate(false))
        dispatch(employmentActions.setsovprevEmpExpire(true))
      }
    }

    // Selected Identifications
    const checkedIdentificationTypes = useSelector((state) => state.identificationReducer.checkedIdentificationTypes)

    // >>>>>>>>>>>>>>>>>>> Data preparation for submission  - Identification <<<<<<<<<<<<<<<<<<<<<<<<<

    // Driver Licence
    const driversLicenceNo = useSelector((state) => state.identificationReducer.identificationTypes.drivers_licence.data.driversLicenceNo)
    const driversLicenceVersion = useSelector((state) => state.identificationReducer.identificationTypes.drivers_licence.data.driversLicenceVersion)
    const drLicenceIssueDate = useSelector((state) => state.identificationReducer.identificationTypes.drivers_licence.data.drLicenceIssueDate)
    const drLicenceExpiryDate = useSelector((state) => state.identificationReducer.identificationTypes.drivers_licence.data.drLicenceExpiryDate)

    const soviddrivers_licence = useSelector((state) => state.identificationReducer.identificationTypes.drivers_licence.data.sovid)
    const sovdriversLicenceNo = useSelector((state) => state.identificationReducer.identificationTypes.drivers_licence.data.sovdriversLicenceNo)
    const sovdriversLicenceVersion = useSelector((state) => state.identificationReducer.identificationTypes.drivers_licence.data.sovdriversLicenceVersion)
    const sovdriversLicenceIssueDate = useSelector((state) => state.identificationReducer.identificationTypes.drivers_licence.data.sovdriversLicenceIssueDate)
    const sovdriversLicenceExpiryDate = useSelector((state) => state.identificationReducer.identificationTypes.drivers_licence.data.sovdriversLicenceExpiryDate)

    // Passport
    const sovidpassport = useSelector((state) => state.identificationReducer.identificationTypes.passport.data.sovid)
    const passportNo = useSelector((state) => state.identificationReducer.identificationTypes.passport.data.passportNo)
    const passportIssueDate = useSelector((state) => state.identificationReducer.identificationTypes.passport.data.passportIssueDate)
    const passportExpiryDate = useSelector((state) => state.identificationReducer.identificationTypes.passport.data.passportExpiryDate)

    const sovpassportNo = useSelector((state) => state.identificationReducer.identificationTypes.passport.data.sovpassportNo)
    const sovpassportIssueDate = useSelector((state) => state.identificationReducer.identificationTypes.passport.data.sovpassportIssueDate)
    const sovpassportExpiryDate = useSelector((state) => state.identificationReducer.identificationTypes.passport.data.sovpassportExpiryDate)

    // Firearms Licence
    const sovidfirearmsLicence = useSelector((state) => state.identificationReducer.identificationTypes.firearms_licence.data.sovid)
    const firearmsLicenceNo = useSelector((state) => state.identificationReducer.identificationTypes.firearms_licence.data.firearmsLicenceNo)
    const firearmsLicenceIssueDate = useSelector((state) => state.identificationReducer.identificationTypes.firearms_licence.data.firearmsLicenceIssueDate)
    const firearmsLicenceExpiryDate = useSelector((state) => state.identificationReducer.identificationTypes.firearms_licence.data.firearmsLicenceExpiryDate)

    const sovfirearmsLicenceNo = useSelector((state) => state.identificationReducer.identificationTypes.firearms_licence.data.sovfirearmsLicenceNo)
    const sovfirearmsLicenceIssueDate = useSelector((state) => state.identificationReducer.identificationTypes.firearms_licence.data.sovfirearmsLicenceIssueDate)
    const sovfirearmsLicenceExpiryDate = useSelector((state) => state.identificationReducer.identificationTypes.firearms_licence.data.sovfirearmsLicenceExpiryDate)

    // Kiwi Access Card
    const sovidkiwiAccessCard = useSelector((state) => state.identificationReducer.identificationTypes.kiwi_access_card.data.sovid)
    const kiwiAccessCardNo = useSelector((state) => state.identificationReducer.identificationTypes.kiwi_access_card.data.kiwiAccessCardNo)
    const kiwiAccessCardIssueDate = useSelector((state) => state.identificationReducer.identificationTypes.kiwi_access_card.data.kiwiAccessCardIssueDate)
    const kiwiAccessCardExpiryDate = useSelector((state) => state.identificationReducer.identificationTypes.kiwi_access_card.data.kiwiAccessCardExpiryDate)

    const sovkiwiAccessCardNo = useSelector((state) => state.identificationReducer.identificationTypes.kiwi_access_card.data.sovkiwiAccessCardNo)
    const sovkiwiAccessCardIssueDate = useSelector((state) => state.identificationReducer.identificationTypes.kiwi_access_card.data.sovkiwiAccessCardIssueDate)
    const sovkiwiAccessCardExpiryDate = useSelector((state) => state.identificationReducer.identificationTypes.kiwi_access_card.data.sovkiwiAccessCardExpiryDate)

    // Community Service Card
    const sovidcommServiceCard = useSelector((state) => state.identificationReducer.identificationTypes.community_service_card.data.sovid)
    const commServiceCardNo = useSelector((state) => state.identificationReducer.identificationTypes.community_service_card.data.commServiceCardNo)
    const commServiceCardIssueDate = useSelector((state) => state.identificationReducer.identificationTypes.community_service_card.data.commServiceCardIssueDate)
    const commServiceCardExpiryDate = useSelector((state) => state.identificationReducer.identificationTypes.community_service_card.data.commServiceCardExpiryDate)

    const sovcommServiceCardNo = useSelector((state) => state.identificationReducer.identificationTypes.community_service_card.data.sovcommServiceCardNo)
    const sovcommServiceCardIssueDate = useSelector((state) => state.identificationReducer.identificationTypes.community_service_card.data.sovcommServiceCardIssueDate)
    const sovcommServiceCardExpiryDate = useSelector((state) => state.identificationReducer.identificationTypes.community_service_card.data.sovcommServiceCardExpiryDate)

    // Birth Certifiate
    const sovidbirthCertificate = useSelector((state) => state.identificationReducer.identificationTypes.birth_certificate.data.sovid)
    const birthCertificateRegNo = useSelector((state) => state.identificationReducer.identificationTypes.birth_certificate.data.birthCertificateRegNo)
    const datOfBirth = useSelector((state) => state.identificationReducer.identificationTypes.birth_certificate.data.datOfBirth)

    const sovbirthCertificateRegNo = useSelector((state) => state.identificationReducer.identificationTypes.birth_certificate.data.sovbirthCertificateRegNo)
    const sovbirthCertificateIssueDate = useSelector((state) => state.identificationReducer.identificationTypes.birth_certificate.data.sovbirthCertificateIssueDate)

    // Current Student ID
    const sovidcurrStudentId = useSelector((state) => state.identificationReducer.identificationTypes.current_Student_id.data.sovid)
    const currStudentIdNo = useSelector((state) => state.identificationReducer.identificationTypes.current_Student_id.data.currStudentIdNo)
    const currStudentIdIssueDate = useSelector((state) => state.identificationReducer.identificationTypes.current_Student_id.data.currStudentIdIssueDate)
    const currStudentIdExpiryDate = useSelector((state) => state.identificationReducer.identificationTypes.current_Student_id.data.currStudentIdExpiryDate)

    const sovcurrStudentIdNo = useSelector((state) => state.identificationReducer.identificationTypes.current_Student_id.data.sovcursrStudentIdNo)
    const sovcurrStudentIdIssueDate = useSelector((state) => state.identificationReducer.identificationTypes.current_Student_id.data.sovcurrStudentIdIssueDate)
    const sovcurrStudentIdExpiryDate = useSelector((state) => state.identificationReducer.identificationTypes.current_Student_id.data.sovcurrStudentIdExpiryDate)

    // Gold Card
    const sovidgoldCard = useSelector((state) => state.identificationReducer.identificationTypes.gold_card.data.sovid)
    const goldCardNo = useSelector((state) => state.identificationReducer.identificationTypes.gold_card.data.goldCardNo)
    const goldCardValidFromDate = useSelector((state) => state.identificationReducer.identificationTypes.gold_card.data.goldCardValidFromDate)

    const sovgoldCardNo = useSelector((state) => state.identificationReducer.identificationTypes.gold_card.data.sovgoldCardNo)
    const sovgoldCardIssueDate = useSelector((state) => state.identificationReducer.identificationTypes.gold_card.data.sovgoldCardIssueDate)

    // Decision to be made in Submission.js

    // 1
    // ... If sovTypeUpdated = false, sovid is NOT equal to null,
    // ... then
    // ... do not add ID in application ID array or expire array

    // 2
    // ... If sovTypeUpdated = null, sovid = null,
    // ... then
    // ... Add ID in application ID array

    // 3
    // ... If sovTypeUpdated != null, sovid = true, sovTypeToExpire = true, (change in expiry date only)
    // ... then
    // ... Add ID in expire array

    // 4
    // ... If sovTypeUpdated != null, sovid = true, sovTypeToExpire = true, (change in reference)
    // ... then
    // ... Add new ID to application array and sovereign ID to expire array

    if (checkedIdentificationTypes.includes('DRVLSC')) {
      // Dont add
      if (driversLicenceNo === sovdriversLicenceNo && driversLicenceVersion === sovdriversLicenceVersion && drLicenceIssueDate === sovdriversLicenceIssueDate && drLicenceExpiryDate === sovdriversLicenceExpiryDate) {
        dispatch(identificationActions.setdrLicenceSovTypeUdated(false))
        dispatch(identificationActions.setdrLicencesovTypeExpire(false))
      }

      // Add
      if (soviddrivers_licence === null) {
        dispatch(identificationActions.setdrLicenceSovTypeUdated(null))
        dispatch(identificationActions.setdrLicencesovTypeExpire(false))
      }

      // Expire
      if (soviddrivers_licence !== null && driversLicenceNo === sovdriversLicenceNo && driversLicenceVersion === sovdriversLicenceVersion && drLicenceIssueDate === sovdriversLicenceIssueDate && drLicenceExpiryDate !== sovdriversLicenceExpiryDate) {
        dispatch(identificationActions.setdrLicenceSovTypeUdated(true))
        dispatch(identificationActions.setdrLicencesovTypeExpire(true))

        const sovAttributesLicenceNumber = {
          idType1: 'DRVLSC',
          idType2: '',
          clientNumber: secureClientID,
          reference: driversLicenceNo,
          effectiveDate: convertToUTCTimestamp(drLicenceIssueDate),
          expiryDate: convertToUTCTimestamp(drLicenceExpiryDate),
        }

        const sovAttributesVersion = {
          idType1: 'DRVLSC',
          idType2: 'DLVERSION',
          clientNumber: secureClientID,
          reference: driversLicenceVersion,
          effectiveDate: convertToUTCTimestamp(drLicenceIssueDate),
          expiryDate: convertToUTCTimestamp(drLicenceExpiryDate),
        }

        dispatch(identificationActions.setdrLicenceSovAttributes(sovAttributesLicenceNumber))
        dispatch(identificationActions.setdrLicenceSovAttributesVersion(sovAttributesVersion))
      }

      // Add new and Expire old
      if (soviddrivers_licence !== null && (driversLicenceNo !== sovdriversLicenceNo || driversLicenceVersion !== sovdriversLicenceVersion)) {
        dispatch(identificationActions.setdrLicenceSovTypeUdated(false))
        dispatch(identificationActions.setdrLicencesovTypeExpire(true))

        const sovAttributesLicenceNumber = {
          idType1: 'DRVLSC',
          idType2: '',
          clientNumber: secureClientID,
          reference: sovdriversLicenceNo,
          effectiveDate: convertToUTCTimestamp(sovdriversLicenceIssueDate),
          expiryDate: convertToUTCTimestamp(defExpiryDate),
        }

        const sovAttributesVersion = {
          idType1: 'DRVLSC',
          idType2: 'DLVERSION',
          clientNumber: secureClientID,
          reference: driversLicenceVersion,
          effectiveDate: convertToUTCTimestamp(sovdriversLicenceIssueDate),
          expiryDate: convertToUTCTimestamp(defExpiryDate),
        }

        dispatch(identificationActions.setdrLicenceSovAttributes(sovAttributesLicenceNumber))
        dispatch(identificationActions.setdrLicenceSovAttributesVersion(sovAttributesVersion))
      }
    }

    // Passport
    if (checkedIdentificationTypes.includes('PASPRT')) {
      // If ID on the front-end is same as ID on sovereign - Dont send data to sovereign
      if (passportNo === sovpassportNo && passportIssueDate === sovpassportIssueDate && passportExpiryDate === sovpassportExpiryDate) {
        dispatch(identificationActions.setpassportSovTypeUdated(false))
        dispatch(identificationActions.setpassportsovTypeExpire(false))
      }
      if (sovidpassport === null) {
        dispatch(identificationActions.setpassportSovTypeUdated(null))
        dispatch(identificationActions.setpassportsovTypeExpire(false))
      }
      if (sovidpassport !== null && passportNo === sovpassportNo && passportIssueDate === sovpassportIssueDate && passportExpiryDate !== sovpassportExpiryDate) {
        dispatch(identificationActions.setpassportSovTypeUdated(true))
        dispatch(identificationActions.setpassportsovTypeExpire(true))

        const sovAttributes = {
          idType1: 'PASPRT',
          idType2: '',
          clientNumber: secureClientID,
          reference: passportNo,
          effectiveDate: convertToUTCTimestamp(passportIssueDate),
          expiryDate: convertToUTCTimestamp(passportExpiryDate),
        }

        dispatch(identificationActions.setpassportSovAttributes(sovAttributes))
      }

      if (sovidpassport !== null && passportNo !== sovpassportNo) {
        dispatch(identificationActions.setpassportSovTypeUdated(false))
        dispatch(identificationActions.setpassportsovTypeExpire(true))

        const sovAttributes = {
          idType1: 'PASPRT',
          idType2: '',
          clientNumber: secureClientID,
          reference: sovpassportNo,
          effectiveDate: convertToUTCTimestamp(sovpassportIssueDate),
          expiryDate: convertToUTCTimestamp(defExpiryDate),
        }

        dispatch(identificationActions.setpassportSovAttributes(sovAttributes))
      }
    }

    // Firearms Licence
    if (checkedIdentificationTypes.includes('FIRELICENS')) {
      // If ID on the front-end is same as ID on sovereign - Dont send data to sovereign
      if (firearmsLicenceNo === sovfirearmsLicenceNo && firearmsLicenceIssueDate === sovfirearmsLicenceIssueDate && firearmsLicenceExpiryDate === sovfirearmsLicenceExpiryDate) {
        dispatch(identificationActions.setfirearms_licenceSovTypeUdated(false))
        dispatch(identificationActions.setfirearms_licencesovTypeExpire(false))
      }
      if (sovidfirearmsLicence === null) {
        dispatch(identificationActions.setfirearms_licenceSovTypeUdated(null))
        dispatch(identificationActions.setfirearms_licencesovTypeExpire(false))
      }
      if (sovidfirearmsLicence !== null && firearmsLicenceNo === sovfirearmsLicenceNo && firearmsLicenceIssueDate === sovfirearmsLicenceIssueDate && firearmsLicenceExpiryDate !== sovfirearmsLicenceExpiryDate) {
        dispatch(identificationActions.setfirearms_licenceSovTypeUdated(true))
        dispatch(identificationActions.setfirearms_licencesovTypeExpire(true))

        const sovAttributes = {
          idType1: 'FIRELICENS',
          idType2: '',
          clientNumber: secureClientID,
          reference: firearmsLicenceNo,
          effectiveDate: convertToUTCTimestamp(firearmsLicenceIssueDate),
          expiryDate: convertToUTCTimestamp(firearmsLicenceExpiryDate),
        }

        dispatch(identificationActions.setfirearms_licenceSovAttributes(sovAttributes))
      }

      if (sovidfirearmsLicence !== null && firearmsLicenceNo !== sovfirearmsLicenceNo) {
        dispatch(identificationActions.setfirearms_licenceSovTypeUdated(false))
        dispatch(identificationActions.setfirearms_licencesovTypeExpire(true))

        const sovAttributes = {
          idType1: 'FIRELICENS',
          idType2: '',
          clientNumber: secureClientID,
          reference: sovfirearmsLicenceNo,
          effectiveDate: convertToUTCTimestamp(sovfirearmsLicenceIssueDate),
          expiryDate: convertToUTCTimestamp(defExpiryDate),
        }

        dispatch(identificationActions.setfirearms_licenceSovAttributes(sovAttributes))
      }
    }

    // Kiwi Access Card
    if (checkedIdentificationTypes.includes('KIWACCCRD')) {
      // If ID on the front-end is same as ID on sovereign - Dont send data to sovereign
      if (kiwiAccessCardNo === sovkiwiAccessCardNo && kiwiAccessCardIssueDate === sovkiwiAccessCardIssueDate && kiwiAccessCardExpiryDate === sovkiwiAccessCardExpiryDate) {
        dispatch(identificationActions.setkiwi_access_cardSovTypeUdated(false))
        dispatch(identificationActions.setkiwi_access_cardsovTypeExpire(false))
      }
      if (sovidkiwiAccessCard === null) {
        dispatch(identificationActions.setkiwi_access_cardSovTypeUdated(null))
        dispatch(identificationActions.setkiwi_access_cardsovTypeExpire(false))
      }
      if (sovidkiwiAccessCard !== null && kiwiAccessCardNo === sovkiwiAccessCardNo && kiwiAccessCardIssueDate === sovkiwiAccessCardIssueDate && kiwiAccessCardExpiryDate !== sovkiwiAccessCardExpiryDate) {
        dispatch(identificationActions.setkiwi_access_cardSovTypeUdated(true))
        dispatch(identificationActions.setkiwi_access_cardsovTypeExpire(true))

        const sovAttributes = {
          idType1: 'KIWACCCRD',
          idType2: '',
          clientNumber: secureClientID,
          reference: kiwiAccessCardNo,
          effectiveDate: convertToUTCTimestamp(kiwiAccessCardIssueDate),
          expiryDate: convertToUTCTimestamp(kiwiAccessCardExpiryDate),
        }

        dispatch(identificationActions.setkiwi_access_cardSovAttributes(sovAttributes))
      }

      if (sovidkiwiAccessCard !== null && kiwiAccessCardNo !== sovkiwiAccessCardNo) {
        dispatch(identificationActions.setkiwi_access_cardSovTypeUdated(false))
        dispatch(identificationActions.setkiwi_access_cardsovTypeExpire(true))

        const sovAttributes = {
          idType1: 'KIWACCCRD',
          idType2: '',
          clientNumber: secureClientID,
          reference: sovkiwiAccessCardNo,
          effectiveDate: convertToUTCTimestamp(sovkiwiAccessCardIssueDate),
          expiryDate: convertToUTCTimestamp(defExpiryDate),
        }

        dispatch(identificationActions.setkiwi_access_cardSovAttributes(sovAttributes))
      }
    }

    // Community Service Card
    if (checkedIdentificationTypes.includes('COMSERVCRD')) {
      // If ID on the front-end is same as ID on sovereign - Dont send data to sovereign
      if (commServiceCardNo === sovcommServiceCardNo && commServiceCardIssueDate === sovcommServiceCardIssueDate && commServiceCardExpiryDate === sovcommServiceCardExpiryDate) {
        dispatch(identificationActions.setcommunity_service_cardSovTypeUdated(false))
        dispatch(identificationActions.setcommunity_service_cardsovTypeExpire(false))
      }
      if (sovidcommServiceCard === null) {
        dispatch(identificationActions.setcommunity_service_cardSovTypeUdated(null))
        dispatch(identificationActions.setcommunity_service_cardsovTypeExpire(false))
      }
      if (sovidcommServiceCard !== null && commServiceCardNo === sovcommServiceCardNo && commServiceCardIssueDate === sovcommServiceCardIssueDate && commServiceCardExpiryDate !== sovcommServiceCardExpiryDate) {
        dispatch(identificationActions.setcommunity_service_cardSovTypeUdated(true))
        dispatch(identificationActions.setcommunity_service_cardsovTypeExpire(true))

        const sovAttributes = {
          idType1: 'COMSERVCRD',
          idType2: '',
          clientNumber: secureClientID,
          reference: commServiceCardNo,
          effectiveDate: convertToUTCTimestamp(commServiceCardIssueDate),
          expiryDate: convertToUTCTimestamp(commServiceCardExpiryDate),
        }

        dispatch(identificationActions.setcommunity_service_cardSovAttributes(sovAttributes))
      }

      if (sovidcommServiceCard !== null && commServiceCardNo !== sovcommServiceCardNo) {
        dispatch(identificationActions.setcommunity_service_cardSovTypeUdated(false))
        dispatch(identificationActions.setcommunity_service_cardsovTypeExpire(true))

        const sovAttributes = {
          idType1: 'COMSERVCRD',
          idType2: '',
          clientNumber: secureClientID,
          reference: sovcommServiceCardNo,
          effectiveDate: convertToUTCTimestamp(sovcommServiceCardIssueDate),
          expiryDate: convertToUTCTimestamp(defExpiryDate),
        }

        dispatch(identificationActions.setcommunity_service_cardSovAttributes(sovAttributes))
      }
    }

    // Birth Certificate
    if (checkedIdentificationTypes.includes('BIRTHCERT')) {
      // If ID on the front-end is same as ID on sovereign - Dont send data to sovereign
      if (birthCertificateRegNo === sovbirthCertificateRegNo && datOfBirth === sovbirthCertificateIssueDate) {
        dispatch(identificationActions.setbirth_certificateSovTypeUdated(false))
        dispatch(identificationActions.setbirth_certificatesovTypeExpire(false))
      }
      if (sovidbirthCertificate === null) {
        dispatch(identificationActions.setbirth_certificateSovTypeUdated(null))
        dispatch(identificationActions.setbirth_certificatesovTypeExpire(false))
      }

      if (sovidbirthCertificate !== null && birthCertificateRegNo !== sovbirthCertificateRegNo) {
        dispatch(identificationActions.setbirth_certificateSovTypeUdated(false))
        dispatch(identificationActions.setbirth_certificatesovTypeExpire(true))

        const sovAttributes = {
          idType1: 'BIRTHCERT',
          idType2: '',
          clientNumber: secureClientID,
          reference: sovbirthCertificateRegNo,
          effectiveDate: convertToUTCTimestamp(sovbirthCertificateIssueDate),
          expiryDate: convertToUTCTimestamp(defExpiryDate),
        }

        dispatch(identificationActions.setbirth_certificateSovAttributes(sovAttributes))
      }
    }

    // Current Student ID
    if (checkedIdentificationTypes.includes('CURSTUDID')) {
      // If ID on the front-end is same as ID on sovereign - Dont send data to sovereign
      if (currStudentIdNo === sovcurrStudentIdNo && currStudentIdIssueDate === sovcurrStudentIdIssueDate && currStudentIdExpiryDate === sovcurrStudentIdExpiryDate) {
        dispatch(identificationActions.setcurrent_Student_idSovTypeUdated(false))
        dispatch(identificationActions.setcurrent_Student_idsovTypeExpire(false))
      }
      if (sovidcurrStudentId === null) {
        dispatch(identificationActions.setcurrent_Student_idSovTypeUdated(null))
        dispatch(identificationActions.setcurrent_Student_idsovTypeExpire(false))
      }
      if (sovidcurrStudentId !== null && currStudentIdNo === sovcurrStudentIdNo && currStudentIdIssueDate === sovcurrStudentIdIssueDate && currStudentIdExpiryDate !== sovcurrStudentIdExpiryDate) {
        dispatch(identificationActions.setcurrent_Student_idSovTypeUdated(true))
        dispatch(identificationActions.setcurrent_Student_idsovTypeExpire(true))

        const sovAttributes = {
          idType1: 'CURSTUDID',
          idType2: '',
          clientNumber: secureClientID,
          reference: currStudentIdNo,
          effectiveDate: convertToUTCTimestamp(currStudentIdIssueDate),
          expiryDate: convertToUTCTimestamp(currStudentIdExpiryDate),
        }

        dispatch(identificationActions.setcurrent_Student_idSovAttributes(sovAttributes))
      }

      if (sovidcurrStudentId !== null && currStudentIdNo !== sovcurrStudentIdNo) {
        dispatch(identificationActions.setcurrent_Student_idSovTypeUdated(false))
        dispatch(identificationActions.setcurrent_Student_idsovTypeExpire(true))

        const sovAttributes = {
          idType1: 'CURSTUDID',
          idType2: '',
          clientNumber: secureClientID,
          reference: currStudentIdNo,
          effectiveDate: convertToUTCTimestamp(sovcurrStudentIdIssueDate),
          expiryDate: convertToUTCTimestamp(defExpiryDate),
        }

        dispatch(identificationActions.setcurrent_Student_idSovAttributes(sovAttributes))
      }
    }

    // Gold Card
    if (checkedIdentificationTypes.includes('GOLDCARD')) {
      // If ID on the front-end is same as ID on sovereign - Dont send data to sovereign
      if (goldCardNo === sovgoldCardNo && goldCardValidFromDate === sovgoldCardIssueDate) {
        dispatch(identificationActions.setgold_cardSovTypeUdated(false))
        dispatch(identificationActions.setgold_cardsovTypeExpire(false))
      }
      if (sovidgoldCard === null) {
        dispatch(identificationActions.setgold_cardSovTypeUdated(null))
        dispatch(identificationActions.setgold_cardsovTypeExpire(false))
      }

      if (sovidgoldCard !== null && goldCardNo !== sovgoldCardNo) {
        dispatch(identificationActions.setgold_cardSovTypeUdated(false))
        dispatch(identificationActions.setgold_cardsovTypeExpire(true))

        const sovAttributes = {
          idType1: 'GOLDCARD',
          idType2: '',
          clientNumber: secureClientID,
          reference: sovgoldCardNo,
          effectiveDate: convertToUTCTimestamp(sovgoldCardIssueDate),
          expiryDate: convertToUTCTimestamp(defExpiryDate),
        }

        dispatch(identificationActions.setgold_cardSovAttributes(sovAttributes))
      }
    }
  }

  return (
    <Box>
      <List
        sx={{ width: '100%', bgcolor: 'background.paper' }}
        subheader={
          <ListSubheader disableGutters={true} sx={{ my: 2 }}>
            <Stack direction='column' spacing={1}>
              <Typography variant={downSm ? 'body2' : 'body1'}>Authorisation by Applicant(s) for use and disclosure of information.</Typography>
              <Typography variant='caption'>Pursuant to the Privacy Act 2020, I/We acknowledge that:</Typography>
            </Stack>
          </ListSubheader>
        }
      >
        {declarationItems.map((item) => {
          const labelId = `checkbox-list-label-${item.title.key}`
          return (
            <>
              <Box sx={{ display: 'flex', pb: item.openChildren === 1 ? 2 : 0 }}>
                <ListItem
                  key={item.index}
                  divider={true}
                  disablePadding
                  sx={{ pb: 0 }}
                  secondaryAction={
                    <IconButton edge='end' aria-label='delete' onClick={() => handleChildren(item.index, item.openChildren)}>
                      {item.children.length > 0 && (
                        <KeyboardArrowDownRoundedIcon
                          sx={{
                            transform: item.openChildren ? 'rotate(-180deg)' : 'rotate(0)',
                            transition: '0.2s',
                          }}
                        />
                      )}
                    </IconButton>
                  }
                >
                  <Stack direction='column' justifyContent='flex-start' alignItems='stretch' alignContent='stretch' spacing={1} sx={{ width: '100%', pb: item.openChildren ? 2 : 0 }}>
                    <ListItemButton
                      alignItems='center'
                      disableRipple={true}
                      sx={{
                        width: '100%',
                        px: downSm ? 0 : 3,
                        py: item.openChildren ? 1 : 2,
                        '&:hover, &:focus': { '& svg': { opacity: item.openChildren ? 1 : 1 } },
                      }}
                    >
                      <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <ListItemIcon>
                          <Checkbox
                            edge='start'
                            checked={item.accept}
                            onChange={handleChange(item.index, item.accept)}
                            disableRipple
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          id={labelId}
                          primary={item.header}
                          primaryTypographyProps={{
                            variant: downSm ? 'caption' : 'subtitle1',
                            fontWeight: downSm ? 500 : 700,
                          }}
                          sx={{ pr: 3 }}
                        />
                      </Stack>
                    </ListItemButton>
                    {item.openChildren &&
                      item.children.map((child) => (
                        <ListItemText
                          secondary={child}
                          secondaryTypographyProps={{
                            variant: downSm ? 'caption' : 'body2',
                          }}
                          sx={{ pl: downSm ? 6 : 9, pr: 5 }}
                        />
                      ))}
                  </Stack>
                </ListItem>
              </Box>
              {/* <Divider /> */}
            </>
          )
        })}
      </List>
      <Snackbar open={openDeclCompletionAlert?.open} autoHideDuration={5000} onClose={handleDeclCompletionAlert} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} TransitionComponent={openDeclCompletionAlert?.Transition}>
        <Alert elevation={6} variant='filled' onClose={handleDeclCompletionAlert} severity='error' sx={{ width: '100%' }}>
          Please tick all boxes to continue
        </Alert>
      </Snackbar>
    </Box>
  )
}
