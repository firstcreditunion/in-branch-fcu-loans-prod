import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

//Framer
import { motion } from 'framer-motion'
import { varFade } from '../../components/ui/animate'

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
import { yourPersonalDetailsActions } from '../../redux/slices/yourPersonalDetailsSlice'

// Custom Components
import { Title, Data } from './Interface/Typography'

export default function FirstLoanApplicationSecure() {
  const dispatch = useDispatch()

  const title = useSelector((state) => state.yourPersonalDetailReducer.title)
  const forenames = useSelector((state) => state.yourPersonalDetailReducer.forenames)
  const lastName = useSelector((state) => state.yourPersonalDetailReducer.lastName)
  const dob = useSelector((state) => state.yourPersonalDetailReducer.dob)
  const gender = useSelector((state) => state.yourPersonalDetailReducer.gender)
  const dependents = useSelector((state) => state.yourPersonalDetailReducer.dependents)
  const maritalStatus = useSelector((state) => state.yourPersonalDetailReducer.maritalStatus)

  const validSovereignPersonalDetails = useSelector((state) => state.yourPersonalDetailReducer.validSovereignPersonalDetails)
  const verifiedPersonalDetailsSecure = useSelector((state) => state.yourPersonalDetailReducer.verifiedPersonalDetailsSecure)

  const handleConfirmDetails = () => {
    dispatch(yourPersonalDetailsActions.setVerifiedPersonalDetailsSecure(!verifiedPersonalDetailsSecure))
  }

  const varConfirmDetails =
    !(title == null) && !(forenames == null) && !(lastName == null) && !(gender == null) && !(dob == null) && !(maritalStatus == null)
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
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={4} sx={{ width: '100%' }}>
        <Stack direction='column' justifyContent='center' alignItems='flex-start'>
          <Stack direction='row' justifyContent='center' alignItems='center' spacing={1}>
            <Title sx={{ color: !title ? 'error.main' : 'text.secondary' }}>Title</Title>
            {!title && <ErrorRoundedIcon color='error' fontSize='10' />}
          </Stack>
          <Data>{title ? title : 'Unknown'}</Data>
        </Stack>
        <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={0.25}>
          <Stack direction='row' justifyContent='center' alignItems='center' spacing={1}>
            <Title sx={{ color: !forenames ? 'error.main' : 'text.secondary' }}>First Names</Title>
            {!forenames && <ErrorRoundedIcon color='error' fontSize='10' />}
          </Stack>
          <Data>{forenames ? forenames : 'Unknown'}</Data>
        </Stack>
        <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={0.25}>
          <Stack direction='row' justifyContent='center' alignItems='center' spacing={1}>
            <Title sx={{ color: !lastName ? 'error.main' : 'text.secondary' }}>Last Name</Title>
            {!lastName && <ErrorRoundedIcon color='error' fontSize='10' />}
          </Stack>
          <Data>{lastName ? lastName : 'Unknown'}</Data>
        </Stack>
        <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={0.25}>
          <Stack direction='row' justifyContent='center' alignItems='center' spacing={1}>
            <Title sx={{ color: !dob ? 'error.main' : 'text.secondary' }}>Date of Birth</Title>
            {!dob && <ErrorRoundedIcon color='error' fontSize='10' />}
          </Stack>
          <Data>{dob ? fDate(dob) : 'Unknown'}</Data>
        </Stack>
        <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={0.25}>
          <Stack direction='row' justifyContent='center' alignItems='center' spacing={1}>
            <Title sx={{ color: !gender ? 'error.main' : 'text.secondary' }}>Gender</Title>
            {!gender && <ErrorRoundedIcon color='error' fontSize='10' />}
          </Stack>
          <Data>{gender ? gender : 'Unknown'}</Data>
        </Stack>
        <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={0.25}>
          <Stack direction='row' justifyContent='center' alignItems='center' spacing={1}>
            <Title sx={{ color: !maritalStatus ? 'error.main' : 'text.secondary' }}>Marital Status</Title>
            {!maritalStatus && <ErrorRoundedIcon color='error' fontSize='10' />}
          </Stack>
          <Data>{maritalStatus ? maritalStatus?.value : 'Unknown'}</Data>
        </Stack>
        <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={0.25}>
          <Title sx={{ color: 'text.secondary' }}>Dependent Adults and Children</Title>
          <Data>{dependents}</Data>
        </Stack>
        {!(title == null) && !(forenames == null) && !(lastName == null) && !(gender == null) && !(dob == null) && !(maritalStatus == null) && (
          <Stack component={motion.div} {...varConfirmDetails} direction='row' justifyContent='center' alignItems='center' sx={{ minWidth: '100%' }}>
            <FormControlLabel
              control={<Checkbox color='success' checked={verifiedPersonalDetailsSecure} onChange={handleConfirmDetails} />}
              label={
                <Typography color='text.secondary'>
                  I confirm that my <strong>personal details</strong> are correct and up-to-date
                </Typography>
              }
            />
          </Stack>
        )}
      </Stack>
    </Box>
  )
}
