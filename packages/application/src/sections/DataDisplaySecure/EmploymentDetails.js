import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

//Framer
import { motion } from 'framer-motion'
import { varFade, varBounce } from '../../components/ui/animate'

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
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded'

// Date-fns
import { fDate } from '../../utils/formatDateTime'

// Redux
import { useSelector, useDispatch } from 'react-redux'

// Redux - Actions
import { employmentActions } from '../../redux/slices/employmentSlice'
import { isNull } from 'lodash'

// Custom Components
import { Title, Data } from './Interface/Typography'

export default function FirstLoanApplicationSecure() {
  const dispatch = useDispatch()

  const downMd = useMediaQuery((theme) => theme.breakpoints.down('md'))
  const downSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  const [isCompleted, setIsCompleted] = React.useState(true)

  const sovHasCurrentEmpDetails = useSelector((state) => state.employmentReducer.sovHasCurrentEmpDetails)
  const sovHasPreviousEmpDetails = useSelector((state) => state.employmentReducer.sovHasPreviousEmpDetails)
  const showPrevEmp = useSelector((state) => state.employmentReducer.showPrevEmp)

  const employmentType = useSelector((state) => state.employmentReducer.employmentType)
  const occupation = useSelector((state) => state.employmentReducer.occupation)
  const employerName = useSelector((state) => state.employmentReducer.employerName)
  const empHistYears = useSelector((state) => state.employmentReducer.empHistYears)
  const empHistMonths = useSelector((state) => state.employmentReducer.empHistMonths)
  const empAddressToDisplayLine1 = useSelector((state) => state.employmentReducer.empAddressToDisplayLine1)
  const empAddressToDisplayLine2 = useSelector((state) => state.employmentReducer.empAddressToDisplayLine2)
  const empAddressToDisplayLine3 = useSelector((state) => state.employmentReducer.empAddressToDisplayLine3)

  const prevEmpemploymentType = useSelector((state) => state.employmentReducer.prevEmpemploymentType)
  const prevEmpoccupation = useSelector((state) => state.employmentReducer.prevEmpoccupation)
  const prevEmpemployerName = useSelector((state) => state.employmentReducer.prevEmpemployerName)
  const prevEmpempHistYears = useSelector((state) => state.employmentReducer.prevEmpempHistYears)
  const prevEmpempHistMonths = useSelector((state) => state.employmentReducer.prevEmpempHistMonths)
  const prevEmpempAddressToDisplayLine1 = useSelector((state) => state.employmentReducer.prevEmpempAddressToDisplayLine1)
  const prevEmpempAddressToDisplayLine2 = useSelector((state) => state.employmentReducer.prevEmpempAddressToDisplayLine2)
  const prevEmpempAddressToDisplayLine3 = useSelector((state) => state.employmentReducer.prevEmpempAddressToDisplayLine3)

  const isValidCurrentEmployment = useSelector((state) => state.employmentReducer.isValidCurrentEmployment)
  const isValidPreviousEmployment = useSelector((state) => state.employmentReducer.isValidPreviousEmployment)
  const verifiedEmploymentnDetailsSecure = useSelector((state) => state.employmentReducer.verifiedEmploymentnDetailsSecure)

  const hasCurrentEmpAddress = !(empAddressToDisplayLine1 == null) || !(empAddressToDisplayLine2 == null) || !(empAddressToDisplayLine3 == null)
  const hasPreviousEmpAddress = !(prevEmpempAddressToDisplayLine1 == null) || !(prevEmpempAddressToDisplayLine2 == null) || !(prevEmpempAddressToDisplayLine3 == null)

  const handleConfirmDetails = () => {
    dispatch(employmentActions.setVerifiedEmploymentnDetailsSecure(!verifiedEmploymentnDetailsSecure))
  }

  const varConfirmDetails =
    isValidCurrentEmployment && isValidPreviousEmployment
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
        {sovHasCurrentEmpDetails ? (
          <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={4} sx={{ width: '100%' }}>
            <Typography variant='h6' sx={{ color: (theme) => (theme.palette.mode === 'dark' ? SECONDARY.main : PRIMARY.main), fontWeight: 'light', letterSpacing: 3, textTransform: 'uppercase' }}>
              Current Employment
            </Typography>
            <Stack direction='column' justifyContent='center' alignItems='flex-start'>
              <Stack direction='row' justifyContent='center' alignItems='center' spacing={1}>
                <Title sx={{ color: !employmentType ? 'error.main' : 'text.secondary' }}>Employment Type</Title>
                {!employmentType && <ErrorRoundedIcon color='error' fontSize='10' />}
              </Stack>
              <Data>{employmentType ? employmentType : 'Unknown'}</Data>
            </Stack>
            <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={0.25}>
              <Stack direction='row' justifyContent='center' alignItems='center' spacing={1}>
                <Title sx={{ color: !occupation ? 'error.main' : 'text.secondary' }}>Occupation</Title>
                {!occupation && <ErrorRoundedIcon color='error' fontSize='10' />}
              </Stack>
              <Data>{occupation ? occupation : 'Unknown'}</Data>
            </Stack>
            <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={0.25}>
              <Stack direction='row' justifyContent='center' alignItems='center' spacing={1}>
                <Title sx={{ color: !employerName ? 'error.main' : 'text.secondary' }}>Employer Name</Title>
                {!employerName && <ErrorRoundedIcon color='error' fontSize='10' />}
              </Stack>
              <Data>{employerName ? employerName : 'Unknown'}</Data>
            </Stack>
            <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={0.25}>
              <Stack direction='row' justifyContent='center' alignItems='center' spacing={1}>
                <Title sx={{ color: !hasCurrentEmpAddress ? 'error.main' : 'text.secondary' }}>Employer Address</Title>
                {!hasCurrentEmpAddress && <ErrorRoundedIcon color='error' fontSize='10' />}
              </Stack>
              {hasCurrentEmpAddress && (
                <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={1}>
                  {empAddressToDisplayLine1 && <Data>{empAddressToDisplayLine1}</Data>}
                  {empAddressToDisplayLine2 && <Data>{empAddressToDisplayLine2}</Data>}
                  {empAddressToDisplayLine3 && <Data>{empAddressToDisplayLine3}</Data>}
                </Stack>
              )}
              {!hasCurrentEmpAddress && <Data>Unknown</Data>}
            </Stack>
            <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={0.25}>
              <Stack direction='row' justifyContent='center' alignItems='center' spacing={1}>
                <Title sx={{ color: empHistYears === 0 && empHistMonths === 0 ? 'error.main' : 'text.secondary' }}>Employment Period</Title>
                {empHistYears === 0 && empHistMonths === 0 && <ErrorRoundedIcon color='error' fontSize='10' />}
              </Stack>
              {!(empHistYears === 0 && empHistMonths === 0) ? (
                <>
                  <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={2} sc={{ m: 0 }}>
                    <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={0.5}>
                      <Data>{empHistYears}</Data>
                      <Typography variant='caption' color='text.secondary'>
                        Years
                      </Typography>
                    </Stack>
                    <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={0.5}>
                      <Data>{empHistMonths}</Data>
                      <Typography variant='caption' color='text.secondary'>
                        Months
                      </Typography>
                    </Stack>
                  </Stack>
                </>
              ) : (
                <Data>Unknown</Data>
              )}
            </Stack>
          </Stack>
        ) : (
          <Stack direction='column' justifyContent='center' alignItems='center' spacing={4} sx={{ width: '100%', minHeight: 300 }}>
            <Stack direction='column' justifyContent='center' alignItems='center' spacing={1}>
              <Stack direction={downSm ? 'column' : 'row'} justifyContent='center' alignItems='center' spacing={1} sx={{ textAlign: 'center' }}>
                <Box component={motion.div} {...varBounce().in}>
                  <PriorityHighIcon color='warning' fontSize='large' />
                </Box>
                <Typography variant={downSm ? 'body1' : 'subtitle1'} color='text.primary' sx={{ fontWeight: 500 }}>
                  Unfortunately, we do not have your {!sovHasCurrentEmpDetails && !sovHasPreviousEmpDetails ? 'employemnt' : !sovHasCurrentEmpDetails && sovHasPreviousEmpDetails ? 'current employment' : ''} details.
                </Typography>
              </Stack>
              <Typography variant={downSm ? 'caption' : 'body2'} color='text.secondary' sx={{ textAlign: 'center' }}>
                Please click <strong>add employment</strong> to update your details.
              </Typography>
            </Stack>
          </Stack>
        )}
        {sovHasPreviousEmpDetails && showPrevEmp && (
          <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={4} sx={{ width: '100%' }}>
            <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={3} sx={{ width: '100%' }}>
              <Divider />
              <Typography variant='h6' sx={{ color: (theme) => (theme.palette.mode === 'dark' ? SECONDARY.main : PRIMARY.main), fontWeight: 'light', letterSpacing: 3, textTransform: 'uppercase' }}>
                Previous Employment
              </Typography>
            </Stack>
            <Stack direction='column' justifyContent='center' alignItems='flex-start'>
              <Stack direction='row' justifyContent='center' alignItems='center' spacing={1}>
                <Title sx={{ color: !prevEmpemploymentType ? 'error.main' : 'text.secondary' }}>Previous Employment Type</Title>
                {!prevEmpemploymentType && <ErrorRoundedIcon color='error' fontSize='10' />}
              </Stack>
              <Data>{prevEmpemploymentType ? prevEmpemploymentType : 'Unknown'}</Data>
            </Stack>
            <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={0.25}>
              <Stack direction='row' justifyContent='center' alignItems='center' spacing={1}>
                <Title sx={{ color: !prevEmpoccupation ? 'error.main' : 'text.secondary' }}>Previous Occupation</Title>
                {!prevEmpoccupation && <ErrorRoundedIcon color='error' fontSize='10' />}
              </Stack>
              <Data>{prevEmpoccupation ? prevEmpoccupation : 'Unknown'}</Data>
            </Stack>
            <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={0.25}>
              <Stack direction='row' justifyContent='center' alignItems='center' spacing={1}>
                <Title sx={{ color: !prevEmpemployerName ? 'error.main' : 'text.secondary' }}>Previous Employer Name</Title>
                {!prevEmpemployerName && <ErrorRoundedIcon color='error' fontSize='10' />}
              </Stack>
              <Data>{prevEmpemployerName ? prevEmpemployerName : 'Unknown'}</Data>
            </Stack>
            <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={0.25}>
              <Stack direction='row' justifyContent='center' alignItems='center' spacing={1}>
                <Title sx={{ color: !hasPreviousEmpAddress ? 'error.main' : 'text.secondary' }}>Previous Employer Address</Title>
                {!hasPreviousEmpAddress && <ErrorRoundedIcon color='error' fontSize='10' />}
              </Stack>
              {hasPreviousEmpAddress && (
                <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={1}>
                  {prevEmpempAddressToDisplayLine1 && <Data>{prevEmpempAddressToDisplayLine1}</Data>}
                  {prevEmpempAddressToDisplayLine2 && <Data>{prevEmpempAddressToDisplayLine2}</Data>}
                  {prevEmpempAddressToDisplayLine3 && <Data>{prevEmpempAddressToDisplayLine3}</Data>}
                </Stack>
              )}
              {!hasPreviousEmpAddress && <Data>Unknown</Data>}
            </Stack>
            <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={0.25}>
              <Stack direction='row' justifyContent='center' alignItems='center' spacing={1}>
                <Title sx={{ color: prevEmpempHistYears === 0 && prevEmpempHistMonths === 0 ? 'error.main' : 'text.secondary' }}>Employment Period</Title>
                {prevEmpempHistYears === 0 && prevEmpempHistMonths === 0 && <ErrorRoundedIcon color='error' fontSize='10' />}
              </Stack>
              {!(prevEmpempHistYears === 0 && prevEmpempHistMonths === 0) ? (
                <>
                  <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={2} sc={{ m: 0 }}>
                    <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={0.5}>
                      <Data>{prevEmpempHistYears}</Data>
                      <Typography variant='caption' color='text.secondary'>
                        Years
                      </Typography>
                    </Stack>
                    <Typography variant='caption' color='text.secondary'>
                      <strong>and</strong>
                    </Typography>
                    <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={0.5}>
                      <Data>{prevEmpempHistMonths}</Data>
                      <Typography variant='caption' color='text.secondary'>
                        Months
                      </Typography>
                    </Stack>
                  </Stack>
                </>
              ) : (
                <Data>Unknown</Data>
              )}
            </Stack>
          </Stack>
        )}

        {isValidCurrentEmployment && isValidPreviousEmployment && (
          <Stack component={motion.div} {...varConfirmDetails} direction='row' justifyContent='center' alignItems='center' sx={{ minWidth: '100%' }}>
            <FormControlLabel
              control={<Checkbox color='success' checked={verifiedEmploymentnDetailsSecure} onChange={handleConfirmDetails} />}
              label={
                <Typography color='text.secondary'>
                  I confirm that my <strong>employment details</strong> are correct and up-to-date
                </Typography>
              }
            />
          </Stack>
        )}
      </Stack>
    </Box>
  )
}
