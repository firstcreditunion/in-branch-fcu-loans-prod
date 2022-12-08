import React, { useEffect } from 'react'
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
import { contactDetailsActions } from '../../redux/slices/contactDetailsSlice'

// Custom Components
import { Title, Data } from './Interface/Typography'

// Utils
import { getResidenceType_Key } from '../../utils/getKeysOrValues'

export default function FirstLoanApplicationSecure() {
  const dispatch = useDispatch()

  const downSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const downMd = useMediaQuery((theme) => theme.breakpoints.down('md'))

  // Current Residential Address
  const sovHasCurrentResidentialDetails = useSelector((state) => state.conatctDetailsReducer.sovHasCurrentResidentialDetails)
  const currResAddressSelectedMetaData = useSelector((state) => state.conatctDetailsReducer.currResAddressSelectedMetaData)
  const isValidSovCurrentResidentialDetails = useSelector((state) => state.conatctDetailsReducer.isValidSovCurrentResidentialDetails)

  const sovCurrentAddressType = useSelector((state) => state.conatctDetailsReducer.sovCurrentAddressType)
  const sovCurrentAddressAlpha = useSelector((state) => state.conatctDetailsReducer.sovCurrentAddressAlpha)
  const sovCurrentAddressapartment = useSelector((state) => state.conatctDetailsReducer.sovCurrentAddressapartment)

  const sovCurrentAddressbuilding = useSelector((state) => state.conatctDetailsReducer.sovCurrentAddressbuilding)
  const sovCurrentAddresscareOfName = useSelector((state) => state.conatctDetailsReducer.sovCurrentAddresscareOfName)
  const sovCurrentAddresscity = useSelector((state) => state.conatctDetailsReducer.sovCurrentAddresscity)
  const sovCurrentAddresscontactType = useSelector((state) => state.conatctDetailsReducer.sovCurrentAddresscontactType)
  const sovCurrentAddresscountryCode = useSelector((state) => state.conatctDetailsReducer.sovCurrentAddresscountry?.code)
  const sovCurrentAddresscountryDescription = useSelector((state) => state.conatctDetailsReducer.sovCurrentAddresscountry?.description)
  const sovCurrentAddresseffective = useSelector((state) => state.conatctDetailsReducer.sovCurrentAddresseffective)
  const sovCurrentAddressfloor = useSelector((state) => state.conatctDetailsReducer.sovCurrentAddressfloor)
  const sovCurrentAddresspostCode = useSelector((state) => state.conatctDetailsReducer.sovCurrentAddresspostCode)
  const sovCurrentAddresspurpose = useSelector((state) => state.conatctDetailsReducer.sovCurrentAddresspurpose)
  const sovCurrentAddressstreetDirection = useSelector((state) => state.conatctDetailsReducer.sovCurrentAddressstreetDirection)
  const sovCurrentAddressstreetNumberFrom = useSelector((state) => state.conatctDetailsReducer.sovCurrentAddressstreetNumber?.from)
  const sovCurrentAddressstreetNumberTo = useSelector((state) => state.conatctDetailsReducer.sovCurrentAddressstreetNumber?.to)
  const sovCurrentAddressstreetOrPostalName = useSelector((state) => state.conatctDetailsReducer.sovCurrentAddressstreetOrPostalName)
  const sovCurrentAddressstreetType = useSelector((state) => state.conatctDetailsReducer.sovCurrentAddressstreetType)
  const sovCurrentAddresssuburb = useSelector((state) => state.conatctDetailsReducer.sovCurrentAddresssuburb)
  const sovCurrentAddressunitType = useSelector((state) => state.conatctDetailsReducer.sovCurrentAddressunitType)

  const sovCurrentAddressLine1 = (!(sovCurrentAddressunitType == null) ? sovCurrentAddressunitType : '') + (!(sovCurrentAddressapartment == null) ? ' ' + sovCurrentAddressapartment : '') + (!(sovCurrentAddressfloor == null) ? ' ' + sovCurrentAddressfloor : '') + (!(sovCurrentAddressbuilding == null) ? ' ' + sovCurrentAddressbuilding : '')
  const sovCurrentAddressLine2 = (!(sovCurrentAddressstreetNumberFrom == null) && !(sovCurrentAddressstreetNumberFrom === '0') ? sovCurrentAddressstreetNumberFrom : '') + (!(sovCurrentAddressstreetNumberTo == null) && !(sovCurrentAddressstreetNumberTo === '0') ? '-' + sovCurrentAddressstreetNumberTo : '') + (!(sovCurrentAddressAlpha == null) ? sovCurrentAddressAlpha : '') + (!(sovCurrentAddressstreetOrPostalName == null) ? ' ' + sovCurrentAddressstreetOrPostalName : '') + (!(sovCurrentAddressstreetType == null) ? ' ' + sovCurrentAddressstreetType : '') + (!(sovCurrentAddressstreetDirection == null) ? ' ' + sovCurrentAddressstreetDirection : '')
  const sovCurrentAddressLine3 = !(sovCurrentAddresssuburb == null) ? sovCurrentAddresssuburb : ''
  const sovCurrentAddressLine4 = (!(sovCurrentAddresscity == null) ? sovCurrentAddresscity : '') + (!(sovCurrentAddresspostCode == null) ? ' ' + sovCurrentAddresspostCode : '')

  if (currResAddressSelectedMetaData === null) {
    dispatch(contactDetailsActions.setCurrResAddressToDisplayLine1(sovCurrentAddressLine1))
    dispatch(contactDetailsActions.setCurrResAddressToDisplayLine2(sovCurrentAddressLine2))
    dispatch(contactDetailsActions.setCurrResAddressToDisplayLine3(sovCurrentAddressLine3))
    dispatch(contactDetailsActions.setCurrResAddressToDisplayLine4(sovCurrentAddressLine4))
  }

  const currResAddressToDisplayLine1 = useSelector((state) => state.conatctDetailsReducer.currResAddressToDisplayLine1)
  const currResAddressToDisplayLine2 = useSelector((state) => state.conatctDetailsReducer.currResAddressToDisplayLine2)
  const currResAddressToDisplayLine3 = useSelector((state) => state.conatctDetailsReducer.currResAddressToDisplayLine3)
  const currResAddressToDisplayLine4 = useSelector((state) => state.conatctDetailsReducer.currResAddressToDisplayLine4)

  const residenceType = useSelector((state) => state.conatctDetailsReducer.residenceType)
  const currResYears = useSelector((state) => state.conatctDetailsReducer.currResYears)
  const currResMonths = useSelector((state) => state.conatctDetailsReducer.currResMonths)

  // Previous Residential Address

  const sovHasPreviousResidentialDetails = useSelector((state) => state.conatctDetailsReducer.sovHasPreviousResidentialDetails)
  const prevResAddressSelectedMetaData = useSelector((state) => state.conatctDetailsReducer.prevResAddressSelectedMetaData)
  const isValidSovPreviousResidentialDetails = useSelector((state) => state.conatctDetailsReducer.isValidSovPreviousResidentialDetails)
  const skipPrevResidence = useSelector((state) => state.conatctDetailsReducer.skipPrevResidence)

  const sovPreviousAddressType = useSelector((state) => state.conatctDetailsReducer.sovPreviousAddressType)
  const sovPreviousAddressAlpha = useSelector((state) => state.conatctDetailsReducer.sovPreviousAddressAlpha)
  const sovPreviousAddressapartment = useSelector((state) => state.conatctDetailsReducer.sovPreviousAddressapartment)
  const sovPreviousAddressbuilding = useSelector((state) => state.conatctDetailsReducer.sovPreviousAddressbuilding)
  const sovPreviousAddresscareOfName = useSelector((state) => state.conatctDetailsReducer.sovPreviousAddresscareOfName)
  const sovPreviousAddresscity = useSelector((state) => state.conatctDetailsReducer.sovPreviousAddresscity)
  const sovPreviousAddresscontactType = useSelector((state) => state.conatctDetailsReducer.sovPreviousAddresscontactType)
  const sovPreviousAddresscountryCode = useSelector((state) => state.conatctDetailsReducer.sovPreviousAddresscountry?.code)
  const sovPreviousAddresscountryDescription = useSelector((state) => state.conatctDetailsReducer.sovPreviousAddresscountry?.description)
  const sovPreviousAddresseffective = useSelector((state) => state.conatctDetailsReducer.sovPreviousAddresseffective)
  const sovPreviousAddressfloor = useSelector((state) => state.conatctDetailsReducer.sovPreviousAddressfloor)
  const sovPreviousAddresspostCode = useSelector((state) => state.conatctDetailsReducer.sovPreviousAddresspostCode)
  const sovPreviousAddresspurpose = useSelector((state) => state.conatctDetailsReducer.sovPreviousAddresspurpose)
  const sovPreviousAddressstreetDirection = useSelector((state) => state.conatctDetailsReducer.sovPreviousAddressstreetDirection)
  const sovPreviousAddressstreetNumberFrom = useSelector((state) => state.conatctDetailsReducer.sovPreviousAddressstreetNumber?.from)
  const sovPreviousAddressstreetNumberTo = useSelector((state) => state.conatctDetailsReducer.sovPreviousAddressstreetNumber?.to)
  const sovPreviousAddressstreetOrPostalName = useSelector((state) => state.conatctDetailsReducer.sovPreviousAddressstreetOrPostalName)
  const sovPreviousAddressstreetType = useSelector((state) => state.conatctDetailsReducer.sovPreviousAddressstreetType)
  const sovPreviousAddresssuburb = useSelector((state) => state.conatctDetailsReducer.sovPreviousAddresssuburb)
  const sovPreviousAddressunitType = useSelector((state) => state.conatctDetailsReducer.sovPreviousAddressunitType)

  const sovPreviousAddressLine1 = (!(sovPreviousAddressunitType == null) ? sovPreviousAddressunitType : '') + (!(sovPreviousAddressapartment == null) ? ' ' + sovPreviousAddressapartment : '') + (!(sovPreviousAddressfloor == null) ? ' ' + sovPreviousAddressfloor : '') + (!(sovPreviousAddressbuilding == null) ? ' ' + sovPreviousAddressbuilding : '')
  const sovPreviousAddressLine2 = (!(sovPreviousAddressstreetNumberFrom == null) && !(sovPreviousAddressstreetNumberFrom === '0') ? sovPreviousAddressstreetNumberFrom : '') + (!(sovPreviousAddressstreetNumberTo == null) && !(sovPreviousAddressstreetNumberTo === '0') ? '-' + sovPreviousAddressstreetNumberTo : '') + (!(sovPreviousAddressAlpha == null) ? sovPreviousAddressAlpha : '') + (!(sovPreviousAddressstreetOrPostalName == null) ? ' ' + sovPreviousAddressstreetOrPostalName : '') + (!(sovPreviousAddressstreetType == null) ? ' ' + sovPreviousAddressstreetType : '') + (!(sovPreviousAddressstreetDirection == null) ? ' ' + sovPreviousAddressstreetDirection : '')
  const sovPreviousAddressLine3 = !(sovPreviousAddresssuburb == null) ? sovPreviousAddresssuburb : ''
  const sovPreviousAddressLine4 = (!(sovPreviousAddresscity == null) ? sovPreviousAddresscity : '') + (!(sovPreviousAddresspostCode == null) ? ' ' + sovPreviousAddresspostCode : '')

  if (prevResAddressSelectedMetaData == null) {
    dispatch(contactDetailsActions.setPrevResAddressToDisplayLine1(sovPreviousAddressLine1))
    dispatch(contactDetailsActions.setPrevResAddressToDisplayLine2(sovPreviousAddressLine2))
    dispatch(contactDetailsActions.setPrevResAddressToDisplayLine3(sovPreviousAddressLine3))
    dispatch(contactDetailsActions.setPrevResAddressToDisplayLine4(sovPreviousAddressLine4))
  }

  const prevResAddressToDisplayLine1 = useSelector((state) => state.conatctDetailsReducer.prevResAddressToDisplayLine1)
  const prevResAddressToDisplayLine2 = useSelector((state) => state.conatctDetailsReducer.prevResAddressToDisplayLine2)
  const prevResAddressToDisplayLine3 = useSelector((state) => state.conatctDetailsReducer.prevResAddressToDisplayLine3)
  const prevResAddressToDisplayLine4 = useSelector((state) => state.conatctDetailsReducer.prevResAddressToDisplayLine4)

  const prevResYears = useSelector((state) => state.conatctDetailsReducer.prevResYears)
  const prevResMonths = useSelector((state) => state.conatctDetailsReducer.prevResMonths)

  const verifiedResidentialDetailsSecure = useSelector((state) => state.conatctDetailsReducer.verifiedResidentialDetailsSecure)

  const handleConfirmDetails = () => {
    dispatch(contactDetailsActions.setVerifiedResidentialDetailsSecure(!verifiedResidentialDetailsSecure))
  }

  const varConfirmDetails =
    isValidSovCurrentResidentialDetails && (isValidSovPreviousResidentialDetails === true || isValidSovPreviousResidentialDetails === null)
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
        {sovHasCurrentResidentialDetails ? (
          <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={3} sx={{ width: '100%' }}>
            <Typography variant='h6' sx={{ color: (theme) => (theme.palette.mode === 'dark' ? SECONDARY.main : PRIMARY.main), fontWeight: 'light', letterSpacing: 3, textTransform: 'uppercase' }}>
              Current Residence
            </Typography>
            <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={0.25}>
              <Stack direction='row' justifyContent='center' alignItems='center' spacing={1}>
                <Title sx={{ color: !sovHasCurrentResidentialDetails ? 'error.main' : 'text.secondary' }}>Residential Address</Title>
                {!sovHasCurrentResidentialDetails && <ErrorRoundedIcon color='error' fontSize='10' />}
              </Stack>
              {sovHasCurrentResidentialDetails && (
                <Stack direction='column' justifyContent='center' alignItems='flex-start'>
                  {currResAddressToDisplayLine1 && <Data>{currResAddressToDisplayLine1}</Data>}
                  {currResAddressToDisplayLine2 && <Data>{currResAddressToDisplayLine2}</Data>}
                  {currResAddressToDisplayLine3 && <Data>{currResAddressToDisplayLine3}</Data>}
                  {currResAddressToDisplayLine4 && <Data>{currResAddressToDisplayLine4}</Data>}
                </Stack>
              )}
            </Stack>
            <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={0.25}>
              <Stack direction='row' justifyContent='center' alignItems='center' spacing={1}>
                <Title sx={{ color: !residenceType ? 'error.main' : 'text.secondary' }}>Accomodation Type</Title>
                {!residenceType && <ErrorRoundedIcon color='error' fontSize='10' />}
              </Stack>
              <Data>{residenceType ? getResidenceType_Key(residenceType)?.value : 'Unknown'}</Data>
            </Stack>
            <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={0.25}>
              <Stack direction='row' justifyContent='center' alignItems='center' spacing={1}>
                <Title sx={{ color: currResYears === 0 && currResMonths === 0 ? 'error.main' : 'text.secondary' }}>Length of Stay</Title>
                {currResYears === 0 && currResMonths === 0 && <ErrorRoundedIcon color='error' fontSize='10' />}
              </Stack>
              {!(currResYears === 0 && currResMonths === 0) ? (
                <>
                  <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={2} sc={{ m: 0 }}>
                    <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={0.5}>
                      <Data>{currResYears}</Data>
                      <Typography variant='caption' color='text.secondary'>
                        Years
                      </Typography>
                    </Stack>
                    <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={0.5}>
                      <Data>{currResMonths}</Data>
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
                  Unfortunately, we do not have your {!sovHasCurrentResidentialDetails && !sovHasPreviousResidentialDetails ? 'residential' : !sovHasCurrentResidentialDetails && sovHasPreviousResidentialDetails ? 'current residential' : ''} details.
                </Typography>
              </Stack>
              <Typography variant={downSm ? 'caption' : 'body2'} color='text.secondary' sx={{ textAlign: 'center' }}>
                Please click <strong>add residence</strong> to update your details.
              </Typography>
            </Stack>
          </Stack>
        )}
        {sovHasPreviousResidentialDetails && skipPrevResidence === false && (
          <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={4} sx={{ width: '100%' }}>
            <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={3} sx={{ width: '100%' }}>
              <Typography variant='h6' sx={{ color: (theme) => (theme.palette.mode === 'dark' ? SECONDARY.main : PRIMARY.main), fontWeight: 'light', letterSpacing: 3, textTransform: 'uppercase' }}>
                Previous Residence
              </Typography>
              <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={0.25}>
                <Stack direction='row' justifyContent='center' alignItems='center' spacing={1}>
                  <Title sx={{ color: !sovHasPreviousResidentialDetails ? 'error.main' : 'text.secondary' }}>Residential Address</Title>
                  {!sovHasPreviousResidentialDetails && <ErrorRoundedIcon color='error' fontSize='10' />}
                </Stack>
                {sovHasPreviousResidentialDetails && (
                  <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={1}>
                    {prevResAddressToDisplayLine1 && <Data>{prevResAddressToDisplayLine1}</Data>}
                    {prevResAddressToDisplayLine2 && <Data>{prevResAddressToDisplayLine2}</Data>}
                    {prevResAddressToDisplayLine3 && <Data>{prevResAddressToDisplayLine3}</Data>}
                    {prevResAddressToDisplayLine4 && <Data>{prevResAddressToDisplayLine4}</Data>}
                  </Stack>
                )}
              </Stack>
              <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={0.25}>
                <Stack direction='row' justifyContent='center' alignItems='center' spacing={1}>
                  <Title sx={{ color: 'text.secondary' }}>Length of Stay</Title>
                  {prevResYears === 0 && prevResMonths === 0 && <ErrorRoundedIcon color='warning' fontSize='10' />}
                </Stack>
                {!(prevResYears === 0 && prevResMonths === 0) ? (
                  <>
                    <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={2} sc={{ m: 0 }}>
                      <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={0.5}>
                        <Data>{prevResYears}</Data>
                        <Typography variant='caption' color='text.secondary'>
                          Years
                        </Typography>
                      </Stack>
                      <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={0.5}>
                        <Data>{prevResMonths}</Data>
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
          </Stack>
        )}
        {isValidSovCurrentResidentialDetails && (isValidSovPreviousResidentialDetails === true || isValidSovPreviousResidentialDetails === null) && (
          <Stack component={motion.div} {...varConfirmDetails} direction='row' justifyContent='center' alignItems='center' sx={{ minWidth: '100%' }}>
            <FormControlLabel
              control={<Checkbox color='success' checked={verifiedResidentialDetailsSecure} onChange={handleConfirmDetails} />}
              label={
                <Typography color='text.secondary'>
                  I confirm that my <strong>residential details</strong> are correct and up-to-date
                </Typography>
              }
            />
          </Stack>
        )}
      </Stack>
    </Box>
  )
}
