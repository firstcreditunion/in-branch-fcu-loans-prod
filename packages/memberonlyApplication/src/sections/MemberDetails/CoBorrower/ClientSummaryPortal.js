import React from 'react'

//* Redux
import { useSelector } from 'react-redux'

//* RHF
import { useFormContext } from 'react-hook-form'

//* MUI
import { useTheme } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Portal from '@mui/material/Portal'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

import WarningIcon from '@mui/icons-material/Warning'
import CheckIcon from '@mui/icons-material/Check'
import ErrorIcon from '@mui/icons-material/Error'

// Custom Theme Manipulation
import { bgBlur } from '../../../theme/customCSS'

import useResponsive from '../../../hooks/useResponsive'

import { fCurrency } from '../../../utils/formatNumber'

// Custom Componenets
import Scrollbar from '../../../components/scrollbar'

export default function ClientSummaryPortal() {
  const theme = useTheme()

  const mdUp = useResponsive('up', 'md')

  //* Redux Selectors for PRIME-BORROWERS
  const primes6Balance = useSelector((state) => state.clientSearchReducer.primeFunding.s6Balance)

  const primetotalExposure = useSelector((state) => state.clientSearchReducer.primeLending.totalExposure)
  const primetotalArrears = useSelector((state) => state.clientSearchReducer.primeLending.totalArrears)
  const primeactiveLendingAccountCount = useSelector((state) => state.clientSearchReducer.primeLending.activeAccountCount)
  const primesettledLendingAccountCount = useSelector((state) => state.clientSearchReducer.primeLending.settledAccountCount)

  const primeactiveRecvCount = useSelector((state) => state.clientSearchReducer.primeRecovery.activeAccountCount)
  const primesettledRecvCount = useSelector((state) => state.clientSearchReducer.primeRecovery.inactiveAccountCount)
  const primeRecvBalance = useSelector((state) => state.clientSearchReducer.primeRecovery.balance)

  //* Redux Selectors for CO-BORROWERS
  const joints6Balance = useSelector((state) => state.clientSearchReducer.jointFunding.s6Balance)

  const jointtotalExposure = useSelector((state) => state.clientSearchReducer.jointLending.totalExposure)
  const jointtotalArrears = useSelector((state) => state.clientSearchReducer.jointLending.totalArrears)
  const jointactiveLendingAccountCount = useSelector((state) => state.clientSearchReducer.jointLending.activeAccountCount)
  const jointsettledLendingAccountCount = useSelector((state) => state.clientSearchReducer.jointLending.settledAccountCount)

  const jointactiveRecvCount = useSelector((state) => state.clientSearchReducer.jointRecovery.activeAccountCount)
  const jointsettledRecvCount = useSelector((state) => state.clientSearchReducer.jointRecovery.inactiveAccountCount)
  const jointRecvBalance = useSelector((state) => state.clientSearchReducer.jointRecovery.balance)

  //* Totals for Assosiated Members
  const totalS6Balance = primes6Balance + joints6Balance

  const totalExposure = primetotalExposure + jointtotalExposure
  const totalArrears = primetotalArrears + jointtotalArrears
  const totalActiveLendingAccounts = primeactiveLendingAccountCount + jointactiveLendingAccountCount
  const totalSettledLendingAccounts = primesettledLendingAccountCount + jointsettledLendingAccountCount

  const totalActiveRecvCount = primeactiveRecvCount + jointactiveRecvCount
  const totalSettledRecvCount = primesettledRecvCount + jointsettledRecvCount
  const totalrecoveryBalance = primeRecvBalance + jointRecvBalance

  const totalLoanExposureUpperLimit = useSelector((state) => state.clientSearchReducer.totalLoanExposureUpperLimit)
  const isTotalExposureOverUpperLimit = totalExposure > totalLoanExposureUpperLimit

  if (!mdUp) {
    return null
  }

  return (
    <Portal>
      <Scrollbar>
        <Stack
          sx={{
            p: 3,
            top: 0,
            right: 0,
            height: 1,
            width: 500,
            position: 'fixed',
            overflowX: 'auto',
            color: 'common.white',
            zIndex: theme.zIndex.drawer,
            ...bgBlur({ color: theme.palette.grey[900] }),
          }}
        >
          <Typography variant='h6' sx={{ color: 'secondary.light', my: 0.5, textTransform: 'uppercase', fontWeight: 'light', letterSpacing: 1 }}>
            Assosiated Members Summary
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={2} sx={{ width: '100%', pb: 5 }}>
            <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={1} sx={{ width: '100%' }}>
              <Typography variant='overline'>Funding</Typography>
              <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
                <Typography variant='body1' sx={{ fontWeight: 'light' }}>
                  Total S6 Balance
                </Typography>
                <Typography>{fCurrency(totalS6Balance)}</Typography>
              </Stack>
              <Divider sx={{ color: 'common.white', mt: 1, width: '100%' }} />
            </Stack>
            <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={1} sx={{ width: '100%' }}>
              <Typography variant='overline'>Lending</Typography>
              <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
                <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={2}>
                  <Typography variant='body1' sx={{ fontWeight: 'light' }}>
                    Total Exposure
                  </Typography>
                  {isTotalExposureOverUpperLimit && <ErrorIcon fontSize='small' color='error' />}
                </Stack>

                <Typography>{fCurrency(totalExposure)}</Typography>
              </Stack>
              <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
                <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={2}>
                  <Typography variant='body1' sx={{ fontWeight: 'light' }}>
                    Total Arrears Balance
                  </Typography>
                  {totalArrears > 0 && <ErrorIcon fontSize='small' color='error' />}
                </Stack>

                <Typography>{fCurrency(totalArrears)}</Typography>
              </Stack>
              <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
                <Typography variant='body1' sx={{ fontWeight: 'light' }}>
                  Active Lending Accounts
                </Typography>
                <Typography>{totalActiveLendingAccounts}</Typography>
              </Stack>
              <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
                <Typography variant='body1' sx={{ fontWeight: 'light' }}>
                  Settled Lending Accounts
                </Typography>
                <Typography>{totalSettledLendingAccounts}</Typography>
              </Stack>
              <Divider sx={{ color: 'common.white', mt: 1, width: '100%' }} />
            </Stack>
            <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={1} sx={{ width: '100%' }}>
              <Typography variant='overline'>Recovery</Typography>
              <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
                <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={2}>
                  <Typography variant='body1' sx={{ fontWeight: 'light' }}>
                    Total Recovery Balance
                  </Typography>
                  {totalrecoveryBalance > 0 && <WarningIcon fontSize='small' color='warning' />}
                </Stack>
                <Typography>{fCurrency(totalrecoveryBalance)}</Typography>
              </Stack>
              <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
                <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={2}>
                  <Typography variant='body1' sx={{ fontWeight: 'light' }}>
                    Active Recovery Accounts
                  </Typography>
                  {totalActiveRecvCount > 0 && <WarningIcon fontSize='small' color='warning' />}
                </Stack>
                <Typography>{totalActiveRecvCount}</Typography>
              </Stack>
              <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
                <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={2}>
                  <Typography variant='body1' sx={{ fontWeight: 'light' }}>
                    Inactive Recovery Accounts
                  </Typography>
                  {totalSettledRecvCount > 0 && <WarningIcon fontSize='small' color='warning' />}
                </Stack>
                <Typography>{totalSettledRecvCount}</Typography>
              </Stack>
            </Stack>
          </Stack>
          {/* Remove the stack below - Only for testing scrollbar */}
          {/* <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={2} sx={{ width: '100%', pb: 5 }}>
            <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={1} sx={{ width: '100%' }}>
              <Typography variant='overline'>Funding</Typography>
              <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
                <Typography variant='body1' sx={{ fontWeight: 'light' }}>
                  Total S6 Balance
                </Typography>
                <Typography>{fCurrency(totalS6Balance)}</Typography>
              </Stack>
              <Divider sx={{ color: 'common.white', mt: 1, width: '100%' }} />
            </Stack>
            <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={1} sx={{ width: '100%' }}>
              <Typography variant='overline'>Lending</Typography>
              <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
                <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={2}>
                  <Typography variant='body1' sx={{ fontWeight: 'light' }}>
                    Total Exposure
                  </Typography>
                  {isTotalExposureOverUpperLimit && <ErrorIcon fontSize='small' color='error' />}
                </Stack>

                <Typography>{fCurrency(totalExposure)}</Typography>
              </Stack>
              <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
                <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={2}>
                  <Typography variant='body1' sx={{ fontWeight: 'light' }}>
                    Total Arrears Balance
                  </Typography>
                  {totalArrears > 0 && <ErrorIcon fontSize='small' color='error' />}
                </Stack>

                <Typography>{fCurrency(totalArrears)}</Typography>
              </Stack>
              <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
                <Typography variant='body1' sx={{ fontWeight: 'light' }}>
                  Active Lending Accounts
                </Typography>
                <Typography>{totalActiveLendingAccounts}</Typography>
              </Stack>
              <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
                <Typography variant='body1' sx={{ fontWeight: 'light' }}>
                  Settled Lending Accounts
                </Typography>
                <Typography>{totalSettledLendingAccounts}</Typography>
              </Stack>
              <Divider sx={{ color: 'common.white', mt: 1, width: '100%' }} />
            </Stack>
            <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={1} sx={{ width: '100%' }}>
              <Typography variant='overline'>Recovery</Typography>
              <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
                <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={2}>
                  <Typography variant='body1' sx={{ fontWeight: 'light' }}>
                    Total Recovery Balance
                  </Typography>
                  {totalrecoveryBalance > 0 && <WarningIcon fontSize='small' color='warning' />}
                </Stack>
                <Typography>{fCurrency(totalrecoveryBalance)}</Typography>
              </Stack>
              <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
                <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={2}>
                  <Typography variant='body1' sx={{ fontWeight: 'light' }}>
                    Active Recovery Accounts
                  </Typography>
                  {totalActiveRecvCount > 0 && <WarningIcon fontSize='small' color='warning' />}
                </Stack>
                <Typography>{totalActiveRecvCount}</Typography>
              </Stack>
              <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
                <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={2}>
                  <Typography variant='body1' sx={{ fontWeight: 'light' }}>
                    Inactive Recovery Accounts
                  </Typography>
                  {totalSettledRecvCount > 0 && <WarningIcon fontSize='small' color='warning' />}
                </Stack>
                <Typography>{totalSettledRecvCount}</Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={2} sx={{ width: '100%', pb: 5 }}>
            <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={1} sx={{ width: '100%' }}>
              <Typography variant='overline'>Funding</Typography>
              <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
                <Typography variant='body1' sx={{ fontWeight: 'light' }}>
                  Total S6 Balance
                </Typography>
                <Typography>{fCurrency(totalS6Balance)}</Typography>
              </Stack>
              <Divider sx={{ color: 'common.white', mt: 1, width: '100%' }} />
            </Stack>
            <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={1} sx={{ width: '100%' }}>
              <Typography variant='overline'>Lending</Typography>
              <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
                <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={2}>
                  <Typography variant='body1' sx={{ fontWeight: 'light' }}>
                    Total Exposure
                  </Typography>
                  {isTotalExposureOverUpperLimit && <ErrorIcon fontSize='small' color='error' />}
                </Stack>

                <Typography>{fCurrency(totalExposure)}</Typography>
              </Stack>
              <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
                <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={2}>
                  <Typography variant='body1' sx={{ fontWeight: 'light' }}>
                    Total Arrears Balance
                  </Typography>
                  {totalArrears > 0 && <ErrorIcon fontSize='small' color='error' />}
                </Stack>

                <Typography>{fCurrency(totalArrears)}</Typography>
              </Stack>
              <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
                <Typography variant='body1' sx={{ fontWeight: 'light' }}>
                  Active Lending Accounts
                </Typography>
                <Typography>{totalActiveLendingAccounts}</Typography>
              </Stack>
              <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
                <Typography variant='body1' sx={{ fontWeight: 'light' }}>
                  Settled Lending Accounts
                </Typography>
                <Typography>{totalSettledLendingAccounts}</Typography>
              </Stack>
              <Divider sx={{ color: 'common.white', mt: 1, width: '100%' }} />
            </Stack>
            <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={1} sx={{ width: '100%' }}>
              <Typography variant='overline'>Recovery</Typography>
              <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
                <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={2}>
                  <Typography variant='body1' sx={{ fontWeight: 'light' }}>
                    Total Recovery Balance
                  </Typography>
                  {totalrecoveryBalance > 0 && <WarningIcon fontSize='small' color='warning' />}
                </Stack>
                <Typography>{fCurrency(totalrecoveryBalance)}</Typography>
              </Stack>
              <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
                <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={2}>
                  <Typography variant='body1' sx={{ fontWeight: 'light' }}>
                    Active Recovery Accounts
                  </Typography>
                  {totalActiveRecvCount > 0 && <WarningIcon fontSize='small' color='warning' />}
                </Stack>
                <Typography>{totalActiveRecvCount}</Typography>
              </Stack>
              <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
                <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={2}>
                  <Typography variant='body1' sx={{ fontWeight: 'light' }}>
                    Inactive Recovery Accounts
                  </Typography>
                  {totalSettledRecvCount > 0 && <WarningIcon fontSize='small' color='warning' />}
                </Stack>
                <Typography>{totalSettledRecvCount}</Typography>
              </Stack>
            </Stack>
          </Stack> */}
        </Stack>
      </Scrollbar>
    </Portal>
  )
}
