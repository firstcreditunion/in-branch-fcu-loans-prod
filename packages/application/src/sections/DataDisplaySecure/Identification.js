import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

//Framer
import { motion } from 'framer-motion'
import { varFade } from '../../components/ui/animate'

import { PRIMARY, SECONDARY } from '../../theme/palette'

// MUI
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Card from '@mui/material/Card'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import FormControlLabel from '@mui/material/FormControlLabel'

// MUI - Styles
import { styled } from '@mui/material/styles'

// MUI - Icons
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded'
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded'

// Date-fns
import { fDate } from '../../utils/formatDateTime'

// Redux
import { useSelector, useDispatch } from 'react-redux'

// Redux - Actions
import { identificationActions } from '../../redux/slices/identificationSlice'

// Custom Components
import { Title, Data } from './Interface/Typography'

export default function FirstLoanApplicationSecure() {
  const dispatch = useDispatch()

  const [isCompleted, setIsCompleted] = React.useState(true)

  const driversLicenceNo = useSelector((state) => state.identificationReducer.identificationTypes.drivers_licence.data.driversLicenceNo)
  const driversLicenceVersion = useSelector((state) => state.identificationReducer.identificationTypes.drivers_licence.data.driversLicenceVersion)
  const drLicenceIssueDate = useSelector((state) => state.identificationReducer.identificationTypes.drivers_licence.data.drLicenceIssueDate)
  const drLicenceExpiryDate = useSelector((state) => state.identificationReducer.identificationTypes.drivers_licence.data.drLicenceExpiryDate)

  const passportNo = useSelector((state) => state.identificationReducer.identificationTypes.passport.data.passportNo)
  const passportIssueDate = useSelector((state) => state.identificationReducer.identificationTypes.passport.data.passportIssueDate)
  const passportExpiryDate = useSelector((state) => state.identificationReducer.identificationTypes.passport.data.passportExpiryDate)

  const firearmsLicenceNo = useSelector((state) => state.identificationReducer.identificationTypes.firearms_licence.data.firearmsLicenceNo)
  const firearmsLicenceIssueDate = useSelector((state) => state.identificationReducer.identificationTypes.firearms_licence.data.firearmsLicenceIssueDate)
  const firearmsLicenceExpiryDate = useSelector((state) => state.identificationReducer.identificationTypes.firearms_licence.data.firearmsLicenceExpiryDate)

  const kiwiAccessCardNo = useSelector((state) => state.identificationReducer.identificationTypes.kiwi_access_card.data.kiwiAccessCardNo)
  const kiwiAccessCardIssueDate = useSelector((state) => state.identificationReducer.identificationTypes.kiwi_access_card.data.kiwiAccessCardIssueDate)
  const kiwiAccessCardExpiryDate = useSelector((state) => state.identificationReducer.identificationTypes.kiwi_access_card.data.kiwiAccessCardExpiryDate)

  const commServiceCardNo = useSelector((state) => state.identificationReducer.identificationTypes.community_service_card.data.commServiceCardNo)
  const commServiceCardIssueDate = useSelector((state) => state.identificationReducer.identificationTypes.community_service_card.data.commServiceCardIssueDate)
  const commServiceCardExpiryDate = useSelector((state) => state.identificationReducer.identificationTypes.community_service_card.data.commServiceCardExpiryDate)

  const birthCertificateRegNo = useSelector((state) => state.identificationReducer.identificationTypes.birth_certificate.data.birthCertificateRegNo)
  const regDate = useSelector((state) => state.yourPersonalDetailReducer.dob)

  const currStudentIdNo = useSelector((state) => state.identificationReducer.identificationTypes.current_Student_id.data.currStudentIdNo)
  const currStudentIdIssueDate = useSelector((state) => state.identificationReducer.identificationTypes.current_Student_id.data.currStudentIdIssueDate)
  const currStudentIdExpiryDate = useSelector((state) => state.identificationReducer.identificationTypes.current_Student_id.data.currStudentIdExpiryDate)

  const goldCardNo = useSelector((state) => state.identificationReducer.identificationTypes.gold_card.data.goldCardNo)
  const goldCardValidFromDate = useSelector((state) => state.identificationReducer.identificationTypes.gold_card.data.goldCardValidFromDate)

  const verifiedIdentificationDetailsSecure = useSelector((state) => state.identificationReducer.verifiedIdentificationDetailsSecure)

  const checkedIdentificationTypes = useSelector((state) => state.identificationReducer.checkedIdentificationTypes)

  const isValidDrLicenceDetails = useSelector((state) => state.identificationReducer.isValidDrLicenceDetails)
  const isValidSovDriversLicence = useSelector((state) => state.identificationReducer.isValidSovDriversLicence)
  const isValidSovPassport = useSelector((state) => state.identificationReducer.isValidSovPassport)
  const isValidSovFireArmsLicence = useSelector((state) => state.identificationReducer.isValidSovFireArmsLicence)
  const isValidSovKiwiAccessCard = useSelector((state) => state.identificationReducer.isValidSovKiwiAccessCard)
  const isValidSovCommunityServiceCard = useSelector((state) => state.identificationReducer.isValidSovCommunityServiceCard)
  const isValidSovBirthCertificate = useSelector((state) => state.identificationReducer.isValidSovBirthCertificate)
  const isValidSovCurrentStudentID = useSelector((state) => state.identificationReducer.isValidSovCurrentStudentID)
  const isValidSovGoldCard = useSelector((state) => state.identificationReducer.isValidSovGoldCard)

  const identificationsToDisplay = [
    {
      showIdentification: checkedIdentificationTypes.includes('DRVLSC'),
      title: 'Drivers Licence',
      code: 'DRVLSC',
      referenceLabel: 'Licence Number',
      referece: driversLicenceNo,
      valueLabel: 'Version',
      value: driversLicenceVersion,
      effectiveDateLabel: 'Issue Date',
      effectiveDate: drLicenceIssueDate,
      expiryDateLabel: 'Expiry Date',
      expiryDate: drLicenceExpiryDate,
      showExpiryDate: true,
      isComplete: isValidDrLicenceDetails,
    },
    {
      showIdentification: checkedIdentificationTypes.includes('PASPRT'),
      title: 'Passport',
      code: 'PASPRT',
      referenceLabel: 'Passport Number',
      referece: passportNo,
      valueLabel: null,
      value: null,
      effectiveDateLabel: 'Issue Date',
      effectiveDate: passportIssueDate,
      expiryDateLabel: 'Expiry Date',
      expiryDate: passportExpiryDate,
      showExpiryDate: true,
      isComplete: isValidSovPassport,
    },
    {
      showIdentification: checkedIdentificationTypes.includes('FIRELICENS'),
      title: 'Fireams Licence',
      code: 'FIRELICENS',
      referenceLabel: 'Licence Number',
      referece: firearmsLicenceNo,
      valueLabel: null,
      value: null,
      effectiveDateLabel: 'Issue Date',
      effectiveDate: firearmsLicenceIssueDate,
      expiryDateLabel: 'Expiry Date',
      expiryDate: firearmsLicenceExpiryDate,
      showExpiryDate: true,
      isComplete: isValidSovFireArmsLicence,
    },
    {
      showIdentification: checkedIdentificationTypes.includes('KIWACCCRD'),
      title: 'Kiwi Access Card',
      code: 'KIWACCCRD',
      referenceLabel: 'Card Number',
      referece: kiwiAccessCardNo,
      valueLabel: null,
      value: null,
      effectiveDateLabel: 'Issue Date',
      effectiveDate: kiwiAccessCardIssueDate,
      expiryDateLabel: 'Expiry Date',
      expiryDate: kiwiAccessCardExpiryDate,
      showExpiryDate: true,
      isComplete: isValidSovKiwiAccessCard,
    },
    {
      showIdentification: checkedIdentificationTypes.includes('COMSERVCRD'),
      title: 'Community Services Card',
      code: 'COMSERVCRD',
      referenceLabel: 'Card Number',
      referece: commServiceCardNo,
      valueLabel: null,
      value: null,
      effectiveDateLabel: 'Issue Date',
      effectiveDate: commServiceCardIssueDate,
      expiryDateLabel: 'Expiry Date',
      expiryDate: commServiceCardExpiryDate,
      showExpiryDate: true,
      isComplete: isValidSovCommunityServiceCard,
    },
    {
      showIdentification: checkedIdentificationTypes.includes('BIRTHCERT'),
      title: 'Birth Certificate',
      code: 'BIRTHCERT',
      referenceLabel: 'Registration Number',
      referece: birthCertificateRegNo,
      valueLabel: null,
      value: null,
      effectiveDateLabel: 'Registration Date',
      effectiveDate: regDate,
      expiryDateLabel: null,
      expiryDate: null,
      showExpiryDate: false,
      isComplete: isValidSovBirthCertificate,
    },
    {
      showIdentification: checkedIdentificationTypes.includes('CURSTUDID'),
      title: 'Current Student ID',
      code: 'CURSTUDID',
      referenceLabel: 'Identification Number',
      referece: currStudentIdNo,
      valueLabel: null,
      value: null,
      effectiveDateLabel: 'Issue Date',
      effectiveDate: currStudentIdIssueDate,
      expiryDateLabel: 'Expiry Date',
      expiryDate: currStudentIdExpiryDate,
      showExpiryDate: true,
      isComplete: isValidSovCurrentStudentID,
    },
    {
      showIdentification: checkedIdentificationTypes.includes('GOLDCARD'),
      title: 'Gold Card',
      code: 'GOLDCARD',
      referenceLabel: 'Card Number',
      referece: goldCardNo,
      valueLabel: null,
      value: null,
      effectiveDateLabel: 'Valid From Date',
      effectiveDate: goldCardValidFromDate,
      expiryDateLabel: null,
      expiryDate: null,
      showExpiryDate: false,
      isComplete: isValidSovGoldCard,
    },
  ]

  const identificationsInSovereign = identificationsToDisplay.filter((identification) => {
    return identification.showIdentification === true
  })

  const hasIncompleteIdentificationAttributes = identificationsInSovereign
    .map((item) => {
      return item.isComplete
    })
    .includes(false)

  const handleConfirmDetails = () => {
    dispatch(identificationActions.setVerifiedIdentificationDetailsSecure(!verifiedIdentificationDetailsSecure))
  }

  const varConfirmDetails = isCompleted
    ? varFade({
        distance: 20,
        durationIn: 0.32,
        durationOut: 0.32,
      }).inUp
    : varFade({
        distance: 20,
        durationIn: 0.32,
        durationOut: 0.32,
      }).outDown

  return (
    <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={7} sx={{ m: 0, width: '100%' }}>
      {identificationsInSovereign.map((identification) => (
        <Stack key={identification.title} direction='column' justifyContent='flex-start' alignItems='flex-start' spacing={2} sx>
          <Typography variant='h6' sx={{ color: (theme) => (theme.palette.mode === 'dark' ? SECONDARY.main : PRIMARY.main), fontWeight: 'light', letterSpacing: 3, textTransform: 'uppercase' }}>
            {identification?.title}
          </Typography>
          <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={3}>
            <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={3}>
              <Stack direction='column' justifyContent='center' alignItems='flex-start' sx={{ minWidth: 150 }} spacing={0.25}>
                <Stack direction='row' justifyContent='center' alignItems='center' spacing={1}>
                  <Title sx={{ color: !identification?.referece ? 'error.main' : 'text.secondary' }}>{identification?.referenceLabel}</Title>
                  {!identification?.referece && <ErrorRoundedIcon color='error' fontSize='10' />}
                </Stack>
                <Data sx={{ m: 0, p: 0 }}>{identification?.referece ? identification?.referece : 'Unknown'}</Data>
              </Stack>
              {identification?.code === 'DRVLSC' && (
                <Stack direction='column' justifyContent='center' alignItems='flex-start' sx={{ minWidth: 150 }} spacing={0.25}>
                  <Stack direction='row' justifyContent='center' alignItems='center' spacing={1}>
                    <Title sx={{ color: !identification?.value ? 'error.main' : 'text.secondary' }}>{identification?.valueLabel}</Title>
                    {!identification?.value && <ErrorRoundedIcon color='error' fontSize='10' />}
                  </Stack>
                  <Data sx={{ m: 0, p: 0 }}>{identification?.value ? identification?.value : 'Unknown'}</Data>
                </Stack>
              )}
            </Stack>
            <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={3}>
              <Stack direction='column' justifyContent='center' alignItems='flex-start' sx={{ minWidth: 150 }} spacing={0.25}>
                <Stack direction='row' justifyContent='center' alignItems='center' spacing={1}>
                  <Title sx={{ color: !identification?.effectiveDate ? 'error.main' : 'text.secondary' }}>{identification?.effectiveDateLabel}</Title>
                  {!identification?.effectiveDate && <ErrorRoundedIcon color='error' fontSize='10' />}
                </Stack>
                <Data sx={{ m: 0, p: 0 }}>{identification?.effectiveDate ? fDate(identification?.effectiveDate) : 'Unknown'}</Data>
              </Stack>
              {identification?.showExpiryDate && (
                <Stack direction='column' justifyContent='center' alignItems='flex-start' sx={{ minWidth: 150 }} spacing={0.25}>
                  <Stack direction='row' justifyContent='center' alignItems='center' spacing={1}>
                    <Title sx={{ color: !identification?.expiryDate ? 'error.main' : 'text.secondary' }}>{identification?.expiryDateLabel}</Title>
                    {!identification?.expiryDate && <ErrorRoundedIcon color='error' fontSize='10' />}
                  </Stack>
                  <Data sx={{ m: 0, p: 0 }}>{identification?.expiryDate ? fDate(identification?.expiryDate) : 'Unknown'}</Data>
                </Stack>
              )}
            </Stack>
          </Stack>
        </Stack>
      ))}
      {!hasIncompleteIdentificationAttributes && (
        <Stack component={motion.div} {...varConfirmDetails} direction='row' justifyContent='center' alignItems='center' sx={{ minWidth: '100%' }}>
          <FormControlLabel
            control={<Checkbox color='success' checked={verifiedIdentificationDetailsSecure} onChange={handleConfirmDetails} />}
            label={
              <Typography color='text.secondary'>
                I confirm that my <strong>identification details</strong> are correct and up-to-date
              </Typography>
            }
          />
        </Stack>
      )}
    </Stack>
  )
}
